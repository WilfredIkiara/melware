
// import { Ionicons } from '@expo/vector-icons'
// import { Tabs, useLocalSearchParams, useRouter } from 'expo-router'
// import React, { useState } from 'react'
// import {
//   Dimensions,
//   FlatList,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native'
// import { useAuth } from '../../lib/auth'
// import { useTheme } from '../../lib/theme'

// interface NavItem {
//   name: string;
//   title: string;
//   iconName: string;
//   roles: ('super-admin' | 'admin' | 'operator')[];
// }

// // export default function TabsLayout() {
// //   const { theme, isDark, toggleTheme } = useTheme()
// //   const { user } = useAuth()
// //   const [dropdownVisible, setDropdownVisible] = useState(false)
// //   const router = useRouter()
// //   const params = useLocalSearchParams()

// //   const { width } = Dimensions.get('window')
// //   const isDesktop = width >= 768
// //   const isMobile = width < 768

// //   console.log('TabsLayout rendering', { user, params, isDesktop, width })

// //   // Define all navigation options
// //   const allNavOptions: NavItem[] = [
// //     { name: 'dashboard', title: 'Dashboard', iconName: 'home', roles: ['super-admin', 'admin', 'operator'] },
// //     { name: 'superadmin', title: 'Superadmin', iconName: 'shield', roles: ['super-admin'] },
// //     { name: 'operator', title: 'Operator', iconName: 'construct', roles: ['operator'] },
// //     { name: 'clients', title: 'Clients', iconName: 'people', roles: ['super-admin', 'admin', 'operator'] },
// //     { name: 'employees', title: 'Employees', iconName: 'person', roles: ['super-admin', 'operator'] },
// //     { name: 'inventory', title: 'Inventory', iconName: 'cube', roles: ['super-admin', 'admin', 'operator'] },
// //     { name: 'reports', title: 'Reports', iconName: 'bar-chart', roles: ['super-admin', 'admin'] },
// //     { name: 'sms', title: 'SMS', iconName: 'chatbubble', roles: ['super-admin', 'admin'] },
// //     { name: 'Transactions', title: 'Transactions', iconName: 'cash', roles: ['super-admin', 'admin'] },
// //   ]

// //   // Filter options based on user role
// //   const getFilteredNavOptions = (): NavItem[] => {
// //     if (!user) return []
// //     return allNavOptions.filter(option => option.roles.includes(user.role as any))
// //   }

// //   // Mobile Main Tabs
// //   const getMobileMainTabs = (): NavItem[] => {
// //     const filtered = getFilteredNavOptions()
// //     return filtered.slice(0, 3)
// //   }

// //   // Mobile More Options
// //   const getMobileMoreOptions = (): NavItem[] => {
// //     const filtered = getFilteredNavOptions()
// //     return filtered.slice(3)
// //   }

// //   // Floating Dock for Desktop/Tablet
// //   const FloatingDock = ({ state, descriptors, navigation }: any) => {
// //     const navOptions = getFilteredNavOptions()

// //     return (
// //       <View
// //         style={[
// //           styles.floatingDock,
// //           isDark ? styles.floatingDockDark : styles.floatingDockLight,
// //           { alignSelf: 'center' } // Center the dock
// //         ]}
// //       >
// //         {navOptions.map((option) => {
// //           const route = state.routes.find((r: any) => r.name === option.name)
// //           if (!route) return null

// //           const isFocused = state.routes[state.index].name === option.name

// //           const onPress = () => {
// //             if (!isFocused) navigation.navigate(route.name)
// //           }

// //           return (
// //             <TouchableOpacity
// //               key={option.name}
// //               onPress={onPress}
// //               style={[
// //                 styles.dockItem,
// //                 isFocused && (isDark ? styles.dockItemActiveDark : styles.dockItemActiveLight)
// //               ]}
// //             >
// //               <Ionicons
// //                 name={option.iconName as any}
// //                 color={isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280')}
// //                 size={24}
// //               />
// //               <Text
// //                 style={[
// //                   styles.dockText,
// //                   { color: isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280') }
// //                 ]}
// //               >
// //                 {option.title}
// //               </Text>
// //             </TouchableOpacity>
// //           )
// //         })}

