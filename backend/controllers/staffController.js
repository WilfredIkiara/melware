const supabase = require('../db');

// @desc    Get all staff members
// @route   GET /api/staff
exports.getAllStaff = async (req, res) => {
  try {
    const { data: staff, error } = await supabase
      .from('staff') // Correct table name
      .select('*')
      .order('first_name', { ascending: true }); // Correct column name

    if (error) throw error;

    res.json({ success: true, staff });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get a single staff member by ID
// @route   GET /api/staff/:id
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: staffMember, error } = await supabase
      .from('staff') // Correct table name
      .select('*')
      .eq('staff_id', id) // Correct primary key column
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Staff member not found' });
      }
      throw error;
    }

    res.json({ success: true, staff: staffMember });
  } catch (error) {
    console.error('Error fetching staff member by ID:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Create a new staff member
// @route   POST /api/staff
exports.createStaff = async (req, res) => {
  try {
    // Using first_name and last_name as per your schema
    const { first_name, last_name, email, password, phone, location } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields: first_name, last_name, email, password' });
    }

    const { data: newStaff, error } = await supabase
      .from('staff') // Correct table name
      .insert({
        first_name,
        last_name,
        email,
        password,
        phone,
        location,
        role: 'staff' // Setting the default role as per the schema
      })
      .select('staff_id, first_name, last_name, email, role') // Select specific columns
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Staff member created successfully', staff: newStaff });
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Update a staff member by ID
// @route   PUT /api/staff/:id
exports.updateStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const { data: updatedStaff, error } = await supabase
      .from('staff') // Correct table name
      .update(updateData)
      .eq('staff_id', id) // Correct primary key column
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

// @desc    Delete a staff member by ID
// @route   DELETE /api/staff/:id
exports.deleteStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: deletedStaff, error } = await supabase
      .from('staff') // Correct table name
      .delete()
      .eq('staff_id', id) // Correct primary key column
      .select('staff_id, first_name, last_name, email') // Correct column names
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
// @desc    Get staff member details with related data
// @route   GET /api/staff/:id/details
exports.getStaffDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Get staff basic info
    const { data: staffMember, error: staffError } = await supabase
      .from('staff')
      .select('*')
      .eq('staff_id', id)
      .single();

    if (staffError || !staffMember) {
      return res.status(404).json({ success: false, message: 'Staff member not found' });
    }

    // Get appointments for this staff member
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select(`
        *,
        clients(first_name, last_name, phone_number),
        client_vehicles(make, licence_plate)
      `)
      .eq('assigned_staff', id)
      .gte('scheduled_time', new Date().toISOString().split('T')[0]) // Current and future appointments
      .order('scheduled_time', { ascending: true });

    if (appointmentsError) {
      console.error('Error fetching appointments:', appointmentsError);
    }

    // Get services performed by this staff member (this month)
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();

    const { data: services, error: servicesError } = await supabase
      .from('client_services')
      .select(`
        *,
        clients(first_name, last_name),
        client_vehicles(make, licence_plate)
      `)
      .eq('staff_id', id)
      .gte('created_at', firstDayOfMonth)
      .lte('created_at', lastDayOfMonth)
      .order('created_at', { ascending: false });

    if (servicesError) {
      console.error('Error fetching services:', servicesError);
    }

    // Calculate monthly stats
    const monthlyStats = {
      totalServices: services?.length || 0,
      totalRevenue: services?.reduce((sum, service) => sum + (service.service_cost || 0), 0) || 0,
      completedAppointments: appointments?.filter(apt => apt.status === 'completed').length || 0,
      pendingAppointments: appointments?.filter(apt => apt.status === 'scheduled').length || 0
    };

    res.json({
      success: true,
      staff: staffMember,
      appointments: appointments || [],
      services: services || [],
      monthlyStats
    });

  } catch (error) {
    console.error('Error fetching staff details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};