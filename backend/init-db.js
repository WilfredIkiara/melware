const pool = require("./db");

async function createTables() {
  try {
    console.log("🔄 Creating database tables...");

    // Users table for authentication
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Cars table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        model VARCHAR(100) NOT NULL,
        owner VARCHAR(100) NOT NULL,
        booked_at DATE NOT NULL,
        work TEXT NOT NULL,
        paid BOOLEAN DEFAULT FALSE,
        working BOOLEAN DEFAULT FALSE,
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Clients table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(150),
        pending BOOLEAN DEFAULT FALSE,
        pending_amount DECIMAL(10,2) DEFAULT 0,
        cars TEXT[], -- Array of car models
        avatar VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Employees table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        revenue DECIMAL(10,2) DEFAULT 0,
        present_days INTEGER DEFAULT 0,
        missed_days INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // SMS History table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sms_history (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Admin Settings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS superadmin_settings (
        id SERIAL PRIMARY KEY,
        branch_name VARCHAR(100) DEFAULT 'Main Branch',
        working_hours VARCHAR(100) DEFAULT '8:00 AM - 6:00 PM',
        contact_number VARCHAR(20),
        email VARCHAR(150),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Insert default admin settings if not exists
    await pool.query(`
      INSERT INTO admin_settings (branch_name, working_hours, contact_number, email)
      VALUES ('Main Branch', '8:00 AM - 6:00 PM', '+1234567890', 'info@tristar.com')
      ON CONFLICT DO NOTHING;
    `);

    // Create indexes for better performance
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_cars_paid ON cars(paid);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_cars_working ON cars(working);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_clients_pending ON clients(pending);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);

    console.log("✅ All tables created successfully!");
    console.log("📊 Database schema ready for Tristar Garage");

  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  createTables();
}

module.exports = createTables;