const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

// Define API routes for each report type
router.get('/financial', reportsController.getFinancialReport);
router.get('/clients', reportsController.getClientsReport);
router.get('/staff', reportsController.getStaffReport);
router.get('/inventory', reportsController.getInventoryReport);
router.get('/carYard', reportsController.getCarYardReport);
router.get('/transactions', reportsController.getTransactionsReport);

module.exports = router;