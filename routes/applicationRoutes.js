const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { authenticate, requireRole } = require('../middleware/auth');
const {
  createApplication,
  getApplication,
  listMyApplications,
  updateDocuments,
} = require('../controllers/applicationController');

// All application routes require a logged-in user
router.use(authenticate);

// upload.any() lets the frontend send files under any doc-type field name
// (e.g. caste_certificate, income_certificate, marksheet) - matched against
// each scheme's required_docs on the frontend/validation layer.
router.post('/applications', requireRole('student'), upload.any(), createApplication);
router.get('/applications', requireRole('student'), listMyApplications);
router.get('/applications/:id', getApplication); // student(own)/officer/admin - checked in controller
router.put('/applications/:id/documents', requireRole('student'), upload.any(), updateDocuments);

module.exports = router;
