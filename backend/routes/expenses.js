// const express = require('express');
// const router = express.Router();
// const expensesController = require('../controllers/expensesController'); // Ensure path is correct
// const { authenticateToken } = require('../middleware/authMiddleware');
// const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

// // @route   GET /api/expenses
// // @desc    Get all expense records
// router.get(
//   '/',
//   authenticateToken,
//   requireReadAccess,
//   expensesController.getAllExpenses
// );

// // @route   GET /api/expenses/:expense_code
// // @desc    Get a single expense record by code
// router.get(
//   '/:expense_code',
//   authenticateToken,
//   requireReadAccess,
//   expensesController.getExpenseByCode
// );

// // @route   POST /api/expenses
// // @desc    Create a new expense record
// router.post(
//   '/create',
//   authenticateToken,
//   requireWriteAccess,
//   expensesController.createExpense
// );

// // @route   PUT /api/expenses/:expense_code
// // @desc    Update an expense record by code
// router.put(
//   '/:expense_code',
//   authenticateToken,
//   requireWriteAccess,
//   expensesController.updateExpenseByCode
// );

// // @route   DELETE /api/expenses/:expense_code
// // @desc    Delete an expense record by code
// router.delete(
//   '/:expense_code',
//   authenticateToken,
//   requireWriteAccess,
//   expensesController.deleteExpenseByCode
// );

// module.exports = router;
const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');
const { authenticateToken, requireWriteAccess, requireReadAccess } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/expenses
 * @desc    Create a new expense entry
 * @access  Private (requires 'write' access)
 */
router.post('/', 
  // authenticateToken, 
  // requireWriteAccess, 
  expensesController.createExpense);

/**
 * @route   GET /api/expenses
 * @desc    Get all expenses
 * @access  Private (requires 'read' access)
 */
router.get('/', 
  // authenticateToken,
  //  requireReadAccess,
    expensesController.getAllExpenses);

module.exports = router;