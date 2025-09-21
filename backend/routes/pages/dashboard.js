const express = require('express');
const router = express.Router();

// Import controllers
const dashboardController = require('../../controllers/pages/dashboardController');
const workOrdersController = require('../../controllers/pages/workOrdersController');
const appointmentsController = require('../../controllers/pages/appointmentsController');
const analyticsController = require('../../controllers/pages/analyticsController');
const superAdminController = require('../../controllers/pages/superAdminController'); 

// Import middleware
const { authenticateToken, requireReadAccess, requireWriteAccess } = require('../../middleware/authMiddleware');
router.get('/super-admin-data', superAdminController.getSuperAdminData);

// Dashboard routes
//  authenticateToken,
router.get('/stats', dashboardController.getDashboardStats);
router.get('/activities', dashboardController.getRecentActivities);
//  authenticateToken,
// Work orders routes
// authenticateToken,
// requireReadAccess,
router.get('/work-orders', workOrdersController.getWorkOrders);
//  authenticateToken,
router.post('/work-orders', requireWriteAccess, workOrdersController.createWorkOrder);
// authenticateToken,
router.patch('/work-orders/:id/status',  requireWriteAccess, workOrdersController.updateWorkOrderStatus);

// Appointments routes
// authenticateToken,
// requireReadAccess,
router.get('/appointments',   appointmentsController.getAppointments);
//  authenticateToken,
router.post('/appointments', requireWriteAccess, appointmentsController.createAppointment);

// Analytics routes
// authenticateToken,
// requireReadAccess,
router.get('/analytics/financial',   analyticsController.getFinancialAnalytics);
// Dummy routes for the buttons
router.post('/add-job', superAdminController.addJob);
router.post('/add-expense',  superAdminController.addExpense);
router.post('/add-customer', superAdminController.addCustomer);

module.exports = router;