
// import { BlurView } from 'expo-blur';
// import { useRouter } from 'expo-router';
// import { Bell, Car, ClipboardList, Clock, DollarSign, FileText, LogOut, MapPin, Package } from 'lucide-react';
// import React from 'react';
// import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { useAuth } from '../../lib/auth';
// import { useSuperAdminData } from '../../lib/pages/useSuperAdminData';

// // Define the types that match your backend response
// interface CustomerData {
//   id?: string;
//   first_name: string;
//   last_name: string;
//   phone_number?: string;
//   total_spent?: number;
//   created_at?: string;
//   balance?: number;
// }

// interface Activity {
//   id: string;
//   profile: { name: string };
//   activity_type: string;
//   description: string;
//   timestamp: string;
// }

// export default function SuperAdmin() {
//   const { stats, activities, workOrders, appointments, financials, inventory, customers, staff, loading, error } = useSuperAdminData();
  
//   const { user, logout } = useAuth();
//   const router = useRouter();
//   const branchName = "Main Branch";

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Logout",
//           style: "destructive",
//           onPress: async () => {
//             await logout();
//             router.replace('/login');
//           }
//         }
//       ]
//     );
//   };
  
//   // A helper function for the quick action buttons
//   const handleQuickAction = (action: string) => {
//     Alert.alert(
//       "Action Triggered",
//       `The "${action}" action has been initiated. This would typically trigger an API call to the backend.`
//     );
//   };

//   const formattedDate = (dateString?: string) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "Invalid Date";
//     return date.toLocaleDateString();
//   };

//   // Helper function to get total customers count from nested structure
//   const getTotalCustomers = () => {
//     if (!customers) return 0;
//     // Check if customers is an array (flat structure) or object with nested arrays
//     if (Array.isArray(customers)) {
//       return customers.length;
//     } else {
//       // Handle nested structure
//       const topCustomers = customers.topCustomers?.length || 0;
//       const newCustomers = customers.newCustomersThisWeek?.length || 0;
//       const outstanding = customers.outstandingBalances?.length || 0;
//       return topCustomers + newCustomers + outstanding;
//     }
//   };

//   // Helper to get flat customers array for display
//   const getCustomersForDisplay = () => {
//     if (!customers) return [];
//     if (Array.isArray(customers)) {
//       return customers;
//     } else {
//       // Combine all customer arrays from nested structure
//       return [
//         ...(customers.topCustomers || []),
//         ...(customers.newCustomersThisWeek || []),
//         ...(customers.outstandingBalances || [])
//       ];
//     }
//   };

//   if (loading) {
//     return <View className="flex-1 justify-center items-center bg-[#1A2033]"><Text className="text-white text-2xl">Loading...</Text></View>;
//   }

//   if (error) {
//     return <View className="flex-1 justify-center items-center bg-[#1A2033]"><Text className="text-red-500 text-2xl">Error: {error}</Text></View>;
//   }

//   return (
//     <View className="flex-1 bg-[#1A2033] pt-12">
//       <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
//         {/* Header Section */}
//         <View className="px-6 py-4 flex-row justify-between items-center">
//           <View>
//             <Text className="text-white text-3xl font-bold">Hello, {user?.name || "Super Admin"}</Text>
//             <Text className="text-gray-400 text-sm">{branchName}</Text>
//           </View>
//           <View className="flex-row items-center space-x-4">
//             <TouchableOpacity onPress={() => router.push('/notifications' as any)}>
//               <Bell size={24} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleLogout}>
//               <LogOut size={24} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Dashboard Cards Section */}
//         <View className="p-6">
//           <View className="flex-row flex-wrap justify-between">
//             {/* Total Revenue Card */}
//             <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-[48%] items-center justify-center h-36">
//               <DollarSign size={36} color="#4ade80" />
//               <Text className="text-gray-300 text-sm mt-2">Total Revenue</Text>
//               <Text className="text-white text-2xl font-bold mt-1">
//                 {loading ? '...' : `KES ${stats?.financials?.total_revenue?.toLocaleString() || '0'}`}
//               </Text>
//             </BlurView>

