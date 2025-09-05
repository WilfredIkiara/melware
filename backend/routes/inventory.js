const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /api/inventory - Get all inventory items
router.get('/', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY item_name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/inventory/:id - Get inventory item by ID
router.get('/:id', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/inventory - Create new inventory item
router.post('/', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { item_name, quantity, batch_no, expiry_date, unit_price } = req.body;

    if (!item_name || !unit_price) {
      return res.status(400).json({ message: 'Item name and unit price are required' });
    }

    const result = await pool.query(
      'INSERT INTO inventory (item_name, quantity, batch_no, expiry_date, unit_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [item_name, quantity || 0, batch_no, expiry_date, unit_price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/inventory/:id - Update inventory item
router.put('/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { item_name, quantity, batch_no, expiry_date, unit_price } = req.body;
    const id = req.params.id;

    const result = await pool.query(
      'UPDATE inventory SET item_name = $1, quantity = $2, batch_no = $3, expiry_date = $4, unit_price = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [item_name, quantity, batch_no, expiry_date, unit_price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/inventory/:id - Delete inventory item
router.delete('/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM inventory WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;