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

// @desc    Get all services for a specific client
// @route   GET /api/client-services/:email
exports.getClientServicesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const clientId = await getClientIdByEmail(email);

    if (!clientId) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const { data: services, error } = await supabase
      .from('client_services')
      .select('*')
      .eq('client_id', clientId);

    if (error) throw error;

    res.json({ success: true, services });
  } catch (error) {
    console.error('Error fetching client services:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Create a new service for a client
// @route   POST /api/client-services
exports.createClientService = async (req, res) => {
  try {
    const { email, service_type, service_cost, paid_status, notes, staff_id } = req.body;
    const clientId = await getClientIdByEmail(email);

    if (!clientId) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const { data: newService, error: insertError } = await supabase
      .from('client_services')
      .insert({ client_id: clientId, service_type, service_cost, paid_status, notes, staff_id })
      .select('*')
      .single();

    if (insertError) throw insertError;

    res.status(201).json({ success: true, message: 'Service created successfully', service: newService });
  } catch (error) {
    console.error('Error creating client service:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Update an existing service
// @route   PUT /api/client-services/:email/:serviceId
exports.updateClientService = async (req, res) => {
  try {
    const { email, serviceId } = req.params;
    const updateData = req.body;

    // Verify the client's email and get their ID
    const clientId = await getClientIdByEmail(email);
    if (!clientId) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    // Check if the service belongs to the client
    const { data: existingService, error: serviceError } = await supabase
      .from('client_services')
      .select('id')
      .eq('id', serviceId)
      .eq('client_id', clientId)
      .single();

    if (serviceError || !existingService) {
      return res.status(404).json({ success: false, message: 'Service not found for this client' });
    }

    const { data: updatedService, error: updateError } = await supabase
      .from('client_services')
      .update(updateData)
      .eq('id', serviceId)
      .select('*')
      .single();

    if (updateError) throw updateError;

    res.json({ success: true, message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    console.error('Error updating client service:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Delete a service by its ID
// @route   DELETE /api/client-services/:email/:serviceId
exports.deleteClientService = async (req, res) => {
  try {
    const { email, serviceId } = req.params;

    // Find client ID by email
    const clientId = await getClientIdByEmail(email);
    if (!clientId) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    // Check if the service belongs to the client
    const { data: existingService, error: serviceError } = await supabase
      .from('client_services')
      .select('id')
      .eq('id', serviceId)
      .eq('client_id', clientId)
      .single();

    if (serviceError || !existingService) {
      return res.status(404).json({ success: false, message: 'Service not found for this client' });
    }

    // Delete the service
    const { error: deleteError } = await supabase
      .from('client_services')
      .delete()
      .eq('id', serviceId);

    if (deleteError) throw deleteError;

    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting client service:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