// //         {/* Theme Toggle + Role Badge */}
// //         <View style={styles.themeToggleContainer}>
// //           <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
// //             <Ionicons name={isDark ? 'moon' : 'sunny'} color="#ffffff" size={24} />
// //           </TouchableOpacity>
// //           {user && (
// //             <View style={[
// //               styles.roleBadge,
// //               user.role === 'super-admin' ? styles.superAdminBadge :
// //                 user.role === 'admin' ? styles.adminBadge :
// //                   styles.operatorBadge
// //             ]}>
// //               <Text style={styles.roleBadgeText}>
// //                 {user.role.toUpperCase()}
// //               </Text>
// //             </View>
// //           )}
// //         </View>
// //       </View>
// //     )
// //   }

// //   // Bottom Tabs for Mobile
// //   const MobileTabBar = ({ state, descriptors, navigation }: any) => {
// //     const mainTabs = getMobileMainTabs()
// //     const moreOptions = getMobileMoreOptions()

// //     const activeColor = '#3b82f6'
// //     const inactiveColor = isDark ? '#9ca3af' : '#6b7280'

// //     return (
// //       <>
// //         <View style={[styles.mobileTabBar, isDark ? styles.mobileTabBarDark : styles.mobileTabBarLight]}>
// //           {mainTabs.map((option) => {
// //             const route = state.routes.find((r: any) => r.name === option.name)
// //             if (!route) return null

// //             const isFocused = state.routes[state.index].name === option.name

// //             return (
// //               <TouchableOpacity
// //                 key={option.name}
// //                 onPress={() => {
// //                   if (!isFocused) navigation.navigate(route.name)
// //                 }}
// //                 style={styles.mobileTabItem}
// //               >
// //                 <Ionicons
// //                   name={option.iconName as any}
// //                   color={isFocused ? activeColor : inactiveColor}
// //                   size={isFocused ? 28 : 24}
// //                 />
// //                 <Text
// //                   style={[
// //                     styles.mobileTabText,
// //                     { color: isFocused ? activeColor : inactiveColor }
// //                   ]}
// //                 >
// //                   {option.title}
// //                 </Text>
// //               </TouchableOpacity>
// //             )
// //           })}

// //           {/* More Button */}
// //           {moreOptions.length > 0 && (
// //             <TouchableOpacity
// //               onPress={() => setDropdownVisible(true)}
// //               style={styles.mobileTabItem}
// //             >
// //               <Ionicons name="menu" color={inactiveColor} size={24} />
// //               <Text style={[styles.mobileTabText, { color: inactiveColor }]}>More</Text>
// //             </TouchableOpacity>
// //           )}
// //         </View>

// //         {/* More Options Modal */}
// //         <Modal
// //           visible={dropdownVisible}
// //           transparent
// //           animationType="slide"
// //           onRequestClose={() => setDropdownVisible(false)}
// //         >
// //           <TouchableOpacity
// //             style={styles.modalOverlay}
// //             activeOpacity={1}
// //             onPress={() => setDropdownVisible(false)}
// //           >
// //             <View style={[styles.modalContent, isDark ? styles.modalContentDark : styles.modalContentLight]}>
// //               <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#000' }]}>More Options</Text>
// //               <FlatList
// //                 data={moreOptions}
// //                 keyExtractor={(item) => item.name}
// //                 renderItem={({ item }) => {
// //                   const route = state.routes.find((r: any) => r.name === item.name)
// //                   if (!route) return null
// //                   const isFocused = state.routes[state.index].name === item.name

// //                   return (
// //                     <TouchableOpacity
// //                       onPress={() => {
// //                         navigation.navigate(item.name)
// //                         setDropdownVisible(false)
// //                       }}
// //                       style={styles.modalItem}
// //                     >
// //                       <Ionicons
// //                         name={item.iconName as any}
// //                         color={isFocused ? '#3b82f6' : inactiveColor}
// //                         size={24}
// //                       />
// //                       <Text style={[
// //                         styles.modalItemText,
// //                         { color: isFocused ? '#3b82f6' : inactiveColor }
// //                       ]}>
// //                         {item.title}
// //                       </Text>
// //                     </TouchableOpacity>
// //                   )
// //                 }}
// //               />
// //             </View>
// //           </TouchableOpacity>
// //         </Modal>
// //       </>
// //     )
// //   }

// //   // Decide TabBar based on screen size
// //   const CustomTabBar = (props: any) => {
// //     return isDesktop ? <FloatingDock {...props} /> : <MobileTabBar {...props} />
// //   }

// //   // Filter screens based on user role
// //   const filteredScreens = getFilteredNavOptions()