//             {/* Total Work Orders Card */}
//             <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-[48%] items-center justify-center h-36">
//               <ClipboardList size={36} color="#6366f1" />
//               <Text className="text-gray-300 text-sm mt-2">Work Orders</Text>
//               <Text className="text-white text-2xl font-bold mt-1">
//                 {loading ? '...' : workOrders?.length || 0}
//               </Text>
//             </BlurView>
            
//             {/* Total Clients Card */}
//             <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-[48%] items-center justify-center h-36">
//               <MapPin size={36} color="#38bdf8" />
//               <Text className="text-gray-300 text-sm mt-2">Total Clients</Text>
//               <Text className="text-white text-2xl font-bold mt-1">
//                 {loading ? '...' : stats?.clients?.total_clients || getTotalCustomers()}
//               </Text>
//             </BlurView>
            
//             {/* Total Expenses Card */}
//             <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-[48%] items-center justify-center h-36">
//               <DollarSign size={36} color="#f87171" />
//               <Text className="text-gray-300 text-sm mt-2">Total Expenses</Text>
//               <Text className="text-white text-2xl font-bold mt-1">
//                 {loading ? '...' : `KES ${stats?.expenses?.total_expenses?.toLocaleString() || '0'}`}
//               </Text>
//             </BlurView>

//             {/* Low Stock Items Card */}
//             <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-[48%] items-center justify-center h-36">
//               <Package size={36} color="#facc15" />
//               <Text className="text-gray-300 text-sm mt-2">Low Stock Items</Text>
//               <Text className="text-white text-2xl font-bold mt-1">
//                 {loading ? '...' : stats?.inventory?.low_stock_count || inventory?.lowStockItems?.length || 0}
//               </Text>
//             </BlurView>
            
//             {/* Total Vehicles Card */}
//             <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-[48%] items-center justify-center h-36">
//               <Car size={36} color="#c084fc" />
//               <Text className="text-gray-300 text-sm mt-2">Total Vehicles</Text>
//               <Text className="text-white text-2xl font-bold mt-1">
//                 {loading ? '...' : stats?.cars?.total_cars || 0}
//               </Text>
//             </BlurView>
//           </View>
//         </View>

//         {/* Work Orders Section */}
//         <View className="px-6 mb-8">
//           <Text className="text-white text-xl font-semibold mb-4">Latest Work Orders</Text>
//           <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
//             {loading ? <Text className="text-gray-300">Loading work orders...</Text> : workOrders?.length === 0 ? <Text className="text-gray-300">No work orders found.</Text> : workOrders?.slice(0, 5).map((order) => (
//               <View key={order.id} className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0">
//                 <ClipboardList size={20} color="#6366f1" />
//                 <View className="ml-4 flex-1">
//                   <Text className="text-white font-semibold">
//                     Work Order #{String(order.id).substring(0, 8)}
//                   </Text>
//                   <Text className="text-gray-300 text-sm">
//                     {order.clients?.first_name} {order.clients?.last_name}
//                   </Text>
//                   <Text className="text-gray-400 text-xs">
//                     {order.client_vehicles?.make} - {order.client_vehicles?.licence_plate}
//                   </Text>
//                 </View>
//                 <View className="flex-col items-end">
//                   <Text className="text-white text-sm font-bold">KES {order.estimated_cost?.toLocaleString() || '0'}</Text>
//                   <Text className="text-gray-400 text-xs">{order.status}</Text>
//                 </View>
//               </View>
//             ))}
//           </BlurView>
//         </View>

//         {/* Upcoming Appointments Section */}
//         <View className="px-6 mb-8">
//           <Text className="text-white text-xl font-semibold mb-4">Upcoming Appointments</Text>
//           <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
//             {loading ? <Text className="text-gray-300">Loading appointments...</Text> : appointments?.length === 0 ? <Text className="text-gray-300">No upcoming appointments.</Text> : appointments?.slice(0, 5).map((appt) => (
//               <View key={appt.id} className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0">
//                 <Clock size={20} color="#facc15" />
//                 <View className="ml-4 flex-1">
//                   <Text className="text-white font-semibold">{appt.service_type}</Text>
//                   <Text className="text-gray-300 text-sm">
//                     {appt.clients?.first_name} {appt.clients?.last_name}
//                   </Text>
//                   <Text className="text-gray-400 text-xs">
//                     {appt.client_vehicles?.licence_plate}
//                   </Text>
//                 </View>
//                 <View className="flex-col items-end">
//                   <Text className="text-gray-300 text-sm">{formattedDate(appt.scheduled_time)}</Text>
//                   <Text className="text-gray-400 text-xs">{appt.status}</Text>
//                 </View>
//               </View>
//             ))}
//           </BlurView>
//         </View>
        
