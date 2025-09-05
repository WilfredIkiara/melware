// routes/payments.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { requireWriteAccess } = require("../middleware/roleMiddleware");

// Import your controller
const c2bController = require("../controllers/paymentController");

// C2B Result Callback (M-Pesa sends payment confirmations here)
router.post("/result", c2bController.c2bResult);

// C2B Timeout Callback (Triggered if M-Pesa transaction times out)
router.post("/timeout", c2bController.c2bTimeout);

// Register URLs with Safaricom (Confirmation & Validation URLs)
router.get("/register-url", authenticateToken, requireWriteAccess, c2bController.registerUrl);

// Get OAuth Access Token from Safaricom API
router.get("/access-token", authenticateToken, requireWriteAccess, c2bController.getAccessToken);

// Validation Endpoint (Validates account numbers before accepting payment)
router.post("/validation", c2bController.validation);

module.exports = router;