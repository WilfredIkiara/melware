import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { apiService, AuthUser } from './api';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth from storage...');
        const [token, userData] = await Promise.all([
          AsyncStorage.getItem(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY)
        ]);

        console.log('Retrieved from storage:', { token: !!token, userData });

        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            console.log('Parsed user data:', parsedUser);
            
            setUser(parsedUser);
            apiService.setToken(token);
            console.log('Auth initialized successfully');
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            // Clear corrupted data
            await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', email);
      const response = await apiService.login({ email, password });
      
      // DEBUG: Log the entire response to see its structure
      console.log('Login API response:', JSON.stringify(response, null, 2));

      if (response.success && response.token && response.user) {
        console.log('Login successful, storing data...');
        
        // Store token and user data
        await AsyncStorage.setItem(TOKEN_KEY, response.token);

        // DEBUG: Check the actual user object structure
        console.log('User object from API:', response.user);

        // Create user data object - handle different possible field names
        const userData: AuthUser = {
          id: response.user.id ,
          name: response.user.name ,
          role: (response.user.role as 'super-admin' | 'admin' | 'operator') || 'operator',
            email: response.user.email,
  token: response.token 
        };

        console.log('Processed user data:', userData);
        
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        apiService.setToken(response.token);
        setUser(userData);
        
        console.log('Login completed successfully');
        return { success: true };
      } else {
        console.log('Login failed:', response.message);
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log('Attempting registration with:', email);
      const response = await apiService.register({ name, email, password });
      
      console.log('Register API response:', JSON.stringify(response, null, 2));

      if (response.success && response.token && response.user) {
        await AsyncStorage.setItem(TOKEN_KEY, response.token);

        const userData: AuthUser = {
          id : response.user.user_id,
          name: response.user.first_name ,
          role: (response.user.role as 'super-admin' | 'admin' | 'operator') || 'operator',
          email:response.user.email,
          token: response.token
        };

        console.log('Registration user data:', userData);
        
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        apiService.setToken(response.token);
        setUser(userData);
        
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      await apiService.logout();
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      setUser(null);
      console.log('Logout completed');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}