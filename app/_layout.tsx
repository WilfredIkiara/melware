import React, { useState, useEffect } from 'react'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppProvider } from '../lib/store'
import { ThemeProvider } from '../lib/theme'
import { AuthProvider, useAuth } from '../lib/auth'
import LoadingScreen from '../components/LoadingScreen'
import "./globals.css";

function AppNavigator() {
  const { user, isLoading, isAuthenticated } = useAuth();

  console.log('AppNavigator rendering', { user, isLoading, isAuthenticated });

  if (isLoading) {
    return <LoadingScreen onFinish={() => {}} />;
  }

  if (!isAuthenticated) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    );
  }

  // Role-based navigation
  const getInitialRoute = () => {
    switch (user?.role) {
      case 'superadmin':
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
      <Stack.Screen name="index" />
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
          <AppProvider>
            <AppNavigator />
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
