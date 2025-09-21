const supabase = require('../db');

/**
 * @desc Get operator dashboard data
 * @route GET /api/operator/dashboard-data
 * @access Private
 */
exports.getDashboardData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Get current date stats
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Fetch all data in parallel
    const [
      clientsResult,
      vehiclesResult,
      activeJobsResult,
      appointmentsResult,
      inventoryResult,
      todayRevenueResult,
      todayExpensesResult
    ] = await Promise.all([
      // Total clients
      supabase.from('clients').select('id', { count: 'exact' }),
      
      // Total vehicles
      supabase.from('client_vehicles').select('id', { count: 'exact' }),
      
      // Active jobs (work orders with pending status)
      supabase
        .from('work_orders')
        .select(`
          id,
          status,
          total_cost,
          clients (first_name, last_name),
          client_vehicles (make, licence_plate)
        `)
        .in('status', ['pending', 'in-progress']),
      
      // Today's appointments
      supabase
        .from('appointments')
        .select(`
          id,
          service_type,
          scheduled_time,
          status,
          clients (first_name, last_name, phone_number),
          client_vehicles (make, licence_plate)
        `)
        .gte('scheduled_time', `${currentDate}T00:00:00`)
        .lte('scheduled_time', `${currentDate}T23:59:59`),
      
      // Low inventory items
      supabase
        .from('garage_inventory')
        .select('item_name, current_stock, quantity_in, quantity_out')
        .lt('current_stock', 10), // Items with less than 10 in stock
      
      // Today's revenue
      supabase
        .from('client_services')
        .select('service_cost')
        .eq('paid_status', true)
        .gte('created_at', `${currentDate}T00:00:00`)
        .lte('created_at', `${currentDate}T23:59:59`),
      
      // Today's expenses
      supabase
        .from('expenses')
        .select('total_cost')
        .gte('expense_date', `${currentDate}T00:00:00`)
        .lte('expense_date', `${currentDate}T23:59:59`)
    ]);

    // Handle errors from any of the queries
    const errors = [
      clientsResult.error,
      vehiclesResult.error,
      activeJobsResult.error,
      appointmentsResult.error,
      inventoryResult.error,
      todayRevenueResult.error,
      todayExpensesResult.error
    ].filter(error => error);

    if (errors.length > 0) {
      console.error('Errors in dashboard queries:', errors);
      return res.status(500).json({ success: false, message: 'Database query errors', errors });
    }

    // Calculate totals
    const totalRevenue = todayRevenueResult.data?.reduce((sum, service) => sum + (service.service_cost || 0), 0) || 0;
    const totalExpenses = todayExpensesResult.data?.reduce((sum, expense) => sum + (expense.total_cost || 0), 0) || 0;
    const jobsCompleted = activeJobsResult.data?.filter(job => job.status === 'done').length || 0;

    const dashboardData = {
      success: true,
      stats: {
        totalClients: clientsResult.count || 0,
        totalVehicles: vehiclesResult.count || 0,
        activeJobs: activeJobsResult.data?.length || 0,
        jobsCompleted,
        revenue: totalRevenue,
        expenses: totalExpenses,
        netProfit: totalRevenue - totalExpenses
      },
      activeJobs: activeJobsResult.data || [],
      appointments: appointmentsResult.data || [],
      lowInventory: inventoryResult.data || [],
      recentActivities: [] // You might want to add activity log queries
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching operator dashboard data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @desc Get customer list with search
 * @route GET /api/operator/customers
 * @access Private
 */
exports.getCustomers = async (req, res) => {
  try {
    const { search } = req.query;
    
    let query = supabase
      .from('clients')
      .select(`
        id,
        first_name,
        last_name,
        email,
        phone_number,
        address,
        licence_plate,
        registration_make,
        created_at,
        client_vehicles (make, licence_plate)
      `)
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone_number.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching customers:', error);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, customers: data });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @desc Add new customer
 * @route POST /api/operator/customers
 * @access Private
 */
exports.addCustomer = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, address, licence_plate, registration_make } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'First name, last name, and email are required' 
      });
    }

    const { data, error } = await supabase
      .from('clients')
      .insert([{ first_name, last_name, email, phone_number, address, licence_plate, registration_make }])
      .select();

    if (error) {
      console.error('Error adding customer:', error);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, message: 'Customer added successfully', customer: data[0] });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @desc Add new job (work order)
 * @route POST /api/operator/jobs
 * @access Private
 */
exports.addJob = async (req, res) => {
  try {
    const { client_id, vehicle_id, services, assigned_staff, estimated_cost } = req.body;

    // Validate required fields
    if (!client_id || !vehicle_id || !services) {
      return res.status(400).json({ 
        success: false, 
        message: 'Client ID, vehicle ID, and services are required' 
      });
    }

    const { data, error } = await supabase
      .from('work_orders')
      .insert([{ 
        client_id, 
        vehicle_id, 
        services, 
        assigned_staff, 
        estimated_cost,
        status: 'pending'
      }])
      .select();

    if (error) {
      console.error('Error adding job:', error);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, message: 'Job added successfully', job: data[0] });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * @desc Update job status
 * @route PATCH /api/operator/jobs/:id/status
 * @access Private
 */
exports.updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status is required' 
      });
    }

    const { data, error } = await supabase
      .from('work_orders')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating job status:', error);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.json({ success: true, message: 'Job status updated successfully', job: data[0] });
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};