// //   return (
// //     <Tabs
// //       screenOptions={{ headerShown: false }}
// //       tabBar={CustomTabBar}
// //       initialRouteName={params.initialRoute as string || 'dashboard'}
// //     >
// //       {filteredScreens.map((screen) => (
// //         <Tabs.Screen
// //           key={screen.name}
// //           name={screen.name}
// //           options={{
// //             title: screen.title,
// //             tabBarIcon: ({ color, size, focused }) => (
// //               <Ionicons
// //                 name={screen.iconName as any}
// //                 color={color}
// //                 size={focused ? size + 2 : size}
// //               />
// //             ),
// //           }}
// //         />
// //       ))}
// //     </Tabs>
// //   )
// // }
// export default function TabsLayout() {
//   const { theme, isDark, toggleTheme } = useTheme();
//   const { user } = useAuth();
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const router = useRouter();
//   const params = useLocalSearchParams();

//   const { width } = Dimensions.get('window');
//   const isDesktop = width >= 768;
//   const isMobile = width < 768;

//   // Define all navigation options
//   const allNavOptions: NavItem[] = [
//     { name: 'dashboard', title: 'Dashboard', iconName: 'home', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'superadmin', title: 'Superadmin', iconName: 'shield', roles: ['super-admin'] },
//     { name: 'operator', title: 'Operator', iconName: 'construct', roles: ['operator'] },
//     { name: 'clients', title: 'Clients', iconName: 'people', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'Staff', title: 'Employees', iconName: 'person', roles: ['super-admin', 'operator'] },
//     { name: 'inventory', title: 'Inventory', iconName: 'cube', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'reports', title: 'Reports', iconName: 'bar-chart', roles: ['super-admin', 'admin'] },
//     // { name: 'sms', title: 'SMS', iconName: 'chatbubble', roles: ['super-admin', 'admin'] },
//     { name: 'Transactions', title: 'Transactions', iconName: 'cash', roles: ['super-admin', 'admin'] },
//   ];

//   // Filter options based on user role
//   const getFilteredNavOptions = (): NavItem[] => {
//     if (!user) return [];
//     return allNavOptions.filter(option => option.roles.includes(user.role as any));
//   };

//   // *** Check if current route is in the main pages ***
//   const isInMainPages = (state: any) => {
//     const currentRouteName = state?.routes?.[state.index]?.name;
//     return allNavOptions.some(opt => opt.name === currentRouteName);
//   };

//   // Floating Dock for Desktop/Tablet
//   const FloatingDock = ({ state, descriptors, navigation }: any) => {
//     // Hide dock if route is not part of main pages
//     if (!isInMainPages(state)) return null;

//     const navOptions = getFilteredNavOptions();

//     return (
//       <View
//         style={[
//           styles.floatingDock,
//           isDark ? styles.floatingDockDark : styles.floatingDockLight,
//           { alignSelf: 'center' }
//         ]}
//       >
//         {navOptions.map((option) => {
//           const route = state.routes.find((r: any) => r.name === option.name);
//           if (!route) return null;

//           const isFocused = state.routes[state.index].name === option.name;

//           const onPress = () => {
//             if (!isFocused) navigation.navigate(route.name);
//           };

//           return (
//             <TouchableOpacity
//               key={option.name}
//               onPress={onPress}
//               style={[
//                 styles.dockItem,
//                 isFocused && (isDark ? styles.dockItemActiveDark : styles.dockItemActiveLight)
//               ]}
//             >
//               <Ionicons
//                 name={option.iconName as any}
//                 color={isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280')}
//                 size={24}
//               />
//               <Text
//                 style={[
//                   styles.dockText,
//                   { color: isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280') }
//                 ]}
//               >
//                 {option.title}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}

//         {/* Theme Toggle + Role Badge */}
//         <View style={styles.themeToggleContainer}>
//           <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
//             <Ionicons name={isDark ? 'moon' : 'sunny'} color="#ffffff" size={24} />
//           </TouchableOpacity>
//           {user && (
//             <View style={[
//               styles.roleBadge,
//               user.role === 'super-admin' ? styles.superAdminBadge :
//                 user.role === 'admin' ? styles.adminBadge :
//                   styles.operatorBadge
//             ]}>
//               <Text style={styles.roleBadgeText}>
//                 {user.role.toUpperCase()}
//               </Text>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   // Bottom Tabs for Mobile → Unchanged
//   const MobileTabBar = ({ state, descriptors, navigation }: any) => {
//     const mainTabs = getFilteredNavOptions().slice(0, 3);
//     const moreOptions = getFilteredNavOptions().slice(3);

//     const activeColor = '#3b82f6';
//     const inactiveColor = isDark ? '#9ca3af' : '#6b7280';

