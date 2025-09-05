const express = require('express');
const router = express.Router();
const { sendCustomSMS } = require('../controllers/smsController');
const { authenticateToken, requireWriteAccess } = require('../middleware/authMiddleware');

// @route POST /api/sms/send
// @desc  Send custom SMS
router.post('/send', authenticateToken, requireWriteAccess, sendCustomSMS);

module.exports = router;
