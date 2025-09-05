const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/garageController');
const { authenticateToken, requireReadAccess, requireWriteAccess } = require('../middleware/authMiddleware');

// Get all inventory items
router.get('/', authenticateToken, requireReadAccess, inventoryController.getAllInventoryItems);

// Get a single inventory item by item_code
router.get('/:item_code', authenticateToken, requireReadAccess, inventoryController.getInventoryItemByCode);

// Create a new inventory item
router.post('/', authenticateToken, requireWriteAccess, inventoryController.createInventoryItem);

// Update an inventory item by item_code
router.put('/:item_code', authenticateToken, requireWriteAccess, inventoryController.updateInventoryItemByCode);

// Delete an inventory item by item_code
router.delete('/:item_code', authenticateToken, requireWriteAccess, inventoryController.deleteInventoryItemByCode);

module.exports = router;
