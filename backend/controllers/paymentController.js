// controllers/c2bController.js
const { getAccessToken } = require("../middleware/mpesaAuth");
const axios = require("axios");

// C2B Result (Confirmation) Callback
exports.c2bResult = async (req, res) => {
  console.log("--------C2B Result Start----------");
  try {
    const { TransID, TransAmount, BillRefNumber, TransTime, MSISDN } = req.body;
    if (!TransID || !TransAmount || !BillRefNumber || !TransTime) {
      return res.status(400).json({ error: "Missing required callback data." });
    }

    // TODO: Save transaction to DB here
    console.log("Payment received:", {
      TransID,
      TransAmount,
      BillRefNumber,
      TransTime,
      MSISDN
    });

    res.status(200).send("C2B Payment received");
  } catch (error) {
    console.error("C2B Result Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// C2B Timeout Callback
exports.c2bTimeout = async (req, res) => {
  console.error("Transaction Timeout:", req.body);
  res.status(200).send("Timeout received");
};

// Register URL with Safaricom
exports.registerUrl = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const url = "https://api.safaricom.co.ke/mpesa/c2b/v2/registerurl";
    const data = {
      ShortCode: "4120715", // Replace with your actual shortcode
      ResponseType: "Completed",
      ConfirmationURL: "https://yourdomain.com/api/payments/result", // Update with your domain
      ValidationURL: "https://yourdomain.com/api/payments/validation", // Update with your domain
    };

    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.status(200).json({ message: "URLs registered", data: response.data });
  } catch (error) {
    console.error("Error registering URLs:", error);
    res.status(500).json({ message: "Error registering URL" });
  }
};

// Get Access Token
exports.getAccessToken = async (req, res) => {
  try {
    const token = await getAccessToken();
    res.status(200).json({ access_token: token });
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).json({ message: "Error fetching access token" });
  }
};

// Validation endpoint
exports.validation = async (req, res) => {
  const { TransID } = req.body;
  console.log("Validation request:", req.body);
  res.json({ ResultCode: 0, ResultDesc: "Accepted", ThirdPartyTransID: TransID });
};