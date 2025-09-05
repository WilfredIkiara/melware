const express = require('express');
const router = express.Router();

// Import controller functions
const staffController = require('../controllers/staffController');

// Import middleware
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

router.get(
  '/',
  authenticateToken,
  requireReadAccess,
  staffController.getAllStaff
);

router.get(
  '/:email',
  authenticateToken,
  requireReadAccess,
  staffController.getStaffByEmail
);


router.post(
  '/',
  authenticateToken,
  requireWriteAccess,
  staffController.createStaff
);


router.put(
  '/:email',
  authenticateToken,
  requireWriteAccess,
  staffController.updateStaffByEmail
);


router.delete(
  '/:email',
  authenticateToken,
  requireWriteAccess,
  staffController.deleteStaffByEmail
);

module.exports = router;
