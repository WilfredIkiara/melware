// This controller handles all logic for fetching transactions from the database.
const supabase = require('../db');

/**
 * @desc Get all transactions from the paybill_payments table.
 * @route GET /api/transactions
 * @access Private
 */
exports.getAllTransactions = async (req, res) => {
  try {
    const { data: transactions, error } = await supabase
      .from('paybill_payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching transactions:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    // Return as { payments: [...] } to match the frontend expectation
    res.json({ success: true, payments: transactions });
  } catch (error) {
    console.error('Error in getAllTransactions:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};