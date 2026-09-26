const pool = require('../db/pool');
const { success, error } = require('../utils/response');
const { evaluateEligibility } = require('../utils/rulesEngine');

// GET /api/schemes
async function getSchemes(req, res, next) {
  try {
    const result = await pool.query(
      `SELECT id, name, description, department, required_docs, eligibility, is_active, created_at
       FROM schemes WHERE is_active = TRUE ORDER BY id ASC`
    );
    return success(res, 'Schemes fetched', { schemes: result.rows });
  } catch (err) {
    next(err);
  }
}

// GET /api/schemes/:id
async function getSchemeById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM schemes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return error(res, 'Scheme not found', 404);
    }
    return success(res, 'Scheme fetched', { scheme: result.rows[0] });
  } catch (err) {
    next(err);
  }
}

// POST /api/schemes/:id/check-eligibility
// Body: applicant profile fields to test against the scheme's rules (data-driven, not hardcoded).
async function checkEligibility(req, res, next) {
  try {
    const { id } = req.params;

    const schemeResult = await pool.query('SELECT * FROM schemes WHERE id = $1 AND is_active = TRUE', [id]);
    if (schemeResult.rows.length === 0) {
      return error(res, 'Scheme not found', 404);
    }
    const scheme = schemeResult.rows[0];

    const rulesResult = await pool.query('SELECT * FROM scheme_rules WHERE scheme_id = $1', [id]);

    // Applicant profile: prefer body values, fall back to authenticated user's profile if present
    const applicant = {
      category: req.body.category || req.user?.category,
      income: req.body.income,
      percentage: req.body.percentage,
      education_level: req.body.education_level,
      state: req.body.state || req.user?.state,
      age: req.body.age,
    };

    const result = evaluateEligibility(scheme.eligibility, applicant, rulesResult.rows);

    return success(res, 'Eligibility evaluated', result);
  } catch (err) {
    next(err);
  }
}

module.exports = { getSchemes, getSchemeById, checkEligibility };
