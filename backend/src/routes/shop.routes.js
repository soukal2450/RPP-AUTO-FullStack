const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Parts search (public)
router.get('/parts/search', shopController.searchParts);

// Get part details
router.get('/parts/:id', shopController.getPartDetails);

// Find nearby mechanics
router.get('/mechanics/nearby', shopController.findNearbyMechanics);

// Get mechanic profile
router.get('/mechanics/:id', shopController.getMechanicProfile);

// Protected routes
router.use(authMiddleware);

// Book appointment
router.post('/book', shopController.bookAppointment);

// Get user appointments
router.get('/appointments', shopController.getUserAppointments);

// Create order
router.post('/order', shopController.createOrder);

// Get order history
router.get('/orders', shopController.getOrderHistory);

module.exports = router;
