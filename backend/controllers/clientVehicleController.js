const supabase = require('../db');

// Helper function to find a client's ID by email
const getClientIdByEmail = async (email) => {
  const { data: client, error } = await supabase
    .from('clients')
    .select('id')
    .eq('email', email)
    .single();

  if (error || !client) {
    return null;
  }
  return client.id;
};

// @desc    Get all vehicles for a specific client
// @route   GET /api/client-vehicles/:email
exports.getClientVehiclesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const clientId = await getClientIdByEmail(email);

    if (!clientId) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const { data: vehicles, error } = await supabase
      .from('client_vehicles')
      .select('*')
      .eq('client_id', clientId);

    if (error) throw error;

    res.json({ success: true, vehicles });
  } catch (error) {
    console.error('Error fetching client vehicles:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Create a new vehicle for a client
// @route   POST /api/client-vehicles
exports.createClientVehicle = async (req, res) => {
  try {
    const { email, make, licence_plate, engine_type, notes, mileage, color } = req.body;
    const clientId = await getClientIdByEmail(email);

    if (!clientId) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const { data: newVehicle, error: insertError } = await supabase
      .from('client_vehicles')
      .insert({ client_id: clientId, make, licence_plate, engine_type, notes, mileage, color })
      .select('id')
      .single();

    if (insertError) throw insertError;

    // Update the vehicle_ids array in the clients table
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('vehicle_ids')
      .eq('id', clientId)
      .single();

    if (clientError) throw clientError;

    const updatedVehicleIds = [...(clientData.vehicle_ids || []), newVehicle.id];

    await supabase
      .from('clients')
      .update({ vehicle_ids: updatedVehicleIds })
      .eq('id', clientId);

    res.status(201).json({ success: true, message: 'Vehicle created successfully', vehicle: newVehicle });
  } catch (error) {
    console.error('Error creating client vehicle:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Update an existing vehicle
// @route   PUT /api/client-vehicles/:email/:vehicleId
exports.updateClientVehicle = async (req, res) => {
  try {
    const { email, vehicleId } = req.params;
    const updateData = req.body;

    // Verify the client's email and get their ID
    const clientId = await getClientIdByEmail(email);
    if (!clientId) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    // Check if the vehicle belongs to the client
    const { data: existingVehicle, error: vehicleError } = await supabase
      .from('client_vehicles')
      .select('id')
      .eq('id', vehicleId)
      .eq('client_id', clientId)
      .single();

    if (vehicleError || !existingVehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found for this client' });
    }

    const { data: updatedVehicle, error: updateError } = await supabase
      .from('client_vehicles')
      .update(updateData)
      .eq('id', vehicleId)
      .select('*')
      .single();

    if (updateError) throw updateError;

    res.json({ success: true, message: 'Vehicle updated successfully', vehicle: updatedVehicle });
  } catch (error) {
    console.error('Error updating client vehicle:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Delete a vehicle by its ID
// @route   DELETE /api/client-vehicles/:email/:vehicleId
exports.deleteClientVehicle = async (req, res) => {
  try {
    const { email, vehicleId } = req.params;

    // Find client ID by email
    const clientId = await getClientIdByEmail(email);
    if (!clientId) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    // First, check if the vehicle belongs to the client
    const { data: existingVehicle, error: vehicleError } = await supabase
      .from('client_vehicles')
      .select('id')
      .eq('id', vehicleId)
      .eq('client_id', clientId)
      .single();

    if (vehicleError || !existingVehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found for this client' });
    }

    // Delete the vehicle
    const { error: deleteError } = await supabase
      .from('client_vehicles')
      .delete()
      .eq('id', vehicleId);

    if (deleteError) throw deleteError;

    // Remove the vehicle ID from the clients table
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('vehicle_ids')
      .eq('id', clientId)
      .single();

    if (clientError) throw clientError;

    const updatedVehicleIds = (clientData.vehicle_ids || []).filter(id => id !== vehicleId);

    await supabase
      .from('clients')
      .update({ vehicle_ids: updatedVehicleIds })
      .eq('id', clientId);

    res.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting client vehicle:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};