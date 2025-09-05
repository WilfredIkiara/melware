# Tristar Garage API Documentation

## Overview
This API provides backend services for the Tristar Garage management system, built with Express.js and featuring a complete REST API for cars, clients, employees, and administrative functions.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Server
```bash
# Start the backend server only
npm run server

# Start both backend and frontend (recommended)
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Cars Management
```
GET    /api/cars              # Get all cars
GET    /api/cars/:id          # Get car by ID
POST   /api/cars              # Create new car
PUT    /api/cars/:id          # Update car
PATCH  /api/cars/:id/paid     # Toggle payment status
PATCH  /api/cars/:id/working  # Toggle working status
DELETE /api/cars/:id          # Delete car
```

### Clients Management
```
GET    /api/clients           # Get all clients
GET    /api/clients/:id       # Get client by ID
POST   /api/clients           # Create new client
PUT    /api/clients/:id       # Update client
DELETE /api/clients/:id       # Delete client
```

### Employees Management
```
GET    /api/employees         # Get all employees
GET    /api/employees/:id     # Get employee by ID
POST   /api/employees         # Create new employee
PUT    /api/employees/:id     # Update employee
DELETE /api/employees/:id     # Delete employee
```

### Reports & Analytics
```
GET /api/reports/dashboard    # Get dashboard statistics
GET /api/reports/cars         # Get cars report
GET /api/reports/clients      # Get clients report
```

### SMS Services
```
POST /api/sms/send            # Send SMS
GET  /api/sms/history         # Get SMS history
```

### Admin Functions
```
GET  /api/admin/settings      # Get admin settings
PUT  /api/admin/settings      # Update admin settings
GET  /api/admin/users         # Get all users
POST /api/admin/users         # Create new user
PUT  /api/admin/users/:id     # Update user
DELETE /api/admin/users/:id   # Delete user
```

## Data Models

### Car
```json
{
  "id": "string",
  "model": "string",
  "owner": "string",
  "bookedAt": "YYYY-MM-DD",
  "work": "string",
  "paid": boolean,
  "working": boolean,
  "image": "string"
}
```

### Client
```json
{
  "id": "string",
  "name": "string",
  "phone": "string",
  "email": "string",
  "pending": boolean,
  "pendingAmount": number,
  "cars": ["string"],
  "avatar": "string",
  "createdAt": "ISO string"
}
```

### Employee
```json
{
  "id": "string",
  "name": "string",
  "phone": "string",
  "revenue": number,
  "attendance": {
    "present": number,
    "missed": number
  }
}
```

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses include:
```json
{
  "message": "Error description"
}
```

## Sample Usage

### Login
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@tristar.com',
    password: 'password'
  })
});
```

### Get All Cars
```javascript
const response = await fetch('/api/cars', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
});
```

## Development

The server uses in-memory data storage for development. In production, replace with a proper database (MongoDB, PostgreSQL, etc.).

## Features

- ✅ Complete CRUD operations for all entities
- ✅ Authentication system
- ✅ Error handling and validation
- ✅ CORS enabled
- ✅ RESTful API design
- ✅ Mock data for development
- ✅ SMS integration ready
- ✅ Admin panel support

## Next Steps

1. Replace in-memory storage with a database
2. Add input validation
3. Implement rate limiting
4. Add logging
5. Set up environment variables
6. Add unit tests

---

**Tristar Garage Management System**
Built with Express.js and integrated with React Native frontend