//         {/* Latest Customers Section */}
//         <View className="px-6 mb-8">
//           <Text className="text-white text-xl font-semibold mb-4">Latest Customers</Text>
//           <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
//             {loading ? <Text className="text-gray-300">Loading customers...</Text> : getCustomersForDisplay().length === 0 ? <Text className="text-gray-300">No customers found.</Text> : getCustomersForDisplay().slice(0, 5).map((customer, index) => (
//               <View key={customer.id || index} className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0">
//                 <MapPin size={20} color="#38bdf8" />
//                 <View className="ml-4 flex-1">
//                   <Text className="text-white font-semibold">{customer.first_name} {customer.last_name}</Text>
//                   {customer.phone_number && (
//                     <Text className="text-gray-300 text-sm">Phone: {customer.phone_number}</Text>
//                   )}
//                   {customer.created_at && (
//                     <Text className="text-gray-400 text-xs">Joined: {formattedDate(customer.created_at)}</Text>
//                   )}
//                 </View>
//               </View>
//             ))}
//           </BlurView>
//         </View>

//         {/* Recent Activities Section */}
//         <View className="px-6 mb-8">
//           <Text className="text-white text-xl font-semibold mb-4">Recent Activities</Text>
//           <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
//             {loading ? <Text className="text-gray-300">Loading activities...</Text> : activities?.length === 0 ? <Text className="text-gray-300">No activities found.</Text> : activities?.slice(0, 5).map((act) => (
//               <View key={act.id} className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0">
//                 <FileText size={20} color="#a855f7" />
//                 <View className="ml-4 flex-1">
//                   <Text className="text-white font-semibold">{act.activity_type}</Text>
//                   <Text className="text-gray-300 text-sm">{act.description}</Text>
//                   <Text className="text-gray-400 text-xs">{formattedDate(act.timestamp)}</Text>
//                 </View>
//               </View>
//             ))}
//           </BlurView>
//         </View>
//       </ScrollView>

//       {/* Footer / Quick Actions */}
//       {/* <View className="absolute bottom-0 w-full h-20 bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700">
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded-full px-4 py-2" onPress={() => handleQuickAction('Add Job')}>
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Job</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded-full px-4 py-2" onPress={() => handleQuickAction('Add Expense')}>
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Expense</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded-full px-4 py-2" onPress={() => handleQuickAction('Add Customer')}>
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Customer</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded-full px-4 py-2" onPress={() => handleQuickAction('Manage Suppliers')}>
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Manage Suppliers</Text>
//         </TouchableOpacity>
//       </View> */}
//     </View>
//   );
// }
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Bell, Car, ChevronDown, ChevronUp, ClipboardList, Clock, DollarSign, FileText, LogOut, MapPin, Package } from 'lucide-react';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../lib/auth';
import { useSuperAdminData } from '../../lib/pages/useSuperAdminData';

// Define the types that match your backend response
interface CustomerData {
  id?: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  total_spent?: number;
  created_at?: string;
  balance?: number;
}

interface Activity {
  id: string;
  profile: { name: string };
  activity_type: string;
  description: string;
  timestamp: string;
}

// Get the screen width to apply responsive classes conditionally
const { width } = Dimensions.get('window');
const isWeb = width >= 768;

