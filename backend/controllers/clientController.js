const supabase = require('../db');

// @desc    Get all clients
// @route   GET /api/clients
exports.getAllClients = async (req, res) => {
  try {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('id, first_name, last_name, email, phone_number, address, licence_plate, registration_make, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get a single client by email
// @route   GET /api/clients/:email
exports.getClientByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const { data: client, error } = await supabase
      .from('clients')
      .select('id, first_name, last_name, email, phone_number, address, licence_plate, registration_make, created_at')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Client not found' });
      }
      throw error;
    }

    res.json({ success: true, client });
  } catch (error) {
    console.error('Error fetching client by email:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Create a new client
// @route   POST /api/clients
exports.createClient = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, address, licence_plate, registration_make } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !licence_plate) {
      return res.status(400).json({ success: false, message: 'Missing required fields: first_name, last_name, email, licence_plate' });
    }

    const { data, error } = await supabase
      .from('clients')
      .insert({
        first_name,
        last_name,
        email,
        phone_number,
        address,
        licence_plate,
        registration_make
      })
      .select('id, email, created_at')
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Client created successfully', client: data });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Update a client by email
// @route   PUT /api/clients/:email
exports.updateClientByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const { data, error } = await supabase
      .from('clients')
      .update(updateData)
      .eq('email', email)
      .select('id, first_name, last_name, email')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Client not found' });
      }
      throw error;
    }

    res.json({ success: true, message: 'Client updated successfully', client: data });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Delete a client by email
// @route   DELETE /api/clients/:email
exports.deleteClientByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const { data: deletedClient, error } = await supabase
      .from('clients')
      .delete()
      .eq('email', email)
      .select('id, email')
      .single();

    if (error) throw error;

    if (!deletedClient) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    res.json({ success: true, message: 'Client deleted successfully', client: deletedClient });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
