const express = require('express');
const router = express.Router();
const { generateMonthlyReport } = require('../controllers/reportsController');
const { authenticateToken, requireReadAccess } = require('../middleware/authMiddleware');

// @route GET /api/reports/monthly
// @desc  Generate monthly Excel report
router.get('/monthly', authenticateToken, requireReadAccess, generateMonthlyReport);

module.exports = router;
