const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');
require('dotenv').config();

/**
 * Verifies the JWT from the Authorization header (Bearer <token>).
 * Attaches decoded payload to req.user. NEVER trust user_id from body/query —
 * always read it from req.user (set here from the verified JWT).
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'Authentication token missing', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, email }
    next();
  } catch (err) {
    return error(res, 'Invalid or expired token', 401);
  }
}

/**
 * Restricts access to the given roles. Use after authenticate().
 * Usage: requireRole('admin', 'officer')
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return error(res, 'You do not have permission to perform this action', 403);
    }
    next();
  };
}

module.exports = { authenticate, requireRole };
