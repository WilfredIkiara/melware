
const supabase = require('../db');

/**
 * @desc    Create a new expense
 * @route   POST /api/expenses
 * @access  Private
 */
exports.createExpense = async (req, res) => {
  try {
    const {
      item_name,
      category,
      description,
      supplier_name,
      quantity,
      unit_price,
      payment_method,
      status,
      notes,
      expense_date,
      staff_id
    } = req.body;

    // Calculate total cost
    const total_cost = (parseFloat(quantity) || 1) * (parseFloat(unit_price) || 0);

    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        item_name,
        category,
        description,
        supplier_name,
        quantity: parseFloat(quantity) || 1,
        unit_price: parseFloat(unit_price) || 0,
        total_cost,
        payment_method,
        status,
        notes,
        expense_date,
        staff_id
      }])
      .select('*')
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data, message: 'Expense recorded successfully' });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @desc    Get all expenses
 * @route   GET /api/expenses
 * @access  Private
 */
// exports.getAllExpenses = async (req, res) => {
//   try {
//     const { data: expenses, error } = await supabase
//       .from('expenses')
//       .select('*')
//       .order('expense_date', { ascending: false });

//     if (error) {
//       console.error('Error fetching expenses:', error);
//       return res.status(500).json({ success: false, message: 'Internal server error' });
//     }

//     res.json({ success: true, expenses });
//   } catch (error) {
//     console.error('Error in getAllExpenses:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
exports.getAllExpenses = async (req, res) => {
  try {
    const { data: expenses, error } = await supabase
      .from('expenses')
      .select('*')
      .order('expense_date', { ascending: false });

    if (error) {
      console.error('Error fetching expenses:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    // Return as { expenses: [...] } to match the frontend expectation
    res.json({ success: true, expenses });
  } catch (error) {
    console.error('Error in getAllExpenses:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};