const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const { authenticateToken } = require('./middleware/authMiddleware');
const { requireReadAccess, requireWriteAccess, requireAdmin, requireSuperAdmin } = require('./middleware/roleMiddleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const inventoryRoutes = require('./routes/inventory');
const salesRoutes = require('./routes/sales');
const cashflowRoutes = require('./routes/cashflow');
const garageRoutes = require('./routes/garage');

// Initialize database tables on startup
const createTables = require('./init-db-enhanced');
createTables().catch(console.error);

// Database connection is now handled by db.js

// Routes

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Find user by name (since the database uses 'name' column)
    const userQuery = await pool.query('SELECT * FROM users WHERE name = $1', [username]);

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = userQuery.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, 'user']
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.rows[0].id, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: newUser.rows[0]
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Use route modules
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/cashflow', cashflowRoutes);
app.use('/api/garage', garageRoutes);

// Cars routes (with authentication)
app.get('/api/cars', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/cars/:id', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/cars', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { model, owner, booked_at, work, paid = false, working = false, image } = req.body;

    if (!model || !owner || !work) {
      return res.status(400).json({ message: 'Model, owner, and work are required' });
    }

    const result = await pool.query(
      'INSERT INTO cars (model, owner, booked_at, work, paid, working, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [model, owner, booked_at, work, paid, working, image]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/cars/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { model, owner, booked_at, work, paid, working, image } = req.body;
    const id = req.params.id;

    const result = await pool.query(
      'UPDATE cars SET model = $1, owner = $2, booked_at = $3, work = $4, paid = $5, working = $6, image = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [model, owner, booked_at, work, paid, working, image, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch('/api/cars/:id/paid', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE cars SET paid = NOT paid, updated_at = NOW() WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating car payment status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch('/api/cars/:id/working', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE cars SET working = NOT working, updated_at = NOW() WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating car working status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/cars/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Clients routes
app.get('/api/clients', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/clients/:id', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/clients', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { name, phone, email, pending = false, pending_amount = 0, cars = [], avatar } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const result = await pool.query(
      'INSERT INTO clients (name, phone, email, pending, pending_amount, cars, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, phone, email, pending, pending_amount, cars, avatar]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/clients/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { name, phone, email, pending, pending_amount, cars, avatar } = req.body;
    const id = req.params.id;

    const result = await pool.query(
      'UPDATE clients SET name = $1, phone = $2, email = $3, pending = $4, pending_amount = $5, cars = $6, avatar = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [name, phone, email, pending, pending_amount, cars, avatar, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/clients/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Employees routes
app.get('/api/employees', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/employees/:id', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/employees', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { name, phone, role, salary = 0, revenue = 0, present_days = 0, missed_days = 0 } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const result = await pool.query(
      'INSERT INTO employees (name, phone, role, salary, revenue, present_days, missed_days) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, phone, role, salary, revenue, present_days, missed_days]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/employees/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { name, phone, role, salary, revenue, present_days, missed_days } = req.body;
    const id = req.params.id;

    const result = await pool.query(
      'UPDATE employees SET name = $1, phone = $2, role = $3, salary = $4, revenue = $5, present_days = $6, missed_days = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [name, phone, role, salary, revenue, present_days, missed_days, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/employees/:id', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reports routes
app.get('/api/reports/dashboard', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    // Get car statistics
    const carStats = await pool.query(`
      SELECT
        COUNT(*) as total_cars,
        COUNT(CASE WHEN working THEN 1 END) as working_cars,
        COUNT(CASE WHEN paid THEN 1 END) as paid_cars
      FROM cars
    `);

    // Get client statistics
    const clientStats = await pool.query(`
      SELECT
        COUNT(*) as total_clients,
        COUNT(CASE WHEN pending THEN 1 END) as pending_clients
      FROM clients
    `);

    // Get total revenue
    const revenueResult = await pool.query('SELECT COALESCE(SUM(revenue), 0) as total_revenue FROM employees');

    const stats = {
      totalCars: parseInt(carStats.rows[0].total_cars),
      workingCars: parseInt(carStats.rows[0].working_cars),
      paidCars: parseInt(carStats.rows[0].paid_cars),
      totalClients: parseInt(clientStats.rows[0].total_clients),
      pendingPayments: parseInt(clientStats.rows[0].pending_clients),
      totalRevenue: parseFloat(revenueResult.rows[0].total_revenue)
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/reports/cars', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching car reports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/reports/clients', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching client reports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// SMS routes
app.post('/api/sms/send', authenticateToken, requireWriteAccess, async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({ success: false, message: 'Phone and message are required' });
    }

    // Log SMS sending (in production, integrate with SMS service)
    console.log(`📱 Sending SMS to ${phone}: ${message}`);

    // Save to SMS history
    await pool.query(
      'INSERT INTO sms_history (phone, message) VALUES ($1, $2)',
      [phone, message]
    );

    res.json({ success: true, message: 'SMS sent successfully' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, message: 'Failed to send SMS' });
  }
});

app.get('/api/sms/history', authenticateToken, requireReadAccess, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sms_history ORDER BY sent_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching SMS history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin routes (require admin or superadmin)
app.get('/api/admin/settings', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admin_settings LIMIT 1');
    if (result.rows.length === 0) {
      return res.json({
        branchName: 'Main Branch',
        workingHours: '8:00 AM - 6:00 PM',
        contactNumber: '+1234567890',
        email: 'info@tristar.com'
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching admin settings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/admin/settings', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { branch_name, working_hours, contact_number, email } = req.body;

    await pool.query(
      'UPDATE admin_settings SET branch_name = $1, working_hours = $2, contact_number = $3, email = $4, updated_at = NOW()',
      [branch_name, working_hours, contact_number, email]
    );

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating admin settings:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

app.get('/api/admin/users', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, role, created_at FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/admin/users', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { username, password, role = 'operator' } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [username, hashedPassword, role]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
});

app.put('/api/admin/users/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const { username, role } = req.body;
    const id = req.params.id;

    await pool.query(
      'UPDATE users SET username = $1, role = $2, updated_at = NOW() WHERE id = $3',
      [username, role, id]
    );

    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
});

app.delete('/api/admin/users/:id', authenticateToken, requireSuperAdmin, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚗 Tristar Garage Backend Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🗄️  Database: PostgreSQL (Neon)`);

  // Test database connection
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await pool.end();
  console.log('✅ Database connection closed');
  process.exit(0);
});