const supabase = require('../../db');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Execute all queries in parallel for better performance
    const [
      financialsResult,
      inventoryResult,
      clientsResult,
      carsResult,
      expensesResult
    ] = await Promise.all([
      // Financial stats
      supabase
        .from('paybill_payments')
        .select('amount')
        .then(({ data, error }) => {
          if (error) throw error;
          const total_revenue = data.reduce((sum, item) => sum + (item.amount || 0), 0);
          return { total_revenue, transaction_count: data.length };
        }),
      
      // Inventory stats
      supabase
        .from('garage_inventory')
        .select('current_stock')
        .then(({ data, error }) => {
          if (error) throw error;
          const total_items = data.length;
          const total_stock = data.reduce((sum, item) => sum + (item.current_stock || 0), 0);
          const low_stock_items = data.filter(item => item.current_stock < 5).length;
          return { total_items, total_stock, low_stock_items };
        }),
      
      // Client stats
      supabase
        .from('clients')
        .select('id', { count: 'exact' })
        .then(({ count, error }) => {
          if (error) throw error;
          return { total_clients: count };
        }),
      
      // Car stats
      supabase
        .from('cars')
        .select('balance')
        .then(({ data, error }) => {
          if (error) throw error;
          const total_cars = data.length;
          const total_balance = data.reduce((sum, item) => sum + (item.balance || 0), 0);
          return { total_cars, total_balance };
        }),
      
      // Expense stats
      supabase
        .from('expenses')
        .select('total_cost')
        .then(({ data, error }) => {
          if (error) throw error;
          const total_expenses = data.reduce((sum, item) => sum + (item.total_cost || 0), 0);
          return { total_expenses };
        })
    ]);

    res.json({
      financials: financialsResult,
      inventory: inventoryResult,
      clients: clientsResult,
      cars: carsResult,
      expenses: expensesResult
    });
    
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics', details: error.message });
  }
};

// Get recent activities
exports.getRecentActivities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('activity_log')
      .select(`
        *,
        users:user_id (first_name, last_name)
      `)
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) {
      console.error('Recent activities error:', error);
      return res.status(500).json({ error: 'Failed to fetch recent activities', details: error.message });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Recent activities error:', error);
    res.status(500).json({ error: error.message });
  }
};