const supabase = require('../db');

// @desc    Get all expense records
// @route   GET /api/expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const { data: expenses, error } = await supabase
      .from('expenses')
      .select('*')
      .order('expense_date', { ascending: false });

    if (error) throw error;

    res.json({ success: true, expenses });
  } catch (error) {
    console.error('Error fetching all expenses:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get a single expense record by code
// @route   GET /api/expenses/:expense_code
exports.getExpenseByCode = async (req, res) => {
  try {
    const { expense_code } = req.params;

    const { data: expense, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('expense_code', expense_code)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Expense record not found' });
      }
      throw error;
    }

    res.json({ success: true, expense });
  } catch (error) {
    console.error('Error fetching expense record:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Create a new expense record
// @route   POST /api/expenses
exports.createExpense = async (req, res) => {
  try {
    const {
      expense_code,
      item_name,
      category,
      description,
      supplier_name,
      quantity,
      unit_price,
      payment_method,
      status,
      notes,
    } = req.body;

    // Validate required fields
    if (!expense_code || !item_name || !unit_price) {
      return res.status(400).json({ success: false, message: 'Missing required fields: expense_code, item_name, and unit_price' });
    }

    const { data: newExpense, error } = await supabase
      .from('expenses')
      .insert({
        expense_code,
        item_name,
        category,
        description,
        supplier_name,
        quantity,
        unit_price,
        payment_method,
        status,
        notes,
      })
      .select('*')
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Expense record created successfully', expense: newExpense });
  } catch (error) {
    console.error('Error creating expense record:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Update an expense record by code
// @route   PUT /api/expenses/:expense_code
exports.updateExpenseByCode = async (req, res) => {
  try {
    const { expense_code } = req.params;
    const updateData = req.body;

    // Prevent updating the unique expense_code directly
    if (updateData.expense_code) {
      return res.status(400).json({ success: false, message: 'Cannot update expense_code directly' });
    }

    const { data: updatedExpense, error } = await supabase
      .from('expenses')
      .update(updateData)
      .eq('expense_code', expense_code)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Expense record not found' });
      }
      throw error;
    }

    res.json({ success: true, message: 'Expense record updated successfully', expense: updatedExpense });
  } catch (error) {
    console.error('Error updating expense record:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Delete an expense record by code
// @route   DELETE /api/expenses/:expense_code
exports.deleteExpenseByCode = async (req, res) => {
  try {
    const { expense_code } = req.params;

    const { data: deletedExpense, error } = await supabase
      .from('expenses')
      .delete()
      .eq('expense_code', expense_code)
      .select('expense_code')
      .single();

    if (error) throw error;

    if (!deletedExpense) {
      return res.status(404).json({ success: false, message: 'Expense record not found' });
    }

    res.json({ success: true, message: 'Expense record deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense record:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
