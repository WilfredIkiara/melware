const supabase = require('../db');

// @desc    Get all clients
// @route   GET /api/clients
exports.getAllClients = async (req, res) => {
  try {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('id, first_name, last_name, email, phone_number, total_spent, licence_plate, registration_make, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ success: true, clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get a single client with all related data
// @route   GET /api/clients/:id
// exports.getClientDetails = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Fetch customer details
//     const { data: customer, error: customerError } = await supabase
//       .from('clients')
//       .select('*')
//       .eq('id', id)
//       .single();

//     if (customerError || !customer) {
//       return res.status(404).json({ success: false, message: 'Client not found' });
//     }

//     // Fetch associated vehicles
//     const { data: vehicles, error: vehiclesError } = await supabase
//       .from('client_vehicles')
//       .select('*')
//       .eq('client_id', id);

//     if (vehiclesError) {
//       throw vehiclesError;
//     }

//     // Fetch service records for the customer
//     const { data: service_records, error: serviceRecordsError } = await supabase
//       .from('client_services')
//       .select('*')
//       .eq('client_id', id)
//       .order('created_at', { ascending: false });

//     if (serviceRecordsError) {
//       throw serviceRecordsError;
//     }

//     res.json({
//       success: true,
//       client: {
//         customer,
//         vehicles,
//         service_records,
//       },
//     });

//   } catch (error) {
//     console.error('Error fetching client details:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
exports.getClientDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch customer details
    const { data: customer, error: customerError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (customerError || !customer) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    // Fetch associated vehicles
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('client_vehicles')
      .select('*')
      .eq('client_id', id);

    if (vehiclesError) {
      throw vehiclesError;
    }

    // Fetch service records with staff information
    const { data: service_records, error: serviceRecordsError } = await supabase
      .from('client_services')
      .select(`
        *,
        staff:staff_id (first_name, last_name)
      `)
      .eq('client_id', id)
      .order('created_at', { ascending: false });

    if (serviceRecordsError) {
      throw serviceRecordsError;
    }

    res.json({
      success: true,
      client: {
        customer,
        vehicles,
        service_records,
      },
    });

  } catch (error) {
    console.error('Error fetching client details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
// @desc    Update a client's details
// @route   PUT /api/clients/:id
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const { data: updatedClient, error } = await supabase
      .from('clients')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Client not found' });
      }
      throw error;
    }

    res.json({ success: true, message: 'Client updated successfully', client: updatedClient });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getClientVehicles = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: vehicles, error } = await supabase
      .from('client_vehicles')
      .select('*')
      .eq('client_id', id);

    if (error) throw error;

    res.json({ success: true, vehicles });
  } catch (error) {
    console.error('Error fetching client vehicles:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getClientStaff = async (req, res) => {
  try {
    const { data: staff, error } = await supabase
      .from('staff')
      .select('staff_id, first_name, last_name, email, phone, location')
      .order('first_name', { ascending: true });

    if (error) throw error;

    res.json({ success: true, staff });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.getClientServices = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: services, error } = await supabase
      .from('client_services')
      .select('*')
      .eq('client_id', id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, services });
  } catch (error) {
    console.error('Error fetching client services:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.updateClientVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const updateData = req.body;
    
    const { data: updatedVehicle, error } = await supabase
      .from('client_vehicles')
      .update(updateData)
      .eq('id', vehicleId)
      .select();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }
      throw error;
    }

    res.json({ success: true, message: 'Vehicle updated successfully', vehicle: updatedVehicle });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.addClientService = async (req, res) => {
  try {
    const { id } = req.params;
    const { service_type, service_cost, paid_status, notes, service_expenses, staff_id } = req.body;

    const { data: newService, error } = await supabase
      .from('client_services')
      .insert({
        client_id: id,
        service_type,
        service_cost: service_cost || 0,
        paid_status: paid_status || false,
        notes,
        service_expenses: service_expenses || 0,
        staff_id: staff_id || null
      })
      .select(`
        *,
        staff:staff_id (first_name, last_name)
      `)
      .single();

    if (error) throw error;

    res.json({ success: true, service: newService });
  } catch (error) {
    console.error('Error adding client service:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
exports.addClientVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { make, licence_plate, engine_type, notes, mileage, color, fuel_type } = req.body;

    const { data: newVehicle, error } = await supabase
      .from('client_vehicles')
      .insert({
        client_id: id,
        make,
        licence_plate,
        engine_type,
        notes,
        mileage,
        color,
        fuel_type
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, vehicle: newVehicle });
  } catch (error) {
    console.error('Error adding client vehicle:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};