export default function SuperAdmin() {
  const { stats, activities, workOrders, appointments, financials, inventory, customers, staff, loading, error } = useSuperAdminData();
  
  const { user, logout } = useAuth();
  const router = useRouter();
  const branchName = "Main Branch";

  // State for collapsible lists
  const [workOrdersCollapsed, setWorkOrdersCollapsed] = useState(false);
  const [appointmentsCollapsed, setAppointmentsCollapsed] = useState(false);
  const [customersCollapsed, setCustomersCollapsed] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace('/login');
          }
        }
      ]
    );
  };
  
  // A helper function for the quick action buttons
  const handleQuickAction = (action: string) => {
    Alert.alert(
      "Action Triggered",
      `The "${action}" action has been initiated. This would typically trigger an API call to the backend.`
    );
  };

  const formattedDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString();
  };

  // Helper function to get total customers count from nested structure
  const getTotalCustomers = () => {
    if (!customers) return 0;
    // Check if customers is an array (flat structure) or object with nested arrays
    if (Array.isArray(customers)) {
      return customers.length;
    } else {
      // Handle nested structure
      const topCustomers = customers.topCustomers?.length || 0;
      const newCustomers = customers.newCustomersThisWeek?.length || 0;
      const outstanding = customers.outstandingBalances?.length || 0;
      return topCustomers + newCustomers + outstanding;
    }
  };

  // Helper to get flat customers array for display
  const getCustomersForDisplay = () => {
    if (!customers) return [];
    if (Array.isArray(customers)) {
      return customers;
    } else {
      // Combine all customer arrays from nested structure
      return [
        ...(customers.topCustomers || []),
        ...(customers.newCustomersThisWeek || []),
        ...(customers.outstandingBalances || [])
      ];
    }
  };

  if (loading) {
    return <View className="flex-1 justify-center items-center bg-[#1A2033]"><Text className="text-white text-2xl">Loading...</Text></View>;
  }

  if (error) {
    return <View className="flex-1 justify-center items-center bg-[#1A2033]"><Text className="text-red-500 text-2xl">Error: {error}</Text></View>;
  }

  return (
    <View className="flex-1 bg-[#1A2033] pt-12">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header Section */}
        <View className={`px-6 md:px-12 py-4 flex-row justify-between items-center`}>
          <View>
            <Text className="text-white text-3xl font-bold">Hello, {user?.name || "Super Admin"}</Text>
            <Text className="text-gray-400 text-sm">{branchName}</Text>
          </View>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => router.push('/notifications' as any)}>
              <Bell size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <LogOut size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Cards Section */}
        <View className={`p-6 md:p-12`}>
          <View className={`flex-row flex-wrap justify-between md:grid md:grid-cols-3 md:gap-4`}>
            {/* Total Revenue Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <DollarSign size={36} color="#4ade80" />
              <Text className="text-gray-300 text-sm mt-2">Total Revenue</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : `KES ${stats?.financials?.total_revenue?.toLocaleString() || '0'}`}
              </Text>
            </BlurView>

            {/* Total Work Orders Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <ClipboardList size={36} color="#6366f1" />
              <Text className="text-gray-300 text-sm mt-2">Work Orders</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : workOrders?.length || 0}
              </Text>
            </BlurView>
            
            {/* Total Clients Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <MapPin size={36} color="#38bdf8" />
              <Text className="text-gray-300 text-sm mt-2">Total Clients</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : stats?.clients?.total_clients || getTotalCustomers()}
              </Text>
            </BlurView>
            
            {/* Total Expenses Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <DollarSign size={36} color="#f87171" />
              <Text className="text-gray-300 text-sm mt-2">Total Expenses</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : `KES ${stats?.expenses?.total_expenses?.toLocaleString() || '0'}`}
              </Text>
            </BlurView>

            {/* Low Stock Items Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <Package size={36} color="#facc15" />
              <Text className="text-gray-300 text-sm mt-2">Low Stock Items</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : stats?.inventory?.low_stock_count || inventory?.lowStockItems?.length || 0}
              </Text>
            </BlurView>
            
            {/* Total Vehicles Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <Car size={36} color="#c084fc" />
              <Text className="text-gray-300 text-sm mt-2">Total Vehicles</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : stats?.cars?.total_cars || 0}
              </Text>
            </BlurView>
          </View>
        </View>

        {/* Work Orders Section */}
        <View className={`px-6 md:px-12 mb-8`}>
          <TouchableOpacity onPress={() => setWorkOrdersCollapsed(!workOrdersCollapsed)} className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-semibold">Latest Work Orders</Text>
            {workOrdersCollapsed ? <ChevronDown size={20} color="white" /> : <ChevronUp size={20} color="white" />}
          </TouchableOpacity>
          <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
            {loading ? <Text className="text-gray-300">Loading work orders...</Text> : (workOrdersCollapsed ? null : (workOrders?.length === 0 ? <Text className="text-gray-300">No work orders found.</Text> : workOrders?.slice(0, 5).map((order) => (
              <View key={String(order.id)} className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0">
                <ClipboardList size={20} color="#6366f1" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">
                    Work Order #{String(order.id).substring(0, 8)}
                  </Text>
                  <Text className="text-gray-300 text-sm">
                    {order.clients?.first_name} {order.clients?.last_name}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {order.client_vehicles?.make} - {order.client_vehicles?.licence_plate}
                  </Text>
                </View>
                <View className="flex-col items-end">
                  <Text className="text-white text-sm font-bold">KES {order.estimated_cost?.toLocaleString() || '0'}</Text>
                  <Text className="text-gray-400 text-xs">{order.status}</Text>
                </View>
              </View>
            ))))}
          </BlurView>
        </View>

        {/* Upcoming Appointments Section */}
        <View className={`px-6 md:px-12 mb-8`}>
          <TouchableOpacity onPress={() => setAppointmentsCollapsed(!appointmentsCollapsed)} className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-semibold">Upcoming Appointments</Text>
            {appointmentsCollapsed ? <ChevronDown size={20} color="white" /> : <ChevronUp size={20} color="white" />}
          </TouchableOpacity>
          <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
            {loading ? <Text className="text-gray-300">Loading appointments...</Text> : (appointmentsCollapsed ? null : (appointments?.length === 0 ? <Text className="text-gray-300">No upcoming appointments.</Text> : appointments?.slice(0, 5).map((appt) => (
              <View key={appt.id} className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0">
                <Clock size={20} color="#facc15" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">{appt.service_type}</Text>
                  <Text className="text-gray-300 text-sm">
                    {appt.clients?.first_name} {appt.clients?.last_name}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {appt.client_vehicles?.licence_plate}
                  </Text>
                </View>
                <View className="flex-col items-end">
                  <Text className="text-gray-300 text-sm">{formattedDate(appt.scheduled_time)}</Text>
                  <Text className="text-gray-400 text-xs">{appt.status}</Text>
                </View>
              </View>
            ))))}
          </BlurView>
        </View>
        
        {/* Latest Customers Section */}
        <View className={`px-6 md:px-12 mb-8`}>
          <TouchableOpacity onPress={() => setCustomersCollapsed(!customersCollapsed)} className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-semibold">Latest Customers</Text>
            {customersCollapsed ? <ChevronDown size={20} color="white" /> : <ChevronUp size={20} color="white" />}
          </TouchableOpacity>
          <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
            {loading ? <Text className="text-gray-300">Loading customers...</Text> : (customersCollapsed ? null : (getCustomersForDisplay().length === 0 ? <Text className="text-gray-300">No customers found.</Text> : getCustomersForDisplay().slice(0, 5).map((customer, index) => (
              <View key={customer.id || index} className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0">
                <MapPin size={20} color="#38bdf8" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">{customer.first_name} {customer.last_name}</Text>
                  {customer.phone_number && (
                    <Text className="text-gray-300 text-sm">Phone: {customer.phone_number}</Text>
                  )}
                  {customer.created_at && (
                    <Text className="text-gray-400 text-xs">Joined: {formattedDate(customer.created_at)}</Text>
                  )}
                </View>
              </View>
            ))))}
          </BlurView>
        </View>

        {/* Recent Activities Section - Not collapsible */}
        <View className={`px-6 md:px-12 mb-8`}>
          <Text className="text-white text-xl font-semibold mb-4">Recent Activities</Text>
          <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
            {loading ? <Text className="text-gray-300">Loading activities...</Text> : activities?.length === 0 ? <Text className="text-gray-300">No activities found.</Text> : activities?.slice(0, 5).map((act) => (
              <View key={act.id} className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0">
                <FileText size={20} color="#a855f7" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">{act.activity_type}</Text>
                  <Text className="text-gray-300 text-sm">{act.description}</Text>
                  <Text className="text-gray-400 text-xs">{formattedDate(act.timestamp)}</Text>
                </View>
              </View>
            ))}
          </BlurView>
        </View>
      </ScrollView>
    </View>
  );
}