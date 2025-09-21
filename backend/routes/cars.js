const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carController'); // Make sure this path is correct
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/authMiddleware');

// @route   GET /api/cars
// @desc    Get all cars
router.get('/',
    //  authenticateToken, 
    //  requireReadAccess, 
     carsController.getAllCars);

// @route   GET /api/cars/:licence_plate
// @desc    Get car by licence plate
router.get('/:licence_plate', 
    // authenticateToken,
    //  requireReadAccess,
      carsController.getCarByLicencePlate);

// @route   POST /api/cars
// @desc    Create new car and assign to client
router.post('/create',
    //  authenticateToken, 
    //  requireWriteAccess,
     carsController.createCar);

router.put('/:licence_plate', 
    // authenticateToken,
    // requireWriteAccess, 
    carsController.updateCarByLicencePlate);

// @route   PATCH /api/cars/:licence_plate/paid
// @desc    Toggle paid status for a car
router.patch('/:licence_plate/paid', 
    // authenticateToken, 
    // requireWriteAccess, 
    carsController.togglePaidStatus);

// @route   PATCH /api/cars/:licence_plate/working
// @desc    Toggle working status for a car
router.patch('/:licence_plate/working',
    //  authenticateToken, 
    //  requireWriteAccess, 
     carsController.toggleWorkingStatus);


router.delete('/:licence_plate', 
    // authenticateToken, 
    // requireWriteAccess, 
    carsController.deleteCarByLicencePlate);

module.exports = router;
