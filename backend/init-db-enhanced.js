const pool = require("./db");
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createTables() {
  try {
    console.log("🔄 Creating database tables...");

    // Users table for authentication (enhanced with roles)
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

    // Cars table (existing, keeping for compatibility)
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

    // Garage table (NEW)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS garage (
        id SERIAL PRIMARY KEY,
        car_id INTEGER REFERENCES cars(id) ON DELETE CASCADE,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
        assigned_employee INTEGER REFERENCES employees(id) ON DELETE SET NULL,
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Clients table (existing, keeping for compatibility)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        email VARCHAR(150),
        pending BOOLEAN DEFAULT FALSE,
        pending_amount DECIMAL(10,2) DEFAULT 0,
        cars TEXT[],
        avatar VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Employees table (existing, keeping for compatibility)
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

    // Inventory Management (NEW)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        item_name VARCHAR(100) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        batch_no VARCHAR(50),
        expiry_date DATE,
        unit_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Sales Management (NEW)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sales (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
        item_id INTEGER REFERENCES inventory(id) ON DELETE SET NULL,
        quantity INTEGER NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        sale_date TIMESTAMP DEFAULT NOW()
      );
    `);

    // Cash Flow Tracking (NEW)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cashflow (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20) NOT NULL CHECK (type IN ('inflow', 'outflow')),
        amount DECIMAL(10,2) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // SMS History table (existing, keeping for compatibility)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sms_history (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'sent',
        sent_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Admin Settings table (existing, keeping for compatibility)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
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

    // Seed default users
    await seedDefaultUsers();

    // Seed example data
    await seedExampleData();

    // Create indexes for better performance
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_cars_paid ON cars(paid);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_cars_working ON cars(working);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_clients_pending ON clients(pending);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_inventory_item_name ON inventory(item_name);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_sales_customer_id ON sales(customer_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_cashflow_type ON cashflow(type);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_garage_car_id ON garage(car_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_garage_status ON garage(status);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_garage_assigned_employee ON garage(assigned_employee);`);

    console.log("✅ All tables created successfully!");
    console.log("👥 Default users seeded!");
    console.log("📊 Database schema ready for Tristar Garage");

  } catch (err) {
    console.error("❌ Error creating tables:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

async function seedDefaultUsers() {
  try {
    const defaultUsers = [
      {
        username: process.env.SUPERADMIN_USERNAME,
        password: process.env.SUPERADMIN_PASSWORD,
        role: 'superadmin'
      },
      {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
      },
      {
        username: process.env.OPERATOR_USERNAME,
        password: process.env.OPERATOR_PASSWORD,
        role: 'operator'
      }
    ];

    for (const user of defaultUsers) {
      if (!user.username || !user.password) {
        console.warn(`⚠️  Skipping user ${user.role} - missing credentials in .env`);
        continue;
      }

      // Check if user already exists
      const existingUser = await pool.query('SELECT id FROM users WHERE name = $1', [user.username]);

      if (existingUser.rows.length === 0) {
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        // Create user
        await pool.query(
          'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
          [user.username, `${user.username.toLowerCase()}@tristar.com`, hashedPassword, user.role]
        );

        console.log(`✅ Created ${user.role} user: ${user.username}`);
      } else {
        console.log(`ℹ️  ${user.role} user already exists: ${user.username}`);
      }
    }
  } catch (error) {
    console.error('❌ Error seeding default users:', error);
  }
}

async function seedExampleData() {
  try {
    console.log("🌱 Seeding example data...");

    // Seed clients
    const clients = [
      { name: 'John Doe', phone: '+1234567890', email: 'john@example.com', pending: false, pending_amount: 0, cars: ['Toyota Camry'], avatar: null },
      { name: 'Jane Smith', phone: '+1234567891', email: 'jane@example.com', pending: true, pending_amount: 500, cars: ['Honda Civic'], avatar: null },
      { name: 'Bob Johnson', phone: '+1234567892', email: 'bob@example.com', pending: false, pending_amount: 0, cars: ['Ford Focus'], avatar: null }
    ];

    for (const client of clients) {
      await pool.query(
        'INSERT INTO clients (name, phone, email, pending, pending_amount, cars) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
        [client.name, client.phone, client.email, client.pending, client.pending_amount, client.cars]
      );
    }

    // Seed employees
    const employees = [
      { name: 'Mike Mechanic', phone: '+1234567893', revenue: 15000, present_days: 20, missed_days: 2 },
      { name: 'Sarah Technician', phone: '+1234567894', revenue: 12000, present_days: 18, missed_days: 1 },
      { name: 'Tom Assistant', phone: '+1234567895', revenue: 8000, present_days: 22, missed_days: 0 }
    ];

    for (const emp of employees) {
      await pool.query(
        'INSERT INTO employees (name, phone, revenue, present_days, missed_days) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        [emp.name, emp.phone, emp.revenue, emp.present_days, emp.missed_days]
      );
    }

    // Seed cars
    const cars = [
      { model: 'Toyota Camry 2020', owner: 'John Doe', booked_at: '2024-09-01', work: 'Oil change and brake inspection', paid: true, working: false, image: null },
      { model: 'Honda Civic 2019', owner: 'Jane Smith', booked_at: '2024-09-02', work: 'Engine tune-up', paid: false, working: true, image: null },
      { model: 'Ford Focus 2018', owner: 'Bob Johnson', booked_at: '2024-09-03', work: 'Tire replacement', paid: true, working: false, image: null },
      { model: 'Nissan Altima 2021', owner: 'Alice Brown', booked_at: '2024-09-04', work: 'Transmission repair', paid: false, working: true, image: null }
    ];

    const carIds = [];
    for (const car of cars) {
      const result = await pool.query(
        'INSERT INTO cars (model, owner, booked_at, work, paid, working) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [car.model, car.owner, car.booked_at, car.work, car.paid, car.working]
      );
      carIds.push(result.rows[0].id);
    }

    // Seed garage entries
    const garageEntries = [
      { car_id: carIds[0], status: 'completed', assigned_employee: 1, start_date: '2024-09-01 09:00:00', end_date: '2024-09-01 12:00:00', notes: 'Completed successfully' },
      { car_id: carIds[1], status: 'in_progress', assigned_employee: 2, start_date: '2024-09-02 10:00:00', end_date: null, notes: 'In progress' },
      { car_id: carIds[2], status: 'pending', assigned_employee: 3, start_date: null, end_date: null, notes: 'Waiting for parts' },
      { car_id: carIds[3], status: 'in_progress', assigned_employee: 1, start_date: '2024-09-04 08:00:00', end_date: null, notes: 'Major repair ongoing' }
    ];

    for (const entry of garageEntries) {
      await pool.query(
        'INSERT INTO garage (car_id, status, assigned_employee, start_date, end_date, notes) VALUES ($1, $2, $3, $4, $5, $6)',
        [entry.car_id, entry.status, entry.assigned_employee, entry.start_date, entry.end_date, entry.notes]
      );
    }

    // Seed inventory
    const inventory = [
      { item_name: 'Engine Oil', quantity: 50, batch_no: 'EO001', expiry_date: '2025-12-31', unit_price: 25.00 },
      { item_name: 'Brake Pads', quantity: 30, batch_no: 'BP001', expiry_date: null, unit_price: 45.00 },
      { item_name: 'Spark Plugs', quantity: 100, batch_no: 'SP001', expiry_date: '2026-06-30', unit_price: 8.50 }
    ];

    for (const item of inventory) {
      await pool.query(
        'INSERT INTO inventory (item_name, quantity, batch_no, expiry_date, unit_price) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
        [item.item_name, item.quantity, item.batch_no, item.expiry_date, item.unit_price]
      );
    }

    // Seed sales
    const sales = [
      { customer_id: 1, item_id: 1, quantity: 2, total_price: 50.00, sale_date: '2024-09-01 14:00:00' },
      { customer_id: 2, item_id: 2, quantity: 1, total_price: 45.00, sale_date: '2024-09-02 15:00:00' }
    ];

    for (const sale of sales) {
      await pool.query(
        'INSERT INTO sales (customer_id, item_id, quantity, total_price, sale_date) VALUES ($1, $2, $3, $4, $5)',
        [sale.customer_id, sale.item_id, sale.quantity, sale.total_price, sale.sale_date]
      );
    }

    // Seed cashflow
    const cashflows = [
      { type: 'inflow', amount: 1000.00, description: 'Service payment from John Doe' },
      { type: 'outflow', amount: 200.00, description: 'Parts purchase' },
      { type: 'inflow', amount: 500.00, description: 'Sale of brake pads' }
    ];

    for (const cf of cashflows) {
      await pool.query(
        'INSERT INTO cashflow (type, amount, description) VALUES ($1, $2, $3)',
        [cf.type, cf.amount, cf.description]
      );
    }

    console.log("✅ Example data seeded successfully!");
  } catch (error) {
    console.error('❌ Error seeding example data:', error);
  }
}

// Run if called directly
if (require.main === module) {
  createTables();
}

module.exports = createTables;