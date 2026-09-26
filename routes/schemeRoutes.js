const express = require('express');
const router = express.Router();
const { getSchemes, getSchemeById, checkEligibility } = require('../controllers/schemeController');

router.get('/schemes', getSchemes);
router.get('/schemes/:id', getSchemeById);
router.post('/schemes/:id/check-eligibility', checkEligibility);

module.exports = router;
