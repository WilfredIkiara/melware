const express = require('express');
const router = express.Router();
const operatorController = require('../controllers/operatorController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/operator/dashboard-data
 * @desc    Get operator dashboard data
 * @access  Private
 */
router.get('/dashboard-data', 
    // authenticateToken,
    operatorController.getDashboardData);

/**
 * @route   GET /api/operator/customers
 * @desc    Get customer list with search
 * @access  Private
 */
router.get('/customers', 
    // authenticateToken,
    operatorController.getCustomers);

/**
 * @route   POST /api/operator/customers
 * @desc    Add new customer
 * @access  Private
 */
router.post('/customers', 
    // authenticateToken,
    operatorController.addCustomer);

/**
 * @route   POST /api/operator/jobs
 * @desc    Add new job (work order)
 * @access  Private
 */
router.post('/jobs', 
    // authenticateToken,
    operatorController.addJob);

/**
 * @route   PATCH /api/operator/jobs/:id/status
 * @desc    Update job status
 * @access  Private
 */
router.patch('/jobs/:id/status', 
    // authenticateToken,
    operatorController.updateJobStatus);

module.exports = router;