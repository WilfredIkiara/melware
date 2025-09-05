# Tristar Backend API - PostgreSQL Integration

This is the backend API server for the Tristar Garage management system with full PostgreSQL database integration.

## 🏗️ Project Structure

```
backend/
├── server.js          # Main Express server with PostgreSQL
├── db.js             # Database connection configuration
├── init-db.js        # Database initialization script
├── api.ts            # Frontend API client (axios)
├── package.json      # Backend dependencies
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
└── README.md         # This documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (we recommend [Neon](https://neon.tech) for cloud hosting)

### Installation
```bash
cd backend
npm install
```

### Database Setup

1. **Create a Neon PostgreSQL database:**
   - Go to [neon.tech](https://neon.tech) and create a free account
   - Create a new project
   - Copy the connection string

2. **Configure environment variables:**
   Edit the `.env` file:
   ```env
   DATABASE_URL=postgresql://username:password@ep-cool-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=tristar-garage-jwt-secret-key-2024-change-this-in-production
   PORT=3001
   NODE_ENV=development
   ```

3. **Initialize the database:**
   ```bash
   npm run init-db
   ```

### Running the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will run on `http://localhost:3001`

## 🗄️ Database Schema

The system creates the following tables:

### Users (Authentication)
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Cars
```sql
CREATE TABLE cars (
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
```

### Clients
```sql
CREATE TABLE clients (
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
```

### Employees
```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  revenue DECIMAL(10,2) DEFAULT 0,
  present_days INTEGER DEFAULT 0,
  missed_days INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### SMS History
```sql
CREATE TABLE sms_history (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW()
);
```

### Admin Settings
```sql
CREATE TABLE admin_settings (
  id SERIAL PRIMARY KEY,
  branch_name VARCHAR(100) DEFAULT 'Main Branch',
  working_hours VARCHAR(100) DEFAULT '8:00 AM - 6:00 PM',
  contact_number VARCHAR(20),
  email VARCHAR(150),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

### Register a new user
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Use authenticated endpoints
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3001/api/cars
```

## 📡 API Endpoints

### Cars Management
- `GET /api/cars` - Get all cars
- `POST /api/cars` - Create new car
- `GET /api/cars/:id` - Get car by ID
- `PUT /api/cars/:id` - Update car
- `PATCH /api/cars/:id/paid` - Toggle payment status
- `PATCH /api/cars/:id/working` - Toggle working status
- `DELETE /api/cars/:id` - Delete car

### Clients Management
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/:id` - Get client by ID
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Employees Management
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Reports & Analytics
- `GET /api/reports/dashboard` - Get dashboard statistics
- `GET /api/reports/cars` - Get cars report
- `GET /api/reports/clients` - Get clients report

### SMS Integration
- `POST /api/sms/send` - Send SMS
- `GET /api/sms/history` - Get SMS history

### Admin Functions
- `GET /api/admin/settings` - Get admin settings
- `PUT /api/admin/settings` - Update admin settings
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## 🧪 Testing

### Test the API with sample data:

```bash
# Create a test car
curl -X POST http://localhost:3001/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Toyota Camry",
    "owner": "John Doe",
    "booked_at": "2024-01-15",
    "work": "Oil change and tire rotation",
    "paid": false,
    "working": true
  }'

# Get all cars
curl http://localhost:3001/api/cars

# Get dashboard stats
curl http://localhost:3001/api/reports/dashboard
```

## 🔧 Development

### Adding New Features

1. **Database Changes:**
   - Update `init-db.js` to create new tables
   - Run `npm run init-db` to apply changes

2. **New API Endpoints:**
   - Add routes in `server.js`
   - Update the API client in `api.ts`
   - Test with Postman or curl

3. **Authentication:**
   - Use `bcrypt` for password hashing
   - Use `jsonwebtoken` for JWT tokens
   - Validate tokens in protected routes

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment mode | development |

## 🚀 Deployment

### Railway (Recommended)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Create app
heroku create tristar-backend

# Set environment variables
heroku config:set DATABASE_URL=your-postgres-url
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku main
```

### Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **SQL Injection Protection** - Parameterized queries
- **CORS Configuration** - Controlled cross-origin access
- **Input Validation** - Request data validation
- **Error Handling** - Secure error responses

## 📊 Performance

- **Connection Pooling** - Efficient database connections
- **Indexes** - Optimized database queries
- **Caching Ready** - Prepared for Redis integration
- **Compression** - Response compression
- **Rate Limiting** - Ready for implementation

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
node -e "require('./db').query('SELECT NOW()').then(console.log)"
```

### Common Errors
- **"relation does not exist"** - Run `npm run init-db`
- **"JWT malformed"** - Check JWT_SECRET in .env
- **"connect ECONNREFUSED"** - Verify DATABASE_URL

## 📝 API Documentation

Complete API documentation is available in `README-API.md` with:
- Detailed endpoint descriptions
- Request/response examples
- Error codes and handling
- Authentication requirements

---

**Tristar Garage Management System**
PostgreSQL Backend API with Authentication