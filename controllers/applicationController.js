const path = require('path');
const pool = require('../db/pool');
const { success, error } = require('../utils/response');
const { evaluateEligibility } = require('../utils/rulesEngine');
const { verifyDocument } = require('../utils/aiService');

// Helper: process uploaded files -> insert document rows + call AI service
async function saveDocuments(client, applicationId, files) {
  const savedDocs = [];
  for (const file of files) {
    // doc_type comes from the fieldname the frontend used for that file,
    // e.g. field name "caste_certificate" -> doc_type "caste_certificate"
    const docType = file.fieldname;

    const aiResult = await verifyDocument({
      docType,
      filePath: file.path,
      originalName: file.originalname,
      mimeType: file.mimetype,
    });

    const insertResult = await client.query(
      `INSERT INTO documents
        (application_id, doc_type, original_name, stored_filename, file_path, mime_type, size_bytes,
         verification_status, confidence_score, verification_flags)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        applicationId,
        docType,
        file.originalname,
        file.filename,
        path.relative(path.join(__dirname, '..'), file.path),
        file.mimetype,
        file.size,
        aiResult.verification_status,
        aiResult.confidence_score,
        JSON.stringify(aiResult.verification_flags),
      ]
    );
    savedDocs.push(insertResult.rows[0]);
  }
  return savedDocs;
}

// POST /api/applications  (student only)
// multipart/form-data: form fields (scheme_id + applicant profile fields) + files keyed by doc type
async function createApplication(req, res, next) {
  const client = await pool.connect();
  try {
    const studentId = req.user.id; // NEVER trust body for this
    const { scheme_id } = req.body;

    if (!scheme_id) {
      return error(res, 'scheme_id is required', 400);
    }

    const schemeResult = await client.query('SELECT * FROM schemes WHERE id = $1 AND is_active = TRUE', [scheme_id]);
    if (schemeResult.rows.length === 0) {
      return error(res, 'Scheme not found or inactive', 404);
    }
    const scheme = schemeResult.rows[0];

    // Build form_data from all non-file body fields (flexible / JSONB)
    const { scheme_id: _omit, ...formData } = req.body;

    // Run eligibility check at submission time and cache the result
    const rulesResult = await client.query('SELECT * FROM scheme_rules WHERE scheme_id = $1', [scheme_id]);
    const applicant = {
      category: formData.category,
      income: formData.income,
      percentage: formData.percentage,
      education_level: formData.education_level,
      state: formData.state,
      age: formData.age,
    };
    const eligibilityResult = evaluateEligibility(scheme.eligibility, applicant, rulesResult.rows);

    await client.query('BEGIN');

    const appInsert = await client.query(
      `INSERT INTO applications (student_id, scheme_id, status, form_data, eligibility_result)
       VALUES ($1, $2, 'submitted', $3, $4)
       RETURNING *`,
      [studentId, scheme_id, JSON.stringify(formData), JSON.stringify(eligibilityResult)]
    );
    const application = appInsert.rows[0];

    let documents = [];
    if (req.files && req.files.length > 0) {
      documents = await saveDocuments(client, application.id, req.files);
    }

    await client.query(
      `INSERT INTO audit_logs (application_id, actor_id, actor_role, action, from_status, to_status, remarks)
       VALUES ($1,$2,$3,'application_created',NULL,'submitted',$4)`,
      [application.id, studentId, req.user.role, 'Application submitted by student']
    );

    await client.query(
      `INSERT INTO notifications (user_id, application_id, title, message)
       VALUES ($1,$2,$3,$4)`,
      [studentId, application.id, 'Application Submitted', `Your application for "${scheme.name}" has been submitted successfully.`]
    );

    await client.query('COMMIT');

    return success(res, 'Application submitted successfully', { application, documents, eligibility: eligibilityResult }, 201);
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
}

// GET /api/applications/:id  (owner student, or officer/admin)
async function getApplication(req, res, next) {
  try {
    const { id } = req.params;

    const appResult = await pool.query(
      `SELECT a.*, s.name AS scheme_name, s.required_docs, u.name AS student_name, u.email AS student_email
       FROM applications a
       JOIN schemes s ON s.id = a.scheme_id
       JOIN users u ON u.id = a.student_id
       WHERE a.id = $1`,
      [id]
    );

    if (appResult.rows.length === 0) {
      return error(res, 'Application not found', 404);
    }

    const application = appResult.rows[0];

    // Students may only view their own application
    if (req.user.role === 'student' && application.student_id !== req.user.id) {
      return error(res, 'You do not have permission to view this application', 403);
    }

    const docsResult = await pool.query('SELECT * FROM documents WHERE application_id = $1 ORDER BY uploaded_at ASC', [id]);

    return success(res, 'Application fetched', { application, documents: docsResult.rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/applications  (student: own applications list)
async function listMyApplications(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT a.*, s.name AS scheme_name
       FROM applications a JOIN schemes s ON s.id = a.scheme_id
       WHERE a.student_id = $1 ORDER BY a.created_at DESC`,
      [req.user.id]
    );
    return success(res, 'Applications fetched', { applications: result.rows });
  } catch (err) {
    next(err);
  }
}

// PUT /api/applications/:id/documents  (student re-uploads docs, e.g. after 'deficient')
async function updateDocuments(req, res, next) {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    const appResult = await client.query('SELECT * FROM applications WHERE id = $1', [id]);
    if (appResult.rows.length === 0) {
      return error(res, 'Application not found', 404);
    }
    const application = appResult.rows[0];

    if (application.student_id !== req.user.id) {
      return error(res, 'You do not have permission to modify this application', 403);
    }

    if (!req.files || req.files.length === 0) {
      return error(res, 'No files uploaded', 400);
    }

    await client.query('BEGIN');

    const documents = await saveDocuments(client, id, req.files);

    // If application was marked 'deficient', re-uploading moves it to 'resubmitted'
    let newStatus = application.status;
    if (application.status === 'deficient') {
      newStatus = 'resubmitted';
      await client.query('UPDATE applications SET status = $1, updated_at = NOW() WHERE id = $2', [newStatus, id]);

      await client.query(
        `INSERT INTO audit_logs (application_id, actor_id, actor_role, action, from_status, to_status, remarks)
         VALUES ($1,$2,$3,'documents_resubmitted',$4,$5,'Student re-uploaded documents')`,
        [id, req.user.id, req.user.role, application.status, newStatus]
      );

      await client.query(
        `INSERT INTO notifications (user_id, application_id, title, message)
         VALUES ($1,$2,'Documents Resubmitted','Your documents have been resubmitted and are pending review.')`,
        [req.user.id, id]
      );
    } else {
      await client.query('UPDATE applications SET updated_at = NOW() WHERE id = $1', [id]);
    }

    await client.query('COMMIT');

    return success(res, 'Documents uploaded successfully', { documents, status: newStatus });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
}

module.exports = { createApplication, getApplication, listMyApplications, updateDocuments };
