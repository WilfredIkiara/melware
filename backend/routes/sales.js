const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /api/sales - Get all sales
router.get('/', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sales.*,
        clients.name as customer_name,
        inventory.item_name
      FROM sales
      LEFT JOIN clients ON clients.id = sales.customer_id
      LEFT JOIN inventory ON inventory.id = sales.item_id
      ORDER BY sales.sale_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/sales/:id - Get sale by ID
router.get('/:id', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sales.*,
        clients.name as customer_name,
        inventory.item_name
      FROM sales
      LEFT JOIN clients ON clients.id = sales.customer_id
      LEFT JOIN inventory ON inventory.id = sales.item_id
      WHERE sales.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching sale:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/sales - Create new sale
router.post('/', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { customer_id, item_id, quantity, total_price } = req.body;

    if (!item_id || !quantity || !total_price) {
      return res.status(400).json({ message: 'Item ID, quantity, and total price are required' });
    }

    // Check if item exists and has sufficient quantity
    const itemCheck = await pool.query('SELECT quantity, unit_price FROM inventory WHERE id = $1', [item_id]);
    if (itemCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found in inventory' });
    }

    if (itemCheck.rows[0].quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient inventory quantity' });
    }

    // Create sale
    const result = await pool.query(
      'INSERT INTO sales (customer_id, item_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [customer_id, item_id, quantity, total_price]
    );

    // Update inventory quantity
    await pool.query(
      'UPDATE inventory SET quantity = quantity - $1, updated_at = NOW() WHERE id = $2',
      [quantity, item_id]
    );

    // Add cash inflow
    await pool.query(
      'INSERT INTO cashflow (type, amount, description) VALUES ($1, $2, $3)',
      ['inflow', total_price, `Sale of ${quantity} items`]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/sales/stats - Get sales statistics
router.get('/stats/summary', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) as total_sales,
        COALESCE(SUM(total_price), 0) as total_revenue,
        COALESCE(AVG(total_price), 0) as average_sale,
        COUNT(DISTINCT customer_id) as unique_customers
      FROM sales
      WHERE sale_date >= CURRENT_DATE - INTERVAL '30 days'
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching sales stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;