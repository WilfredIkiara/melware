import React, { useState, useEffect } from 'react'
import { Tabs, useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { useTheme } from '../../lib/theme'
import { useAuth } from '../../lib/auth'

export default function TabsLayout() {
  const { theme, isDark, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const router = useRouter()
  const params = useLocalSearchParams()

  console.log('TabsLayout rendering', { user, params })

  // Handle initial navigation based on user role
  useEffect(() => {
    if (user && params.initialRoute) {
      // Small delay to ensure navigation is ready
      setTimeout(() => {
        const route = params.initialRoute as string;
        if (route === 'superadmin') {
          router.replace('/superadmin');
        } else if (route === 'admin') {
          router.replace('/admin');
        } else {
          router.replace('/dashboard');
        }
      }, 100)
    }
  }, [user, params.initialRoute])

  const allMoreOptions = [
    { name: 'cars', title: 'Cars', iconName: 'car' },
    { name: 'garage', title: 'Garage', iconName: 'build' },
    { name: 'reports', title: 'Reports', iconName: 'bar-chart' },
    { name: 'sms', title: 'SMS', iconName: 'chatbubble' },
    { name: 'admin', title: 'Admin', iconName: 'settings' },
    { name: 'inventory', title: 'Inventory', iconName: 'cube' },
    { name: 'operator', title: 'Operator', iconName: 'person' },
    { name: 'superadmin', title: 'Superadmin', iconName: 'shield' },
  ]

  // Filter options based on current screen
  const getFilteredMoreOptions = (activeRouteName: string) => {
    if (activeRouteName === 'admin') {
      // Hide superadmin option for regular admin
      return allMoreOptions.filter(option => option.name !== 'superadmin')
    }
    // Show all options for superadmin and other screens
    return allMoreOptions
  }

  const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const activeRoute = state.routes[state.index]
    const activeRouteName = activeRoute?.name
    const moreOptions = getFilteredMoreOptions(activeRouteName)

    // Define different styles for different screens
    const getTabBarStyle = () => {
      switch (activeRouteName) {
        case 'dashboard':
          return {
            backgroundColor: isDark ? '#1a1a2e' : '#f0f9ff',
            borderTopColor: isDark ? '#16213e' : '#0ea5e9',
            borderTopWidth: 2,
            shadowColor: '#0ea5e9',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }
        case 'clients':
          return {
            backgroundColor: isDark ? '#1e1b4b' : '#fef3c7',
            borderTopColor: isDark ? '#312e81' : '#f59e0b',
            borderTopWidth: 2,
            shadowColor: '#f59e0b',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          }
        case 'employees':
          return {
            backgroundColor: isDark ? '#14532d' : '#dcfce7',
            borderTopColor: isDark ? '#166534' : '#10b981',
            borderTopWidth: 2,
            shadowColor: '#10b981',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          }
        case 'admin':
          return {
            backgroundColor: isDark ? '#374151' : '#f3f4f6',
            borderTopColor: isDark ? '#4b5563' : '#6b7280',
            borderTopWidth: 2,
            shadowColor: '#6b7280',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 6,
          }
        case 'superadmin':
          return {
            backgroundColor: isDark ? '#7c2d12' : '#fef2f2',
            borderTopColor: isDark ? '#9a3412' : '#dc2626',
            borderTopWidth: 3,
            shadowColor: '#dc2626',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 10,
          }
        default:
          return {
            backgroundColor: isDark ? '#0A0F1E' : '#f9fafb',
            borderTopColor: isDark ? '#111827' : '#e5e7eb',
            borderTopWidth: 1,
          }
      }
    }

    const getActiveColor = () => {
      switch (activeRouteName) {
        case 'dashboard': return '#0ea5e9' // Blue
        case 'clients': return '#f59e0b'   // Amber
        case 'employees': return '#10b981' // Green
        case 'admin': return '#6b7280'     // Gray
        case 'superadmin': return '#dc2626' // Red
        default: return '#ef4444'          // Red
      }
    }

    const getInactiveColor = () => {
      return isDark ? '#9ca3af' : '#6b7280'
    }

    return (
      <>
        <View style={[{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }, getTabBarStyle()]}>
          {/* Main Tabs */}
          {state.routes.slice(0, 3).map((route: any, index: number) => {
            const { options } = descriptors[route.key]
            const isFocused = state.index === index
            const activeColor = getActiveColor()
            const inactiveColor = getInactiveColor()

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 8,
                  borderRadius: 12,
                  marginHorizontal: 4,
                  backgroundColor: isFocused ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent'
                }}
              >
                {options.tabBarIcon && options.tabBarIcon({
                  color: isFocused ? activeColor : inactiveColor,
                  size: isFocused ? 28 : 24
                })}
                <Text style={{
                  color: isFocused ? activeColor : inactiveColor,
                  fontSize: isFocused ? 13 : 12,
                  marginTop: 4,
                  fontWeight: isFocused ? '600' : '400'
                }}>
                  {options.title}
                </Text>
                {isFocused && (
                  <View style={{
                    position: 'absolute',
                    bottom: 0,
                    width: 30,
                    height: 3,
                    backgroundColor: activeColor,
                    borderRadius: 2
                  }} />
                )}
              </TouchableOpacity>
            )
          })}

          {/* More Button */}
          <TouchableOpacity
            onPress={() => setDropdownVisible(true)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
              borderRadius: 12,
              marginHorizontal: 4,
              backgroundColor: state.index >= 3 ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent'
            }}
          >
            <Ionicons
              name="menu"
              color={state.index >= 3 ? getActiveColor() : getInactiveColor()}
              size={state.index >= 3 ? 28 : 24}
            />
            <Text style={{
              color: state.index >= 3 ? getActiveColor() : getInactiveColor(),
              fontSize: state.index >= 3 ? 13 : 12,
              marginTop: 4,
              fontWeight: state.index >= 3 ? '600' : '400'
            }}>
              More
            </Text>
            {state.index >= 3 && (
              <View style={{
                position: 'absolute',
                bottom: 0,
                width: 30,
                height: 3,
                backgroundColor: getActiveColor(),
                borderRadius: 2
              }} />
            )}
          </TouchableOpacity>

          {/* Theme Toggle */}
          <View style={{ position: 'absolute', right: 10, top: 10, flexDirection: 'row', alignItems: 'center' }}>
            {activeRouteName === 'superadmin' && (
              <View style={{
                backgroundColor: '#dc2626',
                borderRadius: 10,
                paddingHorizontal: 6,
                paddingVertical: 2,
                marginRight: 8
              }}>
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>SUPER</Text>
              </View>
            )}
            {activeRouteName === 'admin' && (
              <View style={{
                backgroundColor: '#6b7280',
                borderRadius: 10,
                paddingHorizontal: 6,
                paddingVertical: 2,
                marginRight: 8
              }}>
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>ADMIN</Text>
              </View>
            )}
            <TouchableOpacity onPress={toggleTheme}>
              <Ionicons name={isDark ? 'moon' : 'sunny'} color={isDark ? '#ffffff' : '#000000'} size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dropdown Modal */}
        <Modal
          visible={dropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', paddingTop: 100 }}
            onPress={() => setDropdownVisible(false)}
          >
            <View style={{ backgroundColor: isDark ? '#0A0F1E' : '#f9fafb', marginHorizontal: 20, borderRadius: 10, padding: 10 }}>
              <FlatList
                data={moreOptions}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(item.name)
                      setDropdownVisible(false)
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
                  >
                    <Ionicons name={item.iconName as any} color={isDark ? '#9ca3af' : '#6b7280'} size={24} />
                    <Text style={{ color: isDark ? '#9ca3af' : '#6b7280', marginLeft: 15, fontSize: 16 }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    )
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={CustomTabBar}
    >
      <Tabs.Screen name="dashboard" options={{
        title: 'Dashboard',
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
      }} />
      <Tabs.Screen name="clients" options={{
        title: 'Clients',
        tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />,
      }} />
      <Tabs.Screen name="employees" options={{
        title: 'Employees',
        tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
      }} />
      <Tabs.Screen name="cars" options={{
        title: 'Cars',
        tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />,
      }} />
      <Tabs.Screen name="garage" options={{
        title: 'Garage',
        tabBarIcon: ({ color, size }) => <Ionicons name="build" color={color} size={size} />,
      }} />
      <Tabs.Screen name="reports" options={{
        title: 'Reports',
        tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" color={color} size={size} />,
      }} />
      <Tabs.Screen name="sms" options={{
        title: 'SMS',
        tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble" color={color} size={size} />,
      }} />
      <Tabs.Screen name="admin" options={{
        title: 'Admin',
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
      }} />
      <Tabs.Screen name="inventory" options={{
        title: 'Inventory',
        tabBarIcon: ({ color, size }) => <Ionicons name="cube" color={color} size={size} />,
      }} />
      <Tabs.Screen name="operator" options={{
        title: 'Operator',
        tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
      }} />
      <Tabs.Screen name="superadmin" options={{
        title: 'Superadmin',
        tabBarIcon: ({ color, size }) => <Ionicons name="shield" color={color} size={size} />,
      }} />
    </Tabs>
  )
}
