import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import LoadingScreen from '../components/LoadingScreen'
import { AuthProvider, useAuth } from '../lib/auth'
import { ThemeProvider } from '../lib/theme'
import "./globals.css"

function AppNavigator() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [debugInfo, setDebugInfo] = useState<{token: string | null, userData: string | null}>({token: null, userData: null});

  // Debug: Check what's in storage
  useEffect(() => {
    const checkStorage = async () => {
      try {
        const [token, userData] = await Promise.all([
          AsyncStorage.getItem('auth_token'),
          AsyncStorage.getItem('auth_user')
        ]);
        setDebugInfo({ token, userData });
        console.log('Storage debug - token:', token, 'userData:', userData);
      } catch (error) {
        console.error('Error checking storage:', error);
      }
    };

    checkStorage();
  }, [user, isAuthenticated]);

  console.log('AppNavigator rendering', { 
    user, 
    isLoading, 
    isAuthenticated,
    storageToken: debugInfo.token,
    storageUserData: debugInfo.userData 
  });

  if (isLoading) {
    return <LoadingScreen onFinish={() => {}} />;
  }

  if (!isAuthenticated) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    );
  }

  const getInitialRoute = () => {
    switch (user?.role) {
      case 'super-admin':
        return 'superadmin';
      case 'admin':
        return 'admin';
      case 'operator':
        return 'dashboard';
      default:
        return 'dashboard';
    }
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        initialParams={{ initialRoute: getInitialRoute() }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  console.log('RootLayout rendering');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}