//     return (
//       <>
//         <View style={[styles.mobileTabBar, isDark ? styles.mobileTabBarDark : styles.mobileTabBarLight]}>
//           {mainTabs.map((option) => {
//             const route = state.routes.find((r: any) => r.name === option.name);
//             if (!route) return null;

//             const isFocused = state.routes[state.index].name === option.name;

//             return (
//               <TouchableOpacity
//                 key={option.name}
//                 onPress={() => {
//                   if (!isFocused) navigation.navigate(route.name);
//                 }}
//                 style={styles.mobileTabItem}
//               >
//                 <Ionicons
//                   name={option.iconName as any}
//                   color={isFocused ? activeColor : inactiveColor}
//                   size={isFocused ? 28 : 24}
//                 />
//                 <Text
//                   style={[
//                     styles.mobileTabText,
//                     { color: isFocused ? activeColor : inactiveColor }
//                   ]}
//                 >
//                   {option.title}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}

//           {/* More Button */}
//           {moreOptions.length > 0 && (
//             <TouchableOpacity
//               onPress={() => setDropdownVisible(true)}
//               style={styles.mobileTabItem}
//             >
//               <Ionicons name="menu" color={inactiveColor} size={24} />
//               <Text style={[styles.mobileTabText, { color: inactiveColor }]}>More</Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* More Options Modal */}
//         <Modal
//           visible={dropdownVisible}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setDropdownVisible(false)}
//         >
//           <TouchableOpacity
//             style={styles.modalOverlay}
//             activeOpacity={1}
//             onPress={() => setDropdownVisible(false)}
//           >
//             <View style={[styles.modalContent, isDark ? styles.modalContentDark : styles.modalContentLight]}>
//               <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#fff' }]}>More Options</Text>
//               <FlatList
//                 data={moreOptions}
//                 keyExtractor={(item) => item.name}
//                 renderItem={({ item }) => {
//                   const route = state.routes.find((r: any) => r.name === item.name);
//                   if (!route) return null;
//                   const isFocused = state.routes[state.index].name === item.name;

//                   return (
//                     <TouchableOpacity
//                       onPress={() => {
//                         navigation.navigate(item.name);
//                         setDropdownVisible(false);
//                       }}
//                       style={styles.modalItem}
//                     >
//                       <Ionicons
//                         name={item.iconName as any}
//                         color={isFocused ? '#3b82f6' : inactiveColor}
//                         size={24}
//                       />
//                       <Text
//                         style={[
//                           styles.modalItemText,
//                           { color: isFocused ? '#3b82f6' : inactiveColor }
//                         ]}
//                       >
//                         {item.title}
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 }}
//               />
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </>
//     );
//   };

//   // Choose tab bar based on screen size
//   const CustomTabBar = (props: any) => {
//     return isDesktop ? <FloatingDock {...props} /> : <MobileTabBar {...props} />;
//   };

//   // Filter screens based on user role
//   const filteredScreens = getFilteredNavOptions();

