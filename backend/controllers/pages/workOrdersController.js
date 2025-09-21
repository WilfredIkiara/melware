const supabase = require('../../db');
// Get all work orders
exports.getWorkOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('work_orders')
      .select(`
        *,
        clients(first_name, last_name, email),
        client_vehicles(make, licence_plate),
        staff(first_name, last_name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase fetch error:', error); // Added detailed error logging
      return res.status(500).json({ error: 'Failed to fetch work orders', details: error.message }); // Added error details
    }
    
    res.json(data);
  } catch (error) {
    console.error('Server error:', error); // Added detailed server error logging
    res.status(500).json({ error: error.message });
  }
};
// Create new work order
exports.createWorkOrder = async (req, res) => {
  try {
    const { client_id, vehicle_id, services, assigned_staff, estimated_cost } = req.body;
    
    const { data, error } = await supabase
      .from('work_orders')
      .insert([
        {
          client_id,
          vehicle_id,
          services,
          assigned_staff,
          estimated_cost,
          status: 'pending'
        }
      ])
      .select();
    
    if (error) {
      return res.status(500).json({ error: 'Failed to create work order' });
    }
    
    // Log activity
    await supabase
      .from('activity_log')
      .insert([
        {
          user_id: req.user.user_id,
          activity_type: 'work_order',
          description: `Created new work order #${data[0].id}`
        }
      ]);
    
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update work order status
exports.updateWorkOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const { data, error } = await supabase
      .from('work_orders')
      .update({ status })
      .eq('id', id)
      .select();
    
    if (error) {
      return res.status(500).json({ error: 'Failed to update work order' });
    }
    
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};