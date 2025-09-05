const pool = require('./db');

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');

    // Test basic connection
    const result = await pool.query('SELECT NOW() as current_time, version() as postgres_version');
    console.log('✅ Database connected successfully!');
    console.log('🕒 Current time:', result.rows[0].current_time);
    console.log('🐘 PostgreSQL version:', result.rows[0].postgres_version);

    // Test if our tables exist
    const tablesResult = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('📊 Existing tables:', tablesResult.rows.map(row => row.table_name));

    // If no tables exist, suggest running init-db
    if (tablesResult.rows.length === 0) {
      console.log('⚠️  No tables found. Run "npm run init-db" to create database schema.');
    }

  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);

    if (error.message.includes('authentication failed')) {
      console.log('💡 Tip: Check your DATABASE_URL credentials in .env file');
    } else if (error.message.includes('does not exist')) {
      console.log('💡 Tip: Make sure your database exists in Neon');
    } else if (error.message.includes('connect')) {
      console.log('💡 Tip: Check your internet connection and DATABASE_URL format');
    }
  } finally {
    await pool.end();
    console.log('🔌 Database connection closed');
  }
}

// Run if called directly
if (require.main === module) {
  testConnection();
}

module.exports = testConnection;