//   return (
//     <Tabs
//       screenOptions={{ headerShown: false }}
//       tabBar={CustomTabBar}
//       initialRouteName={params.initialRoute as string || 'dashboard'}
//     >
//       {filteredScreens.map((screen) => (
//         <Tabs.Screen
//           key={screen.name}
//           name={screen.name}
//           options={{
//             title: screen.title,
//             tabBarIcon: ({ color, size, focused }) => (
//               <Ionicons
//                 name={screen.iconName as any}
//                 color={color}
//                 size={focused ? size + 2 : size}
//               />
//             ),
//           }}
//         />
//       ))}
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   floatingDock: {
//     position: 'absolute',
//     bottom: 20,
//     borderRadius: 20,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//     zIndex: 1000
//   },
//   floatingDockLight: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)'
//   },
//   floatingDockDark: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)'
//   },
//   dockItem: {
//     padding: 12,
//     borderRadius: 10,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 70
//   },
//   dockItemActiveLight: { backgroundColor: 'rgba(59, 130, 246, 0.2)' },
//   dockItemActiveDark: { backgroundColor: 'rgba(59, 130, 246, 0.2)' },
//   dockText: { fontSize: 12, marginTop: 4, fontWeight: '500' },
//   themeToggleContainer: { marginLeft: 15, alignItems: 'center', flexDirection: 'row' },
//   themeToggle: { padding: 10, borderRadius: 20 },
//   roleBadge: { marginLeft: 8, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
//   superAdminBadge: { backgroundColor: '#dc2626' },
//   adminBadge: { backgroundColor: '#6b7280' },
//   operatorBadge: { backgroundColor: '#10b981' },
//   roleBadgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
//   mobileTabBar: { flexDirection: 'row', height: 70, paddingBottom: 10 },
//   mobileTabBarLight: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderTopColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopWidth: 1
//   },
//   mobileTabBarDark: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderTopColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopWidth: 1
//   },
//   mobileTabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   mobileTabText: { fontSize: 12, marginTop: 4, fontWeight: '500' },
//   modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
//   modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 40, maxHeight: '80%' },
//   modalContentLight: { backgroundColor: '#0f172a' },
//   modalContentDark: { backgroundColor: '#0f172a' },
//   modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
//   modalItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.1)'
//   },
//   modalItemText: { marginLeft: 15, fontSize: 16 }
// })
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../../lib/auth';
import { useTheme } from '../../lib/theme';

interface NavItem {
  name: string;
  title: string;
  iconName: string;
  roles: ('super-admin' | 'admin' | 'operator')[];
}

const FloatingDock = React.memo(({ state, navigation, navOptions, isDark, toggleTheme, user }: any) => {
  if (!state?.routes?.[state.index]) return null;
  const currentRouteName = state.routes[state.index].name;
  const isInMainPages = navOptions.some((opt: NavItem) => opt.name === currentRouteName);
  if (!isInMainPages) return null;

  return (
    <View style={[styles.floatingDock, isDark ? styles.floatingDockDark : styles.floatingDockLight, { alignSelf: 'center' }]}>
      {navOptions.map((option: NavItem) => {
        const route = state.routes.find((r: any) => r.name === option.name);
        if (!route) return null;
        const isFocused = currentRouteName === option.name;

        return (
          <TouchableOpacity
            key={option.name}
            onPress={() => !isFocused && navigation.navigate(route.name)}
            style={[styles.dockItem, isFocused && (isDark ? styles.dockItemActiveDark : styles.dockItemActiveLight)]}
          >
            <Ionicons name={option.iconName as any} color={isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280')} size={24} />
            <Text style={[styles.dockText, { color: isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280') }]}>{option.title}</Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.themeToggleContainer}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Ionicons name={isDark ? 'moon' : 'sunny'} color="#ffffff" size={24} />
        </TouchableOpacity>
        {user && (
          <View style={[styles.roleBadge, user.role === 'super-admin' ? styles.superAdminBadge : user.role === 'admin' ? styles.adminBadge : styles.operatorBadge]}>
            <Text style={styles.roleBadgeText}>{user.role.toUpperCase()}</Text>
          </View>
        )}
      </View>
    </View>
  );
});

const MobileTabBar = React.memo(({ state, navigation, navOptions, isDark, dropdownVisible, setDropdownVisible }: any) => {
  const mainTabs = navOptions.slice(0, 3);
  const moreOptions = navOptions.slice(3);
  const activeColor = '#3b82f6';
  const inactiveColor = isDark ? '#9ca3af' : '#6b7280';
  const currentRouteName = state.routes[state.index]?.name;

  return (
    <>
      <View style={[styles.mobileTabBar, isDark ? styles.mobileTabBarDark : styles.mobileTabBarLight]}>
        {mainTabs.map((option: NavItem) => {
          const route = state.routes.find((r: any) => r.name === option.name);
          if (!route) return null;
          const isFocused = currentRouteName === option.name;

          return (
            <TouchableOpacity
              key={option.name}
              onPress={() => !isFocused && navigation.navigate(route.name)}
              style={styles.mobileTabItem}
            >
              <Ionicons name={option.iconName as any} color={isFocused ? activeColor : inactiveColor} size={isFocused ? 28 : 24} />
              <Text style={[styles.mobileTabText, { color: isFocused ? activeColor : inactiveColor }]}>{option.title}</Text>
            </TouchableOpacity>
          );
        })}

        {moreOptions.length > 0 && (
          <TouchableOpacity onPress={() => setDropdownVisible(true)} style={styles.mobileTabItem}>
            <Ionicons name="menu" color={inactiveColor} size={24} />
            <Text style={[styles.mobileTabText, { color: inactiveColor }]}>More</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={dropdownVisible} transparent animationType="slide" onRequestClose={() => setDropdownVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setDropdownVisible(false)}>
          <View style={[styles.modalContent, isDark ? styles.modalContentDark : styles.modalContentLight]}>
            <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#fff' }]}>More Options</Text>
            <FlatList
              data={moreOptions}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => {
                const route = state.routes.find((r: any) => r.name === item.name);
                if (!route) return null;
                const isFocused = currentRouteName === item.name;

                return (
                  <TouchableOpacity
                    onPress={() => { navigation.navigate(item.name); setDropdownVisible(false); }}
                    style={styles.modalItem}
                  >
                    <Ionicons name={item.iconName as any} color={isFocused ? '#3b82f6' : inactiveColor} size={24} />
                    <Text style={[styles.modalItemText, { color: isFocused ? '#3b82f6' : inactiveColor }]}>{item.title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
});

export default function TabsLayout() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  const { width } = Dimensions.get('window');
  const isDesktop = width >= 768;

  const allNavOptions: NavItem[] = useMemo(() => [
    { name: 'dashboard', title: 'Dashboard', iconName: 'home', roles: [] },
    { name: 'superadmin', title: 'Superadmin', iconName: 'shield', roles: ['super-admin'] },
    { name: 'operator', title: 'Operator', iconName: 'construct', roles: ['operator'] },
    { name: 'clients', title: 'Clients', iconName: 'people', roles: ['super-admin', 'admin', 'operator'] },
    { name: 'Staff', title: 'Employees', iconName: 'person', roles: ['super-admin', 'operator'] },
    { name: 'inventory', title: 'Inventory', iconName: 'cube', roles: ['super-admin', 'admin', 'operator'] },
    { name: 'reports', title: 'Reports', iconName: 'bar-chart', roles: ['super-admin', 'admin'] },
    { name: 'Transactions', title: 'Transactions', iconName: 'cash', roles: ['super-admin', 'admin'] },
  ], []);

  const filteredScreens = useMemo(() => {
    if (!user) return [];
    return allNavOptions.filter(opt => opt.roles.includes(user.role as any));
  }, [user, allNavOptions]);

  if (!user) return null;

  const CustomTabBar = useCallback((props: any) => {
    return isDesktop ?
      <FloatingDock {...props} navOptions={filteredScreens} isDark={isDark} toggleTheme={toggleTheme} user={user} /> :
      <MobileTabBar {...props} navOptions={filteredScreens} isDark={isDark} dropdownVisible={dropdownVisible} setDropdownVisible={setDropdownVisible} />;
  }, [isDesktop, filteredScreens, isDark, toggleTheme, user, dropdownVisible]);

  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={CustomTabBar} initialRouteName={params.initialRoute as string || 'dashboard'}>
      {filteredScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={screen.iconName as any} color={color} size={focused ? size + 2 : size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  floatingDock: { position: 'absolute', bottom: 20, borderRadius: 20, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65, elevation: 8, zIndex: 1000 },
  floatingDockLight: { backgroundColor: 'rgba(15, 23, 42, 0.95)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  floatingDockDark: { backgroundColor: 'rgba(15, 23, 42, 0.95)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  dockItem: { padding: 12, borderRadius: 10, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', minWidth: 70 },
  dockItemActiveLight: { backgroundColor: 'rgba(59, 130, 246, 0.2)' },
  dockItemActiveDark: { backgroundColor: 'rgba(59, 130, 246, 0.2)' },
  dockText: { fontSize: 12, marginTop: 4, fontWeight: '500' },
  themeToggleContainer: { marginLeft: 15, alignItems: 'center', flexDirection: 'row' },
  themeToggle: { padding: 10, borderRadius: 20 },
  roleBadge: { marginLeft: 8, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  superAdminBadge: { backgroundColor: '#dc2626' },
  adminBadge: { backgroundColor: '#6b7280' },
  operatorBadge: { backgroundColor: '#10b981' },
  roleBadgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  mobileTabBar: { flexDirection: 'row', height: 70, paddingBottom: 10 },
  mobileTabBarLight: { backgroundColor: 'rgba(15, 23, 42, 0.95)', borderTopColor: 'rgba(255, 255, 255, 0.1)', borderTopWidth: 1 },
  mobileTabBarDark: { backgroundColor: 'rgba(15, 23, 42, 0.95)', borderTopColor: 'rgba(255, 255, 255, 0.1)', borderTopWidth: 1 },
  mobileTabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mobileTabText: { fontSize: 12, marginTop: 4, fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 40, maxHeight: '80%' },
  modalContentLight: { backgroundColor: '#0f172a' },
  modalContentDark: { backgroundColor: '#0f172a' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
  modalItemText: { marginLeft: 15, fontSize: 16 }
});
