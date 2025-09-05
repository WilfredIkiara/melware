const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /api/cashflow - Get all cash flow entries
router.get('/', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cashflow ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cashflow:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/cashflow/:id - Get cash flow entry by ID
router.get('/:id', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cashflow WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cash flow entry not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching cashflow entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/cashflow - Create new cash flow entry
router.post('/', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    if (!type || !amount) {
      return res.status(400).json({ message: 'Type and amount are required' });
    }

    if (!['inflow', 'outflow'].includes(type)) {
      return res.status(400).json({ message: 'Type must be either inflow or outflow' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }

    const result = await pool.query(
      'INSERT INTO cashflow (type, amount, description) VALUES ($1, $2, $3) RETURNING *',
      [type, amount, description || `${type} transaction`]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating cashflow entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/cashflow/stats/summary - Get cash flow statistics
router.get('/stats/summary', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COALESCE(SUM(CASE WHEN type = 'inflow' THEN amount END), 0) as total_inflow,
        COALESCE(SUM(CASE WHEN type = 'outflow' THEN amount END), 0) as total_outflow,
        COALESCE(SUM(CASE WHEN type = 'inflow' THEN amount END), 0) - COALESCE(SUM(CASE WHEN type = 'outflow' THEN amount END), 0) as net_cashflow,
        COUNT(CASE WHEN type = 'inflow' THEN 1 END) as inflow_count,
        COUNT(CASE WHEN type = 'outflow' THEN 1 END) as outflow_count
      FROM cashflow
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching cashflow stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/cashflow/stats/daily - Get daily cash flow for the last 30 days
router.get('/stats/daily', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        DATE(created_at) as date,
        COALESCE(SUM(CASE WHEN type = 'inflow' THEN amount END), 0) as inflow,
        COALESCE(SUM(CASE WHEN type = 'outflow' THEN amount END), 0) as outflow,
        COALESCE(SUM(CASE WHEN type = 'inflow' THEN amount END), 0) - COALESCE(SUM(CASE WHEN type = 'outflow' THEN amount END), 0) as net
      FROM cashflow
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching daily cashflow stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;