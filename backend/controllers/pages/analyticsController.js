const supabase = require('../../db');
// Get financial analytics
exports.getFinancialAnalytics = async (req, res) => {
  try {
    const { period } = req.query; // daily, weekly, monthly
    
    // Revenue by period
    const { data: revenueData, error: revenueError } = await supabase
      .from('paybill_payments')
      .select('amount, payment_date')
      .gte('payment_date', getDateRange(period));
    
    // Expenses by period
    const { data: expensesData, error: expensesError } = await supabase
      .from('expenses')
      .select('total_cost, expense_date')
      .gte('expense_date', getDateRange(period));
    
    if (revenueError || expensesError) {
      return res.status(500).json({ error: 'Failed to fetch financial analytics' });
    }
    
    res.json({
      revenue: revenueData,
      expenses: expensesData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to get date range
function getDateRange(period) {
  const now = new Date();
  switch (period) {
    case 'daily':
      return new Date(now.setDate(now.getDate() - 1)).toISOString();
    case 'weekly':
      return new Date(now.setDate(now.getDate() - 7)).toISOString();
    case 'monthly':
      return new Date(now.setMonth(now.getMonth() - 1)).toISOString();
    default:
      return new Date(now.setMonth(now.getMonth() - 1)).toISOString();
  }
}