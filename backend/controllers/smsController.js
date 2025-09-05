const axios = require('axios');
const FormData = require('form-data');

// Helper function to format phone number
const formatPhoneNumber = (number) => {
  if (number.startsWith('0')) {
    return '254' + number.slice(1); // convert 07xxxxxxxx to 2547xxxxxxxx
  }
  return number;
};

// @desc Send custom SMS
// @route POST /api/sms/send
exports.sendCustomSMS = async (req, res) => {
  try {
    const { number, message } = req.body;

    // Validate inputs
    if (!number || !message) {
      return res.status(400).json({ success: false, error: 'Number and message are required' });
    }

    const formattedNumber = formatPhoneNumber(number);

    if (!/^254\d{9}$/.test(formattedNumber)) {
      return res.status(400).json({ success: false, error: 'Invalid phone number format' });
    }

    // SMS API details
    const apiUrl = process.env.SMS_API_URL || 'https://smsportal.hostpinnacle.co.ke/SMSApi/send';

    const options = {
      userid: process.env.SMSUSERID,
      password: process.env.SMSPASSWORD,
      senderid: process.env.SMSSENDERID || 'Chantry',
      sendMethod: 'quick',
      msgType: 'text',
      output: 'json',
      mobile: formattedNumber,
      msg: message,
      duplicatecheck: true
    };

    // Build form data
    const formData = new FormData();
    Object.keys(options).forEach(key => formData.append(key, options[key]));

    // Send SMS via API
    const response = await axios.post(apiUrl, formData, { headers: formData.getHeaders() });

    // Handle response
    if (response.data.status === 'success') {
      return res.status(200).json({ success: true, message: 'SMS sent successfully!' });
    } else {
      return res.status(500).json({ success: false, error: 'Failed to send SMS', details: response.data });
    }
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    return res.status(500).json({ success: false, error: 'Internal Server Error', details: error.message });
  }
};
