// This router defines the API endpoints for transactions.
const express = require('express');
const router = express.Router();
const transactionsController = require('../../controllers/transactionsController');
const { authenticateToken, requireReadAccess } = require('../../middleware/authMiddleware'); // Assuming this middleware exists

// @route GET /api/transactions
// @desc Get all financial transactions
router.get('/', authenticateToken, requireReadAccess, transactionsController.getAllTransactions);

module.exports = router;
