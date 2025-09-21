const supabase = require('../../db');
// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        clients(first_name, last_name, phone_number),
        client_vehicles(make, licence_plate)
      `)
      .order('scheduled_time', { ascending: true });
    
    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { client_id, vehicle_id, service_type, scheduled_time, notes } = req.body;
    
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          client_id,
          vehicle_id,
          service_type,
          scheduled_time,
          notes,
          status: 'scheduled'
        }
      ])
      .select();
    
    if (error) {
      return res.status(500).json({ error: 'Failed to create appointment' });
    }
    
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};