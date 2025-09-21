// const supabase = require('../db');

// // @desc    Get all inventory items
// // @route   GET /api/inventory
// exports.getAllInventoryItems = async (req, res) => {
//   try {
//     const { data: inventory, error } = await supabase
//       .from('garage_inventory')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, inventory });
//   } catch (error) {
//     console.error('Error fetching inventory items:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // @desc    Get a single inventory item by item code
// // @route   GET /api/inventory/:item_code
// exports.getInventoryItemByCode = async (req, res) => {
//   try {
//     const { item_code } = req.params;

//     const { data: item, error } = await supabase
//       .from('garage_inventory')
//       .select('*')
//       .eq('item_code', item_code)
//       .single();

//     if (error) {
//       if (error.code === 'PGRST116') {
//         return res.status(404).json({ success: false, message: 'Item not found' });
//       }
//       throw error;
//     }

//     res.json({ success: true, item });
//   } catch (error) {
//     console.error('Error fetching inventory item:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // @desc    Create a new inventory item
// // @route   POST /api/inventory
// exports.createInventoryItem = async (req, res) => {
//   try {
//     const {
//       item_code,
//       item_name,
//       category,
//       description,
//       quantity_in,
//       purchase_price,
//       selling_price,
//       supplier_name,
//       status,
//       mechanic_notes
//     } = req.body;

//     // Validate required fields
//     if (!item_code || !item_name) {
//       return res.status(400).json({ success: false, message: 'Missing required fields: item_code and item_name' });
//     }

//     const { data: newItem, error } = await supabase
//       .from('garage_inventory')
//       .insert({
//         item_code,
//         item_name,
//         category,
//         description,
//         quantity_in,
//         purchase_price,
//         selling_price,
//         supplier_name,
//         status,
//         mechanic_notes
//       })
//       .select('*')
//       .single();

//     if (error) throw error;

//     res.status(201).json({ success: true, message: 'Inventory item created successfully', item: newItem });
//   } catch (error) {
//     console.error('Error creating inventory item:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // @desc    Update an inventory item by item code
// // @route   PUT /api/inventory/:item_code
// exports.updateInventoryItemByCode = async (req, res) => {
//   try {
//     const { item_code } = req.params;
//     const updateData = req.body;

//     // Prevent updating the unique item_code directly
//     if (updateData.item_code) {
//       return res.status(400).json({ success: false, message: 'Cannot update item_code directly' });
//     }

//     const { data: updatedItem, error } = await supabase
//       .from('garage_inventory')
//       .update(updateData)
//       .eq('item_code', item_code)
//       .select('*')
//       .single();

//     if (error) {
//       if (error.code === 'PGRST116') {
//         return res.status(404).json({ success: false, message: 'Item not found' });
//       }
//       throw error;
//     }

//     res.json({ success: true, message: 'Inventory item updated successfully', item: updatedItem });
//   } catch (error) {
//     console.error('Error updating inventory item:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // @desc    Delete an inventory item by item code
// // @route   DELETE /api/inventory/:item_code
// exports.deleteInventoryItemByCode = async (req, res) => {
//   try {
//     const { item_code } = req.params;

//     const { data: deletedItem, error } = await supabase
//       .from('garage_inventory')
//       .delete()
//       .eq('item_code', item_code)
//       .select('item_code')
//       .single();

//     if (error) throw error;

//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: 'Item not found' });
//     }

//     res.json({ success: true, message: 'Inventory item deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting inventory item:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
const supabase = require('../db');

// @desc    Get all garage inventory items
// @route   GET /api/garage
exports.getAllInventoryItems = async (req, res) => {
  try {
    const { data: inventory, error } = await supabase
      .from('garage_inventory')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: inventory });
  } catch (error) {
    console.error('Error fetching all garage inventory items:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Get a single garage inventory item by item code
// @route   GET /api/garage/:item_code
exports.getInventoryItemByCode = async (req, res) => {
  try {
    const { item_code } = req.params;

    const { data: item, error } = await supabase
      .from('garage_inventory')
      .select('*')
      .eq('item_code', item_code)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      throw error;
    }

    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching garage inventory item:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Create a new garage inventory item
// @route   POST /api/garage
exports.createInventoryItem = async (req, res) => {
  try {
    const newItem = req.body;

    const { data: createdItem, error } = await supabase
      .from('garage_inventory')
      .insert([newItem])
      .select('*')
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Inventory item created successfully', data: createdItem });
  } catch (error) {
    console.error('Error creating garage inventory item:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Update a garage inventory item by item code
// @route   PUT /api/garage/:item_code
exports.updateInventoryItemByCode = async (req, res) => {
  try {
    const { item_code } = req.params;
    const updateData = req.body;

    if (updateData.item_code) {
      return res.status(400).json({ success: false, message: 'Cannot update item_code directly' });
    }

    const { data: updatedItem, error } = await supabase
      .from('garage_inventory')
      .update(updateData)
      .eq('item_code', item_code)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      throw error;
    }

    res.json({ success: true, data: updatedItem, message: 'Inventory item updated successfully' });
  } catch (error) {
    console.error('Error updating garage inventory item:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// @desc    Delete a garage inventory item by item code
// @route   DELETE /api/garage/:item_code
exports.deleteInventoryItemByCode = async (req, res) => {
  try {
    const { item_code } = req.params;

    const { data: deletedItem, error } = await supabase
      .from('garage_inventory')
      .delete()
      .eq('item_code', item_code)
      .select('item_code')
      .single();

    if (error) throw error;

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.json({ success: true, message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting garage inventory item:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};