const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authMiddleware);

// Add vehicle
router.post('/add', vehicleController.addVehicle);

// Get all vehicles for user
router.get('/list', vehicleController.getUserVehicles);

// Get vehicle details
router.get('/:id', vehicleController.getVehicleDetails);

// Update vehicle
router.put('/:id', vehicleController.updateVehicle);

// Delete vehicle
router.delete('/:id', vehicleController.deleteVehicle);

// Scan VIN
router.post('/scan-vin', vehicleController.scanVIN);

// Get maintenance schedule
router.get('/:id/maintenance', vehicleController.getMaintenanceSchedule);

// Add maintenance log
router.post('/:id/maintenance', vehicleController.addMaintenanceLog);

module.exports = router;
