const supabase = require('../db');

// @desc    Get all staff members
// @route   GET /api/staff
exports.getAllStaff = async (req, res) => {
  try {
    const { data: staff, error } = await supabase
      .from('staff')
      .select('*')
      .order('first_name', { ascending: true });

    if (error) throw error;

    res.json({ success: true, staff });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get a single staff member by email
// @route   GET /api/staff/:email
exports.getStaffByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const { data: staffMember, error } = await supabase
      .from('staff')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Staff member not found' });
      }
      throw error;
    }

    res.json({ success: true, staff: staffMember });
  } catch (error) {
    console.error('Error fetching staff member by email:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Create a new staff member
// @route   POST /api/staff
exports.createStaff = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, location, services, current_clients, services_offered } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ success: false, message: 'Missing required fields: first_name, last_name, email' });
    }

    const { data: newStaff, error } = await supabase
      .from('staff')
      .insert({
        first_name,
        last_name,
        email,
        phone,
        location,
        services,
        current_clients,
        services_offered
      })
      .select('staff_id, email')
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Staff member created successfully', staff: newStaff });
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Update a staff member by email
// @route   PUT /api/staff/:email
exports.updateStaffByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    // Supabase handles JSONB updates gracefully, no need for special serialization.
    const { data: updatedStaff, error } = await supabase
      .from('staff')
      .update(updateData)
      .eq('email', email)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Staff member not found' });
      }
      throw error;
    }

    res.json({ success: true, message: 'Staff member updated successfully', staff: updatedStaff });
  } catch (error) {
    console.error('Error updating staff member:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Delete a staff member by email
// @route   DELETE /api/staff/:email
exports.deleteStaffByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const { data: deletedStaff, error } = await supabase
      .from('staff')
      .delete()
      .eq('email', email)
      .select('staff_id, email')
      .single();

    if (error) throw error;

    if (!deletedStaff) {
      return res.status(404).json({ success: false, message: 'Staff member not found' });
    }

    res.json({ success: true, message: 'Staff member deleted successfully', staff: deletedStaff });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
