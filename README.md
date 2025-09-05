# Tristar Garage Management System

A comprehensive full-stack garage management application built with React Native (Expo) and Express.js.

## 🏗️ Project Structure

```
TRISTAR-APP/
├── app/                    # React Native app (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout
│   ├── login.tsx          # Authentication screen
│   └── register.tsx       # Registration screen
├── backend/               # Backend API server
│   ├── server.js          # Express server
│   ├── api.ts            # API client (axios)
│   ├── package.json      # Backend dependencies
│   ├── README.md         # Backend documentation
│   └── README-API.md     # API documentation
├── components/            # Reusable React components
├── lib/                  # Utilities and shared code
├── assets/               # Images and static assets
├── constants/            # App constants
└── package.json          # Main project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd TRISTAR-APP
npm install
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

### Running the Application

#### Development Mode (Recommended)
```bash
# Start both backend and frontend simultaneously
npm run dev
```

#### Manual Start
```bash
# Terminal 1: Start backend server
npm run server

# Terminal 2: Start React Native app
npm start
```

## 📱 Features

### Frontend (React Native)
- ✅ **Amazing Loading Screen** - Animated car icon with heartbeat effect
- ✅ **Tab Navigation** - Organized bottom tabs with dropdown for additional options
- ✅ **Authentication** - Login/register with JWT tokens
- ✅ **Car Management** - Add, edit, view cars with status tracking
- ✅ **Client Management** - Customer database with contact info
- ✅ **Employee Management** - Staff tracking with attendance
- ✅ **Reports & Analytics** - Dashboard with key metrics
- ✅ **SMS Integration** - Send reminders and notifications
- ✅ **Admin Panel** - User management and settings
- ✅ **Dark/Light Theme** - Theme switching support

### Backend (Express.js)
- ✅ **RESTful API** - Complete CRUD operations
- ✅ **Authentication** - JWT-based security
- ✅ **Data Management** - Cars, clients, employees, reports
- ✅ **SMS Ready** - Integration points for SMS services
- ✅ **Admin Functions** - User management and settings
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **CORS Support** - Cross-origin requests enabled

## 🔧 API Integration

The app uses axios for seamless API communication:

```javascript
import { apiService } from './backend/api'

// Get all cars
const cars = await apiService.cars.getAll()

// Add new car
await apiService.cars.create(carData)

// Update car
await apiService.cars.update(id, carData)
```

## 📊 Key Technologies

- **Frontend:** React Native, Expo, TypeScript
- **Backend:** Express.js, Node.js
- **Navigation:** Expo Router
- **Styling:** NativeWind (Tailwind CSS)
- **HTTP Client:** Axios
- **Icons:** @expo/vector-icons
- **Database:** In-memory (ready for MongoDB/PostgreSQL)

## 🎨 UI/UX Highlights

- **Loading Screen:** Animated car with heartbeat effect
- **Navigation:** Clean tabs with organized dropdown
- **Icons:** Consistent Ionicons throughout
- **Themes:** Dark/light mode support
- **Animations:** Smooth transitions and effects
- **Responsive:** Optimized for mobile devices

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Mobile App
```bash
# Build for production
expo build:android
expo build:ios
```

## 📝 Development

### Adding New Features
1. **Backend:** Add routes in `backend/server.js`
2. **Frontend:** Create components in `app/` or `components/`
3. **API:** Update `backend/api.ts` for new endpoints
4. **Navigation:** Add screens to `app/(tabs)/` for tab navigation

### Project Conventions
- **Components:** PascalCase naming
- **Files:** kebab-case for pages, camelCase for components
- **API:** RESTful endpoints with consistent naming
- **State:** Local state with API synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For questions or issues:
- Check the API documentation in `backend/README-API.md`
- Review the backend setup in `backend/README.md`
- Test with the development scripts

---

**Tristar Garage** - Professional automotive management made simple 🚗✨
