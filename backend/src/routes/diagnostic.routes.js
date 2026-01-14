const express = require('express');
const router = express.Router();
const diagnosticController = require('../controllers/diagnostic.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Run diagnostic scan
router.post('/scan', diagnosticController.runDiagnostic);

// Get diagnostic history
router.get('/history', diagnosticController.getDiagnosticHistory);

// Get diagnostic details
router.get('/:id', diagnosticController.getDiagnosticDetails);

// Mark as resolved
router.put('/:id/resolve', diagnosticController.resolveDiagnostic);

module.exports = router;
