const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const { authenticateToken, requireReadAccess } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/transactions
 * @desc    Get all transactions
 * @access  Private (requires 'read' access)
 */
router.get('/', 
    // authenticateToken,
    //  requireReadAccess, 
     transactionsController.getAllTransactions);
     
router.get('/paybill_payments', 
    // authenticateToken,
    // requireReadAccess, 
    transactionsController.getAllTransactions);
module.exports = router;