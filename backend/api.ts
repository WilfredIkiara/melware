import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API Base Configuration
const API_BASE_URL = 'http://localhost:3001/api'; // Change this to your backend URL

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      // Redirect to login if needed
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const apiService = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post('/auth/login', credentials),

    register: (userData: { email: string; password: string; name: string }) =>
      api.post('/auth/register', userData),

    logout: () => api.post('/auth/logout'),
  },

  // Cars
  cars: {
    getAll: () => api.get('/cars'),
    getById: (id: string) => api.get(`/cars/${id}`),
    create: (carData: any) => api.post('/cars', carData),
    update: (id: string, carData: any) => api.put(`/cars/${id}`, carData),
    delete: (id: string) => api.delete(`/cars/${id}`),
    togglePaid: (id: string) => api.patch(`/cars/${id}/paid`),
    toggleWorking: (id: string) => api.patch(`/cars/${id}/working`),
  },

  // Clients
  clients: {
    getAll: () => api.get('/clients'),
    getById: (id: string) => api.get(`/clients/${id}`),
    create: (clientData: any) => api.post('/clients', clientData),
    update: (id: string, clientData: any) => api.put(`/clients/${id}`, clientData),
    delete: (id: string) => api.delete(`/clients/${id}`),
  },

  // Employees
  employees: {
    getAll: () => api.get('/employees'),
    getById: (id: string) => api.get(`/employees/${id}`),
    create: (employeeData: any) => api.post('/employees', employeeData),
    update: (id: string, employeeData: any) => api.put(`/employees/${id}`, employeeData),
    delete: (id: string) => api.delete(`/employees/${id}`),
  },

  // Reports
  reports: {
    getDashboardStats: () => api.get('/reports/dashboard'),
    getRevenueReport: (startDate: string, endDate: string) =>
      api.get('/reports/revenue', { params: { startDate, endDate } }),
    getCarReports: () => api.get('/reports/cars'),
    getClientReports: () => api.get('/reports/clients'),
  },

  // SMS
  sms: {
    sendReminder: (phone: string, message: string) =>
      api.post('/sms/send', { phone, message }),
    getHistory: () => api.get('/sms/history'),
  },

  // Admin
  admin: {
    getSettings: () => api.get('/admin/settings'),
    updateSettings: (settings: any) => api.put('/admin/settings', settings),
    getUsers: () => api.get('/admin/users'),
    createUser: (userData: any) => api.post('/admin/users', userData),
    updateUser: (id: string, userData: any) => api.put(`/admin/users/${id}`, userData),
    deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  },
};

export default api;