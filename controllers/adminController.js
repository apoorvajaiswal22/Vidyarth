const pool = require('../db/pool');
const { success, error } = require('../utils/response');

// Allowed status flow (directed graph). Reject anything not listed here.
const ALLOWED_TRANSITIONS = {
  submitted: ['under_review'],
  under_review: ['deficient', 'selected', 'rejected'],
  deficient: ['resubmitted'],
  resubmitted: ['under_review'],
  selected: [],
  rejected: [],
};

// GET /api/admin/applications?status=&scheme=&state=
async function listApplications(req, res, next) {
  try {
    const { status, scheme, state } = req.query;

    const conditions = [];
    const values = [];
    let idx = 1;

    if (status) {
      conditions.push(`a.status = $${idx++}`);
      values.push(status);
    }
    if (scheme) {
      conditions.push(`a.scheme_id = $${idx++}`);
      values.push(scheme);
    }
    if (state) {
      conditions.push(`u.state = $${idx++}`);
      values.push(state);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT a.id, a.status, a.form_data, a.eligibility_result, a.created_at, a.updated_at,
             s.id AS scheme_id, s.name AS scheme_name,
             u.id AS student_id, u.name AS student_name, u.email AS student_email, u.state AS student_state
      FROM applications a
      JOIN schemes s ON s.id = a.scheme_id
      JOIN users u ON u.id = a.student_id
      ${whereClause}
      ORDER BY a.created_at DESC
    `;

    const result = await pool.query(query, values);
    return success(res, 'Applications fetched', { applications: result.rows, count: result.rows.length });
  } catch (err) {
    next(err);
  }
}

// PATCH /api/admin/applications/:id/status
// Body: { status: 'under_review' | 'deficient' | 'selected' | 'rejected' | ..., remarks?: string }
async function updateStatus(req, res, next) {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { status: newStatus, remarks } = req.body;

    if (!newStatus) {
      return error(res, 'status is required', 400);
    }
    if (!Object.keys(ALLOWED_TRANSITIONS).includes(newStatus)) {
      return error(res, `Unknown status: ${newStatus}`, 400);
    }

    const appResult = await client.query('SELECT * FROM applications WHERE id = $1', [id]);
    if (appResult.rows.length === 0) {
      return error(res, 'Application not found', 404);
    }
    const application = appResult.rows[0];
    const currentStatus = application.status;

    const allowedNext = ALLOWED_TRANSITIONS[currentStatus] || [];
    if (!allowedNext.includes(newStatus)) {
      return error(
        res,
        `Invalid status transition: cannot move from '${currentStatus}' to '${newStatus}'. Allowed: [${allowedNext.join(', ') || 'none'}]`,
        400
      );
    }

    await client.query('BEGIN');

    // 1. update application
    await client.query(
      'UPDATE applications SET status = $1, remarks = $2, updated_at = NOW() WHERE id = $3',
      [newStatus, remarks || application.remarks, id]
    );

    // 2. create audit_logs record
    await client.query(
      `INSERT INTO audit_logs (application_id, actor_id, actor_role, action, from_status, to_status, remarks)
       VALUES ($1,$2,$3,'status_change',$4,$5,$6)`,
      [id, req.user.id, req.user.role, currentStatus, newStatus, remarks || null]
    );

    // 3. create notifications record
    const notifMessages = {
      under_review: 'Your application is now under review.',
      deficient: `Your application has deficiencies and needs attention.${remarks ? ' Remarks: ' + remarks : ''}`,
      resubmitted: 'Your resubmitted application has been received.',
      selected: 'Congratulations! Your application has been selected.',
      rejected: `Your application has been rejected.${remarks ? ' Remarks: ' + remarks : ''}`,
    };
    await client.query(
      `INSERT INTO notifications (user_id, application_id, title, message)
       VALUES ($1,$2,$3,$4)`,
      [application.student_id, id, 'Application Status Updated', notifMessages[newStatus] || `Status changed to ${newStatus}`]
    );

    await client.query('COMMIT');

    const updated = await pool.query('SELECT * FROM applications WHERE id = $1', [id]);

    return success(res, `Status updated to ${newStatus}`, { application: updated.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
}

// GET /api/admin/applications/:id/audit-log
async function getAuditLog(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT al.*, u.name AS actor_name
       FROM audit_logs al
       LEFT JOIN users u ON u.id = al.actor_id
       WHERE al.application_id = $1
       ORDER BY al.created_at ASC`,
      [id]
    );
    return success(res, 'Audit log fetched', { audit_log: result.rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { listApplications, updateStatus, getAuditLog, ALLOWED_TRANSITIONS };
