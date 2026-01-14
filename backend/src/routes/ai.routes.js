const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Chat with AI
router.post('/chat', aiController.chat);

// Analyze image
router.post('/analyze-image', aiController.analyzeImage);

// Get recommendations
router.get('/recommendations', aiController.getRecommendations);

module.exports = router;
