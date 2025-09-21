// const supabase = require('../db');

// // Helper function to find a client's ID by email
// const getClientIdAndEmail = async (email) => {
//   const { data: client, error } = await supabase
//     .from('clients')
//     .select('id, email')
//     .eq('email', email)
//     .single();

//   if (error || !client) {
//     return null;
//   }
//   return { id: client.id, email: client.email };
// };

// // @desc    Get all cars
// // @route   GET /api/cars
// exports.getAllCars = async (req, res) => {
//   try {
//     const { data: cars, error } = await supabase
//       .from('cars')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, cars });
//   } catch (error) {
//     console.error('Error fetching all cars:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// exports.getCarByLicencePlate = async (req, res) => {
//   try {
//     const { licence_plate } = req.params;

//     const { data: car, error } = await supabase
//       .from('cars')
//       .select('*')
//       .eq('licence_plate', licence_plate)
//       .single();

//     if (error) {
//       if (error.code === 'PGRST116') {
//         return res.status(404).json({ success: false, message: 'Car not found' });
//       }
//       throw error;
//     }

//     res.json({ success: true, car });
//   } catch (error) {
//     console.error('Error fetching car:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // @desc    Create a new car and link to a client
// // @route   POST /api/cars
// exports.createCar = async (req, res) => {
//   try {
//     const {
//       model,
//       make,
//       licence_plate,
//       milage,
//       balance,
//       client_email // Email provided by the frontend
//     } = req.body;

//     // Validate required fields
//     if (!model || !make || !licence_plate || !client_email) {
//       return res.status(400).json({ success: false, message: 'Missing required fields: model, make, licence_plate, client_email' });
//     }

//     // Find the client's ID and email based on the provided email
//     const client = await getClientIdAndEmail(client_email);
//     if (!client) {
//       return res.status(404).json({ success: false, message: 'Client not found with the provided email' });
//     }

//     const { data: newCar, error } = await supabase
//       .from('cars')
//       .insert({
//         model,
//         make,
//         licence_plate,
//         milage,
//         balance,
//         client_id: client.id,
//         client_email: client.email
//       })
//       .select('*')
//       .single();

//     if (error) throw error;

//     res.status(201).json({ success: true, message: 'Car created and linked successfully', car: newCar });
//   } catch (error) {
//     console.error('Error creating car:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // @desc    Update a car by licence plate
// // @route   PUT /api/cars/:licence_plate
// exports.updateCarByLicencePlate = async (req, res) => {
//   try {
//     const { licence_plate } = req.params;
//     const updateData = req.body;

//     // Prevent updating unique identifiers or foreign keys directly
//     if (updateData.licence_plate || updateData.client_id || updateData.client_email) {
//       return res.status(400).json({ success: false, message: 'Cannot update licence_plate, client_id, or client_email directly' });
//     }

//     const { data: updatedCar, error } = await supabase
//       .from('cars')
//       .update(updateData)
//       .eq('licence_plate', licence_plate)
//       .select('*')
//       .single();

//     if (error) {
//       if (error.code === 'PGRST116') {
//         return res.status(404).json({ success: false, message: 'Car not found' });
//       }
//       throw error;
//     }

//     res.json({ success: true, message: 'Car updated successfully', car: updatedCar });
//   } catch (error) {
//     console.error('Error updating car:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // @desc    Delete a car by licence plate
// // @route   DELETE /api/cars/:licence_plate
// exports.deleteCarByLicencePlate = async (req, res) => {
//   try {
//     const { licence_plate } = req.params;

//     const { data: deletedCar, error } = await supabase
//       .from('cars')
//       .delete()
//       .eq('licence_plate', licence_plate)
//       .select('licence_plate')
//       .single();

//     if (error) throw error;

//     if (!deletedCar) {
//       return res.status(404).json({ success: false, message: 'Car not found' });
//     }

//     res.json({ success: true, message: 'Car deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting car:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
// // controllers/carController.js
// exports.togglePaidStatus = async (req, res) => {
//   try {
//     const { licence_plate } = req.params;
//     // Your logic to toggle paid status
//     res.status(200).json({ message: `Paid status toggled for ${licence_plate}` });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// exports.toggleWorkingStatus = async (req, res) => {
//   try {
//     const { licence_plate } = req.params;
//     // Your logic to toggle working status
//     res.status(200).json({ message: `Working status toggled for ${licence_plate}` });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const supabase = require('../db');

