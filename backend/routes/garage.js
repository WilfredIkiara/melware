const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess } = require('../middleware/roleMiddleware');

const router = express.Router();

// GET /api/garage - Get all garage entries with car details
router.get('/', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        g.*,
        c.model,
        c.owner,
        c.booked_at,
        c.work,
        c.paid,
        c.working,
        c.image as car_image,
        e.name as assigned_employee_name
      FROM garage g
      LEFT JOIN cars c ON g.car_id = c.id
      LEFT JOIN employees e ON g.assigned_employee = e.id
      ORDER BY g.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching garage entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/garage/:id - Get garage entry by ID with car details
router.get('/:id', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        g.*,
        c.model,
        c.owner,
        c.booked_at,
        c.work,
        c.paid,
        c.working,
        c.image as car_image,
        e.name as assigned_employee_name
      FROM garage g
      LEFT JOIN cars c ON g.car_id = c.id
      LEFT JOIN employees e ON g.assigned_employee = e.id
      WHERE g.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Garage entry not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching garage entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/garage - Create new garage entry
router.post('/', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { car_id, status = 'pending', assigned_employee, start_date, end_date, notes } = req.body;

    if (!car_id) {
      return res.status(400).json({ message: 'Car ID is required' });
    }

    const result = await pool.query(
      'INSERT INTO garage (car_id, status, assigned_employee, start_date, end_date, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [car_id, status, assigned_employee, start_date, end_date, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating garage entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/garage/:id - Update garage entry
router.put('/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { car_id, status, assigned_employee, start_date, end_date, notes } = req.body;
    const id = req.params.id;

    const result = await pool.query(
      'UPDATE garage SET car_id = $1, status = $2, assigned_employee = $3, start_date = $4, end_date = $5, notes = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [car_id, status, assigned_employee, start_date, end_date, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Garage entry not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating garage entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PATCH /api/garage/:id/status - Update garage entry status
router.patch('/:id/status', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be pending, in_progress, or completed' });
    }

    const result = await pool.query(
      'UPDATE garage SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Garage entry not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating garage entry status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/garage/:id - Delete garage entry
router.delete('/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM garage WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Garage entry not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting garage entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;