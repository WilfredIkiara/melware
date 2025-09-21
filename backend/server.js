const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const pagesRoutes = require('./routes/pages/dashboard');// Middleware
app.use(cors());
app.use(express.json());

// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/employees', require('./routes/staff'));
app.use('/api/garage', require('./routes/garage'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/sms', require('./routes/sms'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/operator', require('./routes/operator'));
app.use('/api/dashboard', pagesRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`🚗 Tristar Garage Backend Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🗄️ Database: Supabase`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  console.log('✅ Supabase client is ready for shutdown');
  process.exit(0);
});