// @desc    Get all cars
// @route   GET /api/cars
exports.getAllCars = async (req, res) => {
  try {
    const { data: cars, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: cars });
  } catch (error) {
    console.error('Error fetching all cars:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get car by licence plate
// @route   GET /api/cars/:licence_plate
exports.getCarByLicencePlate = async (req, res) => {
  try {
    const { licence_plate } = req.params;

    const { data: car, error } = await supabase
      .from('cars')
      .select('*')
      .eq('licence_plate', licence_plate)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Car not found' });
      }
      throw error;
    }

    res.json({ success: true, data: car });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Update car by licence plate
// @route   PUT /api/cars/:licence_plate
exports.updateCarByLicencePlate = async (req, res) => {
  try {
    const { licence_plate } = req.params;
    const updateData = req.body;

    // Prevent updating unique identifiers or foreign keys directly
    if (updateData.licence_plate || updateData.client_id || updateData.client_email) {
      return res.status(400).json({ success: false, message: 'Cannot update licence_plate, client_id, or client_email directly' });
    }

    const { data: updatedCar, error } = await supabase
      .from('cars')
      .update(updateData)
      .eq('licence_plate', licence_plate)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Car not found' });
      }
      throw error;
    }

    res.json({ success: true, data: updatedCar, message: 'Car updated successfully' });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Delete car by licence plate
// @route   DELETE /api/cars/:licence_plate
exports.deleteCarByLicencePlate = async (req, res) => {
  try {
    const { licence_plate } = req.params;

    const { data: deletedCar, error } = await supabase
      .from('cars')
      .delete()
      .eq('licence_plate', licence_plate)
      .select('licence_plate')
      .single();

    if (error) throw error;

    if (!deletedCar) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    res.json({ success: true, message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
// @desc    Create a new car
// @route   POST /api/cars/create
exports.createCar = async (req, res) => {
  try {
    const {
      licence_plate,
      make,
      model,
      client_email
    } = req.body;

    if (!licence_plate || !make || !model || !client_email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required car information (licence_plate, make, model, client_email)'
      });
    }

    // Check if the car with this licence plate already exists
    const {
      data: existingCar,
      error: existingCarError
    } = await supabase
      .from('cars')
      .select('licence_plate')
      .eq('licence_plate', licence_plate)
      .single();

    if (existingCar) {
      return res.status(409).json({
        success: false,
        message: 'Car with this licence plate already exists.'
      });
    }

    // Get client id from email to associate the car
    const {
      data: client,
      error: clientError
    } = await supabase
      .from('clients')
      .select('id')
      .eq('email', client_email)
      .single();

    if (clientError || !client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found. Please register the client first.'
      });
    }

    const client_id = client.id;

    // Insert the new car into the database
    const {
      data: newCar,
      error
    } = await supabase
      .from('cars')
      .insert([{
        licence_plate,
        make,
        model,
        client_id
      }])
      .select('*')
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: newCar,
      message: 'Car created and assigned successfully.'
    });

  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};
// @desc    Toggle paid status for a car
// @route   PATCH /api/cars/:licence_plate/paid
exports.togglePaidStatus = async (req, res) => {
  try {
    const { licence_plate } = req.params;

    // Fetch current paid status
    const { data: car, error: fetchError } = await supabase
      .from('cars')
      .select('is_paid')
      .eq('licence_plate', licence_plate)
      .single();

    if (fetchError || !car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Update with the toggled value
    const { data, error: updateError } = await supabase
      .from('cars')
      .update({ is_paid: !car.is_paid })
      .eq('licence_plate', licence_plate)
      .select('*')
      .single();

    if (updateError) throw updateError;

    res.status(200).json({ success: true, data, message: `Paid status toggled to ${data.is_paid}` });
  } catch (err) {
    console.error('Error toggling paid status:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Toggle working status for a car
// @route   PATCH /api/cars/:licence_plate/working
exports.toggleWorkingStatus = async (req, res) => {
  try {
    const { licence_plate } = req.params;

    // Fetch current working status
    const { data: car, error: fetchError } = await supabase
      .from('cars')
      .select('is_working')
      .eq('licence_plate', licence_plate)
      .single();

    if (fetchError || !car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Update with the toggled value
    const { data, error: updateError } = await supabase
      .from('cars')
      .update({ is_working: !car.is_working })
      .eq('licence_plate', licence_plate)
      .select('*')
      .single();

    if (updateError) throw updateError;

    res.status(200).json({ success: true, data, message: `Working status toggled to ${data.is_working}` });
  } catch (err) {
    console.error('Error toggling working status:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};