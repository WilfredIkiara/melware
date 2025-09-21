const express = require('express');
const router = express.Router();

// Import controller functions
const staffController = require('../controllers/staffController');

// Import middleware
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

router.get(
  '/',
  // authenticateToken,
  // requireReadAccess,
  staffController.getAllStaff
);

router.get(
  '/:id',
  authenticateToken,
  requireReadAccess,
  staffController.getStaffById
);

router.post(
  '/',
  authenticateToken,
  requireWriteAccess,
  staffController.createStaff
);

router.put(
  '/:id',
  authenticateToken,
  requireWriteAccess,
  staffController.updateStaffById
);

router.delete(
  '/:id',
  authenticateToken,
  requireWriteAccess,
  staffController.deleteStaffById
);

router.get(
  '/:id/details',
  // authenticateToken,
  // requireReadAccess,
  staffController.getStaffDetails
);
module.exports = router;