const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { listApplications, updateStatus, getAuditLog } = require('../controllers/adminController');

// Admin + officer can manage applications; only admin can login via /api/admin/login,
// but officers also need review access per PS (they triage before admin decides).
router.use(authenticate);
router.use(requireRole('admin', 'officer'));

router.get('/admin/applications', listApplications);
router.patch('/admin/applications/:id/status', updateStatus);
router.get('/admin/applications/:id/audit-log', getAuditLog);

module.exports = router;
