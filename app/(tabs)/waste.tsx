// app/(tabs)/waste.tsx
import { Text, View } from 'react-native';

export default function WasteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Waste Screen - Coming Soon</Text>
    </View>
  );
}
// import { BlurView } from 'expo-blur'
// import { useRouter } from 'expo-router'
// import { BarChart3, Bell, Car, ClipboardList, Clock, DollarSign, FileText, LogOut, MapPin, Package, Plus, Settings } from 'lucide-react'
// import React from 'react'
// import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
// import { images } from '../../constants/images'
// import { useAuth } from '../../lib/auth'
// import { useApp } from '../../lib/store'

// export default function SuperAdmin() {
//   const { totals, clients, employees, cars } = useApp()
//   const { user, logout } = useAuth()
//   const router = useRouter()
//   const branchName = "Main Branch"

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
//             await logout()
//             router.replace('/login')
//           }
//         }
//       ]
//     )
//   }
//   const todayStats = {
//     revenue: 25000,
//     jobsCompleted: 12,
//     pendingJobs: 5,
//     expenses: 5000,
//     staffAttendance: 8 // out of 10
//   }
//   // Mock data for inventory and expenses
//   const lowStockItems = [
//     { id: 'i1', name: 'Engine Oil', quantity: 3 },
//     { id: 'i2', name: 'Brake Pads', quantity: 5 },
//   ]

//   const expiringItems = [
//     { id: 'e1', name: 'Coolant', expiryDate: '2025-09-01' },
//   ]

//   const expenseBreakdown = [
//     { category: 'Parts', value: 50000, color: '#DC2626' },
//     { category: 'Salaries', value: 30000, color: '#2563EB' },
//     { category: 'Utilities', value: 20000, color: '#FBBF24' },
//   ]

//   // Mock data for work orders and appointments
//   const activeWorkOrders = cars.filter(car => car.working)
//   const upcomingAppointments = [
//     { id: 'a1', customer: 'John Doe', date: '2025-08-20', service: 'Oil Change' },
//     { id: 'a2', customer: 'Jane Smith', date: '2025-08-22', service: 'Brake Inspection' },
//   ]

//   // Mock data for employee performance and payroll
//   const payrollOverview = [
//     { id: 'p1', employee: 'Mark Otieno', status: 'Paid' },
//     { id: 'p2', employee: 'Linda Mwangi', status: 'Pending' },
//   ]

//   // Mock data for customer insights
//   const topCustomers = clients.slice(0, 3)
//   const newCustomersThisWeek = clients.filter(c => new Date(c.createdAt) > new Date('2025-08-10'))
//   const outstandingBalances = clients.filter(c => c.pending)

//   // Mock data for recent activity feed
//   const recentActivities = [
//     { id: 'r1', type: 'Payment', description: 'Payment received from John Doe', date: '2025-08-18' },
//     { id: 'r2', type: 'Job', description: 'Brake replacement completed for Jane Smith', date: '2025-08-17' },
//     { id: 'r3', type: 'Inventory', description: 'Low stock alert for Engine Oil', date: '2025-08-16' },
//     { id: 'r4', type: 'Staff', description: 'Mark Otieno logged in', date: '2025-08-15' },
//   ]

//   const stats = [
//     { id: 'rev', title: "Initial Bank Balance", value: `KES ${totals.revenue.toLocaleString()}`, Icon: DollarSign },
//     { id: 'jobs', title: "Gross Bank Blance", value: '15000', Icon: ClipboardList },
//     { id: 'cars', title: "Petty cash balance", value: totals.carsWorked.toString(), Icon: Car },
//     { id: 'stock', title: "paybill balance", value: lowStockItems.length.toString(), Icon: Package },
//     { id: 'pending', title: "Pending Payments", value: totals.pendingPayments.toString(), Icon: Clock },
//   ]

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       {/* Header / Top Bar */}
//       <View className="flex-row items-center justify-between px-6 mb-4">
//         <View className="flex-row items-center space-x-4">
//           <Image source={images.tristarlogo} style={{ width: 104, height: 44 }} />
//           <Text className="text-white text-xl font-bold">Super Admin Dashboard</Text>
//         </View>
//         <View className="flex-row items-center space-x-6">
//           <TouchableOpacity>
//             <Bell size={24} color="red" />
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
//             <MapPin size={16} color="green" />
//             <Text className="text-white">{branchName}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Settings size={24} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleLogout} className="flex-row items-center space-x-1 bg-red-600 rounded px-3 py-1">
//             <LogOut size={16} color="white" />
//             <Text className="text-white">Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
//         {/* Key Metrics */}
//         <View className="flex-row flex-wrap gap-4">
//           {stats.map(({ id, title, value, Icon }) => (
//             <BlurView key={id} intensity={50}  className="rounded-2xl bg-white/10 p-5 flex-row items-center justify-between w-[48%]">
//               <View>
//                 <Text className="text-gray-300">{title}</Text>
//                 <Text className="text-2xl font-bold text-white">{value}</Text>
//               </View>
//               <Icon size={28} color="#DC2626" />
//             </BlurView>
//           ))}
//         </View>

//         {/* Financial Overview */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8 relative overflow-hidden">
//           <View className="absolute -inset-2 bg-red-500 rounded-2xl blur-xl opacity-15" />
//           <View className="flex-row items-center justify-between mb-6">
//             <Text className="text-xl font-bold text-white">Financial Overview</Text>
//             <BarChart3 size={24} color="#DC2626" />
//           </View>
//           {/* Placeholder for charts */}
//           <View className="flex-row space-x-4">
//             <View className="flex-1 h-40 bg-[#111827] rounded-lg" />
//             <View className="flex-1 h-40 bg-[#111827] rounded-lg" />
//           </View>
//           <Text className="text-white mt-2">Cash Flow: KES 150,000</Text>
//         </BlurView>

//         {/* Garage Operations */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Garage Operations</Text>
//           <Text className="text-white font-semibold mb-2">Active Work Orders</Text>
//           {activeWorkOrders.map(order => (
//             <View key={order.id} className="bg-white/10 rounded p-3 mb-2">
//               <Text className="text-white">{order.model} - {order.work}</Text>
//               <Text className="text-gray-300 text-sm">Status: {order.working ? 'In Progress' : 'Pending'}</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">Upcoming Appointments</Text>
//           {upcomingAppointments.map(app => (
//             <View key={app.id} className="bg-white/10 rounded p-3 mb-2">
//               <Text className="text-white">{app.customer} - {app.service}</Text>
//               <Text className="text-gray-300 text-sm">Date: {app.date}</Text>
//             </View>
//           ))}
//           <TouchableOpacity className="bg-red-600 rounded p-3 mt-4 items-center">
//             <Text className="text-white font-semibold">Add New Job</Text>
//           </TouchableOpacity>
//         </BlurView>

//         {/* Inventory Snapshot */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Inventory Snapshot</Text>
//           <Text className="text-white font-semibold mb-2">Low Stock Alerts</Text>
//           {lowStockItems.map(item => (
//             <View key={item.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
//               <Text className="text-white">{item.name}</Text>
//               <Text className="text-red-500 font-bold">{item.quantity}</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">Expiring Items</Text>
//           {expiringItems.map(item => (
//             <View key={item.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
//               <Text className="text-white">{item.name}</Text>
//               <Text className="text-yellow-400 font-bold">{item.expiryDate}</Text>
//             </View>
//           ))}
//           <TouchableOpacity className="bg-red-600 rounded p-3 mt-4 items-center">
//             <Text className="text-white font-semibold">Manage Suppliers / Orders</Text>
//           </TouchableOpacity>
//         </BlurView>

//         {/* Employee Management */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Employee Management</Text>
//           <Text className="text-white font-semibold mb-2">Attendance Summary</Text>
//           {employees.map(emp => (
//             <View key={emp.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
//               <Text className="text-white">{emp.name}</Text>
//               <Text className="text-green-400">{emp.attendance.present} Present, {emp.attendance.missed} Missed</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">Payroll Overview</Text>
//           {payrollOverview.map(pay => (
//             <View key={pay.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
//               <Text className="text-white">{pay.employee}</Text>
//               <Text className={`font-bold ${pay.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{pay.status}</Text>
//             </View>
//           ))}
//         </BlurView>

//         {/* Customer Insights */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Customer Insights</Text>
//           <Text className="text-white font-semibold mb-2">Top Customers</Text>
//           {topCustomers.map(cust => (
//             <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3">
//               <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
//               <Text className="text-white">{cust.name}</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">New Customers This Week</Text>
//           {newCustomersThisWeek.map(cust => (
//             <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3">
//               <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
//               <Text className="text-white">{cust.name}</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">Outstanding Balances</Text>
//           {outstandingBalances.map(cust => (
//             <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3 justify-between">
//               <View className="flex-row items-center space-x-3">
//                 <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
//                 <Text className="text-white">{cust.name}</Text>
//               </View>
//               <Text className="text-red-500 font-bold">KES {cust.pendingAmount?.toLocaleString()}</Text>
//             </View>
//           ))}
//         </BlurView>

//         {/* Recent Activity Feed */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Recent Activity Feed</Text>
//           {recentActivities.map(act => (
//             <View key={act.id} className="bg-white/10 rounded p-3 mb-2">
//               <Text className="text-white font-semibold">{act.type}</Text>
//               <Text className="text-gray-300 text-sm">{act.description}</Text>
//               <Text className="text-gray-400 text-xs">{act.date}</Text>
//             </View>
//           ))}
//         </BlurView>
//       </ScrollView>

//       {/* Footer / Quick Actions */}
//       <View className="h-16 bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700">
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Job</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Expense</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Customer</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <FileText size={20} color="white" />
//           <Text className="text-white font-semibold">Reports</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// // import { useLocalSearchParams, useRouter } from 'expo-router';
// // import React, { useCallback, useEffect, useState } from 'react';
// // import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // import { useClientData } from '../../lib/pages/clientData';

// // export default function ClientDetails() {
// //   const router = useRouter();
// //   const { id } = useLocalSearchParams();
// //   const clientId = typeof id === 'string' ? id : '';
  
// //   const { clientDetails, loading, error, fetchClientDetails, updateClientDetails } = useClientData();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [editData, setEditData] = useState({
// //     first_name: '',
// //     last_name: '',
// //     email: '',
// //     phone_number: '', 
// //   });

// //   // Memoized fetch function
// //   const loadClientDetails = useCallback(() => {
// //     if (clientId) {
// //       fetchClientDetails(clientId);
// //     }
// //   }, [clientId, fetchClientDetails]);

// //   useEffect(() => {
// //     loadClientDetails();
// //   }, [loadClientDetails]);

// //   useEffect(() => {
// //     if (clientDetails?.customer) {
// //       setEditData({
// //         first_name: clientDetails.customer.first_name || '',
// //         last_name: clientDetails.customer.last_name || '',
// //         email: clientDetails.customer.email || '',
// //         phone_number: clientDetails.customer.phone_number || '', // Changed from 'phone'
// //       });
// //     }
// //   }, [clientDetails]);

// //   const handleSave = async () => {
// //     setIsSaving(true);
// //     try {
// //       if (clientId) {
// //         await updateClientDetails(clientId, editData);
// //         setIsEditing(false);
// //       }
// //     } catch (err) {
// //       console.error('Error saving:', err);
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     if (clientDetails?.customer) {
// //       setEditData({
// //         first_name: clientDetails.customer.first_name,
// //         last_name: clientDetails.customer.last_name,
// //         email: clientDetails.customer.email,
// //         phone_number: clientDetails.customer.phone_number, // Changed from 'phone'
// //       });
// //     }
// //     setIsEditing(false);
// //   };
  
// //   if (loading && !clientDetails) {
// //     return (
// //       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
// //         <ActivityIndicator size="large" color="#3b82f6" />
// //         <Text className="text-white text-lg mt-4">Loading client details...</Text>
// //       </View>
// //     );
// //   }
  
// //   if (error) {
// //     return (
// //       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
// //         <Text className="text-red-500 text-lg">Error: {error}</Text>
// //         <TouchableOpacity onPress={loadClientDetails} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
// //           <Text className="text-white">Retry</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }
  
// //   if (!clientDetails) {
// //     return (
// //       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
// //         <Text className="text-gray-400">Client not found</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
// //       <ScrollView>
// //         <TouchableOpacity onPress={() => router.back()} className="self-start mb-5 p-2 rounded-full">
// //           <Text className="text-blue-500 text-base">← Back to Clients</Text>
// //         </TouchableOpacity>

// //         {/* Rest of your component remains the same, but update phone references */}
// //         <View className="flex-col w-full md:w-1/3">
// //           <Text className="text-gray-400 font-bold mb-1">Phone:</Text>
// //           {isEditing ? (
// //             <TextInput
// //               className="bg-gray-700 text-white p-2 rounded"
// //               value={editData.phone_number} // Changed from 'phone'
// //               onChangeText={(text) => setEditData({ ...editData, phone_number: text })} // Changed from 'phone'
// //             />
// //           ) : (
// //             <Text className="text-white">{clientDetails.customer.phone_number}</Text> // Changed from 'phone'
// //           )}
// //         </View>

// //         {/* Add saving indicator */}
// //         {isSaving && (
// //           <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
// //             <ActivityIndicator size="large" color="#3b82f6" />
// //             <Text className="text-white mt-2">Saving...</Text>
// //           </View>
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // }


// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Car, DollarSign, Edit, Plus, Save, X } from 'lucide-react-native';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { useClientData } from '../../lib/pages/clientData';

// interface VehicleFormData {
//   make: string;
//   licence_plate: string;
//   engine_type: string;
//   notes: string;
//   mileage: string;
//   color: string;
// }

// export default function ClientDetails() {
//   const router = useRouter();
//   const { id } = useLocalSearchParams();
//   const clientId = typeof id === 'string' ? id : '';
  
//   const { 
//     clientDetails, 
//     clientVehicles, 
//     clientServices, 
//     loading, 
//     error, 
//     fetchClientDetails, 
//     fetchClientVehicles, 
//     fetchClientServices,
//     updateClientDetails, 
//     updateClientVehicle 
//   } = useClientData();
  
//   const [isEditingClient, setIsEditingClient] = useState(false);
//   const [isEditingVehicle, setIsEditingVehicle] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [clientEditData, setClientEditData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone_number: '',
//     address: '',
//   });
  
//   const [vehicleEditData, setVehicleEditData] = useState<VehicleFormData>({
//     make: '',
//     licence_plate: '',
//     engine_type: '',
//     notes: '',
//     mileage: '',
//     color: '',
//   });

//   const loadClientData = useCallback(() => {
//     if (clientId) {
//       fetchClientDetails(clientId);
//       fetchClientVehicles(clientId);
//       fetchClientServices(clientId);
//     }
//   }, [clientId, fetchClientDetails, fetchClientVehicles, fetchClientServices]);

//   useEffect(() => {
//     loadClientData();
//   }, [loadClientData]);

//   useEffect(() => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name || '',
//         last_name: clientDetails.customer.last_name || '',
//         email: clientDetails.customer.email || '',
//         phone_number: clientDetails.customer.phone_number || '',
//         address: clientDetails.customer.address || '',
//       });
//     }
//   }, [clientDetails]);

//   const handleSaveClient = async () => {
//     setIsSaving(true);
//     try {
//       if (clientId) {
//         await updateClientDetails(clientId, clientEditData);
//         setIsEditingClient(false);
//         Alert.alert('Success', 'Client details updated successfully');
//       }
//     } catch (err) {
//       console.error('Error saving client:', err);
//       Alert.alert('Error', 'Failed to update client details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelClientEdit = () => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name,
//         last_name: clientDetails.customer.last_name,
//         email: clientDetails.customer.email,
//         phone_number: clientDetails.customer.phone_number,
//         address: clientDetails.customer.address || '',
//       });
//     }
//     setIsEditingClient(false);
//   };

//   const handleEditVehicle = (vehicle: any) => {
//     setVehicleEditData({
//       make: vehicle.make || '',
//       licence_plate: vehicle.licence_plate || '',
//       engine_type: vehicle.engine_type || '',
//       notes: vehicle.notes || '',
//       mileage: vehicle.mileage?.toString() || '',
//       color: vehicle.color || '',
//     });
//     setIsEditingVehicle(vehicle.id);
//   };

//   const handleSaveVehicle = async () => {
//     if (!isEditingVehicle) return;
    
//     setIsSaving(true);
//     try {
//       await updateClientVehicle(isEditingVehicle, vehicleEditData);
//       setIsEditingVehicle(null);
//       Alert.alert('Success', 'Vehicle details updated successfully');
//       fetchClientVehicles(clientId); // Refresh the list
//     } catch (err) {
//       console.error('Error saving vehicle:', err);
//       Alert.alert('Error', 'Failed to update vehicle details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelVehicleEdit = () => {
//     setIsEditingVehicle(null);
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   if (loading && !clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text className="text-white text-lg mt-4">Loading client details...</Text>
//       </View>
//     );
//   }
  
//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-red-500 text-lg">Error: {error}</Text>
//         <TouchableOpacity onPress={loadClientData} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
//           <Text className="text-white">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
  
//   if (!clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-gray-400">Client not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
//       {isSaving && (
//         <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
//           <ActivityIndicator size="large" color="#3b82f6" />
//           <Text className="text-white mt-2">Saving...</Text>
//         </View>
//       )}
      
//       <ScrollView className="flex-1">
//         <View className="flex-row items-center justify-between mb-6">
//           <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full">
//             <Text className="text-blue-500 text-base">← Back to Clients</Text>
//           </TouchableOpacity>
//           <Text className="text-white text-xl font-bold">Client Details</Text>
//           <View className="w-10" /> {/* Spacer for balance */}
//         </View>

//         {/* Client Information Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Client Information</Text>
//             {!isEditingClient ? (
//               <TouchableOpacity onPress={() => setIsEditingClient(true)}>
//                 <Edit size={20} color="#3b82f6" />
//               </TouchableOpacity>
//             ) : (
//               <View className="flex-row space-x-2">
//                 <TouchableOpacity onPress={handleSaveClient}>
//                   <Save size={20} color="#10b981" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleCancelClientEdit}>
//                   <X size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>

//           <View className="space-y-3">
//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">First Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.first_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, first_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.first_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Last Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.last_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, last_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.last_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Email:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.email}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, email: text })}
//                   keyboardType="email-address"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.email}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Phone:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.phone_number}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, phone_number: text })}
//                   keyboardType="phone-pad"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.phone_number}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Address:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.address}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, address: text })}
//                   multiline
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.address || 'N/A'}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Total Spent:</Text>
//               <Text className="text-green-400 flex-1">
//                 {formatCurrency(clientDetails.customer.total_spent || 0)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Vehicles Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Vehicles</Text>
//             <TouchableOpacity onPress={() => router.push({ 
//               pathname: '/AddVehicle', 
//               params: { clientId } 
//             })}>
//               <Plus size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>

//           {clientVehicles && clientVehicles.length > 0 ? (
//             clientVehicles.map((vehicle) => (
//               <View key={vehicle.id} className="bg-gray-700 rounded-lg p-3 mb-3">
//                 {isEditingVehicle === vehicle.id ? (
//                   <View className="space-y-2">
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Make:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.make}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, make: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Plate:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.licence_plate}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, licence_plate: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Engine:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.engine_type}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, engine_type: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Mileage:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.mileage}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, mileage: text })}
//                         keyboardType="numeric"
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Color:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.color}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, color: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Notes:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.notes}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, notes: text })}
//                         multiline
//                       />
//                     </View>
//                     <View className="flex-row justify-end space-x-2 mt-2">
//                       <TouchableOpacity 
//                         onPress={handleSaveVehicle}
//                         className="bg-green-600 px-3 py-1 rounded"
//                       >
//                         <Text className="text-white">Save</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity 
//                         onPress={handleCancelVehicleEdit}
//                         className="bg-red-600 px-3 py-1 rounded"
//                       >
//                         <Text className="text-white">Cancel</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ) : (
//                   <>
//                     <View className="flex-row justify-between items-start">
//                       <View className="flex-1">
//                         <View className="flex-row items-center mb-1">
//                           <Car size={16} color="#9ca3af" className="mr-2" />
//                           <Text className="text-white font-bold text-lg">
//                             {vehicle.make} {vehicle.color && `(${vehicle.color})`}
//                           </Text>
//                         </View>
//                         <Text className="text-gray-400 text-sm">Plate: {vehicle.licence_plate}</Text>
//                         {vehicle.engine_type && (
//                           <Text className="text-gray-400 text-sm">Engine: {vehicle.engine_type}</Text>
//                         )}
//                         {vehicle.mileage && (
//                           <Text className="text-gray-400 text-sm">Mileage: {vehicle.mileage.toLocaleString()} miles</Text>
//                         )}
//                         {vehicle.notes && (
//                           <Text className="text-gray-400 text-sm mt-1">Notes: {vehicle.notes}</Text>
//                         )}
//                       </View>
//                       <TouchableOpacity onPress={() => handleEditVehicle(vehicle)}>
//                         <Edit size={18} color="#3b82f6" />
//                       </TouchableOpacity>
//                     </View>
//                   </>
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text className="text-gray-400 text-center py-4">No vehicles found for this client</Text>
//           )}
//         </View>

//         {/* Services Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Service History</Text>
//             <TouchableOpacity onPress={() => router.push({ 
//               pathname: '/AddService', 
//               params: { clientId } 
//             })}>
//               <Plus size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>

//           {clientServices && clientServices.length > 0 ? (
//             clientServices.map((service) => (
//               <View key={service.id} className="bg-gray-700 rounded-lg p-3 mb-3">
//                 <View className="flex-row justify-between items-start mb-2">
//                   <Text className="text-white font-bold">{service.service_type}</Text>
//                   <View className="flex-row items-center">
//                     <DollarSign size={14} color={service.paid_status ? "#10b981" : "#ef4444"} />
//                     <Text className={`ml-1 ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                       {formatCurrency(service.service_cost || 0)}
//                     </Text>
//                     <Text className={`ml-2 text-xs ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                       {service.paid_status ? 'Paid' : 'Unpaid'}
//                     </Text>
//                   </View>
//                 </View>
                
//                 <Text className="text-gray-400 text-sm">
//                   Date: {formatDate(service.created_at)}
//                 </Text>
                
//                 {service.notes && (
//                   <Text className="text-gray-400 text-sm mt-1">Notes: {service.notes}</Text>
//                 )}
                
//                 {service.service_expenses && service.service_expenses !== '0' && (
//                   <Text className="text-gray-400 text-sm mt-1">
//                     Expenses: {formatCurrency(parseFloat(service.service_expenses))}
//                   </Text>
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text className="text-gray-400 text-center py-4">No service history found</Text>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }


// import { Car, DollarSign, Edit, Plus, Save, X } from 'lucide-react-native';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useClientData } from '../../lib/pages/clientData';

// interface VehicleFormData {
//   make: string;
//   licence_plate: string;
//   engine_type: string;
//   notes: string;
//   mileage: number | string;
//   color: string;
// }

// interface ClientDetailsProps {
//   clientId: string;
//   onGoBack: () => void;
//   onAddVehicle: (clientId: string) => void;
//   onAddService: (clientId: string) => void;
// }

// export default function ClientDetails({ clientId, onGoBack, onAddVehicle, onAddService }: ClientDetailsProps) {
//   const {
//     clientDetails,
//     clientVehicles,
//     clientServices,
//     loading,
//     error,
//     fetchClientDetails,
//     fetchClientVehicles,
//     fetchClientServices,
//     updateClientDetails,
//     updateClientVehicle,
//   } = useClientData();
  
//   const [isEditingClient, setIsEditingClient] = useState(false);
//   const [isEditingVehicle, setIsEditingVehicle] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [clientEditData, setClientEditData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone_number: '',
//     address: '',
//   });
  
//   const [vehicleEditData, setVehicleEditData] = useState<VehicleFormData>({
//     make: '',
//     licence_plate: '',
//     engine_type: '',
//     notes: '',
//     mileage: '',
//     color: '',
//   });

//   const loadClientData = useCallback(() => {
//     if (clientId) {
//       fetchClientDetails(clientId);
//       fetchClientVehicles(clientId);
//       fetchClientServices(clientId);
//     }
//   }, [clientId, fetchClientDetails, fetchClientVehicles, fetchClientServices]);

//   useEffect(() => {
//     loadClientData();
//   }, [loadClientData]);

//   useEffect(() => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name || '',
//         last_name: clientDetails.customer.last_name || '',
//         email: clientDetails.customer.email || '',
//         phone_number: clientDetails.customer.phone_number || '',
//         address: clientDetails.customer.address || '',
//       });
//     }
//   }, [clientDetails]);

//   const handleSaveClient = async () => {
//     setIsSaving(true);
//     try {
//       if (clientId) {
//         await updateClientDetails(clientId, clientEditData);
//         setIsEditingClient(false);
//         Alert.alert('Success', 'Client details updated successfully');
//       }
//     } catch (err) {
//       console.error('Error saving client:', err);
//       Alert.alert('Error', 'Failed to update client details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelClientEdit = () => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name,
//         last_name: clientDetails.customer.last_name,
//         email: clientDetails.customer.email,
//         phone_number: clientDetails.customer.phone_number,
//         address: clientDetails.customer.address || '',
//       });
//     }
//     setIsEditingClient(false);
//   };

//   const handleEditVehicle = (vehicle: any) => {
//     setVehicleEditData({
//       make: vehicle.make || '',
//       licence_plate: vehicle.licence_plate || '',
//       engine_type: vehicle.engine_type || '',
//       notes: vehicle.notes || '',
//       mileage: vehicle.mileage || '',
//       color: vehicle.color || '',
//     });
//     setIsEditingVehicle(vehicle.id);
//   };

//   const handleSaveVehicle = async () => {
//     if (!isEditingVehicle) return;
    
//     setIsSaving(true);
//     try {
//           const updateData = {
//       ...vehicleEditData,
//       mileage: vehicleEditData.mileage ? Number(vehicleEditData.mileage) : null
//     };
    
//       await updateClientVehicle(isEditingVehicle,  updateData);
//       setIsEditingVehicle(null);
//       Alert.alert('Success', 'Vehicle details updated successfully');
//       fetchClientVehicles(clientId); // Refresh the list
//     } catch (err) {
//       console.error('Error saving vehicle:', err);
//       Alert.alert('Error', 'Failed to update vehicle details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelVehicleEdit = () => {
//     setIsEditingVehicle(null);
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   if (loading && !clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text className="text-white text-lg mt-4">Loading client details...</Text>
//       </View>
//     );
//   }
  
//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-red-500 text-lg">Error: {error}</Text>
//         <TouchableOpacity onPress={loadClientData} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
//           <Text className="text-white">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
  
//   if (!clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-gray-400">Client not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
//       {isSaving && (
//         <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
//           <ActivityIndicator size="large" color="#3b82f6" />
//           <Text className="text-white mt-2">Saving...</Text>
//         </View>
//       )}
      
//       <ScrollView className="flex-1">
//         <View className="flex-row items-center justify-between mb-6">
//           <TouchableOpacity onPress={onGoBack} className="p-2 rounded-full">
//             <Text className="text-blue-500 text-base">← Back to Clients</Text>
//           </TouchableOpacity>
//           <Text className="text-white text-xl font-bold">Client Details</Text>
//           <View className="w-10" />
//         </View>

//         {/* Client Information Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Client Information</Text>
//             {!isEditingClient ? (
//               <TouchableOpacity onPress={() => setIsEditingClient(true)}>
//                 <Edit size={20} color="#3b82f6" />
//               </TouchableOpacity>
//             ) : (
//               <View className="flex-row space-x-2">
//                 <TouchableOpacity onPress={handleSaveClient}>
//                   <Save size={20} color="#10b981" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleCancelClientEdit}>
//                   <X size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>

//           <View className="space-y-3">
//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">First Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.first_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, first_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.first_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Last Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.last_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, last_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.last_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Email:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.email}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, email: text })}
//                   keyboardType="email-address"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.email}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Phone:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.phone_number}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, phone_number: text })}
//                   keyboardType="phone-pad"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.phone_number}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Address:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.address}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, address: text })}
//                   multiline
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.address || 'N/A'}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Total Spent:</Text>
//               <Text className="text-green-400 flex-1">
//                 {formatCurrency(clientDetails.customer.total_spent || 0)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Vehicles Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Vehicles</Text>
//             <TouchableOpacity onPress={() => onAddVehicle(clientId)}>
//               <Plus size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>

//           {clientVehicles && clientVehicles.length > 0 ? (
//             clientVehicles.map((vehicle) => (
//               <View key={vehicle.id} className="bg-gray-700 rounded-lg p-3 mb-3">
//                 {isEditingVehicle === vehicle.id ? (
//                   <View className="space-y-2">
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Make:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.make}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, make: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Plate:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.licence_plate}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, licence_plate: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Engine:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.engine_type}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, engine_type: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Mileage:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.mileage}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, mileage: text })}
//                         keyboardType="numeric"
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Color:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.color}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, color: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Notes:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.notes}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, notes: text })}
//                         multiline
//                       />
//                     </View>
//                     <View className="flex-row justify-end space-x-2 mt-2">
//                       <TouchableOpacity
//                         onPress={handleSaveVehicle}
//                         className="bg-green-600 px-3 py-1 rounded"
//                       >
//                         <Text className="text-white">Save</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         onPress={handleCancelVehicleEdit}
//                         className="bg-red-600 px-3 py-1 rounded"
//                       >
//                         <Text className="text-white">Cancel</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ) : (
//                   <>
//                     <View className="flex-row justify-between items-start">
//                       <View className="flex-1">
//                         <View className="flex-row items-center mb-1">
//                           <Car size={16} color="#9ca3af" className="mr-2" />
//                           <Text className="text-white font-bold text-lg">
//                             {vehicle.make} {vehicle.color && `(${vehicle.color})`}
//                           </Text>
//                         </View>
//                         <Text className="text-gray-400 text-sm">Plate: {vehicle.licence_plate}</Text>
//                         {vehicle.engine_type && (
//                           <Text className="text-gray-400 text-sm">Engine: {vehicle.engine_type}</Text>
//                         )}
//                         {vehicle.mileage && (
//                           <Text className="text-gray-400 text-sm">Mileage: {vehicle.mileage.toLocaleString()} miles</Text>
//                         )}
//                         {vehicle.notes && (
//                           <Text className="text-gray-400 text-sm mt-1">Notes: {vehicle.notes}</Text>
//                         )}
//                       </View>
//                       <TouchableOpacity onPress={() => handleEditVehicle(vehicle)}>
//                         <Edit size={18} color="#3b82f6" />
//                       </TouchableOpacity>
//                     </View>
//                   </>
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text className="text-gray-400 text-center py-4">No vehicles found for this client</Text>
//           )}
//         </View>

//         {/* Services Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Service History</Text>
//             <TouchableOpacity onPress={() => onAddService(clientId)}>
//               <Plus size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>

//           {clientServices && clientServices.length > 0 ? (
//             clientServices.map((service) => (
//               <View key={service.id} className="bg-gray-700 rounded-lg p-3 mb-3">
//                 <View className="flex-row justify-between items-start mb-2">
//                   <Text className="text-white font-bold">{service.service_type}</Text>
//                   <View className="flex-row items-center">
//                     <DollarSign size={14} color={service.paid_status ? "#10b981" : "#ef4444"} />
//                     <Text className={`ml-1 ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                       {formatCurrency(service.service_cost || 0)}
//                     </Text>
//                     <Text className={`ml-2 text-xs ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                       {service.paid_status ? 'Paid' : 'Unpaid'}
//                     </Text>
//                   </View>
//                 </View>
                
//                 <Text className="text-gray-400 text-sm">
//                   Date: {formatDate(service.created_at)}
//                 </Text>
                
//                 {service.notes && (
//                   <Text className="text-gray-400 text-sm mt-1">Notes: {service.notes}</Text>
//                 )}
                
//                 {service.service_expenses && service.service_expenses !== '0' && (
//                   <Text className="text-gray-400 text-sm mt-1">
//                     Expenses: {formatCurrency(parseFloat(service.service_expenses))}
//                   </Text>
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text className="text-gray-400 text-center py-4">No service history found</Text>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// import { Car, DollarSign, Edit, Plus, Save, X } from 'lucide-react-native';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useClientData } from '../../lib/pages/clientData';

// interface VehicleFormData {
//   make: string;
//   licence_plate: string;
//   engine_type: string;
//   notes: string;
//   mileage: string; // Fixed: Allow both number and string
//   color: string;
// }

// interface ClientDetailsProps {
//   clientId: string;
//   onGoBack: () => void;
//   onAddVehicle: (clientId: string) => void;
//   onAddService: (clientId: string) => void;
// }

// export default function ClientDetails({ clientId, onGoBack, onAddVehicle, onAddService }: ClientDetailsProps) {
//   const {
//     clientDetails,
//     clientVehicles,
//     clientServices,
//     loading,
//     error,
//     fetchClientDetails,
//     fetchClientVehicles,
//     fetchClientServices,
//     updateClientDetails,
//     updateClientVehicle,
//   } = useClientData();
  
//   const [isEditingClient, setIsEditingClient] = useState(false);
//   const [isEditingVehicle, setIsEditingVehicle] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [clientEditData, setClientEditData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone_number: '',
//     address: '',
//   });
  
//   const [vehicleEditData, setVehicleEditData] = useState<VehicleFormData>({
//     make: '',
//     licence_plate: '',
//     engine_type: '',
//     notes: '',
//     mileage: '', 
//     color: '',
//   });

//   const loadClientData = useCallback(() => {
//     if (clientId) {
//       fetchClientDetails(clientId);
//       fetchClientVehicles(clientId);
//       fetchClientServices(clientId);
//     }
//   }, [clientId, fetchClientDetails, fetchClientVehicles, fetchClientServices]);

//   useEffect(() => {
//     loadClientData();
//   }, [loadClientData]);

//   useEffect(() => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name || '',
//         last_name: clientDetails.customer.last_name || '',
//         email: clientDetails.customer.email || '',
//         phone_number: clientDetails.customer.phone_number || '',
//         address: clientDetails.customer.address || '',
//       });
//     }
//   }, [clientDetails]);

//   const handleSaveClient = async () => {
//     setIsSaving(true);
//     try {
//       if (clientId) {
//         await updateClientDetails(clientId, clientEditData);
//         setIsEditingClient(false);
//         Alert.alert('Success', 'Client details updated successfully');
//       }
//     } catch (err) {
//       console.error('Error saving client:', err);
//       Alert.alert('Error', 'Failed to update client details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelClientEdit = () => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name,
//         last_name: clientDetails.customer.last_name,
//         email: clientDetails.customer.email,
//         phone_number: clientDetails.customer.phone_number,
//         address: clientDetails.customer.address || '',
//       });
//     }
//     setIsEditingClient(false);
//   };

//   const handleEditVehicle = (vehicle: any) => {
//     setVehicleEditData({
//       make: vehicle.make || '',
//       licence_plate: vehicle.licence_plate || '',
//       engine_type: vehicle.engine_type || '',
//       notes: vehicle.notes || '',
// mileage: vehicle.mileage ? String(vehicle.mileage) : '', // Keep as number or empty string
//       color: vehicle.color || '',
//     });
//     setIsEditingVehicle(vehicle.id);
//   };

//   const handleSaveVehicle = async () => {
//     if (!isEditingVehicle) return;
    
//     setIsSaving(true);
//     try {
//       // Convert mileage string to number if it exists
//       const updateData = {
//         ...vehicleEditData,
//         mileage: vehicleEditData.mileage ? Number(vehicleEditData.mileage) : null
//       };
      
//       await updateClientVehicle(isEditingVehicle, updateData);
//       setIsEditingVehicle(null);
//       Alert.alert('Success', 'Vehicle details updated successfully');
//       fetchClientVehicles(clientId); // Refresh the list
//     } catch (err) {
//       console.error('Error saving vehicle:', err);
//       Alert.alert('Error', 'Failed to update vehicle details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelVehicleEdit = () => {
//     setIsEditingVehicle(null);
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   if (loading && !clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text className="text-white text-lg mt-4">Loading client details...</Text>
//       </View>
//     );
//   }
  
//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-red-500 text-lg">Error: {error}</Text>
//         <TouchableOpacity onPress={loadClientData} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
//           <Text className="text-white">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
  
//   if (!clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-gray-400">Client not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
//       {isSaving && (
//         <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
//           <ActivityIndicator size="large" color="#3b82f6" />
//           <Text className="text-white mt-2">Saving...</Text>
//         </View>
//       )}
      
//       <ScrollView className="flex-1">
//         <View className="flex-row items-center justify-between mb-6">
//           <TouchableOpacity onPress={onGoBack} className="p-2 rounded-full">
//             <Text className="text-blue-500 text-base">← Back to Clients</Text>
//           </TouchableOpacity>
//           <Text className="text-white text-xl font-bold">Client Details</Text>
//           <View className="w-10" />
//         </View>

//         {/* Client Information Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Client Information</Text>
//             {!isEditingClient ? (
//               <TouchableOpacity onPress={() => setIsEditingClient(true)}>
//                 <Edit size={20} color="#3b82f6" />
//               </TouchableOpacity>
//             ) : (
//               <View className="flex-row space-x-2">
//                 <TouchableOpacity onPress={handleSaveClient}>
//                   <Save size={20} color="#10b981" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleCancelClientEdit}>
//                   <X size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>

//           <View className="space-y-3">
//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">First Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.first_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, first_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.first_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Last Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.last_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, last_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.last_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Email:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.email}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, email: text })}
//                   keyboardType="email-address"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.email}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Phone:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.phone_number}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, phone_number: text })}
//                   keyboardType="phone-pad"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.phone_number}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Address:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.address}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, address: text })}
//                   multiline
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.address || 'N/A'}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Total Spent:</Text>
//               <Text className="text-green-400 flex-1">
//                 {formatCurrency(clientDetails.customer.total_spent || 0)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Vehicles Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Vehicles</Text>
//             <TouchableOpacity onPress={() => onAddVehicle(clientId)}>
//               <Plus size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>

//           {clientVehicles && clientVehicles.length > 0 ? (
//             clientVehicles.map((vehicle) => (
//               <View key={vehicle.id} className="bg-gray-700 rounded-lg p-3 mb-3">
//                 {isEditingVehicle === vehicle.id ? (
//                   <View className="space-y-2">
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Make:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.make}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, make: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Plate:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.licence_plate}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, licence_plate: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Engine:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.engine_type}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, engine_type: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Mileage:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.mileage.toString()} // Convert to string for TextInput
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, mileage: text })}
//                         keyboardType="numeric"
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Color:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.color}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, color: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Notes:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.notes}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, notes: text })}
//                         multiline
//                       />
//                     </View>
//                     <View className="flex-row justify-end space-x-2 mt-2">
//                       <TouchableOpacity
//                         onPress={handleSaveVehicle}
//                         className="bg-green-600 px-3 py-1 rounded"
//                       >
//                         <Text className="text-white">Save</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         onPress={handleCancelVehicleEdit}
//                         className="bg-red-600 px-3 py-1 rounded"
//                       >
//                         <Text className="text-white">Cancel</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ) : (
//                   <>
//                     <View className="flex-row justify-between items-start">
//                       <View className="flex-1">
//                         <View className="flex-row items-center mb-1">
//                           <Car size={16} color="#9ca3af" className="mr-2" />
//                           <Text className="text-white font-bold text-lg">
//                             {vehicle.make} {vehicle.color && `(${vehicle.color})`}
//                           </Text>
//                         </View>
//                         <Text className="text-gray-400 text-sm">Plate: {vehicle.licence_plate}</Text>
//                         {vehicle.engine_type && (
//                           <Text className="text-gray-400 text-sm">Engine: {vehicle.engine_type}</Text>
//                         )}
//                         {vehicle.mileage && (
//                           <Text className="text-gray-400 text-sm">
//                             Mileage: {typeof vehicle.mileage === 'number' 
//                               ? vehicle.mileage.toLocaleString() 
//                               : vehicle.mileage} miles
//                           </Text>
//                         )}
//                         {vehicle.notes && (
//                           <Text className="text-gray-400 text-sm mt-1">Notes: {vehicle.notes}</Text>
//                         )}
//                       </View>
//                       <TouchableOpacity onPress={() => handleEditVehicle(vehicle)}>
//                         <Edit size={18} color="#3b82f6" />
//                       </TouchableOpacity>
//                     </View>
//                   </>
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text className="text-gray-400 text-center py-4">No vehicles found for this client</Text>
//           )}
//         </View>

//         {/* Services Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Service History</Text>
//             <TouchableOpacity onPress={() => onAddService(clientId)}>
//               <Plus size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>

//           {clientServices && clientServices.length > 0 ? (
//             clientServices.map((service) => (
//               <View key={service.id} className="bg-gray-700 rounded-lg p-3 mb-3">
//                 <View className="flex-row justify-between items-start mb-2">
//                   <Text className="text-white font-bold">{service.service_type}</Text>
//                   <View className="flex-row items-center">
//                     <DollarSign size={14} color={service.paid_status ? "#10b981" : "#ef4444"} />
//                     <Text className={`ml-1 ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                       {formatCurrency(service.service_cost || 0)}
//                     </Text>
//                     <Text className={`ml-2 text-xs ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                       {service.paid_status ? 'Paid' : 'Unpaid'}
//                     </Text>
//                   </View>
//                 </View>
                
//                 <Text className="text-gray-400 text-sm">
//                   Date: {formatDate(service.created_at)}
//                 </Text>
                
//                 {service.notes && (
//                   <Text className="text-gray-400 text-sm mt-1">Notes: {service.notes}</Text>
//                 )}
                
//                 {service.service_expenses && service.service_expenses !== '0' && (
//                   <Text className="text-gray-400 text-sm mt-1">
//                     Expenses: {formatCurrency(parseFloat(service.service_expenses))}
//                   </Text>
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text className="text-gray-400 text-center py-4">No service history found</Text>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// ClientDetails.tsx - Fix the TypeScript errors


// import { BlurView } from 'expo-blur';
// import { useRouter } from 'expo-router';
// import { BarChart3, Bell, Car, ClipboardList, Clock, DollarSign, FileText, LogOut, MapPin, Package, Plus, Settings } from 'lucide-react';
// import React from 'react';
// import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { images } from '../../constants/images';
// import { useAuth } from '../../lib/auth';
// import { useSuperAdminData } from '../../lib/pages/useSuperAdminData';
// import { useApp } from '../../lib/store';

// export default function SuperAdmin() {
//   // Use the fetched data from the backend
//   const { stats, activities, workOrders, appointments, loading, error } = useSuperAdminData();
  
//   // Existing mock data and hooks
//   const { totals, clients, employees, cars } = useApp();
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
  
//   // MOCK DATA - This data is not available from the useSuperAdminData hook
//   // and will remain static until the backend provides it.
//   const lowStockItems = [
//     { id: 'i1', name: 'Engine Oil', quantity: 3 },
//     { id: 'i2', name: 'Brake Pads', quantity: 5 },
//   ];

//   const expiringItems = [
//     { id: 'e1', name: 'Coolant', expiryDate: '2025-09-01' },
//   ];

//   const expenseBreakdown = [
//     { category: 'Parts', value: 50000, color: '#DC2626' },
//     { category: 'Salaries', value: 30000, color: '#2563EB' },
//     { category: 'Utilities', value: 20000, color: '#FBBF24' },
//   ];

//   const payrollOverview = [
//     { id: 'p1', employee: 'Mark Otieno', status: 'Paid' },
//     { id: 'p2', employee: 'Linda Mwangi', status: 'Pending' },
//   ];

//   const topCustomers = clients.slice(0, 3);
//   const newCustomersThisWeek = clients.filter(c => new Date(c.createdAt) > new Date('2025-08-10'));
//   const outstandingBalances = clients.filter(c => c.pending);
//   // END MOCK DATA

//   if (loading) {
//     return <View className="flex-1 justify-center items-center bg-[#0A0F1E]"><Text className="text-white text-2xl">Loading...</Text></View>;
//   }

//   if (error) {
//     return <View className="flex-1 justify-center items-center bg-[#0A0F1E]"><Text className="text-red-500 text-2xl">Error: {error}</Text></View>;
//   }

//   // Map fetched data to the stats array for rendering
//   const dashboardStats = [
//     { id: 'rev', title: "Total Revenue", value: `KES ${(stats?.financials?.total_revenue || 0).toLocaleString()}`, Icon: DollarSign },
//     { id: 'trans', title: "Transaction Count", value: (stats?.financials?.transaction_count || 0).toString(), Icon: ClipboardList },
//     { id: 'cars', title: "Total Cars", value: (stats?.cars?.total_cars || 0).toString(), Icon: Car },
//     { id: 'lowStock', title: "Low Stock Items", value: (stats?.inventory?.low_stock_count || 0).toString(), Icon: Package },
//     { id: 'expenses', title: "Total Expenses", value: `KES ${(stats?.expenses?.total_expenses || 0).toLocaleString()}`, Icon: FileText },
//     { id: 'clients', title: "Total Clients", value: (stats?.clients?.total_clients || 0).toString(), Icon: Clock },
//   ];

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       {/* Header / Top Bar */}
//       <View className="flex-row items-center justify-between px-6 mb-4">
//         <View className="flex-row items-center space-x-4">
//           <Image source={images.tristarlogo} style={{ width: 104, height: 44 }} />
//           <Text className="text-white text-xl font-bold">Super Admin Dashboard</Text>
//         </View>
//         <View className="flex-row items-center space-x-6">
//           <TouchableOpacity>
//             <Bell size={24} color="red" />
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
//             <MapPin size={16} color="green" />
//             <Text className="text-white">{branchName}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Settings size={24} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleLogout} className="flex-row items-center space-x-1 bg-red-600 rounded px-3 py-1">
//             <LogOut size={16} color="white" />
//             <Text className="text-white">Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
//         {/* Key Metrics - Populated from backend stats */}
//         <View className="flex-row flex-wrap gap-4">
//           {dashboardStats.map(({ id, title, value, Icon }) => (
//             <BlurView key={id} intensity={50} className="rounded-2xl bg-white/10 p-5 flex-row items-center justify-between w-[48%]">
//               <View>
//                 <Text className="text-gray-300">{title}</Text>
//                 <Text className="text-2xl font-bold text-white">{value}</Text>
//               </View>
//               <Icon size={28} color="#DC2626" />
//             </BlurView>
//           ))}
//         </View>

//         {/* Financial Overview - Using backend stats */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8 relative overflow-hidden">
//           <View className="absolute -inset-2 bg-red-500 rounded-2xl blur-xl opacity-15" />
//           <View className="flex-row items-center justify-between mb-6">
//             <Text className="text-xl font-bold text-white">Financial Overview</Text>
//             <BarChart3 size={24} color="#DC2626" />
//           </View>
//           {/* Placeholder for charts */}
//           <View className="flex-row space-x-4">
//             <View className="flex-1 h-40 bg-[#111827] rounded-lg" />
//             <View className="flex-1 h-40 bg-[#111827] rounded-lg" />
//           </View>
//           <Text className="text-white mt-2">Total Revenue: KES {(stats?.financials?.total_revenue || 0).toLocaleString()}</Text>
//         </BlurView>

//         {/* Garage Operations - Populated from backend data */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Garage Operations</Text>
//           <Text className="text-white font-semibold mb-2">Active Work Orders</Text>
//           {workOrders?.map(order => (
//             <View key={order.id} className="bg-white/10 rounded p-3 mb-2">
//               <Text className="text-white">{order?.client_vehicles?.make} {order?.client_vehicles?.model}</Text>
//               <Text className="text-gray-300 text-sm">Status: {order.status}</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">Upcoming Appointments</Text>
//           {appointments?.map(app => (
//             <View key={app.id} className="bg-white/10 rounded p-3 mb-2">
//               <Text className="text-white">{app?.clients?.first_name} {app?.clients?.last_name} - {app.service_type}</Text>
//               <Text className="text-gray-300 text-sm">Date: {new Date(app.scheduled_time).toLocaleDateString()}</Text>
//             </View>
//           ))}
//           <TouchableOpacity className="bg-red-600 rounded p-3 mt-4 items-center">
//             <Text className="text-white font-semibold">Add New Job</Text>
//           </TouchableOpacity>
//         </BlurView>

//         {/* Inventory Snapshot - Still using mock data */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Inventory Snapshot</Text>
//           <Text className="text-white font-semibold mb-2">Low Stock Alerts</Text>
//           {lowStockItems.map(item => (
//             <View key={item.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
//               <Text className="text-white">{item.name}</Text>
//               <Text className="text-red-500 font-bold">{item.quantity}</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">Expiring Items</Text>
//           {expiringItems.map(item => (
//             <View key={item.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
//               <Text className="text-white">{item.name}</Text>
//               <Text className="text-yellow-400 font-bold">{item.expiryDate}</Text>
//             </View>
//           ))}
//           <TouchableOpacity className="bg-red-600 rounded p-3 mt-4 items-center">
//             <Text className="text-white font-semibold">Manage Suppliers / Orders</Text>
//           </TouchableOpacity>
//         </BlurView>

//         {/* Employee Management - Still using mock data */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Employee Management</Text>
//           <Text className="text-white font-semibold mb-2">Attendance Summary</Text>
//           {employees.map(emp => (
//             <View key={emp.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
//               <Text className="text-white">{emp.name}</Text>
//               <Text className="text-green-400">{emp.attendance.present} Present, {emp.attendance.missed} Missed</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">Payroll Overview</Text>
//           {payrollOverview.map(pay => (
//             <View key={pay.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
//               <Text className="text-white">{pay.employee}</Text>
//               <Text className={`font-bold ${pay.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{pay.status}</Text>
//             </View>
//           ))}
//         </BlurView>

//         {/* Customer Insights - Still using mock data */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Customer Insights</Text>
//           <Text className="text-white font-semibold mb-2">Top Customers</Text>
//           {topCustomers.map(cust => (
//             <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3">
//               <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
//               <Text className="text-white">{cust.name}</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">New Customers This Week</Text>
//           {newCustomersThisWeek.map(cust => (
//             <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3">
//               <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
//               <Text className="text-white">{cust.name}</Text>
//             </View>
//           ))}
//           <Text className="text-white font-semibold mt-4 mb-2">Outstanding Balances</Text>
//           {outstandingBalances.map(cust => (
//             <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3 justify-between">
//               <View className="flex-row items-center space-x-3">
//                 <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
//                 <Text className="text-white">{cust.name}</Text>
//               </View>
//               <Text className="text-red-500 font-bold">KES {cust.pendingAmount?.toLocaleString()}</Text>
//             </View>
//           ))}
//         </BlurView>

//         {/* Recent Activity Feed - Populated from backend data */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
//           <Text className="text-xl font-bold text-white mb-4">Recent Activity Feed</Text>
//           {activities?.map(act => (
//             <View key={act.id} className="bg-white/10 rounded p-3 mb-2">
//               <Text className="text-white font-semibold">{act.activity_type}</Text>
//               <Text className="text-gray-300 text-sm">{act.description}</Text>
//               <Text className="text-gray-400 text-xs">{new Date(act.created_at).toLocaleDateString()}</Text>
//             </View>
//           ))}
//         </BlurView>
//       </ScrollView>

//       {/* Footer / Quick Actions */}
//       <View className="h-16 bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700">
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Job</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Expense</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Customer</Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <FileText size={20} color="white" />
//           <Text className="text-white font-semibold">Reports</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Car, DollarSign, Edit, Plus, Save, X } from 'lucide-react-native';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useClientData } from '../../lib/pages/clientData';

// interface VehicleFormData {
//   make: string;
//   licence_plate: string;
//   engine_type: string;
//   notes: string;
//   mileage: string; // Keep as string for form input
//   color: string;
// }

// interface ClientDetailsProps {
//   clientId: string;
//   onGoBack: () => void;
//   onAddVehicle: (clientId: string) => void;
//   onAddService: (clientId: string) => void;
// }

// export default function ClientDetails({ onGoBack, onAddVehicle, onAddService }: Omit<ClientDetailsProps, 'clientId'>) {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//     const actualClientId = id as string;
//   const {
//     clientDetails,
//     clientVehicles,
//     clientServices,
//     loading,
//     error,
//     fetchClientDetails,
//     fetchClientVehicles,
//     fetchClientServices,
//     updateClientDetails,
//     updateClientVehicle,
//   } = useClientData();
  
//   const [isEditingClient, setIsEditingClient] = useState(false);
//   const [isEditingVehicle, setIsEditingVehicle] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [clientEditData, setClientEditData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone_number: '',
//     address: '',
//   });
  
//   const [vehicleEditData, setVehicleEditData] = useState<VehicleFormData>({
//     make: '',
//     licence_plate: '',
//     engine_type: '',
//     notes: '',
//     mileage: '', 
//     color: '',
//   });

//   const loadClientData = useCallback(() => {
//     if (actualClientId) {
//       console.log('Fetching details for clientId:', actualClientId);
//       fetchClientDetails(actualClientId);
//       fetchClientVehicles(actualClientId);
//       fetchClientServices(actualClientId);
//     }
//   }, [actualClientId, fetchClientDetails, fetchClientVehicles, fetchClientServices]);

//   useEffect(() => {
//     loadClientData();
//   }, [loadClientData]);

//   useEffect(() => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name || '',
//         last_name: clientDetails.customer.last_name || '',
//         email: clientDetails.customer.email || '',
//         phone_number: clientDetails.customer.phone_number || '',
//         address: clientDetails.customer.address || '',
//       });
//     }
//   }, [clientDetails]);

//   const handleSaveClient = async () => {
//     setIsSaving(true);
//     try {
//       if (actualClientId) {
//         await updateClientDetails(actualClientId, clientEditData);
//         setIsEditingClient(false);
//         Alert.alert('Success', 'Client details updated successfully');
//       }
//     } catch (err) {
//       console.error('Error saving client:', err);
//       Alert.alert('Error', 'Failed to update client details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelClientEdit = () => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name,
//         last_name: clientDetails.customer.last_name,
//         email: clientDetails.customer.email,
//         phone_number: clientDetails.customer.phone_number,
//         address: clientDetails.customer.address || '',
//       });
//     }
//     setIsEditingClient(false);
//   };

//   const handleEditVehicle = (vehicle: any) => {
//     setVehicleEditData({
//       make: vehicle.make || '',
//       licence_plate: vehicle.licence_plate || '',
//       engine_type: vehicle.engine_type || '',
//       notes: vehicle.notes || '',
//       mileage: vehicle.mileage ? String(vehicle.mileage) : '',
//       color: vehicle.color || '',
//     });
//     setIsEditingVehicle(vehicle.id);
//   };

//   const handleSaveVehicle = async () => {
//     if (!isEditingVehicle) return;
    
//     setIsSaving(true);
//     try {
//       // Convert mileage string to number if it exists
//       const updateData = {
//         ...vehicleEditData,
//         mileage: vehicleEditData.mileage ? Number(vehicleEditData.mileage) : null
//       };
      
//       await updateClientVehicle(isEditingVehicle, updateData);
//       setIsEditingVehicle(null);
//       Alert.alert('Success', 'Vehicle details updated successfully');
//       fetchClientVehicles(actualClientId); // Refresh the list
//     } catch (err) {
//       console.error('Error saving vehicle:', err);
//       Alert.alert('Error', 'Failed to update vehicle details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelVehicleEdit = () => {
//     setIsEditingVehicle(null);
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };
//   const handleAddVehicle = (clientId: string) => {
//     router.push({ pathname: "/AddVehicle", params: { clientId } });
//   };

//   const handleAddService = (clientId: string) => {
//     router.push({ pathname: "/AddService", params: { clientId } });
//   };
//   if (loading && !clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text className="text-white text-lg mt-4">Loading client details...</Text>
//       </View>
//     );
//   }
  
//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-red-500 text-lg">Error: {error}</Text>
//         <TouchableOpacity onPress={loadClientData} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
//           <Text className="text-white">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
  
//   if (!clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-gray-400">Client not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
//       {isSaving && (
//         <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
//           <ActivityIndicator size="large" color="#3b82f6" />
//           <Text className="text-white mt-2">Saving...</Text>
//         </View>
//       )}
      
//       <ScrollView className="flex-1">
//         <View className="flex-row items-center justify-between mb-6">
//           <TouchableOpacity onPress={onGoBack} className="p-2 rounded-full">
//             <Text className="text-blue-500 text-base">← Back to Clients</Text>
//           </TouchableOpacity>
//           <Text className="text-white text-xl font-bold">Client Details</Text>
//           <View className="w-10" />
//         </View>

//         {/* Client Information Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Client Information</Text>
//             {!isEditingClient ? (
//               <TouchableOpacity onPress={() => setIsEditingClient(true)}>
//                 <Edit size={20} color="#3b82f6" />
//               </TouchableOpacity>
//             ) : (
//               <View className="flex-row space-x-2">
//                 <TouchableOpacity onPress={handleSaveClient}>
//                   <Save size={20} color="#10b981" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleCancelClientEdit}>
//                   <X size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>

//           <View className="space-y-3">
//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">First Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.first_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, first_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.first_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Last Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.last_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, last_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.last_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Email:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.email}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, email: text })}
//                   keyboardType="email-address"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.email}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Phone:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.phone_number}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, phone_number: text })}
//                   keyboardType="phone-pad"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.phone_number}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Address:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.address}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, address: text })}
//                   multiline
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{clientDetails.customer.address || 'N/A'}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Total Spent:</Text>
//               <Text className="text-green-400 flex-1">
//                 {formatCurrency(clientDetails.customer.total_spent || 0)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Vehicles Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Vehicles</Text>
//             <TouchableOpacity onPress={() => handleAddVehicle(actualClientId)}>
//               <Plus size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>

//           {clientVehicles && clientVehicles.length > 0 ? (
//             clientVehicles.map((vehicle) => (
//               <View key={vehicle.id} className="bg-gray-700 rounded-lg p-3 mb-3">
//                 {isEditingVehicle === vehicle.id ? (
//                   <View className="space-y-2">
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Make:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.make}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, make: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Plate:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.licence_plate}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, licence_plate: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Engine:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.engine_type}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, engine_type: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Mileage:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.mileage.toString()}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, mileage: text })}
//                         keyboardType="numeric"
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Color:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.color}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, color: text })}
//                       />
//                     </View>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-400 font-bold w-20">Notes:</Text>
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-2 rounded"
//                         value={vehicleEditData.notes}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, notes: text })}
//                         multiline
//                       />
//                     </View>
//                     <View className="flex-row justify-end space-x-2 mt-2">
//                       <TouchableOpacity
//                         onPress={handleSaveVehicle}
//                         className="bg-green-600 px-3 py-1 rounded"
//                       >
//                         <Text className="text-white">Save</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity
//                         onPress={handleCancelVehicleEdit}
//                         className="bg-red-600 px-3 py-1 rounded"
//                       >
//                         <Text className="text-white">Cancel</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ) : (
//                   <>
//                     <View className="flex-row justify-between items-start">
//                       <View className="flex-1">
//                         <View className="flex-row items-center mb-1">
//                           <Car size={16} color="#9ca3af" className="mr-2" />
//                           <Text className="text-white font-bold text-lg">
//                             {vehicle.make} {vehicle.color && `(${vehicle.color})`}
//                           </Text>
//                         </View>
//                         <Text className="text-gray-400 text-sm">Plate: {vehicle.licence_plate}</Text>
//                         {vehicle.engine_type && (
//                           <Text className="text-gray-400 text-sm">Engine: {vehicle.engine_type}</Text>
//                         )}
//                         {vehicle.mileage && (
//                           <Text className="text-gray-400 text-sm">
//                             Mileage: {vehicle.mileage.toLocaleString()} miles
//                           </Text>
//                         )}
//                         {vehicle.notes && (
//                           <Text className="text-gray-400 text-sm mt-1">Notes: {vehicle.notes}</Text>
//                         )}
//                       </View>
//                       <TouchableOpacity onPress={() => handleEditVehicle(vehicle)}>
//                         <Edit size={18} color="#3b82f6" />
//                       </TouchableOpacity>
//                     </View>
//                   </>
//                 )}
//               </View>
//             ))
//           ) : (
//             <Text className="text-gray-400 text-center py-4">No vehicles found for this client</Text>
//           )}
//         </View>

//         {/* Services Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Service History</Text>
//             <TouchableOpacity onPress={() => handleAddService(actualClientId)}>
//               <Plus size={20} color="#3b82f6" />
//             </TouchableOpacity>
//           </View>

//           {clientServices && clientServices.length > 0 ? (
//             clientServices.map((service) => (
//               <View key={service.id} className="bg-gray-700 rounded-lg p-3 mb-3">
//                 <View className="flex-row justify-between items-start mb-2">
//                   <Text className="text-white font-bold">{service.service_type}</Text>
//                   <View className="flex-row items-center">
//                     <DollarSign size={14} color={service.paid_status ? "#10b981" : "#ef4444"} />
//                     <Text className={`ml-1 ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                       {formatCurrency(service.service_cost || 0)}
//                     </Text>
//                     <Text className={`ml-2 text-xs ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                       {service.paid_status ? 'Paid' : 'Unpaid'}
//                     </Text>
//                   </View>
//                 </View>
                
//                 <Text className="text-gray-400 text-sm">
//                   Date: {formatDate(service.created_at)}
//                 </Text>
                
//                 {service.notes && (
//                   <Text className="text-gray-400 text-sm mt-1">Notes: {service.notes}</Text>
//                 )}
                
//                 {/* {service.service_expenses && service.service_expenses !== '0' && (
//                   <Text className="text-gray-400 text-sm mt-1">
//                     Expenses: {formatCurrency(parseFloat(service.service_expenses))}
//                   </Text>
//                 )} */}
//               </View>
//             ))
//           ) : (
//             <Text className="text-gray-400 text-center py-4">No service history found</Text>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
// import { useCallback, useEffect, useState } from 'react';
// import { useAuth } from '../auth';
// import { BACKEND_URL } from '../config';

// interface Customer {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string; // Changed from 'phone' to match your schema
//   total_spent: number;
//   address?: string;
// }

// interface Vehicle {
//   id: string;
//   make: string;
//   licence_plate: string;
//   engine_type?: string;
//   notes?: string;
//   mileage?: number;
//   color?: string;
// }

// interface ServiceRecord {
//   id: string;
//   service_type: string;
//   service_cost: number;
//   paid_status: boolean;
//   notes?: string;
//   created_at: string;
//   service_expenses?: string;
// }

// interface ClientDetails {
//   customer: Customer;
//   vehicles: Vehicle[];
//   service_records: ServiceRecord[];
// }

// // interface ClientData {
// //   clients: Customer[] | null;
// //   clientDetails: ClientDetails | null;
// //   loading: boolean;
// //   error: string | null;
// //   fetchClients: () => void;
// //   fetchClientDetails: (clientId: string) => void;
// //   updateClientDetails: (clientId: string, data: any) => Promise<void>;
// // }
// interface ClientData {
//   clients: Customer[] | null;
//   clientDetails: ClientDetails | null;
//   clientVehicles: Vehicle[] | null;
//   clientServices: ServiceRecord[] | null;
//   loading: boolean;
//   error: string | null;
//   fetchClients: () => void;
//   fetchClientDetails: (clientId: string) => void;
//   fetchClientVehicles: (clientId: string) => void;
//   fetchClientServices: (clientId: string) => void;
//   updateClientDetails: (clientId: string, data: any) => Promise<void>;
//   updateClientVehicle: (vehicleId: string, data: any) => Promise<void>;
// }
// export function useClientData(): ClientData {
//   const [clients, setClients] = useState<Customer[] | null>(null);
//   const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);
//   const [clientVehicles, setClientVehicles] = useState<Vehicle[] | null>(null);
//   const [clientServices, setClientServices] = useState<ServiceRecord[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   const getHeaders = (): HeadersInit => {
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//     };
    
//     if (user?.token) {
//       headers.Authorization = `Bearer ${user.token}`;
//     }
    
//     return headers;
//   };

//   // Fetch all clients with useCallback to prevent infinite re-renders
//   const fetchClients = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients`, { 
//         headers: getHeaders() 
//       });
      
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const data = await res.json();
//       setClients(data.clients || data); // Handle both response formats
//     } catch (err) {
//       console.error('Error fetching clients:', err);
//       setError('Failed to fetch clients.');
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.token]);

//   // Fetch client details with useCallback
//   const fetchClientDetails = useCallback(async (clientId: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}`, { 
//         headers: getHeaders() 
//       });
      
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const data = await res.json();
//       setClientDetails(data.client || data); // Handle both response formats
//     } catch (err) {
//       console.error('Error fetching client details:', err);
//       setError('Failed to fetch client details.');
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.token]);

//   // Update client details
//   const updateClientDetails = useCallback(async (clientId: string, updatedData: any) => {
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}`, {
//         method: 'PUT',
//         headers: getHeaders(),
//         body: JSON.stringify(updatedData),
//       });

//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       // Update local state
//       if (clientDetails) {
//         setClientDetails({
//           ...clientDetails,
//           customer: {
//             ...clientDetails.customer,
//             ...updatedData
//           }
//         });
//       }
      
//       if (clients) {
//         setClients(clients.map(client => 
//           client.id === clientId 
//             ? { ...client, ...updatedData }
//             : client
//         ));
//       }
//     } catch (err) {
//       console.error('Error updating client details:', err);
//       setError('Failed to update client details.');
//       throw err;
//     }
//   }, [clientDetails, clients, user?.token]);

//   // Initial fetch for clients
//   useEffect(() => {
//     fetchClients();
//   }, [fetchClients]);
//   // Fetch client vehicles
//   const fetchClientVehicles = useCallback(async (clientId: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}/vehicles`, { 
//         headers: getHeaders() 
//       });
      
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const data = await res.json();
//       setClientVehicles(data.vehicles);
//     } catch (err) {
//       console.error('Error fetching client vehicles:', err);
//       setError('Failed to fetch client vehicles.');
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.token]);

//   // Fetch client services
//   const fetchClientServices = useCallback(async (clientId: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}/services`, { 
//         headers: getHeaders() 
//       });
      
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const data = await res.json();
//       setClientServices(data.services);
//     } catch (err) {
//       console.error('Error fetching client services:', err);
//       setError('Failed to fetch client services.');
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.token]);

//   // Update client vehicle
//   const updateClientVehicle = useCallback(async (vehicleId: string, updatedData: any) => {
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/client-vehicles/${vehicleId}`, {
//         method: 'PUT',
//         headers: getHeaders(),
//         body: JSON.stringify(updatedData),
//       });

//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       // Update local state
//       if (clientVehicles) {
//         setClientVehicles(clientVehicles.map(vehicle => 
//           vehicle.id === vehicleId 
//             ? { ...vehicle, ...updatedData }
//             : vehicle
//         ));
//       }
//     } catch (err) {
//       console.error('Error updating client vehicle:', err);
//       setError('Failed to update client vehicle.');
//       throw err;
//     }
//   }, [clientVehicles, user?.token]);

//   const addClientVehicle = useCallback(async (clientId: string, vehicleData: any) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}/vehicles`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(vehicleData),
//       });

//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const newVehicle = await res.json();
      
//       // Update local state to include the new vehicle
//       if (clientVehicles) {
//         setClientVehicles([...clientVehicles, newVehicle.vehicle]);
//       } else {
//         setClientVehicles([newVehicle.vehicle]);
//       }
//       return newVehicle.vehicle;
//     } catch (err) {
//       console.error('Error adding client vehicle:', err);
//       setError('Failed to add client vehicle.');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [clientVehicles]);

//   const addClientService = useCallback(async (clientId: string, serviceData: any) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}/services`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(serviceData),
//       });

//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const newService = await res.json();
      
//       // Update local state to include the new service
//       if (clientServices) {
//         setClientServices([...clientServices, newService.service]);
//       } else {
//         setClientServices([newService.service]);
//       }
//       return newService.service;
//     } catch (err) {
//       console.error('Error adding client service:', err);
//       setError('Failed to add client service.');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [clientServices]);
//   return {
//     clients,
//     clientDetails,
//     clientVehicles,
//     clientServices,
//     loading,
//     error,
//     fetchClients,
//     fetchClientDetails,
//     fetchClientVehicles,
//     fetchClientServices,
//     updateClientDetails,
//     updateClientVehicle,
//   };
// }
// import React, { useMemo, useState, useEffect } from 'react';
// import { FlatList, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { Bell, Calendar, Download, MapPin, Search, Settings, User } from 'lucide-react-native';
// import { useRouter } from 'expo-router'; // Correct hook for Expo Router
// import { useClientData } from '../../lib/pages/clientData'; // Importing the shared hook
// import { BlurView } from 'expo-blur';

// export default function ClientsPage() {
//   const router = useRouter();
//   const branchName = "Main Branch";
//   const { clients, loading, error, fetchClients } = useClientData();
  
//   const [q, setQ] = useState('');
  
//   // Fetch clients from the backend when the component mounts
//   useEffect(() => {
//     fetchClients();
//   }, [fetchClients]);

//   const filtered = clients?.filter(c => {
//     const matchQ = `${c.first_name} ${c.last_name} ${c.phone} ${c.email}`.toLowerCase().includes(q.toLowerCase());
//     return matchQ;
//   });

//   const onExport = async () => {
//     // Implement CSV export and sharing logic here if needed
//   };
  
//   // Conditional rendering for loading and error states
//   if (loading) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-white text-lg">Loading clients...</Text>
//       </View>
//     );
//   }
  
//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-red-500 text-lg">Error: {error}</Text>
//         <TouchableOpacity onPress={fetchClients} className="mt-4 bg-red-600 px-4 py-2 rounded-xl">
//           <Text className="text-white">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       <View className="flex-row justify-between items-center px-4 mb-3">
//         <Text className="text-white text-2xl font-bold">Clients</Text>
//         <View className="flex-row items-center space-x-6">
//           <TouchableOpacity>
//             <Bell size={24} color="red" />
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
//             <MapPin size={16} color="green" />
//             <Text className="text-white">{branchName}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Settings size={24} color="white" />
//           </TouchableOpacity>
//         </View>
//         <User size={26} color="white" />
//       </View>

//       {/* Search + export */}
//       <View className="px-4 gap-3 mb-2">
//         <View className="flex-row items-center bg-white/10 rounded-xl px-3 py-2">
//           <Search size={18} color="white" />
//           <TextInput
//             placeholder="Search by name/phone/email"
//             placeholderTextColor="#9ca3af"
//             value={q}
//             onChangeText={setQ}
//             className="flex-1 text-white ml-2"
//           />
//           <Calendar size={18} color="white" />
//         </View>
//         <TouchableOpacity onPress={onExport} className="self-start bg-white/10 px-3 py-2 rounded-xl flex-row items-center">
//           <Download size={16} color="white" />
//           <Text className="text-white ml-2">Export CSV</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         contentContainerStyle={{ padding: 16 }}
//         data={filtered}
//         keyExtractor={(item) => item.id}
//         ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
//         renderItem={({ item }) => (
//           <Pressable onPress={() => router.push({ pathname: '/clients/[id]', params: { id: item.id } })}>
//             <BlurView intensity={50} tint="dark" className="rounded-2xl overflow-hidden">
//               <View className="flex-row items-center p-4 gap-3">
//                 <Image source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }} style={{ width: 56, height: 56, borderRadius: 9999 }} />
//                 <View className="flex-1">
//                   <Text className="text-white font-bold text-lg">{item.first_name} {item.last_name}</Text>
//                   <Text className="text-gray-300 text-xs">{item.phone} • {item.email}</Text>
//                 </View>
//                 <View className="gap-3">
//                   <Pressable className="bg-white/10 px-3 py-2 rounded-xl">
//                     <Text className="text-white text-xs">View Details</Text>
//                   </Pressable>
//                 </View>
//               </View>
//             </BlurView>
//           </Pressable>
//         )}
//       />
//     </View>
//   );
// }


// import { useRouter } from 'expo-router';
// import { RotateCcw, Search } from 'lucide-react-native';
// import React, { useEffect, useMemo, useState } from 'react';
// import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useClientData } from '../../lib/pages/clientData';

// interface Customer {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   total_spent: number;
// }

// export default function Clients() {
//   const router = useRouter();
//   const { clients, loading, error, fetchClients } = useClientData();
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchClients();
//   }, [fetchClients]);

//   const filteredClients = useMemo(() => {
//     if (!clients) return [];
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     return clients.filter(client =>
//       client.first_name.toLowerCase().includes(lowerCaseQuery) ||
//       client.last_name.toLowerCase().includes(lowerCaseQuery) ||
//       client.email.toLowerCase().includes(lowerCaseQuery) ||
//       client.phone_number.toLowerCase().includes(lowerCaseQuery)
//     );
//   }, [clients, searchQuery]);

//   if (loading) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-white text-lg">Loading clients...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-red-500 text-lg">Error: {error}</Text>
//         <TouchableOpacity onPress={fetchClients} className="mt-4 p-2 rounded-lg border border-red-500">
//           <Text className="text-red-500">Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const renderClientItem = ({ item }: { item: Customer }) => (
//     <TouchableOpacity
//       className="bg-gray-800 rounded-xl p-4 mb-4 flex-row items-center space-x-4 shadow-lg"
//       onPress={() => router.push({ pathname: "/ClientDetails", params: { id: item.id } })}
//     >
//       <View className="w-16 h-16 rounded-full bg-blue-600 items-center justify-center">
//         <Text className="text-white font-bold text-2xl">
//           {item.first_name[0]}{item.last_name[0]}
//         </Text>
//       </View>
//       <View className="flex-1">
//         <Text className="text-white text-lg font-bold">
//           {item.first_name} {item.last_name}
//         </Text>
//         <Text className="text-gray-400 text-sm">{item.email}</Text>
//         <Text className="text-gray-400 text-sm mt-1">{item.phone_number}</Text>
//       </View>
//       <View className="items-end">
//         <Text className="text-green-400 text-lg font-semibold">${item.total_spent || 0}</Text>
//         <Text className="text-gray-400 text-xs">Total Spent</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
//       <View className="flex-row justify-between items-center mb-5">
//         <Text className="text-white text-3xl font-bold">Clients</Text>
//         <TouchableOpacity
//           onPress={fetchClients}
//           className="p-3 bg-gray-700 rounded-full"
//         >
//           <RotateCcw size={20} color="white" />
//         </TouchableOpacity>
//       </View>

//       <View className="relative mb-5">
//         <TextInput
//           className="bg-gray-800 text-white p-4 pl-12 rounded-xl text-base"
//           placeholder="Search clients..."
//           placeholderTextColor="#9ca3af"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <Search size={20} color="#9ca3af" className="absolute left-4 top-4" />
//       </View>

//       {filteredClients.length > 0 ? (
//         <FlatList
//           data={filteredClients}
//           renderItem={renderClientItem}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         />
//       ) : (
//         <View className="flex-1 justify-center items-center">
//           <Text className="text-gray-400 text-lg">No clients found.</Text>
//         </View>
//       )}
//     </View>
//   );
// }
// import React, { useState } from 'react'
// import { View, Text, TextInput, FlatList, Pressable, Modal, TouchableOpacity } from 'react-native'
// import { useApp } from '../../lib/store'
// import { BlurView } from 'expo-blur'
// import { Users,  Plus, User, Search, Calendar, Pencil, Phone, MessageSquare, BadgeCheck, AlertTriangle, Download, CarIcon, Settings, MapPin, Bell } from 'lucide-react'

// export default function EmployeesPage() {

//   const branchName = "Main Branch"
//   const todayStats = {
//     revenue: 25000,
//     jobsCompleted: 12,
//     pendingJobs: 5,
//     expenses: 5000,
//     staffAttendance: 8 // out of 10
//   }

//   const { employees, updateEmployee, addEmployee } = useApp()
//   const [q, setQ] = useState('')
//   const [selected, setSelected] = useState<string | null>(null)
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [newEmployee, setNewEmployee] = useState({ name: '', phone: '', revenue: 0, })
  
//   const filtered = employees.filter(e => e.name.toLowerCase().includes(q.toLowerCase()))
//   const current = employees.find(e => e.id === selected)

//   const handleAddEmployee = () => {
//     if (newEmployee.name && newEmployee.phone) {
//       addEmployee({
//         id: `e${Date.now()}`,
//         name: newEmployee.name,
//         phone: newEmployee.phone,
//         revenue: newEmployee.revenue,
//         attendance: { present: 0, missed: 0 }
//       })
//       setNewEmployee({ name: '', phone: '', revenue: 0,  })
//       setShowAddModal(false)
//     }
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       <View className="flex-row justify-between items-center px-4 mb-3">
//         <Text className="text-white text-2xl font-bold">Employees</Text>
//         <View className="flex-row items-center space-x-6">
//           <TouchableOpacity>
//             <Bell size={24} color="red" />
//           </TouchableOpacity>
//           <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
//             <MapPin size={16} color="green" />
//             <Text className="text-white">{branchName}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Settings size={24} color="white" />
//           </TouchableOpacity>
          
//         </View>
//         <TouchableOpacity onPress={() => setShowAddModal(true)} className="bg-red-600 p-2 rounded-full">
//           <Plus size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <View className="px-4 mb-3 flex-row items-center bg-white/10 rounded-xl px-3 py-2">
//         <Search size={18} color="white" />
//         <TextInput value={q} onChangeText={setQ} placeholder="Search employees" placeholderTextColor="#9ca3af" className="flex-1 text-white ml-2" />
//         <Calendar size={18} color="white" />
//       </View>

//       <FlatList
//         contentContainerStyle={{ padding: 16 }}
//         data={filtered}
//         keyExtractor={(i)=>i.id}
//         ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
//         renderItem={({ item }) => (
//           <BlurView intensity={50} tint="dark" className="rounded-2xl p-4">
//             <View className="flex-row justify-between">
//               <View className="flex-1 pr-3">
//                 <Text className="text-white font-bold text-lg">{item.name}</Text>
//                 <Text className="text-gray-400 text-xs">{item.phone}</Text>
//                 <Text className="text-green-400 text-xs mt-1">Revenue collected: KES {item.revenue.toLocaleString()}</Text>
//                 <Text className="text-gray-300 text-xs mt-1">Attendance: {item.attendance.present} present • {item.attendance.missed} missed</Text>
//               </View>
//               <Pressable onPress={() => setSelected(item.id)} className="bg-white/10 h-10 w-10 rounded-xl items-center justify-center">
//                 <Pencil size={18} color="white" />
//               </Pressable>
//             </View>
//           </BlurView>
//         )}
//       />

//       {/* Edit Modal */}
//       <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
//         <View className="flex-1 bg-black/70 justify-center items-center px-4">
//           <BlurView intensity={70} tint="dark" className="w-full rounded-2xl p-5">
//             <Text className="text-white text-xl font-bold mb-3">Edit Employee</Text>
//             {current && (
//               <>
//                 <TextInput defaultValue={current.name} placeholder="Name" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateEmployee(current.id, { name: v })} />
//                 <TextInput defaultValue={current.phone} placeholder="Phone" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateEmployee(current.id, { phone: v })} />
//                 <TextInput defaultValue={current.revenue.toString()} placeholder="Revenue" placeholderTextColor="#9ca3af" keyboardType="numeric" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateEmployee(current.id, { revenue: parseInt(v) || 0 })} />
//                 <View className="flex-row gap-3 mt-2">
//                   <TouchableOpacity onPress={() => setSelected(null)} className="flex-1 bg-red-600 py-3 rounded-xl"><Text className="text-white text-center font-semibold">Save</Text></TouchableOpacity>
//                   <TouchableOpacity onPress={() => setSelected(null)} className="flex-1 bg-white/10 py-3 rounded-xl"><Text className="text-white text-center">Cancel</Text></TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </BlurView>
//         </View>
//       </Modal>

//       {/* Add Employee Modal */}
//       <Modal visible={showAddModal} animationType="slide" transparent onRequestClose={() => setShowAddModal(false)}>
//         <View className="flex-1 bg-black/70 justify-center items-center px-4">
//           <BlurView intensity={70} tint="dark" className="w-full rounded-2xl p-5">
//             <Text className="text-white text-xl font-bold mb-3">Add Employee</Text>
//             <TextInput placeholder="Name" placeholderTextColor="#9ca3af" value={newEmployee.name} onChangeText={(v) => setNewEmployee({...newEmployee, name: v})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
//             <TextInput placeholder="Phone" placeholderTextColor="#9ca3af" value={newEmployee.phone} onChangeText={(v) => setNewEmployee({...newEmployee, phone: v})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
//             <TextInput placeholder="Revenue" placeholderTextColor="#9ca3af" keyboardType="numeric" value={newEmployee.revenue.toString()} onChangeText={(v) => setNewEmployee({...newEmployee, revenue: parseInt(v) || 0})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
//             <View className="flex-row gap-3 mt-2">
//               <TouchableOpacity onPress={handleAddEmployee} className="flex-1 bg-red-600 py-3 rounded-xl"><Text className="text-white text-center font-semibold">Add</Text></TouchableOpacity>
//               <TouchableOpacity onPress={() => setShowAddModal(false)} className="flex-1 bg-white/10 py-3 rounded-xl"><Text className="text-white text-center">Cancel</Text></TouchableOpacity>
//             </View>
//           </BlurView>
//         </View>
//       </Modal>
//     </View>
//   )
// }
// All the imports for the React Native component

// import { BlurView } from 'expo-blur';
// import { router } from 'expo-router';
// import { Plus, Search, User } from 'lucide-react';
// import React, { useState } from 'react';
// import { FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useStaffData } from '../../lib/pages/useStaffData'; // Assuming this is the correct path

// export default function EmployeesPage() {

//   const branchName = "Main Branch"
//   const todayStats = {
//     revenue: 25000,
//     jobsCompleted: 12,
//     pendingJobs: 5,
//     expenses: 5000,
//     staffAttendance: 8 // out of 10
//   }

//   const { staff, loading, error } = useStaffData();
//   const [q, setQ] = useState('')
//   const [selected, setSelected] = useState<string | null>(null)
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [newEmployee, setNewEmployee] = useState({ 
//     first_name: '', // Corrected to match schema
//     last_name: '',  // Corrected to match schema
//     email: '',
//     phone: '',
//     password: ''
//   })
  
//   const filtered = staff?.filter(e => 
//     `${e.first_name} ${e.last_name}`.toLowerCase().includes(q.toLowerCase())
//   ) || [];
//   const current = staff?.find(e => e.staff_id === selected);

//   const handleAddEmployee = async () => {
//     try {
//         // Here you would make the API call to your backend
//         // This is a placeholder for the actual API call
//         console.log("Adding new employee:", newEmployee);
        
//         // This is where you would call the createStaff API endpoint
//         // For example:
//         // const response = await fetch(`${backendUrl}/api/staff`, {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //     'Authorization': `Bearer ${user.token}`
//         //   },
//         //   body: JSON.stringify(newEmployee),
//         // });
//         // if (!response.ok) {
//         //    throw new Error('Failed to add employee');
//         // }
//         // const result = await response.json();

//         // For now, we'll just log it and reset the form
//         console.log("Employee added successfully!");

//         setNewEmployee({ 
//           first_name: '', 
//           last_name: '', 
//           email: '',
//           phone: '',
//           password: ''
//         });
//         setShowAddModal(false);

//     } catch (err) {
//       console.error("Error adding employee:", err);
//     }
//   }

//   return (
//     <View className="flex-1 bg-[#10192D]">
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={showAddModal}
//         onRequestClose={() => setShowAddModal(false)}
//       >
//         <BlurView intensity={20} className="flex-1 justify-center items-center">
//           <View className="w-11/12 p-6 bg-[#0A0F1E] rounded-2xl border border-gray-700">
//             <Text className="text-white text-xl font-bold mb-4">Add New Employee</Text>
//             <TextInput 
//               placeholder="First Name" 
//               placeholderTextColor="#9ca3af" 
//               value={newEmployee.first_name} 
//               onChangeText={(v) => setNewEmployee({...newEmployee, first_name: v})} 
//               className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" 
//             />
//             <TextInput 
//               placeholder="Last Name" 
//               placeholderTextColor="#9ca3af" 
//               value={newEmployee.last_name} 
//               onChangeText={(v) => setNewEmployee({...newEmployee, last_name: v})} 
//               className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" 
//             />
//             <TextInput 
//               placeholder="Email" 
//               placeholderTextColor="#9ca3af" 
//               value={newEmployee.email} 
//               onChangeText={(v) => setNewEmployee({...newEmployee, email: v})} 
//               className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" 
//             />
//             <TextInput 
//               placeholder="Phone" 
//               placeholderTextColor="#9ca3af" 
//               value={newEmployee.phone} 
//               onChangeText={(v) => setNewEmployee({...newEmployee, phone: v})} 
//               className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" 
//             />
//             <TextInput 
//               placeholder="Password" 
//               placeholderTextColor="#9ca3af" 
//               value={newEmployee.password} 
//               onChangeText={(v) => setNewEmployee({...newEmployee, password: v})} 
//               secureTextEntry
//               className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" 
//             />
//             <View className="flex-row gap-3 mt-2">
//               <TouchableOpacity onPress={handleAddEmployee} className="flex-1 bg-red-600 py-3 rounded-xl">
//                 <Text className="text-white text-center font-semibold">Add</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setShowAddModal(false)} className="flex-1 bg-white/10 py-3 rounded-xl">
//                 <Text className="text-white text-center">Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </BlurView>
//       </Modal>

//       <View className="px-6 py-4 border-b border-gray-700 flex-row items-center justify-between">
//         <View>
//           <Text className="text-white text-2xl font-bold">Employees</Text>
//           <Text className="text-gray-400 text-sm">{branchName} - {new Date().toLocaleDateString()}</Text>
//         </View>
//         <TouchableOpacity onPress={() => setShowAddModal(true)} className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Employee</Text>
//         </TouchableOpacity>
//       </View>

//       <View className="px-6 py-4">
//         <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-2">
//           <Search size={20} color="#9ca3af" />
//           <TextInput
//             placeholder="Search employees..."
//             placeholderTextColor="#9ca3af"
//             className="flex-1 text-white ml-2"
//             value={q}
//             onChangeText={setQ}
//           />
//         </View>
//       </View>

//       {loading ? (
//         <Text className="text-white text-center mt-8">Loading employees...</Text>
//       ) : error ? (
//         <Text className="text-red-500 text-center mt-8">Error: {error}</Text>
//       ) : (
//         <FlatList
//           data={filtered}
//           keyExtractor={item => item.staff_id} // Corrected key extractor
//           renderItem={({ item }) => (
//             <Pressable 
//               onPress={() => router.push({ 
//                 pathname: "/StaffDetails", 
//                 params: { id: item.staff_id } 
//               })} 
//               className="flex-row items-center p-6 border-b border-gray-700"
//             >
//               <View className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
//                 <User size={24} color="white" />
//               </View>
//               <View className="flex-1">
//                 <Text className="text-white font-semibold text-lg">{item.first_name} {item.last_name}</Text>
//                 <Text className="text-gray-400 text-sm">{item.email}</Text>
//                 <Text className="text-gray-400 text-sm">{item.phone}</Text>
//               </View>
//               <View className="bg-blue-600 rounded-full w-6 h-6 items-center justify-center">
//                 <Text className="text-white text-xs">→</Text>
//               </View>
//             </Pressable>
//           )}
//         />
//       )}
//     </View>
//   )
// }
// // // src/app/transactions.tsx
// // import axios from 'axios';
// // import { BlurView } from 'expo-blur';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { useRouter } from 'expo-router';
// // import { DollarSign, FileText } from 'lucide-react';
// // import React, { useEffect, useState } from 'react';
// // import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// // const API_URL = 'http://localhost:3001/api';

// // // Define the types for transaction and expense data
// // interface Transaction {
// //   id: string;
// //   amount: number;
// //   created_at: string;
// //   status: 'PENDING' | 'SUCCESS' | 'FAILED';
// //   CheckoutRequestID: string;
// // }

// // interface Expense {
// //   id: string;
// //   amount: number;
// //   description: string;
// //   expense_date: string;
// //   staff_id: string;
// // }

// // interface MonthlyData {
// //   month: string;
// //   totalTransactions: number;
// //   totalExpenses: number;
// //   items: (Transaction | Expense)[];
// // }

// // // A mock authentication hook for demonstration
// // // Replace this with your actual authentication context
// // const useAuth = () => {
// //   const [user, setUser] = useState<{ email: string; role: string; token: string } | null>(null);
// //   useEffect(() => {
// //     // You'd typically fetch user data from an auth context or storage
// //     const mockUser = {
// //       email: 'admin@example.com',
// //       role: 'admin',
// //       token: 'mock-token-for-admin',
// //     };
// //     setUser(mockUser);
// //   }, []);
// //   return { user, isAuthenticated: !!user };
// // };

// // const TransactionsPage: React.FC = () => {
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
// //   const { user, isAuthenticated } = useAuth();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchData = async () => {
// //       try {
// //         const token = user?.token;
// //         if (!token) {
// //           throw new Error('No token found');
// //         }

// //         const [transactionsRes, expensesRes] = await Promise.all([
// //           axios.get(`${API_URL}/transactions`, { headers: { Authorization: `Bearer ${token}` } }),
// //           axios.get(`${API_URL}/expenses`, { headers: { Authorization: `Bearer ${token}` } }),
// //         ]);

// //         const transactions: Transaction[] = transactionsRes.data.transactions;
// //         const expenses: Expense[] = expensesRes.data.expenses;

// //         // Combine and group data by month
// //         const allItems = [...transactions, ...expenses].sort((a, b) => 
// //           new Date('created_at' in b ? b.created_at : b.expense_date).getTime() - new Date('created_at' in a ? a.created_at : a.expense_date).getTime()
// //         );

// //         const groupedData = allItems.reduce((acc, item) => {
// //           const date = new Date('created_at' in item ? item.created_at : item.expense_date);
// //           const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

// //           if (!acc[monthYear]) {
// //             acc[monthYear] = {
// //               month: monthYear,
// //               totalTransactions: 0,
// //               totalExpenses: 0,
// //               items: [],
// //             };
// //           }

// //           if ('status' in item) { // It's a transaction
// //             acc[monthYear].totalTransactions += item.amount;
// //           } else { // It's an expense
// //             acc[monthYear].totalExpenses += item.amount;
// //           }

// //           acc[monthYear].items.push(item);

// //           return acc;
// //         }, {} as Record<string, MonthlyData>);

// //         setMonthlyData(Object.values(groupedData));
// //       } catch (err) {
// //         setError('Failed to fetch financial data.');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [isAuthenticated, user]);

// //   const navigateToAddExpenses = () => {
// //     // Navigate to the add expenses page. You might need to set up this route in your app.
// //     // Example: router.push('/add-expenses');
// //     Alert.alert('Navigate', 'This would navigate to the add expenses page.');
// //   };

// //   if (!isAuthenticated) {
// //     return (
// //       <View className="flex-1 justify-center items-center bg-[#1A2033]">
// //         <Text className="text-gray-400">Please log in to view this page.</Text>
// //       </View>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <View className="flex-1 justify-center items-center bg-[#1A2033]">
// //         <ActivityIndicator size="large" color="#4ade80" />
// //       </View>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <View className="flex-1 justify-center items-center bg-[#1A2033]">
// //         <Text className="text-red-500 text-lg">{error}</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View className="flex-1 bg-[#1A2033] pt-12">
// //       <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
// //         {/* Header Section */}
// //         <View className="px-6 py-4 flex-row justify-between items-center">
// //           <Text className="text-white text-3xl font-bold">Financial Overview</Text>
// //           <TouchableOpacity
// //             onPress={navigateToAddExpenses}
// //             className="bg-[#4ade80] px-4 py-2 rounded-lg"
// //           >
// //             <Text className="text-[#1A2033] font-semibold">Add Expense</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Monthly Financials Section */}
// //         <View className="p-6">
// //           <Text className="text-white text-xl font-semibold mb-4">Monthly Summary</Text>
// //           {monthlyData.length === 0 ? (
// //             <Text className="text-gray-300">No financial data found.</Text>
// //           ) : (
// //             monthlyData.map((monthData, index) => (
// //               <View key={index} className="mb-8">
// //                 <Text className="text-white text-lg font-bold mb-2">{monthData.month}</Text>
                
// //                 {/* Monthly Summary Card */}
// //                 <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4">
// //                   <View className="flex-row justify-between mb-2">
// //                     <View className="flex-row items-center">
// //                       <DollarSign size={20} color="#4ade80" />
// //                       <Text className="text-gray-300 ml-2">Total Revenue:</Text>
// //                     </View>
// //                     <Text className="text-white font-bold">KES {monthData.totalTransactions.toLocaleString()}</Text>
// //                   </View>
// //                   <View className="flex-row justify-between">
// //                     <View className="flex-row items-center">
// //                       <DollarSign size={20} color="#f87171" />
// //                       <Text className="text-gray-300 ml-2">Total Expenses:</Text>
// //                     </View>
// //                     <Text className="text-white font-bold">KES {monthData.totalExpenses.toLocaleString()}</Text>
// //                   </View>
// //                 </BlurView>

// //                 {/* Individual Transaction/Expense Cards */}
// //                 {monthData.items.map((item, itemIndex) => {
// //                   const isTransaction = 'status' in item;
// //                   return (
// //                     <LinearGradient
// //                       key={itemIndex}
// //                       colors={isTransaction ? ['#1f2937', '#111827'] : ['#2d2d3e', '#1f202a']} // Dark gradient colors
// //                       start={{ x: 0, y: 0 }}
// //                       end={{ x: 1, y: 1 }}
// //                       className="p-4 rounded-xl mb-3"
// //                     >
// //                       <View className="flex-row items-center">
// //                         {isTransaction ? (
// //                           <DollarSign size={24} color="#4ade80" />
// //                         ) : (
// //                           <FileText size={24} color="#f87171" />
// //                         )}
// //                         <View className="ml-4 flex-1">
// //                           <Text className="text-white font-semibold">
// //                             {isTransaction ? 'Payment Received' : 'Expense'}
// //                           </Text>
// //                           <Text className="text-gray-300 text-sm">
// //                             {isTransaction ? `Ref: ${item.CheckoutRequestID}` : item.description}
// //                           </Text>
// //                           <Text className="text-gray-400 text-xs mt-1">
// //                             {new Date(isTransaction ? item.created_at : item.expense_date).toLocaleDateString()}
// //                           </Text>
// //                         </View>
// //                         <View className="items-end">
// //                           <Text className={`font-bold text-lg ${isTransaction ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
// //                             KES {item.amount.toLocaleString()}
// //                           </Text>
// //                         </View>
// //                       </View>
// //                     </LinearGradient>
// //                   );
// //                 })}
// //               </View>
// //             ))
// //           )}
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default TransactionsPage;

// // src/app/Transactions.tsx
// import { BlurView } from 'expo-blur';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import { DollarSign, FileText } from 'lucide-react';
// import React from 'react';
// import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { useFinancialData } from '../../lib/pages/useTransactionsData';

// const TransactionsPage: React.FC = () => {
//   const { data, loading, error } = useFinancialData();
//   const router = useRouter();

//   const navigateToAddExpenses = () => {
//     // Navigate to the add expenses page
//     Alert.alert('Navigate', 'This would navigate to the add expenses page.');
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#1A2033]">
//         <ActivityIndicator size="large" color="#4ade80" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#1A2033]">
//         <Text className="text-red-500 text-lg">{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-[#1A2033] pt-12">
//       <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
//         {/* Header Section */}
//         <View className="px-6 py-4 flex-row justify-between items-center">
//           <Text className="text-white text-3xl font-bold">Financial Overview</Text>
//           <TouchableOpacity
//             onPress={navigateToAddExpenses}
//             className="bg-[#4ade80] px-4 py-2 rounded-lg"
//           >
//             <Text className="text-[#1A2033] font-semibold">Add Expense</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Monthly Financials Section */}
//         <View className="p-6">
//           <Text className="text-white text-xl font-semibold mb-4">Monthly Summary</Text>
//           {data.length === 0 ? (
//             <Text className="text-gray-300">No financial data found.</Text>
//           ) : (
//             data.map((monthData, index) => (
//               <View key={index} className="mb-8">
//                 <Text className="text-white text-lg font-bold mb-2">{monthData.month}</Text>
                
//                 {/* Monthly Summary Card */}
//                 <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4">
//                   <View className="flex-row justify-between mb-2">
//                     <View className="flex-row items-center">
//                       <DollarSign size={20} color="#4ade80" />
//                       <Text className="text-gray-300 ml-2">Total Revenue:</Text>
//                     </View>
//                     <Text className="text-white font-bold">KES {monthData.totalTransactions.toLocaleString()}</Text>
//                   </View>
//                   <View className="flex-row justify-between">
//                     <View className="flex-row items-center">
//                       <DollarSign size={20} color="#f87171" />
//                       <Text className="text-gray-300 ml-2">Total Expenses:</Text>
//                     </View>
//                     <Text className="text-white font-bold">KES {monthData.totalExpenses.toLocaleString()}</Text>
//                   </View>
//                 </BlurView>

//                 {/* Individual Transaction/Expense Cards */}
//                 {monthData.items.map((item, itemIndex) => {
//                   const isTransaction = 'status' in item;
//                   return (
//                     <LinearGradient
//                       key={itemIndex}
//                       colors={isTransaction ? ['#1f2937', '#111827'] : ['#2d2d3e', '#1f202a']} // Dark gradient colors
//                       start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 1 }}
//                       className="p-4 rounded-xl mb-3"
//                     >
//                       <View className="flex-row items-center">
//                         {isTransaction ? (
//                           <DollarSign size={24} color="#4ade80" />
//                         ) : (
//                           <FileText size={24} color="#f87171" />
//                         )}
//                         <View className="ml-4 flex-1">
//                           <Text className="text-white font-semibold">
//                             {isTransaction ? 'Payment Received' : 'Expense'}
//                           </Text>
//                           <Text className="text-gray-300 text-sm">
//                             {isTransaction ? `Ref: ${item.CheckoutRequestID}` : item.description}
//                           </Text>
//                           <Text className="text-gray-400 text-xs mt-1">
//                             {new Date(isTransaction ? item.created_at : item.expense_date).toLocaleDateString()}
//                           </Text>
//                         </View>
//                         <View className="items-end">
//                           <Text className={`font-bold text-lg ${isTransaction ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
//                             KES {item.amount.toLocaleString()}
//                           </Text>
//                         </View>
//                       </View>
//                     </LinearGradient>
//                   );
//                 })}
//               </View>
//             ))
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default TransactionsPage;
// src/app/Transactions.tsx
// import { Ionicons } from '@expo/vector-icons'
// import { Tabs, useLocalSearchParams, useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
// import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
// import { useAuth } from '../../lib/auth'
// import { useTheme } from '../../lib/theme'

// export default function TabsLayout() {
//   const { theme, isDark, toggleTheme } = useTheme()
//   const { user } = useAuth()
//   const [dropdownVisible, setDropdownVisible] = useState(false)
//   const router = useRouter()
//   const params = useLocalSearchParams()

//   console.log('TabsLayout rendering', { user, params })

//   // Handle initial navigation based on user role
//   useEffect(() => {
//     if (user && params.initialRoute) {
//       // Small delay to ensure navigation is ready
//       setTimeout(() => {
//         const route = params.initialRoute as string;
//         if (route === 'superadmin') {
//           router.replace('/superadmin');
//         } else if (route === 'admin') {
//           router.replace('/admin');
//         } else {
//           router.replace('/dashboard');
//         }
//       }, 100)
//     }
//   }, [user, params.initialRoute])

//   const allMoreOptions = [
//     { name: 'cars', title: 'Cars', iconName: 'car' },
//     { name: 'garage', title: 'Garage', iconName: 'build' },
//     { name: 'reports', title: 'Reports', iconName: 'bar-chart' },
//     { name: 'sms', title: 'SMS', iconName: 'chatbubble' },
//     { name: 'Transactions', title: 'Transactions', iconName: 'chatbubble' },
//     { name: 'admin', title: 'Admin', iconName: 'settings' },
//     { name: 'inventory', title: 'Inventory', iconName: 'cube' },
//     { name: 'operator', title: 'Operator', iconName: 'person' },
//     { name: 'superadmin', title: 'Superadmin', iconName: 'shield' },
//   ]

//   // Filter options based on current screen
//   const getFilteredMoreOptions = (activeRouteName: string) => {
//     if (activeRouteName === 'admin') {
//       // Hide superadmin option for regular admin
//       return allMoreOptions.filter(option => option.name !== 'superadmin')
//     }
//     // Show all options for superadmin and other screens
//     return allMoreOptions
//   }

//   const CustomTabBar = ({ state, descriptors, navigation }: any) => {
//     const activeRoute = state.routes[state.index]
//     const activeRouteName = activeRoute?.name
//     const moreOptions = getFilteredMoreOptions(activeRouteName)

//     // Define different styles for different screens
//     const getTabBarStyle = () => {
//       switch (activeRouteName) {
//         case 'dashboard':
//           return {
//             backgroundColor: isDark ? '#1a1a2e' : '#f0f9ff',
//             borderTopColor: isDark ? '#16213e' : '#0ea5e9',
//             borderTopWidth: 2,
//             shadowColor: '#0ea5e9',
//             shadowOffset: { width: 0, height: -2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 4,
//             elevation: 5,
//           }
//         case 'clients':
//           return {
//             backgroundColor: isDark ? '#1e1b4b' : '#fef3c7',
//             borderTopColor: isDark ? '#312e81' : '#f59e0b',
//             borderTopWidth: 2,
//             shadowColor: '#f59e0b',
//             shadowOffset: { width: 0, height: -2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 4,
//             elevation: 8,
//           }
//         case 'Transactions':
//           return {
//             backgroundColor: isDark ? '#1e1b4b' : '#fef3c7',
//             borderTopColor: isDark ? '#312e81' : '#f59e0b',
//             borderTopWidth: 2,
//             shadowColor: '#f59e0b',
//             shadowOffset: { width: 0, height: -2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 4,
//             elevation: 8,
//           }
//         case 'employees':
//           return {
//             backgroundColor: isDark ? '#14532d' : '#dcfce7',
//             borderTopColor: isDark ? '#166534' : '#10b981',
//             borderTopWidth: 2,
//             shadowColor: '#10b981',
//             shadowOffset: { width: 0, height: -2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 4,
//             elevation: 8,
//           }
//         case 'admin':
//           return {
//             backgroundColor: isDark ? '#374151' : '#f3f4f6',
//             borderTopColor: isDark ? '#4b5563' : '#6b7280',
//             borderTopWidth: 2,
//             shadowColor: '#6b7280',
//             shadowOffset: { width: 0, height: -2 },
//             shadowOpacity: 0.2,
//             shadowRadius: 3,
//             elevation: 6,
//           }
//         case 'superadmin':
//           return {
//             backgroundColor: isDark ? '#7c2d12' : '#fef2f2',
//             borderTopColor: isDark ? '#9a3412' : '#dc2626',
//             borderTopWidth: 3,
//             shadowColor: '#dc2626',
//             shadowOffset: { width: 0, height: -3 },
//             shadowOpacity: 0.4,
//             shadowRadius: 6,
//             elevation: 10,
//           }
//         default:
//           return {
//             backgroundColor: isDark ? '#0A0F1E' : '#f9fafb',
//             borderTopColor: isDark ? '#111827' : '#e5e7eb',
//             borderTopWidth: 1,
//           }
//       }
//     }

//     const getActiveColor = () => {
//       switch (activeRouteName) {
//         case 'dashboard': return '#0ea5e9' // Blue
//         case 'clients': return '#f59e0b'   // Amber
//         case 'employees': return '#10b981' // Green
//         case 'admin': return '#6b7280'     // Gray
//         case 'Transactions': return '#11b388' // Green
//         case 'superadmin': return '#dc2626' // Red
//         default: return '#ef4444'          // Red
//       }
//     }

//     const getInactiveColor = () => {
//       return isDark ? '#9ca3af' : '#6b7280'
//     }

//     return (
//       <>
//         <View style={[{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }, getTabBarStyle()]}>
//           {/* Main Tabs */}
//           {state.routes.slice(0, 3).map((route: any, index: number) => {
//             const { options } = descriptors[route.key]
//             const isFocused = state.index === index
//             const activeColor = getActiveColor()
//             const inactiveColor = getInactiveColor()

//             const onPress = () => {
//               const event = navigation.emit({
//                 type: 'tabPress',
//                 target: route.key,
//                 canPreventDefault: true,
//               })

//               if (!isFocused && !event.defaultPrevented) {
//                 navigation.navigate(route.name)
//               }
//             }

//             return (
//               <TouchableOpacity
//                 key={route.key}
//                 onPress={onPress}
//                 style={{
//                   flex: 1,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   paddingVertical: 8,
//                   borderRadius: 12,
//                   marginHorizontal: 4,
//                   backgroundColor: isFocused ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent'
//                 }}
//               >
//                 {options.tabBarIcon && options.tabBarIcon({
//                   color: isFocused ? activeColor : inactiveColor,
//                   size: isFocused ? 28 : 24
//                 })}
//                 <Text style={{
//                   color: isFocused ? activeColor : inactiveColor,
//                   fontSize: isFocused ? 13 : 12,
//                   marginTop: 4,
//                   fontWeight: isFocused ? '600' : '400'
//                 }}>
//                   {options.title}
//                 </Text>
//                 {isFocused && (
//                   <View style={{
//                     position: 'absolute',
//                     bottom: 0,
//                     width: 30,
//                     height: 3,
//                     backgroundColor: activeColor,
//                     borderRadius: 2
//                   }} />
//                 )}
//               </TouchableOpacity>
//             )
//           })}

//           {/* More Button */}
//           <TouchableOpacity
//             onPress={() => setDropdownVisible(true)}
//             style={{
//               flex: 1,
//               alignItems: 'center',
//               justifyContent: 'center',
//               paddingVertical: 8,
//               borderRadius: 12,
//               marginHorizontal: 4,
//               backgroundColor: state.index >= 3 ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent'
//             }}
//           >
//             <Ionicons
//               name="menu"
//               color={state.index >= 3 ? getActiveColor() : getInactiveColor()}
//               size={state.index >= 3 ? 28 : 24}
//             />
//             <Text style={{
//               color: state.index >= 3 ? getActiveColor() : getInactiveColor(),
//               fontSize: state.index >= 3 ? 13 : 12,
//               marginTop: 4,
//               fontWeight: state.index >= 3 ? '600' : '400'
//             }}>
//               More
//             </Text>
//             {state.index >= 3 && (
//               <View style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 width: 30,
//                 height: 3,
//                 backgroundColor: getActiveColor(),
//                 borderRadius: 2
//               }} />
//             )}
//           </TouchableOpacity>

//           {/* Theme Toggle */}
//           <View style={{ position: 'absolute', right: 10, top: 10, flexDirection: 'row', alignItems: 'center' }}>
//             {activeRouteName === 'superadmin' && (
//               <View style={{
//                 backgroundColor: '#dc2626',
//                 borderRadius: 10,
//                 paddingHorizontal: 6,
//                 paddingVertical: 2,
//                 marginRight: 8
//               }}>
//                 <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>SUPER</Text>
//               </View>
//             )}
//             {activeRouteName === 'admin' && (
//               <View style={{
//                 backgroundColor: '#6b7280',
//                 borderRadius: 10,
//                 paddingHorizontal: 6,
//                 paddingVertical: 2,
//                 marginRight: 8
//               }}>
//                 <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>ADMIN</Text>
//               </View>
//             )}
//             <TouchableOpacity onPress={toggleTheme}>
//               <Ionicons name={isDark ? 'moon' : 'sunny'} color={isDark ? '#ffffff' : '#000000'} size={24} />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Dropdown Modal */}
//         <Modal
//           visible={dropdownVisible}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setDropdownVisible(false)}
//         >
//           <TouchableOpacity
//             style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', paddingTop: 100 }}
//             onPress={() => setDropdownVisible(false)}
//           >
//             <View style={{ backgroundColor: isDark ? '#0A0F1E' : '#f9fafb', marginHorizontal: 20, borderRadius: 10, padding: 10 }}>
//               <FlatList
//                 data={moreOptions}
//                 keyExtractor={(item) => item.name}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     onPress={() => {
//                       navigation.navigate(item.name)
//                       setDropdownVisible(false)
//                     }}
//                     style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
//                   >
//                     <Ionicons name={item.iconName as any} color={isDark ? '#9ca3af' : '#6b7280'} size={24} />
//                     <Text style={{ color: isDark ? '#9ca3af' : '#6b7280', marginLeft: 15, fontSize: 16 }}>
//                       {item.title}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </>
//     )
//   }

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={CustomTabBar}
//     >
//       <Tabs.Screen name="dashboard" options={{
//         title: 'Dashboard',
//         tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
//       }} />

//       <Tabs.Screen name="clients" options={{
//         title: 'Clients',
//         tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="employees" options={{
//         title: 'Employees',
//         tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="cars" options={{
//         title: 'Cars',
//         tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="garage" options={{
//         title: 'Garage',
//         tabBarIcon: ({ color, size }) => <Ionicons name="build" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="reports" options={{
//         title: 'Reports',
//         tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="sms" options={{
//         title: 'SMS',
//         tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="admin" options={{
//         title: 'Admin',
//         tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="inventory" options={{
//         title: 'Inventory',
//         tabBarIcon: ({ color, size }) => <Ionicons name="cube" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="operator" options={{
//         title: 'Operator',
//         tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
//       }} />
//       <Tabs.Screen name="superadmin" options={{
//         title: 'Superadmin',
//         tabBarIcon: ({ color, size }) => <Ionicons name="shield" color={color} size={size} />,
//       }} />
//     </Tabs>
//   )
// }

// import { Ionicons } from '@expo/vector-icons'
// import { Tabs, useLocalSearchParams, useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
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

// // Define types for navigation items
// interface NavItem {
//   name: string;
//   title: string;
//   iconName: string;
//   roles: ('super-admin' | 'admin' | 'operator')[];
// }

// export default function TabsLayout() {
//   const { theme, isDark, toggleTheme } = useTheme()
//   const { user } = useAuth()
//   const [dropdownVisible, setDropdownVisible] = useState(false)
//   const router = useRouter()
//   const params = useLocalSearchParams()
  
//   // Get screen dimensions
//   const { width } = Dimensions.get('window')
//   const isDesktop = width >= 768 // Tablet size and above
//   const isMobile = width < 768

//   console.log('TabsLayout rendering', { user, params, isDesktop, width })

//   // Handle initial navigation based on user role
//   useEffect(() => {
//     if (user && params.initialRoute) {
//       // Small delay to ensure navigation is ready
//       setTimeout(() => {
//         const route = params.initialRoute as string;
//         if (route === 'superadmin') {
//           router.replace('/superadmin');
//         } else if (route === 'admin') {
//           router.replace('/admin');
//         } else {
//           router.replace('/dashboard');
//         }
//       }, 100)
//     }
//   }, [user, params.initialRoute])

//   // Define all navigation options with role restrictions
//   const allNavOptions: NavItem[] = [
//     { name: 'dashboard', title: 'Dashboard', iconName: 'home', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'superadmin', title: 'Superadmin', iconName: 'shield', roles: ['super-admin'] },
//     // { name: 'operator', title: 'Dashboard', iconName: 'home', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'operator', title: 'Operator', iconName: 'construct', roles: ['operator'] },
//     { name: 'clients', title: 'Clients', iconName: 'people', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'employees', title: 'Employees', iconName: 'person', roles: ['super-admin', 'operator'] },
//     // { name: 'cars', title: 'Cars', iconName: 'car', roles: ['super-admin', 'admin', 'operator'] },
//     // { name: 'garage', title: 'Garage', iconName: 'build', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'inventory', title: 'Inventory', iconName: 'cube', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'reports', title: 'Reports', iconName: 'bar-chart', roles: ['super-admin', 'admin'] },
//     { name: 'sms', title: 'SMS', iconName: 'chatbubble', roles: ['super-admin', 'admin'] },
//     { name: 'Transactions', title: 'Transactions', iconName: 'cash', roles: ['super-admin', 'admin'] },
//     // { name: 'admin', title: 'Admin', iconName: 'settings', roles: ['super-admin', 'admin'] },
//   ]

//   // Filter options based on user role
//   const getFilteredNavOptions = (): NavItem[] => {
//     if (!user) return [];
    
//     return allNavOptions.filter(option => 
//       option.roles.includes(user.role as 'super-admin' | 'admin' | 'operator')
//     );
//   }

//   // Get main tabs (first 3-4 items for mobile)
//   const getMainTabs = (): NavItem[] => {
//     const filtered = getFilteredNavOptions();
//     return isDesktop ? filtered : filtered.slice(0, 3);
//   }

//   // Get more options (for mobile dropdown)
//   const getMoreOptions = (): NavItem[] => {
//     const filtered = getFilteredNavOptions();
//     return isDesktop ? [] : filtered.slice(3);
//   }

//   // Floating Dock Component for Desktop (now at bottom)
//   const FloatingDock = ({ state, descriptors, navigation }: any) => {
//     const activeRoute = state.routes[state.index]
//     const activeRouteName = activeRoute?.name
//     const navOptions = getFilteredNavOptions()

//     return (
//       <View style={[styles.floatingDock, isDark ? styles.floatingDockDark : styles.floatingDockLight]}>
//         {navOptions.map((option, index) => {
//           const route = state.routes.find((r: any) => r.name === option.name);
//           if (!route) return null;
          
//           const { options } = descriptors[route.key]
//           const isFocused = state.index === index

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             })

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name)
//             }
//           }

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
//                 color={isFocused ? 
//                   (isDark ? '#ffffff' : '#ffffff') : 
//                   (isDark ? '#9ca3af' : '#6b7280')}
//                 size={24}
//               />
//               <Text style={[
//                 styles.dockText,
//                 { 
//                   color: isFocused ? 
//                     (isDark ? '#ffffff' : '#ffffff') : 
//                     (isDark ? '#9ca3af' : '#6b7280') 
//                 }
//               ]}>
//                 {option.title}
//               </Text>
//             </TouchableOpacity>
//           )
//         })}
        
//         {/* Theme Toggle in Dock */}
//         <View style={styles.themeToggleContainer}>
//           <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
//             <Ionicons name={isDark ? 'moon' : 'sunny'} color={isDark ? '#ffffff' : '#ffffff'} size={24} />
//           </TouchableOpacity>
//           {user && (
//             <View style={[
//               styles.roleBadge, 
//               user.role === 'super-admin' ? styles.superAdminBadge :
//               user.role === 'admin' ? styles.adminBadge :
//               styles.operatorBadge
//             ]}>
//               <Text style={styles.roleBadgeText}>
//                 {user.role === 'super-admin' ? 'SUPER' : 
//                  user.role === 'admin' ? 'ADMIN' : 'OPERATOR'}
//               </Text>
//             </View>
//           )}
//         </View>
//       </View>
//     )
//   }

//   // Mobile Tab Bar Component
//   const MobileTabBar = ({ state, descriptors, navigation }: any) => {
//     const activeRoute = state.routes[state.index]
//     const activeRouteName = activeRoute?.name
//     const mainTabs = getMainTabs()
//     const moreOptions = getMoreOptions()

//     const getActiveColor = () => {
//       return isDark ? '#3b82f6' : '#3b82f6'
//     }

//     const getInactiveColor = () => {
//       return isDark ? '#9ca3af' : '#6b7280'
//     }

//     return (
//       <>
//         <View style={[styles.mobileTabBar, isDark ? styles.mobileTabBarDark : styles.mobileTabBarLight]}>
//           {/* Main Tabs */}
//           {mainTabs.map((option, index) => {
//             const route = state.routes.find((r: any) => r.name === option.name);
//             if (!route) return null;
            
//             const { options } = descriptors[route.key]
//             const isFocused = state.index === index

//             const onPress = () => {
//               const event = navigation.emit({
//                 type: 'tabPress',
//                 target: route.key,
//                 canPreventDefault: true,
//               })

//               if (!isFocused && !event.defaultPrevented) {
//                 navigation.navigate(route.name)
//               }
//             }

//             return (
//               <TouchableOpacity
//                 key={option.name}
//                 onPress={onPress}
//                 style={styles.mobileTabItem}
//               >
//                 {options.tabBarIcon && options.tabBarIcon({
//                   color: isFocused ? getActiveColor() : getInactiveColor(),
//                   size: isFocused ? 28 : 24,
//                   focused: isFocused
//                 })}
//                 <Text style={[
//                   styles.mobileTabText,
//                   { color: isFocused ? getActiveColor() : getInactiveColor() }
//                 ]}>
//                   {options.title}
//                 </Text>
//               </TouchableOpacity>
//             )
//           })}

//           {/* More Button if there are more options */}
//           {moreOptions.length > 0 && (
//             <TouchableOpacity
//               onPress={() => setDropdownVisible(true)}
//               style={styles.mobileTabItem}
//             >
//               <Ionicons
//                 name="menu"
//                 color={getInactiveColor()}
//                 size={24}
//               />
//               <Text style={[styles.mobileTabText, { color: getInactiveColor() }]}>
//                 More
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Dropdown Modal for More Options */}
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
//             <View style={[
//               styles.modalContent, 
//               isDark ? styles.modalContentDark : styles.modalContentLight
//             ]}>
//               <Text style={[
//                 styles.modalTitle,
//                 { color: isDark ? '#ffffff' : '#000000' }
//               ]}>
//                 More Options
//               </Text>
//               <FlatList
//                 data={moreOptions}
//                 keyExtractor={(item) => item.name}
//                 renderItem={({ item }) => {
//                   const route = state.routes.find((r: any) => r.name === item.name);
//                   if (!route) return null;
                  
//                   const { options } = descriptors[route.key]
//                   const isFocused = state.index === state.routes.findIndex((r: any) => r.name === item.name)
                  
//                   return (
//                     <TouchableOpacity
//                       onPress={() => {
//                         navigation.navigate(item.name)
//                         setDropdownVisible(false)
//                       }}
//                       style={styles.modalItem}
//                     >
//                       <Ionicons 
//                         name={item.iconName as any} 
//                         color={isFocused ? 
//                           (isDark ? '#3b82f6' : '#3b82f6') : 
//                           (isDark ? '#9ca3af' : '#6b7280')} 
//                         size={24} 
//                       />
//                       <Text style={[
//                         styles.modalItemText,
//                         { 
//                           color: isFocused ? 
//                             (isDark ? '#3b82f6' : '#3b82f6') : 
//                             (isDark ? '#9ca3af' : '#6b7280') 
//                         }
//                       ]}>
//                         {item.title}
//                       </Text>
//                     </TouchableOpacity>
//                   )
//                 }}
//               />
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </>
//     )
//   }

//   // Custom Tab Bar that switches between desktop and mobile
//   const CustomTabBar = (props: any) => {
//     return isDesktop ? <FloatingDock {...props} /> : <MobileTabBar {...props} />
//   }

//   // Filter screens based on user role
//   const filteredScreens = getFilteredNavOptions();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={CustomTabBar}
//     >
//       {filteredScreens.map((screen) => (
//         <Tabs.Screen
//           key={screen.name}
//           name={screen.name}
//           options={{
//             title: screen.title,
//             tabBarIcon: ({ color, size, focused }) => (
//               <Ionicons name={screen.iconName as any} color={color} size={focused ? size + 2 : size} />
//             ),
//           }}
//         />
//       ))}
//     </Tabs>
//   )
// }

// const styles = StyleSheet.create({
//   // Floating Dock Styles (now at bottom)
//   // floatingDock: {
//   //   position: 'absolute',
//   //   bottom: 20,
//   //   borderRadius: 20,
//   //   padding: 10,
//   //   margin: 5,
//   //   // flexDirection: 'row',
//   //   // alignItems: 'center',
//   //   justifyContent: 'center',
//   //   shadowColor: '#000',
//   //   shadowOffset: { width: 0, height: 4 },
//   //   shadowOpacity: 0.3,
//   //   shadowRadius: 4.65,
//   //   elevation: 8,
//   //   // width: ,
//   //   zIndex: 1000,
//   // },
//   floatingDock: {
//   position: 'absolute',
//   bottom: 20,
//   left: '50%',
//   transform: [{ translateX: '-50%' }],
//   borderRadius: 20,
//   padding: 10,
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.3,
//   shadowRadius: 4.65,
//   elevation: 8,
//   zIndex: 1000,
// },
//   floatingDockLight: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   floatingDockDark: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   dockItem: {
//     // width: '90%',
//     padding: 12,
//     borderRadius: 10,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 70,
//   },
//   dockItemActiveLight: {
//     backgroundColor: 'rgba(59, 130, 246, 0.2)',
//   },
//   dockItemActiveDark: {
//     backgroundColor: 'rgba(59, 130, 246, 0.2)',
//   },
//   dockText: {
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: '500',
//   },
//   themeToggleContainer: {
//     marginLeft: 15,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   themeToggle: {
//     padding: 10,
//     borderRadius: 20,
//   },
//   roleBadge: {
//     marginLeft: 8,
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   superAdminBadge: {
//     backgroundColor: '#dc2626',
//   },
//   adminBadge: {
//     backgroundColor: '#6b7280',
//   },
//   operatorBadge: {
//     backgroundColor: '#10b981',
//   },
//   roleBadgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
  
//   // Mobile Tab Bar Styles
//   mobileTabBar: {
//     flexDirection: 'row',
//     height: 70,
//     paddingBottom: 10,
//   },
//   mobileTabBarLight: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderTopColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopWidth: 1,
//   },
//   mobileTabBarDark: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderTopColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopWidth: 1,
//   },
//   mobileTabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mobileTabText: {
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: '500',
//   },
  
//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     paddingBottom: 40,
//     maxHeight: '80%',
//   },
//   modalContentLight: {
//     backgroundColor: '#0f172a',
//   },
//   modalContentDark: {
//     backgroundColor: '#0f172a',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   modalItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   modalItemText: {
//     marginLeft: 15,
//     fontSize: 16,
//   },
// })

// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Edit, Save, X } from 'lucide-react-native';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useClientData } from '../../lib/pages/clientData';

// interface VehicleFormData {
//   make: string;
//   licence_plate: string;
//   engine_type: string;
//   notes: string;
//   mileage: string;
//   color: string;
// }

// export default function ClientDetails() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const actualClientId = id as string;
  
//   const {
//     clientDetails,
//     clientVehicles,
//     clientServices,
//     loading,
//     error,
//     fetchClientDetails,
//     fetchClientVehicles,
//     fetchClientServices,
//     updateClientDetails,
//     updateClientVehicle,
//   } = useClientData();
  
//   const [isEditingClient, setIsEditingClient] = useState(false);
//   const [isEditingVehicle, setIsEditingVehicle] = useState<string | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [clientEditData, setClientEditData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone_number: '',
//     address: '',
//   });
  
//   const [vehicleEditData, setVehicleEditData] = useState<VehicleFormData>({
//     make: '',
//     licence_plate: '',
//     engine_type: '',
//     notes: '',
//     mileage: '', 
//     color: '',
//   });

//   const loadClientData = useCallback(() => {
//     if (actualClientId) {
//       console.log('Fetching details for clientId:', actualClientId);
//       fetchClientDetails(actualClientId);
//       fetchClientVehicles(actualClientId);
//       fetchClientServices(actualClientId);
//     }
//   }, [actualClientId, fetchClientDetails, fetchClientVehicles, fetchClientServices]);

//   useEffect(() => {
//     loadClientData();
//   }, [loadClientData]);

//   useEffect(() => {
//     // Only set edit data when clientDetails is available and has customer data
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name || '',
//         last_name: clientDetails.customer.last_name || '',
//         email: clientDetails.customer.email || '',
//         phone_number: clientDetails.customer.phone_number || '',
//         address: clientDetails.customer.address || '',
//       });
//     }
//   }, [clientDetails]);

//   const handleSaveClient = async () => {
//     setIsSaving(true);
//     try {
//       if (actualClientId) {
//         await updateClientDetails(actualClientId, clientEditData);
//         setIsEditingClient(false);
//         Alert.alert('Success', 'Client details updated successfully');
//       }
//     } catch (err) {
//       console.error('Error saving client:', err);
//       Alert.alert('Error', 'Failed to update client details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelClientEdit = () => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name,
//         last_name: clientDetails.customer.last_name,
//         email: clientDetails.customer.email,
//         phone_number: clientDetails.customer.phone_number,
//         address: clientDetails.customer.address || '',
//       });
//     }
//     setIsEditingClient(false);
//   };

//   const handleEditVehicle = (vehicle: any) => {
//     setVehicleEditData({
//       make: vehicle.make || '',
//       licence_plate: vehicle.licence_plate || '',
//       engine_type: vehicle.engine_type || '',
//       notes: vehicle.notes || '',
//       mileage: vehicle.mileage ? String(vehicle.mileage) : '',
//       color: vehicle.color || '',
//     });
//     setIsEditingVehicle(vehicle.id);
//   };

//   const handleSaveVehicle = async () => {
//     if (!isEditingVehicle) return;
    
//     setIsSaving(true);
//     try {
//       // Convert mileage string to number if it exists
//       const updateData = {
//         ...vehicleEditData,
//         mileage: vehicleEditData.mileage ? Number(vehicleEditData.mileage) : null
//       };
      
//       await updateClientVehicle(isEditingVehicle, updateData);
//       setIsEditingVehicle(null);
//       Alert.alert('Success', 'Vehicle details updated successfully');
//       fetchClientVehicles(actualClientId); // Refresh the list
//     } catch (err) {
//       console.error('Error saving vehicle:', err);
//       Alert.alert('Error', 'Failed to update vehicle details');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancelVehicleEdit = () => {
//     setIsEditingVehicle(null);
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };
//   // ... rest of your functions remain the same ...

//   const handleAddVehicle = (clientId: string) => {
//     router.push({ pathname: "/AddVehicle", params: { clientId } });
//   };

//   const handleAddService = (clientId: string) => {
//     router.push({ pathname: "/AddService", params: { clientId } });
//   };

//   // Show loading state while data is being fetched
//   if (loading && !clientDetails) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text className="text-white text-lg mt-4">Loading client details...</Text>
//       </View>
//     );
//   }
  
//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-red-500 text-lg">Error: {error}</Text>
//         <TouchableOpacity onPress={loadClientData} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
//           <Text className="text-white">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
  
//   // Check if clientDetails exists and has customer data before rendering
//   if (!clientDetails || !clientDetails.customer) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-gray-400">Client not found</Text>
//         <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
//           <Text className="text-white">Go Back</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Now we can safely access clientDetails.customer
//   const { customer } = clientDetails;

//   return (
//     <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
//       {isSaving && (
//         <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
//           <ActivityIndicator size="large" color="#3b82f6" />
//           <Text className="text-white mt-2">Saving...</Text>
//         </View>
//       )}
      
//       <ScrollView className="flex-1">
//         <View className="flex-row items-center justify-between mb-6">
//           <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full">
//             <Text className="text-blue-500 text-base">← Back to Clients</Text>
//           </TouchableOpacity>
//           <Text className="text-white text-xl font-bold">Client Details</Text>
//           <View className="w-10" />
//         </View>

//         {/* Client Information Section */}
//         <View className="bg-gray-800 rounded-xl p-4 mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-white text-lg font-bold">Client Information</Text>
//             {!isEditingClient ? (
//               <TouchableOpacity onPress={() => setIsEditingClient(true)}>
//                 <Edit size={20} color="#3b82f6" />
//               </TouchableOpacity>
//             ) : (
//               <View className="flex-row space-x-2">
//                 <TouchableOpacity onPress={handleSaveClient}>
//                   <Save size={20} color="#10b981" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleCancelClientEdit}>
//                   <X size={20} color="#ef4444" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>

//           <View className="space-y-3">
//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">First Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.first_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, first_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{customer.first_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Last Name:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.last_name}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, last_name: text })}
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{customer.last_name}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Email:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.email}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, email: text })}
//                   keyboardType="email-address"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{customer.email}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Phone:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.phone_number}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, phone_number: text })}
//                   keyboardType="phone-pad"
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{customer.phone_number}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Address:</Text>
//               {isEditingClient ? (
//                 <TextInput
//                   className="flex-1 bg-gray-700 text-white p-2 rounded"
//                   value={clientEditData.address}
//                   onChangeText={(text) => setClientEditData({ ...clientEditData, address: text })}
//                   multiline
//                 />
//               ) : (
//                 <Text className="text-white flex-1">{customer.address || 'N/A'}</Text>
//               )}
//             </View>

//             <View className="flex-row">
//               <Text className="text-gray-400 font-bold w-24">Total Spent:</Text>
//               <Text className="text-green-400 flex-1">
//                 {formatCurrency(customer.total_spent || 0)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* ... rest of your component (vehicles and services sections) ... */}
//       </ScrollView>
//     </View>
//   );
// }

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

// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { DollarSign, Edit, Plus, Save, X } from 'lucide-react-native';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useClientData } from '../../lib/pages/clientData';

// interface VehicleFormData {
//   id: string; // Add id for editing
//   make: string;
//   licence_plate: string;
//   engine_type?: string;
//   notes?: string;
//   mileage?: string;
//   color?: string;
// }

// interface ClientDetailsProps {
//   onGoBack: () => void;
//   onAddVehicle: (clientId: string) => void;
//   onAddService: (clientId: string) => void;
// }

// export default function ClientDetails({ onGoBack, onAddVehicle, onAddService }: Omit<ClientDetailsProps, 'clientId'>) {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const actualClientId = id as string;
//   const {
//     clientDetails,
//     clientVehicles,
//     clientServices,
//     loading,
//     error,
//     fetchClientDetails,
//     updateClientDetails,
//     updateClientVehicle,
//   } = useClientData();

//   const [isEditingClient, setIsEditingClient] = useState(false);
//   const [clientEditData, setClientEditData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone_number: '',
//     address: '',
//   });
//   const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
//   const [vehicleEditData, setVehicleEditData] = useState<Partial<VehicleFormData> | null>(null);


//   useEffect(() => {
//     if (actualClientId) {
//       fetchClientDetails(actualClientId);
//     }
//   }, [actualClientId, fetchClientDetails]);

//   useEffect(() => {
//     if (clientDetails?.customer) {
//       setClientEditData({
//         first_name: clientDetails.customer.first_name,
//         last_name: clientDetails.customer.last_name,
//         email: clientDetails.customer.email,
//         phone_number: clientDetails.customer.phone_number,
//         address: clientDetails.customer.address || '',
//       });
//     }
//   }, [clientDetails]);
//   const handleGoBack = () => {
//     router.back();
//   };

//   const handleAddVehicle = () => {
//     router.push(`/AddVehicle?clientId=${actualClientId}`);
//   };

//   const handleAddService = () => {
//     router.push(`/AddService?clientId=${actualClientId}`);
//   };
//   const handleEditClient = () => {
//     setIsEditingClient(true);
//   };

//   const handleSaveClient = async () => {
//     try {
//       await updateClientDetails(actualClientId, clientEditData);
//       setIsEditingClient(false);
//       Alert.alert('Success', 'Client details updated successfully!');
//     } catch (e) {
//       Alert.alert('Error', 'Failed to save client details.');
//     }
//   };

//   const handleEditVehicle = (vehicle: any) => {
//     setEditingVehicleId(vehicle.id);
//     setVehicleEditData({ ...vehicle, mileage: vehicle.mileage?.toString() });
//   };

//   const handleSaveVehicle = async () => {
//     if (!vehicleEditData || !editingVehicleId) return;

//     try {
//       const formattedData = {
//         ...vehicleEditData,
//         mileage: vehicleEditData.mileage ? parseFloat(vehicleEditData.mileage) : undefined,
//       };
//       await updateClientVehicle(editingVehicleId, formattedData);
//       setEditingVehicleId(null);
//       setVehicleEditData(null);
//       Alert.alert('Success', 'Vehicle details updated successfully!');
//       fetchClientDetails(actualClientId); // Refresh data
//     } catch (e) {
//       Alert.alert('Error', 'Failed to save vehicle details.');
//     }
//   };

//   const handleCancelEdit = () => {
//     setIsEditingClient(false);
//     setEditingVehicleId(null);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'KES',
//     }).format(amount);
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#0A0F1E]">
//         <ActivityIndicator size="large" color="#4F46E5" />
//       </View>
//     );
//   }

//   if (error || !clientDetails?.customer) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#0A0F1E] p-4">
//         <Text className="text-red-500 text-lg text-center">{error || 'Client not found.'}</Text>
//         <TouchableOpacity onPress={onGoBack} className="mt-4 bg-gray-700 px-4 py-2 rounded-lg">
//           <Text className="text-white">Go Back</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const { customer, vehicles, service_records } = clientDetails;

//   return (
//     <ScrollView className="flex-1 bg-[#0A0F1E] p-4 pt-14">
//       <View className="flex-row justify-between items-center mb-5">
//         <TouchableOpacity onPress={onGoBack} className="p-3 bg-gray-700 rounded-full">
//           <X size={20} color="white" />
//         </TouchableOpacity>
//         <Text className="text-white text-3xl font-bold">Client Details</Text>
//         <View className="w-10" />
//       </View>

//       {/* Client Details Section */}
//       <View className="bg-gray-800 p-6 rounded-xl mb-6">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-white text-2xl font-bold">
//             {customer.first_name} {customer.last_name}
//           </Text>
//           {isEditingClient ? (
//             <View className="flex-row space-x-2">
//               <TouchableOpacity onPress={handleSaveClient} className="p-2 bg-green-600 rounded-full">
//                 <Save size={20} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleCancelEdit} className="p-2 bg-red-600 rounded-full">
//                 <X size={20} color="white" />
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity onPress={handleEditClient} className="p-2 bg-blue-600 rounded-full">
//               <Edit size={20} color="white" />
//             </TouchableOpacity>
//           )}
//         </View>

//         <View className="space-y-3">
//           <View className="flex-row">
//             <Text className="text-gray-400 font-bold w-24">Email:</Text>
//             {isEditingClient ? (
//               <TextInput
//                 className="flex-1 bg-gray-700 text-white p-2 rounded"
//                 value={clientEditData.email}
//                 onChangeText={(text) => setClientEditData({ ...clientEditData, email: text })}
//                 keyboardType="email-address"
//               />
//             ) : (
//               <Text className="text-white flex-1">{customer.email}</Text>
//             )}
//           </View>
//           <View className="flex-row">
//             <Text className="text-gray-400 font-bold w-24">Phone:</Text>
//             {isEditingClient ? (
//               <TextInput
//                 className="flex-1 bg-gray-700 text-white p-2 rounded"
//                 value={clientEditData.phone_number}
//                 onChangeText={(text) => setClientEditData({ ...clientEditData, phone_number: text })}
//                 keyboardType="phone-pad"
//               />
//             ) : (
//               <Text className="text-white flex-1">{customer.phone_number}</Text>
//             )}
//           </View>
//           <View className="flex-row">
//             <Text className="text-gray-400 font-bold w-24">Address:</Text>
//             {isEditingClient ? (
//               <TextInput
//                 className="flex-1 bg-gray-700 text-white p-2 rounded"
//                 value={clientEditData.address}
//                 onChangeText={(text) => setClientEditData({ ...clientEditData, address: text })}
//                 multiline
//               />
//             ) : (
//               <Text className="text-white flex-1">{customer.address || 'N/A'}</Text>
//             )}
//           </View>
//           <View className="flex-row">
//             <Text className="text-gray-400 font-bold w-24">Total Spent:</Text>
//             <Text className="text-green-400 flex-1">{formatCurrency(customer.total_spent || 0)}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Vehicles Section */}
//       <View className="bg-gray-800 p-6 rounded-xl mb-6">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-white text-2xl font-bold">Vehicles</Text>
//           <TouchableOpacity onPress={handleAddVehicle} className="p-2 bg-green-600 rounded-full">
//             <Plus size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//         {clientVehicles && clientVehicles.length > 0 ? (
//           clientVehicles.map((vehicle) => (
//             <View key={vehicle.id} className="bg-gray-700 p-4 rounded-lg mb-4">
//               <View className="flex-row justify-between items-center mb-2">
//                 <Text className="text-white text-lg font-bold">
//                   {vehicle.make}
//                 </Text>
//                 {editingVehicleId === vehicle.id ? (
//                   <View className="flex-row space-x-2">
//                     <TouchableOpacity onPress={handleSaveVehicle} className="p-1 bg-green-600 rounded-full">
//                       <Save size={16} color="white" />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={handleCancelEdit} className="p-1 bg-red-600 rounded-full">
//                       <X size={16} color="white" />
//                     </TouchableOpacity>
//                   </View>
//                 ) : (
//                   <TouchableOpacity onPress={() => handleEditVehicle(vehicle)} className="p-1 bg-blue-600 rounded-full">
//                     <Edit size={16} color="white" />
//                   </TouchableOpacity>
//                 )}
//               </View>
//               <View className="space-y-1">
//                 <View className="flex-row">
//                   <Text className="text-gray-400 font-bold w-28">License Plate:</Text>
//                   {editingVehicleId === vehicle.id ? (
//                     <TextInput
//                       className="flex-1 bg-gray-600 text-white p-1 rounded"
//                       value={vehicleEditData?.licence_plate}
//                       onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, licence_plate: text })}
//                     />
//                   ) : (
//                     <Text className="text-white flex-1">{vehicle.licence_plate}</Text>
//                   )}
//                 </View>
//                 <View className="flex-row">
//                   <Text className="text-gray-400 font-bold w-28">Engine Type:</Text>
//                   {editingVehicleId === vehicle.id ? (
//                     <TextInput
//                       className="flex-1 bg-gray-600 text-white p-1 rounded"
//                       value={vehicleEditData?.engine_type}
//                       onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, engine_type: text })}
//                     />
//                   ) : (
//                     <Text className="text-white flex-1">{vehicle.engine_type || 'N/A'}</Text>
//                   )}
//                 </View>
//                 <View className="flex-row">
//                   <Text className="text-gray-400 font-bold w-28">Color:</Text>
//                   {editingVehicleId === vehicle.id ? (
//                     <TextInput
//                       className="flex-1 bg-gray-600 text-white p-1 rounded"
//                       value={vehicleEditData?.color}
//                       onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, color: text })}
//                     />
//                   ) : (
//                     <Text className="text-white flex-1">{vehicle.color || 'N/A'}</Text>
//                   )}
//                 </View>
//                 <View className="flex-row">
//                   <Text className="text-gray-400 font-bold w-28">Mileage:</Text>
//                   {editingVehicleId === vehicle.id ? (
//                     <TextInput
//                       className="flex-1 bg-gray-600 text-white p-1 rounded"
//                       value={vehicleEditData?.mileage}
//                       onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, mileage: text })}
//                       keyboardType="numeric"
//                     />
//                   ) : (
//                     <Text className="text-white flex-1">{vehicle.mileage || 'N/A'}</Text>
//                   )}
//                 </View>
//                 {vehicle.notes && (
//                   <View className="flex-row">
//                     <Text className="text-gray-400 font-bold w-28">Notes:</Text>
//                     {editingVehicleId === vehicle.id ? (
//                       <TextInput
//                         className="flex-1 bg-gray-600 text-white p-1 rounded"
//                         value={vehicleEditData?.notes}
//                         onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, notes: text })}
//                         multiline
//                       />
//                     ) : (
//                       <Text className="text-white flex-1">{vehicle.notes}</Text>
//                     )}
//                   </View>
//                 )}
//               </View>
//             </View>
//           ))
//         ) : (
//           <Text className="text-gray-400 text-center">No vehicles found for this client.</Text>
//         )}
//       </View>

//       {/* Service Records Section */}
//       <View className="bg-gray-800 p-6 rounded-xl mb-6">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-white text-2xl font-bold">Service Records</Text>
//           <TouchableOpacity onPress={handleAddService} className="p-2 bg-green-600 rounded-full">
//             <Plus size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//         {clientServices && clientServices.length > 0 ? (
//           clientServices.map((service) => (
//             <View key={service.id} className="bg-gray-700 p-4 rounded-lg mb-4">
//               <View className="flex-row justify-between items-center">
//                 <Text className="text-white text-lg font-bold">{service.service_type}</Text>
//                 <View className="flex-row items-center">
//                   <DollarSign size={14} color={service.paid_status ? "#10b981" : "#ef4444"} />
//                   <Text className={`ml-1 ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                     {formatCurrency(service.service_cost || 0)}
//                   </Text>
//                   <Text className={`ml-2 text-xs ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
//                     {service.paid_status ? 'Paid' : 'Unpaid'}
//                   </Text>
//                 </View>
//               </View>
//               <Text className="text-gray-400 text-sm">
//                 Date: {formatDate(service.created_at)}
//               </Text>
//               {service.notes && (
//                 <Text className="text-gray-400 text-sm mt-1">Notes: {service.notes}</Text>
//               )}
//               {/* {service.service_expenses && service.service_expenses !== '0' && (
//                 <Text className="text-gray-400 text-sm mt-1">
//                   Expenses: {formatCurrency(parseFloat(service.service_expenses))}
//                 </Text>
//               )} */}
//               {(() => {
//                 const expenses = Number(service.service_expenses || 0); // Convert safely
//                 if (expenses > 0) {
//                   return (
//                     <Text className="text-gray-400 text-sm mt-1">
//                       Expenses: {formatCurrency(expenses)}
//                     </Text>
//                   );
//                 }
//                 return null;
//               })()}
//             </View>
//           ))
//         ) : (
//           <Text className="text-gray-400 text-center">No service records found for this client.</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// }
// import React, { useState } from 'react'
// import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
// import { BlurView } from 'expo-blur'
// import { Search, Edit, Plus, Trash2, Lock, Package, DollarSign, Hash, Truck, CarIcon, Settings, User, MapPin, Bell } from 'lucide-react'
// import { images } from '@/constants/images'

// interface InventoryItem {
//   id: string
//   name: string
//   category: string
//   quantity: number
//   costPrice: number
//   sellingPrice: number
//   supplier: string
//   image: string
//   code: string
// }

// export default function InventoryPage() {

//   const branchName = "Main Branch"
//   const todayStats = {
//     revenue: 25000,
//     jobsCompleted: 12,
//     pendingJobs: 5,
//     expenses: 5000,
//     staffAttendance: 8 // out of 10
//   }

//   const [searchQuery, setSearchQuery] = useState('')
//   const [activeModal, setActiveModal] = useState<string | null>(null)
//   const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
//   const [passwordModal, setPasswordModal] = useState(false)
//   const [password, setPassword] = useState('')

//   // Mock inventory data
//   const [inventory, setInventory] = useState<InventoryItem[]>([
//     {
//       id: '1',
//       name: 'Brake Pads',
//       category: 'Brakes',
//       quantity: 3,
//       costPrice: 1200,
//       sellingPrice: 1800,
//       supplier: 'AutoParts Ltd',
//       image: 'https://example.com/brakepads.jpg',
//       code: 'BP001'
//     },
//     {
//       id: '2',
//       name: 'Engine Oil',
//       category: 'Lubricants',
//       quantity: 12,
//       costPrice: 600,
//       sellingPrice: 950,
//       supplier: 'OilCorp',
//       image: 'https://example.com/oil.jpg',
//       code: 'EO001'
//     },
//     {
//       id: '3',
//       name: 'Air Filter',
//       category: 'Filters',
//       quantity: 8,
//       costPrice: 300,
//       sellingPrice: 500,
//       supplier: 'FilterMax',
//       image: 'https://example.com/filter.jpg',
//       code: 'AF001'
//     },
//     {
//       id: '4',
//       name: 'Spark Plugs',
//       category: 'Electrical',
//       quantity: 2,
//       costPrice: 150,
//       sellingPrice: 250,
//       supplier: 'SparkTech',
//       image: 'https://example.com/spark.jpg',
//       code: 'SP001'
//     },
//     {
//       id: '5',
//       name: 'Tire Pressure Gauge',
//       category: 'Tools',
//       quantity: 15,
//       costPrice: 200,
//       sellingPrice: 350,
//       supplier: 'ToolMasters',
//       image: 'https://example.com/gauge.jpg',
//       code: 'TPG001'
//     }
//   ])

//   // Edit form states
//   const [editForm, setEditForm] = useState({
//     quantity: '',
//     costPrice: '',
//     sellingPrice: '',
//     supplier: ''
//   })

//   // Restock form states
//   const [restockForm, setRestockForm] = useState({
//     quantity: ''
//   })

//   const filteredInventory = inventory.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.category.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   const handleEdit = (item: InventoryItem) => {
//     setSelectedItem(item)
//     setEditForm({
//       quantity: item.quantity.toString(),
//       costPrice: item.costPrice.toString(),
//       sellingPrice: item.sellingPrice.toString(),
//       supplier: item.supplier
//     })
//     setActiveModal('edit')
//   }

//   const handleRestock = (item: InventoryItem) => {
//     setSelectedItem(item)
//     setRestockForm({ quantity: '' })
//     setActiveModal('restock')
//   }

//   const handleRemove = (item: InventoryItem) => {
//     setSelectedItem(item)
//     setPasswordModal(true)
//   }

//   const saveEdit = () => {
//     if (!selectedItem) return

//     const updatedInventory = inventory.map(item =>
//       item.id === selectedItem.id
//         ? {
//             ...item,
//             quantity: parseInt(editForm.quantity) || 0,
//             costPrice: parseFloat(editForm.costPrice) || 0,
//             sellingPrice: parseFloat(editForm.sellingPrice) || 0,
//             supplier: editForm.supplier
//           }
//         : item
//     )
//     setInventory(updatedInventory)
//     Alert.alert('Success', 'Item updated successfully!')
//     setActiveModal(null)
//     setSelectedItem(null)
//   }

//   const saveRestock = () => {
//     if (!selectedItem) return

//     const additionalQty = parseInt(restockForm.quantity) || 0
//     const updatedInventory = inventory.map(item =>
//       item.id === selectedItem.id
//         ? { ...item, quantity: item.quantity + additionalQty }
//         : item
//     )
//     setInventory(updatedInventory)
//     Alert.alert('Success', `${additionalQty} units added to ${selectedItem.name}`)
//     setActiveModal(null)
//     setSelectedItem(null)
//   }

//   const verifyPasswordAndRemove = () => {
//     if (password === 'admin123') { // Mock password
//       if (selectedItem) {
//         const updatedInventory = inventory.filter(item => item.id !== selectedItem.id)
//         setInventory(updatedInventory)
//         Alert.alert('Success', `${selectedItem.name} removed from inventory`)
//       }
//       setPasswordModal(false)
//       setPassword('')
//       setSelectedItem(null)
//     } else {
//       Alert.alert('Error', 'Incorrect password')
//     }
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-6 mb-4">
//         <Text className="text-white text-xl font-bold">Inventory Management</Text>
//         <View className="flex-row items-center space-x-6">
//                   <TouchableOpacity>
//                     <Bell size={24} color="red" />
//                   </TouchableOpacity>
//                   <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
//                     <MapPin size={16} color="green" />
//                     <Text className="text-white">{branchName}</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity>
//                     <Settings size={24} color="white" />
//                   </TouchableOpacity>
                  
//                 </View>
//         <Package size={24} color="white" />
//       </View>

//       {/* Search Bar */}
//       <View className="px-6 mb-4">
//         <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
//           <Search size={20} color="white" />
//           <TextInput
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholder="Search by name, code, supplier, or category..."
//             placeholderTextColor="#9ca3af"
//             className="flex-1 text-white ml-3"
//           />
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
//         {/* Inventory List */}
//         {filteredInventory.map((item) => (
//           <BlurView
//             key={item.id}
//             intensity={50}
//             tint="dark"
//             className={`rounded-2xl p-4 ${item.quantity < 5 ? 'border-2 border-red-500' : ''}`}
//           >
//             <View className="flex-row items-center">
//               <Image
//                 source={{ uri: item.image }}
//                 style={{ width: 60, height: 60, borderRadius: 8 }}
//                 className="mr-4"
//               />
//               <View className="flex-1">
//                 <View className="flex-row items-center justify-between mb-1">
//                   <Text className="text-white text-lg font-semibold">{item.name}</Text>
//                   <Text className="text-gray-400 text-sm">{item.code}</Text>
//                 </View>
//                 <Text className="text-gray-300 text-sm mb-1">{item.category}</Text>
//                 <View className="flex-row items-center justify-between">
//                   <View className="flex-row items-center">
//                     <Hash size={14} color="#9ca3af" />
//                     <Text className={`text-sm font-bold ml-1 ${item.quantity < 5 ? 'text-red-400' : 'text-green-400'}`}>
//                       {item.quantity} units
//                     </Text>
//                   </View>
//                   <View className="flex-row items-center">
//                     <Truck size={14} color="#9ca3af" />
//                     <Text className="text-gray-300 text-sm ml-1">{item.supplier}</Text>
//                   </View>
//                 </View>
//                 <View className="flex-row items-center justify-between mt-2">
//                   <View className="flex-row items-center">
//                     <DollarSign size={14} color="#9ca3af" />
//                     <Text className="text-gray-300 text-sm ml-1">
//                       Cost: KES {item.costPrice} | Sell: KES {item.sellingPrice}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Actions */}
//             <View className="flex-row justify-end space-x-2 mt-3">
//               <TouchableOpacity
//                 onPress={() => handleEdit(item)}
//                 className="bg-blue-600 rounded-lg px-3 py-2"
//               >
//                 <Edit size={16} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleRestock(item)}
//                 className="bg-green-600 rounded-lg px-3 py-2"
//               >
//                 <Plus size={16} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleRemove(item)}
//                 className="bg-red-600 rounded-lg px-3 py-2"
//               >
//                 <Trash2 size={16} color="white" />
//               </TouchableOpacity>
//             </View>
//           </BlurView>
//         ))}

//         {filteredInventory.length === 0 && (
//           <View className="items-center py-8">
//             <Package size={48} color="#9ca3af" />
//             <Text className="text-gray-400 text-lg mt-4">No items found</Text>
//             <Text className="text-gray-500 text-sm">Try adjusting your search terms</Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Edit Modal */}
//       <Modal visible={activeModal === 'edit'} animationType="slide" transparent>
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
//             <Text className="text-white text-xl font-bold mb-4">Edit Item</Text>
//             <Text className="text-gray-300 mb-2">Item: {selectedItem?.name}</Text>

//             <TextInput
//               value={editForm.quantity}
//               onChangeText={(text) => setEditForm({...editForm, quantity: text})}
//               placeholder="Quantity"
//               placeholderTextColor="#9ca3af"
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <TextInput
//               value={editForm.costPrice}
//               onChangeText={(text) => setEditForm({...editForm, costPrice: text})}
//               placeholder="Cost Price (KES)"
//               placeholderTextColor="#9ca3af"
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <TextInput
//               value={editForm.sellingPrice}
//               onChangeText={(text) => setEditForm({...editForm, sellingPrice: text})}
//               placeholder="Selling Price (KES)"
//               placeholderTextColor="#9ca3af"
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <TextInput
//               value={editForm.supplier}
//               onChangeText={(text) => setEditForm({...editForm, supplier: text})}
//               placeholder="Supplier"
//               placeholderTextColor="#9ca3af"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
//             />

//             <View className="flex-row space-x-3">
//               <TouchableOpacity
//                 onPress={saveEdit}
//                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
//               >
//                 <Text className="text-white font-semibold">Save Changes</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => setActiveModal(null)}
//                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
//               >
//                 <Text className="text-white font-semibold">Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </BlurView>
//         </View>
//       </Modal>

//       {/* Restock Modal */}
//       <Modal visible={activeModal === 'restock'} animationType="slide" transparent>
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
//             <Text className="text-white text-xl font-bold mb-4">Restock Item</Text>
//             <Text className="text-gray-300 mb-2">Item: {selectedItem?.name}</Text>
//             <Text className="text-gray-300 mb-4">Current Quantity: {selectedItem?.quantity}</Text>

//             <TextInput
//               value={restockForm.quantity}
//               onChangeText={(text) => setRestockForm({...restockForm, quantity: text})}
//               placeholder="Additional Quantity"
//               placeholderTextColor="#9ca3af"
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
//             />

//             <View className="flex-row space-x-3">
//               <TouchableOpacity
//                 onPress={saveRestock}
//                 className="flex-1 bg-green-600 rounded-lg py-3 items-center"
//               >
//                 <Text className="text-white font-semibold">Add Stock</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => setActiveModal(null)}
//                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
//               >
//                 <Text className="text-white font-semibold">Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </BlurView>
//         </View>
//       </Modal>

//       {/* Password Modal for Removal */}
//       <Modal visible={passwordModal} animationType="fade" transparent>
//         <View className="flex-1 justify-center items-center bg-black/70">
//           <BlurView intensity={80} tint="dark" className="w-10/12 rounded-2xl p-6">
//             <View className="flex-row items-center mb-4">
//               <Lock size={24} color="#DC2626" />
//               <Text className="text-white text-lg font-bold ml-2">Admin Authorization Required</Text>
//             </View>
//             <Text className="text-gray-300 mb-2">Removing: {selectedItem?.name}</Text>
//             <Text className="text-gray-300 mb-4">Enter admin password to remove this item:</Text>
//             <TextInput
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Enter password"
//               placeholderTextColor="#9ca3af"
//               secureTextEntry
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
//             />
//             <View className="flex-row space-x-3">
//               <TouchableOpacity
//                 onPress={verifyPasswordAndRemove}
//                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
//               >
//                 <Text className="text-white font-semibold">Remove Item</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   setPasswordModal(false)
//                   setPassword('')
//                   setSelectedItem(null)
//                 }}
//                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
//               >
//                 <Text className="text-white font-semibold">Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </BlurView>
//         </View>
//       </Modal>
//     </View>
//   )
// }
// app/inventory.tsx


// import { Ionicons } from '@expo/vector-icons'
// import { Tabs, useLocalSearchParams, useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
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

// // Define types for navigation items
// interface NavItem {
//   name: string;
//   title: string;
//   iconName: string;
//   roles: ('super-admin' | 'admin' | 'operator')[];
// }

// export default function TabsLayout() {
//   const { theme, isDark, toggleTheme } = useTheme()
//   const { user } = useAuth()
//   const [dropdownVisible, setDropdownVisible] = useState(false)
//   const router = useRouter()
//   const params = useLocalSearchParams()
  
//   // Get screen dimensions
//   const { width } = Dimensions.get('window')
//   const isDesktop = width >= 768 // Tablet size and above
//   const isMobile = width < 768

//   console.log('TabsLayout rendering', { user, params, isDesktop, width })

//   // Handle initial navigation based on user role
//   useEffect(() => {
//     if (user && params.initialRoute) {
//       // Small delay to ensure navigation is ready
//       setTimeout(() => {
//         const route = params.initialRoute as string;
//         if (route === 'superadmin') {
//           router.replace('/superadmin');
//         } else if (route === 'admin') {
//           router.replace('/admin');
//         } else {
//           router.replace('/dashboard');
//         }
//       }, 100)
//     }
//   }, [user, params.initialRoute])

//   // Define all navigation options with role restrictions
//   const allNavOptions: NavItem[] = [
//     { name: 'dashboard', title: 'Dashboard', iconName: 'home', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'superadmin', title: 'Superadmin', iconName: 'shield', roles: ['super-admin'] },
//     { name: 'operator', title: 'Operator', iconName: 'construct', roles: ['operator'] },
//     { name: 'clients', title: 'Clients', iconName: 'people', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'employees', title: 'Employees', iconName: 'person', roles: ['super-admin', 'operator'] },
//     { name: 'inventory', title: 'Inventory', iconName: 'cube', roles: ['super-admin', 'admin', 'operator'] },
//     { name: 'reports', title: 'Reports', iconName: 'bar-chart', roles: ['super-admin', 'admin'] },
//     { name: 'sms', title: 'SMS', iconName: 'chatbubble', roles: ['super-admin', 'admin'] },
//     { name: 'Transactions', title: 'Transactions', iconName: 'cash', roles: ['super-admin', 'admin'] },
//   ]

//   // Filter options based on user role
//   const getFilteredNavOptions = (): NavItem[] => {
//     if (!user) return [];
    
//     return allNavOptions.filter(option => 
//       option.roles.includes(user.role as 'super-admin' | 'admin' | 'operator')
//     );
//   }

//   // Get all filtered options (for desktop)
//   const getAllOptions = (): NavItem[] => {
//     return getFilteredNavOptions();
//   }

//   // Get main tabs for mobile (first 3 items)
//   const getMobileMainTabs = (): NavItem[] => {
//     const filtered = getFilteredNavOptions();
//     return filtered.slice(0, 3);
//   }

//   // Get more options for mobile (remaining items)
//   const getMobileMoreOptions = (): NavItem[] => {
//     const filtered = getFilteredNavOptions();
//     return filtered.slice(3);
//   }

//   // Floating Dock Component for Desktop
//   const FloatingDock = ({ state, descriptors, navigation }: any) => {
//     const activeRoute = state.routes[state.index]
//     const navOptions = getAllOptions()

//     return (
//       <View style={[styles.floatingDock, isDark ? styles.floatingDockDark : styles.floatingDockLight]}>
//         {navOptions.map((option) => {
//           const route = state.routes.find((r: any) => r.name === option.name);
//           if (!route) return null;
          
//           const { options } = descriptors[route.key]
//           const isFocused = state.routes[state.index].name === option.name

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             })

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name)
//             }
//           }

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
//               <Text style={[
//                 styles.dockText,
//                 { 
//                   color: isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280')
//                 }
//               ]}>
//                 {option.title}
//               </Text>
//             </TouchableOpacity>
//           )
//         })}
        
//         {/* Theme Toggle in Dock */}
//         <View style={styles.themeToggleContainer}>
//           <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
//             <Ionicons name={isDark ? 'moon' : 'sunny'} color={isDark ? '#ffffff' : '#ffffff'} size={24} />
//           </TouchableOpacity>
//           {user && (
//             <View style={[
//               styles.roleBadge, 
//               user.role === 'super-admin' ? styles.superAdminBadge :
//               user.role === 'admin' ? styles.adminBadge :
//               styles.operatorBadge
//             ]}>
//               <Text style={styles.roleBadgeText}>
//                 {user.role === 'super-admin' ? 'SUPER' : 
//                  user.role === 'admin' ? 'ADMIN' : 'OPERATOR'}
//               </Text>
//             </View>
//           )}
//         </View>
//       </View>
//     )
//   }

//   // Mobile Tab Bar Component
//   const MobileTabBar = ({ state, descriptors, navigation }: any) => {
//     const mainTabs = getMobileMainTabs()
//     const moreOptions = getMobileMoreOptions()

//     const getActiveColor = () => {
//       return '#3b82f6'
//     }

//     const getInactiveColor = () => {
//       return isDark ? '#9ca3af' : '#6b7280'
//     }

//     return (
//       <>
//         <View style={[styles.mobileTabBar, isDark ? styles.mobileTabBarDark : styles.mobileTabBarLight]}>
//           {/* Main Tabs */}
//           {mainTabs.map((option) => {
//             const route = state.routes.find((r: any) => r.name === option.name);
//             if (!route) return null;
            
//             const { options } = descriptors[route.key]
//             const isFocused = state.routes[state.index].name === option.name

//             const onPress = () => {
//               const event = navigation.emit({
//                 type: 'tabPress',
//                 target: route.key,
//                 canPreventDefault: true,
//               })

//               if (!isFocused && !event.defaultPrevented) {
//                 navigation.navigate(route.name)
//               }
//             }

//             return (
//               <TouchableOpacity
//                 key={option.name}
//                 onPress={onPress}
//                 style={styles.mobileTabItem}
//               >
//                 <Ionicons
//                   name={option.iconName as any}
//                   color={isFocused ? getActiveColor() : getInactiveColor()}
//                   size={isFocused ? 28 : 24}
//                 />
//                 <Text style={[
//                   styles.mobileTabText,
//                   { color: isFocused ? getActiveColor() : getInactiveColor() }
//                 ]}>
//                   {option.title}
//                 </Text>
//               </TouchableOpacity>
//             )
//           })}

//           {/* More Button if there are more options */}
//           {moreOptions.length > 0 && (
//             <TouchableOpacity
//               onPress={() => setDropdownVisible(true)}
//               style={styles.mobileTabItem}
//             >
//               <Ionicons
//                 name="menu"
//                 color={getInactiveColor()}
//                 size={24}
//               />
//               <Text style={[styles.mobileTabText, { color: getInactiveColor() }]}>
//                 More
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Dropdown Modal for More Options */}
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
//             <View style={[
//               styles.modalContent, 
//               isDark ? styles.modalContentDark : styles.modalContentLight
//             ]}>
//               <Text style={[
//                 styles.modalTitle,
//                 { color: isDark ? '#ffffff' : '#000000' }
//               ]}>
//                 More Options
//               </Text>
//               <FlatList
//                 data={moreOptions}
//                 keyExtractor={(item) => item.name}
//                 renderItem={({ item }) => {
//                   const route = state.routes.find((r: any) => r.name === item.name);
//                   if (!route) return null;
                  
//                   const { options } = descriptors[route.key]
//                   const isFocused = state.routes[state.index].name === item.name
                  
//                   return (
//                     <TouchableOpacity
//                       onPress={() => {
//                         navigation.navigate(item.name)
//                         setDropdownVisible(false)
//                       }}
//                       style={styles.modalItem}
//                     >
//                       <Ionicons 
//                         name={item.iconName as any} 
//                         color={isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280')} 
//                         size={24} 
//                       />
//                       <Text style={[
//                         styles.modalItemText,
//                         { 
//                           color: isFocused ? '#3b82f6' : (isDark ? '#9ca3af' : '#6b7280')
//                         }
//                       ]}>
//                         {item.title}
//                       </Text>
//                     </TouchableOpacity>
//                   )
//                 }}
//               />
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       </>
//     )
//   }

//   // Custom Tab Bar that switches between desktop and mobile
//   const CustomTabBar = (props: any) => {
//     return isDesktop ? <FloatingDock {...props} /> : <MobileTabBar {...props} />
//   }

//   // Filter screens based on user role
//   const filteredScreens = getFilteredNavOptions();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={CustomTabBar}
//     >
//       {filteredScreens.map((screen) => (
//         <Tabs.Screen
//           key={screen.name}
//           name={screen.name}
//           options={{
//             title: screen.title,
//             tabBarIcon: ({ color, size, focused }) => (
//               <Ionicons name={screen.iconName as any} color={color} size={focused ? size + 2 : size} />
//             ),
//           }}
//         />
//       ))}
//     </Tabs>
//   )
// }

// const styles = StyleSheet.create({
//   // Floating Dock Styles
//   floatingDock: {
//     position: 'absolute',
//     bottom: 20,
//     left: '50%',
//     transform: [{ translateX: '-50%' }],
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
//     zIndex: 1000,
//   },
//   floatingDockLight: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   floatingDockDark: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   dockItem: {
//     padding: 12,
//     borderRadius: 10,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: 70,
//   },
//   dockItemActiveLight: {
//     backgroundColor: 'rgba(59, 130, 246, 0.2)',
//   },
//   dockItemActiveDark: {
//     backgroundColor: 'rgba(59, 130, 246, 0.2)',
//   },
//   dockText: {
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: '500',
//   },
//   themeToggleContainer: {
//     marginLeft: 15,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   themeToggle: {
//     padding: 10,
//     borderRadius: 20,
//   },
//   roleBadge: {
//     marginLeft: 8,
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   superAdminBadge: {
//     backgroundColor: '#dc2626',
//   },
//   adminBadge: {
//     backgroundColor: '#6b7280',
//   },
//   operatorBadge: {
//     backgroundColor: '#10b981',
//   },
//   roleBadgeText: {
//     color: 'white',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
  
//   // Mobile Tab Bar Styles
//   mobileTabBar: {
//     flexDirection: 'row',
//     height: 70,
//     paddingBottom: 10,
//   },
//   mobileTabBarLight: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderTopColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopWidth: 1,
//   },
//   mobileTabBarDark: {
//     backgroundColor: 'rgba(15, 23, 42, 0.95)',
//     borderTopColor: 'rgba(255, 255, 255, 0.1)',
//     borderTopWidth: 1,
//   },
//   mobileTabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mobileTabText: {
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: '500',
//   },
  
//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     paddingBottom: 40,
//     maxHeight: '80%',
//   },
//   modalContentLight: {
//     backgroundColor: '#0f172a',
//   },
//   modalContentDark: {
//     backgroundColor: '#0f172a',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   modalItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   modalItemText: {
//     marginLeft: 15,
//     fontSize: 16,
//   },
// })
// import React, { useState } from 'react';
// import { CSVLink } from 'react-csv';
// import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import useReportsData from '../../lib/pages/useReportsData';
// import './css/reports.css';

// const reports = [
//     { key: 'financial', name: 'Financial Report', description: 'Comprehensive report on income and expenses.' },
//     { key: 'clients', name: 'Client Report', description: 'Details on all registered clients.' },
//     { key: 'staff', name: 'Staff Report', description: 'Information about all staff members.' },
//     { key: 'inventory', name: 'Inventory Report', description: 'Current stock levels and inventory details.' },
//     { key: 'carYard', name: 'Car Yard Report', description: 'Data on all vehicles in the database.' },
//     { key: 'transactions', name: 'Transactions Report', description: 'Records of all financial transactions.' },
// ];

// const ReportsPage: React.FC = () => {
//     const [startDate, setStartDate] = useState<string>('');
//     const [endDate, setEndDate] = useState<string>('');

//     const { data, loading, error, fetchReports } = useReportsData();

//     const handleFetchReports = (reportKey: string) => {
//         if (!startDate || !endDate) {
//             alert('Please select a start and end date.');
//             return;
//         }
        
//         // Convert string dates to Date objects
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         fetchReports(reportKey, start, end);
//     };

//     const getReportFileName = (reportName: string) => {
//         const start = startDate || 'start';
//         const end = endDate || 'end';
//         return `${reportName.replace(/\s+/g, '_')}_${start}_to_${end}.csv`;
//     };

//     return (
//         <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
//             <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
//                 <View className="flex-row items-center justify-between mb-6">
//                     <Text className="text-white text-xl font-bold">Reports Dashboard 📊</Text>
//                 </View>

//                 <View className="bg-gray-800 rounded-xl p-4 mb-6">
//                     <Text className="text-white text-lg font-bold mb-4">Select Date Range for Reports</Text>
//                     <View className="flex-row space-x-4 mb-4">
//                         <View className="flex-1">
//                             <Text className="text-gray-400 mb-2">Start Date:</Text>
//                             <input
//                                 type="date"
//                                 value={startDate}
//                                 onChange={(e) => setStartDate(e.target.value)}
//                                 className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
//                             />
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-gray-400 mb-2">End Date:</Text>
//                             <input
//                                 type="date"
//                                 value={endDate}
//                                 onChange={(e) => setEndDate(e.target.value)}
//                                 min={startDate}
//                                 className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
//                             />
//                         </View>
//                     </View>
//                 </View>

//                 {error && (
//                     <View className="bg-red-600 p-4 rounded-xl mb-6">
//                         <Text className="text-white">⚠️ {error}</Text>
//                     </View>
//                 )}

//                 {loading && (
//                     <View className="items-center justify-center p-6">
//                         <Text className="text-white">Loading...</Text>
//                     </View>
//                 )}

//                 <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {reports.map((report) => (
//                         <View key={report.key} className="bg-gray-800 rounded-xl p-4">
//                             <Text className="text-white text-lg font-bold mb-2">{report.name}</Text>
//                             <Text className="text-gray-400 mb-4">{report.description}</Text>
                            
//                             <TouchableOpacity
//                                 className="bg-blue-600 px-4 py-3 rounded-lg mb-3"
//                                 onPress={() => handleFetchReports(report.key)}
//                                 disabled={loading}
//                             >
//                                 <Text className="text-white text-center font-semibold">
//                                     {loading ? 'Fetching...' : 'Get Report Data'}
//                                 </Text>
//                             </TouchableOpacity>
                            
//                             {data[report.key] && (
//                                 <CSVLink
//                                     data={data[report.key] || []}
//                                     headers={data[report.key].length > 0 ? Object.keys(data[report.key][0]) : []}
//                                     filename={getReportFileName(report.name)}
//                                     className="block"
//                                 >
//                                     <TouchableOpacity
//                                         className="bg-green-600 px-4 py-3 rounded-lg"
//                                         disabled={!data[report.key]?.length}
//                                     >
//                                         <Text className="text-white text-center font-semibold">
//                                             Download as CSV
//                                         </Text>
//                                     </TouchableOpacity>
//                                 </CSVLink>
//                             )}
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// export default ReportsPage;
// // import React, { useState } from 'react'
// // import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Modal } from 'react-native'
// // import { useApp } from '@/lib/store'
// // import { BlurView } from 'expo-blur'
// // import { DollarSign, Users, Car, CheckCircle, XCircle, Plus, Minus, User, Package, CreditCard, Search, Wrench, Lock, Bell, Settings, MapPin } from 'lucide-react'
// // import { images } from '@/constants/images'

// // export default function Operator() {

// //   const branchName = "Main Branch"
// //   const todayStats = {
// //     revenue: 25000,
// //     jobsCompleted: 12,
// //     pendingJobs: 5,
// //     expenses: 5000,
// //     staffAttendance: 8 // out of 10
// //   }

// //   const { cars, clients, employees } = useApp()
// //   const [activeModal, setActiveModal] = useState<string | null>(null)
// //   const [searchQuery, setSearchQuery] = useState('')
// //   const [passwordModal, setPasswordModal] = useState(false)
// //   const [password, setPassword] = useState('')

// //   // Modal states
// //   const [customerForm, setCustomerForm] = useState({ name: '', phone: '', carPlate: '', carMake: '', carModel: '', mileage: '' })
// //   const [jobForm, setJobForm] = useState({ customerId: '', carId: '', issue: '', mechanicId: '' })
// //   const [inventoryForm, setInventoryForm] = useState({ name: '', quantity: '', price: '', supplier: '' })
// //   const [paymentForm, setPaymentForm] = useState({ customerId: '', jobId: '', amount: '', method: '' })

// //   const activeJobs = cars.filter(car => car.working)
// //   const filteredCustomers = clients.filter(c => 
// //     c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     c.phone.includes(searchQuery)
// //   )

// //   const handleAddCustomer = () => {
// //     if (!customerForm.name || !customerForm.phone) {
// //       Alert.alert('Error', 'Please fill in all required fields')
// //       return
// //     }
// //     Alert.alert('Success', 'Customer added successfully!')
// //     setCustomerForm({ name: '', phone: '', carPlate: '', carMake: '', carModel: '', mileage: '' })
// //     setActiveModal(null)
// //   }

// //   const handleAddJob = () => {
// //     if (!jobForm.customerId || !jobForm.carId || !jobForm.issue) {
// //       Alert.alert('Error', 'Please fill in all required fields')
// //       return
// //     }
// //     Alert.alert('Success', 'Job added successfully!')
// //     setJobForm({ customerId: '', carId: '', issue: '', mechanicId: '' })
// //     setActiveModal(null)
// //   }

// //   const handleAddInventory = () => {
// //     if (!inventoryForm.name || !inventoryForm.quantity) {
// //       Alert.alert('Error', 'Please fill in all required fields')
// //       return
// //     }
// //     Alert.alert('Success', 'Inventory item added successfully!')
// //     setInventoryForm({ name: '', quantity: '', price: '', supplier: '' })
// //     setActiveModal(null)
// //   }

// //   const handleRecordPayment = () => {
// //     if (!paymentForm.customerId || !paymentForm.amount) {
// //       Alert.alert('Error', 'Please fill in all required fields')
// //       return
// //     }
// //     Alert.alert('Success', 'Payment recorded successfully!')
// //     setPaymentForm({ customerId: '', jobId: '', amount: '', method: '' })
// //     setActiveModal(null)
// //   }

// //   const handleDeleteInventory = () => {
// //     setPasswordModal(true)
// //   }

// //   const verifyPassword = () => {
// //     if (password === 'admin123') { // Mock password
// //       Alert.alert('Success', 'Inventory item deleted!')
// //       setPasswordModal(false)
// //       setPassword('')
// //     } else {
// //       Alert.alert('Error', 'Incorrect password')
// //     }
// //   }

// //   const updateJobProgress = (jobId: string, status: string) => {
// //     Alert.alert('Success', `Job status updated to ${status}`)
// //   }

// //   return (
// //     <View className="flex-1 bg-[#0A0F1E] pt-14">
// //       {/* Header / Top Bar */}
// //       <View className="flex-row items-center justify-between px-6 mb-4">
// //         <View className="flex-row items-center space-x-4">
// //           <Image source={images.tristarlogo} style={{ width: 104, height: 44 }} />
// //           <Text className="text-white text-xl font-bold">Operator Dashboard</Text>
// //         </View>
// //        <View className="flex-row items-center space-x-6">
// //                   <TouchableOpacity>
// //                     <Bell size={24} color="red" />
// //                   </TouchableOpacity>
// //                   <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
// //                     <MapPin size={16} color="green" />
// //                     <Text className="text-white">{branchName}</Text>
// //                   </TouchableOpacity>
// //                   <TouchableOpacity>
// //                     <Settings size={24} color="white" />
// //                   </TouchableOpacity>
                  
// //                 </View>
// //       </View>

// //       <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
// //         {/* Quick Action Buttons */}
// //         <View className="flex-row flex-wrap gap-4">
// //           <TouchableOpacity 
// //             onPress={() => setActiveModal('customer')}
// //             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
// //           >
// //             <User size={24} color="white" />
// //             <Text className="text-white text-sm mt-2">Add Customer</Text>
// //           </TouchableOpacity>
          
// //           <TouchableOpacity 
// //             onPress={() => setActiveModal('job')}
// //             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
// //           >
// //             <Wrench size={24} color="white" />
// //             <Text className="text-white text-sm mt-2">Add Job</Text>
// //           </TouchableOpacity>
          
// //           <TouchableOpacity 
// //             onPress={() => setActiveModal('inventory')}
// //             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
// //           >
// //             <Package size={24} color="white" />
// //             <Text className="text-white text-sm mt-2">Add Inventory</Text>
// //           </TouchableOpacity>
          
// //           <TouchableOpacity 
// //             onPress={() => setActiveModal('payment')}
// //             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
// //           >
// //             <CreditCard size={24} color="white" />
// //             <Text className="text-white text-sm mt-2">Record Payment</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Current Jobs */}
// //         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
// //           <Text className="text-xl font-bold text-white mb-4">Current Jobs</Text>
// //           {activeJobs.map(job => (
// //             <View key={job.id} className="bg-white/10 rounded p-3 mb-2">
// //               <View className="flex-row justify-between items-center mb-2">
// //                 <Text className="text-white font-semibold">{job.model}</Text>
// //                 <Text className="text-green-400 font-bold">Active</Text>
// //               </View>
// //               <Text className="text-gray-300 text-sm">Owner: {job.owner}</Text>
// //               <Text className="text-gray-300 text-sm">Work: {job.work}</Text>
// //               <View className="flex-row space-x-2 mt-2">
// //                 <TouchableOpacity 
// //                   onPress={() => updateJobProgress(job.id, 'diagnosed')}
// //                   className="bg-blue-600 rounded px-3 py-1"
// //                 >
// //                   <Text className="text-white text-sm">Diagnosed</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity 
// //                   onPress={() => updateJobProgress(job.id, 'in-progress')}
// //                   className="bg-yellow-600 rounded px-3 py-1"
// //                 >
// //                   <Text className="text-white text-sm">In Progress</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity 
// //                   onPress={() => updateJobProgress(job.id, 'done')}
// //                   className="bg-green-600 rounded px-3 py-1"
// //                 >
// //                   <Text className="text-white text-sm">Done</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //           ))}
// //         </BlurView>

// //         {/* Customer List */}
// //         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
// //           <Text className="text-xl font-bold text-white mb-4">Customer List</Text>
// //           <View className="flex-row items-center bg-white/10 rounded-lg px-3 py-2 mb-4">
// //             <Search size={20} color="white" />
// //             <TextInput
// //               value={searchQuery}
// //               onChangeText={setSearchQuery}
// //               placeholder="Search customers..."
// //               placeholderTextColor="#9ca3af"
// //               className="flex-1 text-white ml-2"
// //             />
// //           </View>
// //           {filteredCustomers.map(cust => (
// //             <TouchableOpacity key={cust.id} className="bg-white/10 rounded p-3 mb-2">
// //               <View className="flex-row items-center space-x-3">
// //                 <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
// //                 <View>
// //                   <Text className="text-white font-semibold">{cust.name}</Text>
// //                   <Text className="text-gray-300 text-sm">{cust.phone}</Text>
// //                   <Text className="text-gray-400 text-xs">Cars: {cust.cars.join(', ')}</Text>
// //                 </View>
// //               </View>
// //             </TouchableOpacity>
// //           ))}
// //         </BlurView>

// //         {/* Inventory Snapshot */}
// //         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
// //           <Text className="text-xl font-bold text-white mb-4">Inventory (View Only)</Text>
// //           <View className="bg-white/10 rounded p-3 mb-2 flex-row justify-between items-center">
// //             <View>
// //               <Text className="text-white">Engine Oil</Text>
// //               <Text className="text-gray-300 text-sm">Current: 15 | Min: 20</Text>
// //             </View>
// //             <TouchableOpacity 
// //               onPress={handleDeleteInventory}
// //               className="bg-red-600 rounded px-3 py-1"
// //             >
// //               <Text className="text-white text-sm">Delete</Text>
// //             </TouchableOpacity>
// //           </View>
// //           <View className="bg-white/10 rounded p-3 mb-2 flex-row justify-between items-center">
// //             <View>
// //               <Text className="text-white">Brake Pads</Text>
// //               <Text className="text-gray-300 text-sm">Current: 25 | Min: 10</Text>
// //             </View>
// //             <TouchableOpacity 
// //               onPress={handleDeleteInventory}
// //               className="bg-red-600 rounded px-3 py-1"
// //             >
// //               <Text className="text-white text-sm">Delete</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </BlurView>
// //       </ScrollView>

// //       {/* Footer Quick Actions */}
// //       <View className="h-16 bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700">
// //         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
// //           <Plus size={20} color="white" />
// //           <Text className="text-white font-semibold">Add Customer</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
// //           <Wrench size={20} color="white" />
// //           <Text className="text-white font-semibold">Add Job</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
// //           <Package size={20} color="white" />
// //           <Text className="text-white font-semibold">Add Item</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
// //           <CreditCard size={20} color="white" />
// //           <Text className="text-white font-semibold">Payments</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Add Customer Modal */}
// //       <Modal visible={activeModal === 'customer'} animationType="slide" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/50">
// //           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
// //             <Text className="text-white text-xl font-bold mb-4">Add New Customer</Text>
// //             <TextInput
// //               value={customerForm.name}
// //               onChangeText={(text) => setCustomerForm({...customerForm, name: text})}
// //               placeholder="Customer Name"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.phone}
// //               onChangeText={(text) => setCustomerForm({...customerForm, phone: text})}
// //               placeholder="Phone Number"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="phone-pad"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.carPlate}
// //               onChangeText={(text) => setCustomerForm({...customerForm, carPlate: text})}
// //               placeholder="Car Plate"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.carMake}
// //               onChangeText={(text) => setCustomerForm({...customerForm, carMake: text})}
// //               placeholder="Car Make"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.carModel}
// //               onChangeText={(text) => setCustomerForm({...customerForm, carModel: text})}
// //               placeholder="Car Model"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.mileage}
// //               onChangeText={(text) => setCustomerForm({...customerForm, mileage: text})}
// //               placeholder="Mileage"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={handleAddCustomer}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Add Customer</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => setActiveModal(null)}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>

// //       {/* Add Job Modal */}
// //       <Modal visible={activeModal === 'job'} animationType="slide" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/50">
// //           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
// //             <Text className="text-white text-xl font-bold mb-4">Add New Job</Text>
// //             <TextInput
// //               value={jobForm.customerId}
// //               onChangeText={(text) => setJobForm({...jobForm, customerId: text})}
// //               placeholder="Select Customer"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={jobForm.carId}
// //               onChangeText={(text) => setJobForm({...jobForm, carId: text})}
// //               placeholder="Select Car"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={jobForm.issue}
// //               onChangeText={(text) => setJobForm({...jobForm, issue: text})}
// //               placeholder="Issue Description"
// //               placeholderTextColor="#9ca3af"
// //               multiline
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3 h-20"
// //             />
// //             <TextInput
// //               value={jobForm.mechanicId}
// //               onChangeText={(text) => setJobForm({...jobForm, mechanicId: text})}
// //               placeholder="Assign Mechanic"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={handleAddJob}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Add Job</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => setActiveModal(null)}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>

// //       {/* Add Inventory Modal */}
// //       <Modal visible={activeModal === 'inventory'} animationType="slide" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/50">
// //           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
// //             <Text className="text-white text-xl font-bold mb-4">Add Inventory Item</Text>
// //             <TextInput
// //               value={inventoryForm.name}
// //               onChangeText={(text) => setInventoryForm({...inventoryForm, name: text})}
// //               placeholder="Item Name"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={inventoryForm.quantity}
// //               onChangeText={(text) => setInventoryForm({...inventoryForm, quantity: text})}
// //               placeholder="Quantity"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={inventoryForm.price}
// //               onChangeText={(text) => setInventoryForm({...inventoryForm, price: text})}
// //               placeholder="Price (KES)"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={inventoryForm.supplier}
// //               onChangeText={(text) => setInventoryForm({...inventoryForm, supplier: text})}
// //               placeholder="Supplier"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={handleAddInventory}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Add Item</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => setActiveModal(null)}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>

// //       {/* Record Payment Modal */}
// //       <Modal visible={activeModal === 'payment'} animationType="slide" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/50">
// //           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
// //             <Text className="text-white text-xl font-bold mb-4">Record Payment</Text>
// //             <TextInput
// //               value={paymentForm.customerId}
// //               onChangeText={(text) => setPaymentForm({...paymentForm, customerId: text})}
// //               placeholder="Select Customer"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={paymentForm.jobId}
// //               onChangeText={(text) => setPaymentForm({...paymentForm, jobId: text})}
// //               placeholder="Select Job"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={paymentForm.amount}
// //               onChangeText={(text) => setPaymentForm({...paymentForm, amount: text})}
// //               placeholder="Amount (KES)"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={paymentForm.method}
// //               onChangeText={(text) => setPaymentForm({...paymentForm, method: text})}
// //               placeholder="Payment Method"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={handleRecordPayment}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Record Payment</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => setActiveModal(null)}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>

// //       {/* Password Modal for Inventory Deletion */}
// //       <Modal visible={passwordModal} animationType="fade" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/70">
// //           <BlurView intensity={80} tint="dark" className="w-10/12 rounded-2xl p-6">
// //             <View className="flex-row items-center mb-4">
// //               <Lock size={24} color="#DC2626" />
// //               <Text className="text-white text-lg font-bold ml-2">Admin Authorization Required</Text>
// //             </View>
// //             <Text className="text-gray-300 mb-4">Enter admin password to delete inventory item:</Text>
// //             <TextInput
// //               value={password}
// //               onChangeText={setPassword}
// //               placeholder="Enter password"
// //               placeholderTextColor="#9ca3af"
// //               secureTextEntry
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={verifyPassword}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Verify</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => {
// //                   setPasswordModal(false)
// //                   setPassword('')
// //                 }}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>
// //     </View>
// //   )
// // }
// // app/(tabs)/operator.tsx
// import { Text, View } from 'react-native';

// export default function OperatorScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Operator Screen - Coming Soon</Text>
//     </View>
//   );
// }
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { ArrowLeft, Save } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { fetchInventoryItemByCode, updateInventoryItem } from '../../lib/pages/useInventoryData';
// import { InventoryItem } from '../../lib/types';

// export default function GarageInventoryEditPage() {
//   const { item_code } = useLocalSearchParams();
//   const [item, setItem] = useState<InventoryItem | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [saving, setSaving] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (item_code) {
//       loadItemData();
//     }
//   }, [item_code]);

//   const loadItemData = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const response = await fetchInventoryItemByCode(item_code as string);
//       if (response.success && response.data) {
//         setItem(response.data);
//       }
//     } catch (error) {
//       console.error('Error loading inventory item:', error);
//       Alert.alert('Error', 'Failed to load inventory item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = async (): Promise<void> => {
//     if (!item) return;
    
//     try {
//       setSaving(true);
//       const response = await updateInventoryItem(item.item_code, item);
//       if (response.success) {
//         Alert.alert('Success', 'Inventory item updated successfully');
//         router.back();
//       } else {
//         Alert.alert('Error', response.message || 'Failed to update inventory item');
//       }
//     } catch (error) {
//       console.error('Error updating inventory item:', error);
//       Alert.alert('Error', 'Failed to update inventory item');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChange = (field: keyof InventoryItem, value: string | number): void => {
//     if (item) {
//       setItem({ ...item, [field]: value });
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3B82F6" />
//       </View>
//     );
//   }

//   if (!item) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-white">Inventory item not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-6 mb-6">
//         <TouchableOpacity onPress={() => router.back()}>
//           <ArrowLeft size={24} color="white" />
//         </TouchableOpacity>
//         <Text className="text-white text-xl font-bold">Edit Inventory Item</Text>
//         <TouchableOpacity onPress={handleSave} disabled={saving}>
//           {saving ? (
//             <ActivityIndicator size="small" color="#3B82F6" />
//           ) : (
//             <Save size={24} color="white" />
//           )}
//         </TouchableOpacity>
//       </View>

//       <ScrollView className="px-6">
//         <View className="mb-6">
//           <Text className="text-white text-lg font-semibold mb-4">Item Information</Text>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Item Code</Text>
//             <Text className="text-white text-lg">{item.item_code}</Text>
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Name</Text>
//             <TextInput
//               value={item.item_name || ''}
//               onChangeText={(text) => handleChange('item_name', text)}
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Category</Text>
//             <TextInput
//               value={item.category || ''}
//               onChangeText={(text) => handleChange('category', text)}
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Description</Text>
//             <TextInput
//               value={item.description || ''}
//               onChangeText={(text) => handleChange('description', text)}
//               multiline
//               className="bg-white/10 text-white rounded-lg px-4 py-3 h-20"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Quantity In</Text>
//             <TextInput
//               value={item.quantity_in ? item.quantity_in.toString() : ''}
//               onChangeText={(text) => handleChange('quantity_in', parseInt(text) || 0)}
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Purchase Price</Text>
//             <TextInput
//               value={item.purchase_price ? item.purchase_price.toString() : ''}
//               onChangeText={(text) => handleChange('purchase_price', parseFloat(text) || 0)}
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Selling Price</Text>
//             <TextInput
//               value={item.selling_price ? item.selling_price.toString() : ''}
//               onChangeText={(text) => handleChange('selling_price', parseFloat(text) || 0)}
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Supplier</Text>
//             <TextInput
//               value={item.supplier_name || ''}
//               onChangeText={(text) => handleChange('supplier_name', text)}
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Mechanic Notes</Text>
//             <TextInput
//               value={item.mechanic_notes || ''}
//               onChangeText={(text) => handleChange('mechanic_notes', text)}
//               multiline
//               className="bg-white/10 text-white rounded-lg px-4 py-3 h-20"
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
// garage.tsx
// // import { useLocalSearchParams, useRouter } from 'expo-router';
// // import { Save, X } from 'lucide-react-native';
// // import React, { useState } from 'react';
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   ScrollView,
// //   Switch,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import { useClientData } from '../../lib/pages/clientData';

// // export default function AddService() {
// //   const { clientId } = useLocalSearchParams();
// //   const router = useRouter();
// //   const { addClientService, loading, error } = useClientData();
// //   const [formData, setFormData] = useState({
// //     service_type: '',
// //     service_cost: '',
// //     service_expenses: '',
// //     paid_status: false,
// //     notes: '',
// //   });

// //   const handleInputChange = (field: string, value: string) => {
// //     setFormData({ ...formData, [field]: value });
// //   };

// //   const handleGoBack = () => {
// //     router.back();
// //   };

// //   const handleSave = async () => {
// //     if (!formData.service_type) {
// //       Alert.alert('Error', 'Service Type is required.');
// //       return;
// //     }
    
// //     try {
// //       await addClientService(clientId as string, {
// //         ...formData,
// //         service_cost: formData.service_cost ? parseFloat(formData.service_cost) : 0,
// //         service_expenses: formData.service_expenses ? parseFloat(formData.service_expenses) : 0,
// //       });
// //       Alert.alert('Success', 'Service added successfully!');
// //       router.back(); // Go back to client details
// //       // Optionally refresh the client data on the previous screen
// //     } catch (err) {
// //       Alert.alert('Error', 'Failed to add service.');
// //     }
// //   };

// //   return (
// //     <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
// //       {loading && (
// //         <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
// //           <ActivityIndicator size="large" color="#3b82f6" />
// //           <Text className="text-white mt-2">Adding service...</Text>
// //         </View>
// //       )}

// //       <ScrollView className="flex-1">
// //         <View className="flex-row items-center justify-between mb-6">
// //           <TouchableOpacity onPress={handleGoBack} className="p-2 rounded-full">
// //             <Text className="text-blue-500 text-base">← Back</Text>
// //           </TouchableOpacity>
// //           <Text className="text-white text-xl font-bold">Add New Service</Text>
// //           <View className="w-10" />
// //         </View>

// //         <View className="bg-gray-800 rounded-xl p-4 mb-6 space-y-4">
// //           <View className="flex-row items-center">
// //             <Text className="text-gray-400 font-bold w-24">Service Type:</Text>
// //             <TextInput
// //               className="flex-1 bg-gray-700 text-white p-3 rounded"
// //               placeholder="e.g., Oil Change"
// //               placeholderTextColor="#9ca3af"
// //               value={formData.service_type}
// //               onChangeText={(text) => handleInputChange('service_type', text)}
// //             />
// //           </View>

// //           <View className="flex-row items-center">
// //             <Text className="text-gray-400 font-bold w-24">Service Cost:</Text>
// //             <TextInput
// //               className="flex-1 bg-gray-700 text-white p-3 rounded"
// //               placeholder="e.g., 50.00"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               value={formData.service_cost}
// //               onChangeText={(text) => handleInputChange('service_cost', text)}
// //             />
// //           </View>

// //           <View className="flex-row items-center">
// //             <Text className="text-gray-400 font-bold w-24">Expenses:</Text>
// //             <TextInput
// //               className="flex-1 bg-gray-700 text-white p-3 rounded"
// //               placeholder="e.g., 20.00"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               value={formData.service_expenses}
// //               onChangeText={(text) => handleInputChange('service_expenses', text)}
// //             />
// //           </View>

// //           <View className="flex-row items-center justify-between">
// //             <Text className="text-gray-400 font-bold">Paid Status:</Text>
// //             <Switch
// //               trackColor={{ false: '#767577', true: '#81b0ff' }}
// //               thumbColor={formData.paid_status ? '#f5dd4b' : '#f4f3f4'}
// //               ios_backgroundColor="#3e3e3e"
// //               onValueChange={(value) => setFormData({ ...formData, paid_status: value })}
// //               value={formData.paid_status}
// //             />
// //           </View>
          
// //           <View>
// //             <Text className="text-gray-400 font-bold mb-2">Notes:</Text>
// //             <TextInput
// //               className="bg-gray-700 text-white p-3 rounded h-24"
// //               placeholder="Add any notes about the service..."
// //               placeholderTextColor="#9ca3af"
// //               multiline
// //               value={formData.notes}
// //               onChangeText={(text) => handleInputChange('notes', text)}
// //             />
// //           </View>

// //           {error && <Text className="text-red-500 text-center">{error}</Text>}

// //           <View className="flex-row justify-end space-x-2 mt-4">
// //             <TouchableOpacity
// //               onPress={handleGoBack}
// //               className="bg-red-600 px-6 py-3 rounded-lg flex-row items-center"
// //             >
// //               <X size={20} color="white" />
// //               <Text className="text-white ml-2">Cancel</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               onPress={handleSave}
// //               className="bg-green-600 px-6 py-3 rounded-lg flex-row items-center"
// //             >
// //               <Save size={20} color="white" />
// //               <Text className="text-white ml-2">Save Service</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // }

// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Calendar, Clipboard, DollarSign, Save, User, X } from 'lucide-react-native';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ScrollView,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { DropdownPicker } from '../../lib/components/DropdownPicker';
// import { useClientData } from '../../lib/pages/clientData';
// import { useStaffData } from '../../lib/pages/useStaffModal';

// export default function AddService() {
//   const { clientId } = useLocalSearchParams();
//   const router = useRouter();
//   const { addClientService, loading: serviceLoading, clientDetails } = useClientData();
//   const { staff, loading: staffLoading, fetchStaff } = useStaffData();
  
//   const [formData, setFormData] = useState({
//     service_type: '',
//     service_cost: '',
//     service_expenses: '',
//     paid_status: false,
//     notes: '',
//     staff_id: '',
//     client_id: clientId as string,
//   });

//   useEffect(() => {
//     if (clientId) {
//       fetchClientDetails(clientId as string);
//       fetchStaff();
//     }else{
//       Alert.alert('Error', 'No client selected. Please go back and try again.');
//       router.back();
//     }
//   }, [clientId]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleGoBack = () => {
//     router.back();
//   };

//   const handleSave = async () => {
//     if (!formData.service_type) {
//       Alert.alert('Error', 'Service Type is required.');
//       return;
//     }
    
//     try {
//       await addClientService(clientId as string, {
//         ...formData,
//         service_cost: formData.service_cost ? parseFloat(formData.service_cost) : 0,
//         service_expenses: formData.service_expenses ? parseFloat(formData.service_expenses) : 0,
//       });
//       Alert.alert('Success', 'Service added successfully!');
//       router.back();
//     } catch (err) {
//       Alert.alert('Error', 'Failed to add service.');
//     }
//   };

//   const staffOptions = staff.map(s => ({
//     label: `${s.first_name} ${s.last_name}`,
//     value: s.staff_id,
//     ...s
//   }));

//   const serviceCost = parseFloat(formData.service_cost || '0');
//   const serviceExpenses = parseFloat(formData.service_expenses || '0');
//   const netProfit = serviceCost - serviceExpenses;

//   return (
//     <View className="flex-1 bg-[#0A0F1E]">
//       {serviceLoading && (
//         <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
//           <ActivityIndicator size="large" color="#3b82f6" />
//           <Text className="text-white mt-2">Adding service...</Text>
//         </View>
//       )}

//       {/* Header */}
//       <View className="bg-[#1A2033] pt-12 pb-4 px-4 shadow-lg">
//         <View className="flex-row items-center justify-between">
//           <TouchableOpacity onPress={handleGoBack} className="p-2">
//             <X size={24} color="white" />
//           </TouchableOpacity>
//           <Text className="text-white text-xl font-bold">Add New Service</Text>
//           <View className="w-8" />
//         </View>
//       </View>

//       <ScrollView className="flex-1">
//         {/* Client Info Card */}
//         {clientDetails?.customer && (
//           <View className="p-4">
//             <View className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-4 border border-blue-700/30">
//               <Text className="text-blue-400 text-sm font-bold mb-2">CLIENT INFORMATION</Text>
//               <Text className="text-white text-lg font-bold">
//                 {clientDetails.customer.first_name} {clientDetails.customer.last_name}
//               </Text>
//               <Text className="text-gray-300">{clientDetails.customer.email}</Text>
//               <Text className="text-gray-400 text-sm">{clientDetails.customer.phone_number}</Text>
//             </View>
//           </View>
//         )}

//         <View className="p-4">
//           <View className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
//             {/* Service Details Section */}
//             <View className="mb-6">
//               <View className="flex-row items-center mb-4">
//                 <Clipboard size={24} color="#4F46E5" />
//                 <Text className="text-white text-xl font-bold ml-3">Service Details</Text>
//               </View>
              
//               <View className="space-y-4">
//                 <View>
//                   <Text className="text-gray-400 font-bold mb-2">Service Type *</Text>
//                   <TextInput
//                     className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
//                     placeholder="e.g., Oil Change, Brake Service"
//                     placeholderTextColor="#9ca3af"
//                     value={formData.service_type}
//                     onChangeText={(text) => handleInputChange('service_type', text)}
//                   />
//                 </View>

//                 <View className="grid grid-cols-2 gap-4">
//                   <View>
//                     <Text className="text-gray-400 font-bold mb-2">Service Cost (KES)</Text>
//                     <View className="flex-row items-center bg-gray-700 rounded-xl border border-gray-600">
//                       <DollarSign size={20} color="#9ca3af" className="ml-3" />
//                       <TextInput
//                         className="flex-1 text-white p-4"
//                         placeholder="0.00"
//                         placeholderTextColor="#9ca3af"
//                         keyboardType="numeric"
//                         value={formData.service_cost}
//                         onChangeText={(text) => handleInputChange('service_cost', text)}
//                       />
//                     </View>
//                   </View>

//                   <View>
//                     <Text className="text-gray-400 font-bold mb-2">Expenses (KES)</Text>
//                     <View className="flex-row items-center bg-gray-700 rounded-xl border border-gray-600">
//                       <DollarSign size={20} color="#9ca3af" className="ml-3" />
//                       <TextInput
//                         className="flex-1 text-white p-4"
//                         placeholder="0.00"
//                         placeholderTextColor="#9ca3af"
//                         keyboardType="numeric"
//                         value={formData.service_expenses}
//                         onChangeText={(text) => handleInputChange('service_expenses', text)}
//                       />
//                     </View>
//                   </View>
//                 </View>

//                 {/* Profit Calculator */}
//                 {(serviceCost > 0 || serviceExpenses > 0) && (
//                   <View className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
//                     <Text className="text-gray-400 font-bold mb-3">PROFIT CALCULATION</Text>
//                     <View className="space-y-2">
//                       <View className="flex-row justify-between">
//                         <Text className="text-gray-300">Revenue:</Text>
//                         <Text className="text-green-400 font-bold">KES {serviceCost.toLocaleString()}</Text>
//                       </View>
//                       <View className="flex-row justify-between">
//                         <Text className="text-gray-300">Expenses:</Text>
//                         <Text className="text-red-400 font-bold">KES {serviceExpenses.toLocaleString()}</Text>
//                       </View>
//                       <View className="flex-row justify-between border-t border-gray-600 pt-2">
//                         <Text className="text-gray-300 font-bold">Net Profit:</Text>
//                         <Text className={`font-bold ${
//                           netProfit >= 0 ? 'text-green-400' : 'text-red-400'
//                         }`}>
//                           KES {netProfit.toLocaleString()}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 )}
//               </View>
//             </View>

//             {/* Assignment Section */}
//             <View className="mb-6">
//               <View className="flex-row items-center mb-4">
//                 <User size={24} color="#4F46E5" />
//                 <Text className="text-white text-xl font-bold ml-3">Assignment</Text>
//               </View>
              
//               <View className="space-y-4">
//                 <View>
//                   <Text className="text-gray-400 font-bold mb-2">Assign to Staff</Text>
//                   <DropdownPicker
//                     options={staffOptions}
//                     selectedValue={formData.staff_id}
//                     onValueChange={(value) => handleInputChange('staff_id', value)}
//                     placeholder="Select staff member"
//                     searchable={true}
//                   />
//                 </View>

//                 <View className="flex-row items-center justify-between bg-gray-700/50 p-4 rounded-xl">
//                   <Text className="text-gray-400 font-bold">Payment Status</Text>
//                   <View className="flex-row items-center">
//                     <Text className={`mr-3 font-bold ${
//                       formData.paid_status ? 'text-green-400' : 'text-red-400'
//                     }`}>
//                       {formData.paid_status ? 'Paid' : 'Pending'}
//                     </Text>
//                     <Switch
//                       trackColor={{ false: '#767577', true: '#10b981' }}
//                       thumbColor={formData.paid_status ? '#f5dd4b' : '#f4f3f4'}
//                       onValueChange={(value) => setFormData({ ...formData, paid_status: value })}
//                       value={formData.paid_status}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </View>

//             {/* Notes Section */}
//             <View className="mb-6">
//               <View className="flex-row items-center mb-4">
//                 <Calendar size={24} color="#4F46E5" />
//                 <Text className="text-white text-xl font-bold ml-3">Additional Information</Text>
//               </View>
              
//               <View>
//                 <Text className="text-gray-400 font-bold mb-2">Service Notes</Text>
//                 <TextInput
//                   className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600 h-32"
//                   placeholder="Add any notes about the service..."
//                   placeholderTextColor="#9ca3af"
//                   multiline
//                   textAlignVertical="top"
//                   value={formData.notes}
//                   onChangeText={(text) => handleInputChange('notes', text)}
//                 />
//               </View>
//             </View>

//             {/* Action Buttons */}
//             <View className="flex-row justify-between space-x-4">
//               <TouchableOpacity
//                 onPress={handleGoBack}
//                 className="flex-1 bg-red-600/20 border border-red-600 py-4 rounded-xl flex-row items-center justify-center"
//               >
//                 <X size={20} color="#ef4444" />
//                 <Text className="text-red-400 font-bold ml-2">Cancel</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 onPress={handleSave}
//                 disabled={!formData.service_type}
//                 className={`flex-1 py-4 rounded-xl flex-row items-center justify-center ${
//                   formData.service_type 
//                     ? 'bg-green-600 border border-green-600' 
//                     : 'bg-gray-600 border border-gray-600'
//                 }`}
//               >
//                 <Save size={20} color="white" />
//                 <Text className="text-white font-bold ml-2">Save Service</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
// // import { BlurView } from 'expo-blur';
// // import { useRouter } from 'expo-router';
// // import React, { useState } from 'react';
// // import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // import { useAuth } from '../../lib/auth'; // Import your actual auth hook
// // import { addExpense } from '../../lib/pages/useTransactionsData'; // Corrected import path

// // const AddExpensesPage: React.FC = () => {
// //   const [amount, setAmount] = useState<string>('');
// //   const [description, setDescription] = useState<string>('');
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const router = useRouter();
// //   const { user, isAuthenticated } = useAuth(); // Use your actual auth hook

// //   const handleSubmit = async () => {
// //     if (!isAuthenticated || !user?.email) {
// //       Alert.alert('Error', 'You must be logged in to add an expense.');
// //       return;
// //     }

// //     if (!amount || !description) {
// //       Alert.alert('Error', 'Please fill in all fields.');
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const newExpense = {
// //         amount: parseFloat(amount),
// //         description,
// //         expense_date: new Date().toISOString(),
// //         staff_id: user.email // Now we are sure that user.email exists
// //       };

// //       await addExpense(newExpense, user.token);

// //       Alert.alert('Success', 'Expense added successfully!');
// //       setAmount('');
// //       setDescription('');
// //       // router.back(); // Uncomment if you use Expo router
// //     } catch (error) {
// //       console.error('Failed to add expense:', error);
// //       Alert.alert('Error', 'Failed to add expense. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View className="flex-1 bg-[#1A2033] pt-12 p-6">
// //       <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
// //         <BlurView intensity={30} tint="dark" className="bg-white/10 p-6 rounded-2xl">
// //           <Text className="text-white text-3xl font-bold text-center mb-6">Add New Expense</Text>
          
// //           <View className="mb-4">
// //             <Text className="text-gray-300 text-lg mb-2">Amount (KES)</Text>
// //             <TextInput
// //               className="bg-gray-700 text-white rounded-lg p-4 text-lg"
// //               keyboardType="numeric"
// //               value={amount}
// //               onChangeText={setAmount}
// //               placeholder="e.g., 5000"
// //               placeholderTextColor="#9ca3af"
// //             />
// //           </View>

// //           <View className="mb-6">
// //             <Text className="text-gray-300 text-lg mb-2">Description</Text>
// //             <TextInput
// //               className="bg-gray-700 text-white rounded-lg p-4 text-lg"
// //               value={description}
// //               onChangeText={setDescription}
// //               placeholder="e.g., New part for engine repair"
// //               placeholderTextColor="#9ca3af"
// //             />
// //           </View>

// //           <TouchableOpacity
// //             className="bg-[#4ade80] py-4 rounded-lg items-center"
// //             onPress={handleSubmit}
// //             disabled={loading}
// //           >
// //             {loading ? (
// //               <ActivityIndicator color="#1A2033" />
// //             ) : (
// //               <Text className="text-[#1A2033] font-bold text-xl">Submit Expense</Text>
// //             )}
// //           </TouchableOpacity>
// //         </BlurView>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default AddExpensesPage;
// // src/app/AddExpenses.tsx
// import { BlurView } from 'expo-blur';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useAuth } from '../../lib/auth';
// import { addExpense, Expense, useFinancialData } from '../../lib/pages/useTransactionsData';

// const AddExpensesPage: React.FC = () => {
//   const [amount, setAmount] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [viewExpenses, setViewExpenses] = useState<boolean>(false);
//   const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth();
//   const { data } = useFinancialData();

//   // Get all expenses from the monthly data
//   const allExpenses: Expense[] = data.flatMap(monthData => 
//     monthData.items.filter(item => !('status' in item)) as Expense[]
//   );

//   const handleSubmit = async () => {
//     if (!isAuthenticated || !user?.email) {
//       Alert.alert('Error', 'You must be logged in to add an expense.');
//       return;
//     }

//     if (!amount || !description) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const newExpense = {
//         amount: parseFloat(amount),
//         description,
//         expense_date: new Date().toISOString(),
//         staff_id: user.email
//       };

//       await addExpense(newExpense, user.token);

//       Alert.alert('Success', 'Expense added successfully!');
//       setAmount('');
//       setDescription('');
//     } catch (error) {
//       console.error('Failed to add expense:', error);
//       Alert.alert('Error', 'Failed to add expense. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const viewExpenseDetails = (expense: Expense) => {
//     setSelectedExpense(expense);
//   };

//   const closeExpenseDetails = () => {
//     setSelectedExpense(null);
//   };

//   return (
//     <View className="flex-1 bg-[#1A2033] pt-12 p-6">
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         {/* Header */}
//         <View className="flex-row justify-between items-center mb-6">
//           <Text className="text-white text-3xl font-bold">Expense Management</Text>
//           <TouchableOpacity
//             onPress={() => setViewExpenses(!viewExpenses)}
//             className="bg-[#4ade80] px-4 py-2 rounded-lg"
//           >
//             <Text className="text-[#1A2033] font-semibold">
//               {viewExpenses ? 'Add Expense' : 'View Expenses'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {viewExpenses ? (
//           // View Expenses Section
//           <View>
//             <Text className="text-white text-xl font-semibold mb-4">All Expenses</Text>
//             {allExpenses.length === 0 ? (
//               <Text className="text-gray-300">No expenses found.</Text>
//             ) : (
//               allExpenses.map((expense, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => viewExpenseDetails(expense)}
//                   className="bg-white/10 p-4 rounded-xl mb-3"
//                 >
//                   <View className="flex-row justify-between items-center">
//                     <View>
//                       <Text className="text-white font-semibold">{expense.description}</Text>
//                       <Text className="text-gray-300 text-sm">
//                         {expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : 'No date'}
//                       </Text>
//                     </View>
//                     <View className="items-end">
//                       <Text className="text-[#f87171] font-bold text-lg">
//                         KES {(expense.amount || 0).toLocaleString()}
//                       </Text>
//                       <Text className="text-gray-400 text-xs">ID: {expense.id?.substring(0, 8)}...</Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ))
//             )}
//           </View>
//         ) : (
//           // Add Expense Section
//           <BlurView intensity={30} tint="dark" className="bg-white/10 p-6 rounded-2xl">
//             <Text className="text-white text-3xl font-bold text-center mb-6">Add New Expense</Text>
            
//             <View className="mb-4">
//               <Text className="text-gray-300 text-lg mb-2">Amount (KES)</Text>
//               <TextInput
//                 className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                 keyboardType="numeric"
//                 value={amount}
//                 onChangeText={setAmount}
//                 placeholder="e.g., 5000"
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>

//             <View className="mb-6">
//               <Text className="text-gray-300 text-lg mb-2">Description</Text>
//               <TextInput
//                 className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                 value={description}
//                 onChangeText={setDescription}
//                 placeholder="e.g., New part for engine repair"
//                 placeholderTextColor="#9ca3af"
//                 multiline
//               />
//             </View>

//             <TouchableOpacity
//               className="bg-[#4ade80] py-4 rounded-lg items-center"
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#1A2033" />
//               ) : (
//                 <Text className="text-[#1A2033] font-bold text-xl">Submit Expense</Text>
//               )}
//             </TouchableOpacity>
//           </BlurView>
//         )}
//       </ScrollView>

//       {/* Expense Detail Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={!!selectedExpense}
//         onRequestClose={closeExpenseDetails}
//       >
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <View className="bg-[#1A2033] m-5 p-5 rounded-2xl w-11/12">
//             {selectedExpense && (
//               <>
//                 <Text className="text-white text-xl font-bold mb-4">Expense Details</Text>
                
//                 <View className="mb-3">
//                   <Text className="text-gray-400 text-sm">Expense ID</Text>
//                   <Text className="text-white">{selectedExpense.id || 'N/A'}</Text>
//                 </View>
//                 <View className="mb-3">
//                   <Text className="text-gray-400 text-sm">Amount</Text>
//                   <Text className="text-white">KES {(selectedExpense.amount || 0).toLocaleString()}</Text>
//                 </View>
//                 <View className="mb-3">
//                   <Text className="text-gray-400 text-sm">Description</Text>
//                   <Text className="text-white">{selectedExpense.description || 'No description'}</Text>
//                 </View>
//                 <View className="mb-3">
//                   <Text className="text-gray-400 text-sm">Staff ID</Text>
//                   <Text className="text-white">{selectedExpense.staff_id || 'N/A'}</Text>
//                 </View>
//                 <View className="mb-3">
//                   <Text className="text-gray-400 text-sm">Date</Text>
//                   <Text className="text-white">
//                     {selectedExpense.expense_date ? new Date(selectedExpense.expense_date).toLocaleString() : 'No date'}
//                   </Text>
//                 </View>
                
//                 <TouchableOpacity
//                   onPress={closeExpenseDetails}
//                   className="bg-[#4ade80] py-3 rounded-lg mt-4"
//                 >
//                   <Text className="text-[#1A2033] font-bold text-center">Close</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default AddExpensesPage;
// src/app/AddExpenses.tsx

// import { BlurView } from 'expo-blur';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { ActivityIndicator, Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { useAuth } from '../../lib/auth';
// import { addExpense, Expense, useFinancialData } from '../../lib/pages/useTransactionsData';

// const AddExpensesPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     item_name: '',
//     category: '',
//     description: '',
//     supplier_name: '',
//     quantity: '1',
//     unit_price: '',
//     payment_method: 'Cash',
//     status: 'Paid' as 'Paid' | 'Pending',
//     notes: '',
//   });
//   const [loading, setLoading] = useState<boolean>(false);
//   const [viewExpenses, setViewExpenses] = useState<boolean>(false);
//   const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth();
//   const { data } = useFinancialData();

//   // Get all expenses from the monthly data
//   const allExpenses: Expense[] = data.flatMap(monthData => 
//     monthData.items.filter(item => !('transaction_id' in item)) as Expense[]
//   );

//   const handleSubmit = async () => {
//     if (!isAuthenticated || !user?.email) {
//       Alert.alert('Error', 'You must be logged in to add an expense.');
//       return;
//     }

//     if (!formData.item_name || !formData.unit_price) {
//       Alert.alert('Error', 'Please fill in required fields (Item Name and Unit Price).');
//       return;
//     }

//     setLoading(true);

//     try {
//       const newExpense = {
//         ...formData,
//         quantity: parseFloat(formData.quantity) || 1,
//         unit_price: parseFloat(formData.unit_price),
//         expense_date: new Date().toISOString(),
//         staff_id: user.email
//       };

//       await addExpense(newExpense, user.token);

//       Alert.alert('Success', 'Expense added successfully!');
//       // Reset form
//       setFormData({
//         item_name: '',
//         category: '',
//         description: '',
//         supplier_name: '',
//         quantity: '1',
//         unit_price: '',
//         payment_method: 'Cash',
//         status: 'Paid',
//         notes: '',
//       });
//     } catch (error) {
//       console.error('Failed to add expense:', error);
//       Alert.alert('Error', 'Failed to add expense. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const viewExpenseDetails = (expense: Expense) => {
//     setSelectedExpense(expense);
//   };

//   const closeExpenseDetails = () => {
//     setSelectedExpense(null);
//   };

//   return (
//     <View className="flex-1 bg-[#1A2033] pt-12 p-6">
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         {/* Header */}
//         <View className="flex-row justify-between items-center mb-6">
//           <Text className="text-white text-3xl font-bold">Expense Management</Text>
//           <TouchableOpacity
//             onPress={() => setViewExpenses(!viewExpenses)}
//             className="bg-[#4ade80] px-4 py-2 rounded-lg"
//           >
//             <Text className="text-[#1A2033] font-semibold">
//               {viewExpenses ? 'Add Expense' : 'View Expenses'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {viewExpenses ? (
//           // View Expenses Section
//           <View>
//             <Text className="text-white text-xl font-semibold mb-4">All Expenses</Text>
//             {allExpenses.length === 0 ? (
//               <Text className="text-gray-300">No expenses found.</Text>
//             ) : (
//               allExpenses.map((expense, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => viewExpenseDetails(expense)}
//                   className="bg-white/10 p-4 rounded-xl mb-3"
//                 >
//                   <View className="flex-row justify-between items-center">
//                     <View className="flex-1">
//                       <Text className="text-white font-semibold">{expense.item_name}</Text>
//                       <Text className="text-gray-300 text-sm">{expense.category}</Text>
//                       <Text className="text-gray-400 text-xs">
//                         {expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : 'No date'}
//                       </Text>
//                     </View>
//                     <View className="items-end">
//                       <Text className="text-[#f87171] font-bold text-lg">
//                         KES {(expense.total_cost || expense.amount || 0).toLocaleString()}
//                       </Text>
//                       <Text className="text-gray-400 text-xs">Code: {expense.expense_code?.substring(0, 8)}...</Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ))
//             )}
//           </View>
//         ) : (
//           // Add Expense Section
//           <BlurView intensity={30} tint="dark" className="bg-white/10 p-6 rounded-2xl">
//             <Text className="text-white text-3xl font-bold text-center mb-6">Add New Expense</Text>
            
//             <View className="mb-4">
//               <Text className="text-gray-300 text-lg mb-2">Item Name *</Text>
//               <TextInput
//                 className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                 value={formData.item_name}
//                 onChangeText={(value) => handleInputChange('item_name', value)}
//                 placeholder="e.g., Engine Oil"
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>

//             <View className="mb-4">
//               <Text className="text-gray-300 text-lg mb-2">Category</Text>
//               <TextInput
//                 className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                 value={formData.category}
//                 onChangeText={(value) => handleInputChange('category', value)}
//                 placeholder="e.g., Spare Parts, Tools"
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>

//             <View className="mb-4">
//               <Text className="text-gray-300 text-lg mb-2">Description</Text>
//               <TextInput
//                 className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                 value={formData.description}
//                 onChangeText={(value) => handleInputChange('description', value)}
//                 placeholder="Detailed description of the expense"
//                 placeholderTextColor="#9ca3af"
//                 multiline
//               />
//             </View>

//             <View className="mb-4">
//               <Text className="text-gray-300 text-lg mb-2">Supplier Name</Text>
//               <TextInput
//                 className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                 value={formData.supplier_name}
//                 onChangeText={(value) => handleInputChange('supplier_name', value)}
//                 placeholder="Vendor/supplier name"
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>

//             <View className="flex-row mb-4">
//               <View className="flex-1 mr-2">
//                 <Text className="text-gray-300 text-lg mb-2">Quantity</Text>
//                 <TextInput
//                   className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                   keyboardType="numeric"
//                   value={formData.quantity}
//                   onChangeText={(value) => handleInputChange('quantity', value)}
//                   placeholder="1"
//                   placeholderTextColor="#9ca3af"
//                 />
//               </View>
//               <View className="flex-1 ml-2">
//                 <Text className="text-gray-300 text-lg mb-2">Unit Price (KES) *</Text>
//                 <TextInput
//                   className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                   keyboardType="numeric"
//                   value={formData.unit_price}
//                   onChangeText={(value) => handleInputChange('unit_price', value)}
//                   placeholder="e.g., 5000"
//                   placeholderTextColor="#9ca3af"
//                 />
//               </View>
//             </View>

//             <View className="mb-4">
//               <Text className="text-gray-300 text-lg mb-2">Payment Method</Text>
//               <TextInput
//                 className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                 value={formData.payment_method}
//                 onChangeText={(value) => handleInputChange('payment_method', value)}
//                 placeholder="Cash, Bank Transfer, etc."
//                 placeholderTextColor="#9ca3af"
//               />
//             </View>

//             <View className="mb-4">
//               <Text className="text-gray-300 text-lg mb-2">Status</Text>
//               <View className="flex-row">
//                 <TouchableOpacity
//                   className={`flex-1 p-3 rounded-l-lg ${formData.status === 'Paid' ? 'bg-green-600' : 'bg-gray-600'}`}
//                   onPress={() => handleInputChange('status', 'Paid')}
//                 >
//                   <Text className="text-white text-center">Paid</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   className={`flex-1 p-3 rounded-r-lg ${formData.status === 'Pending' ? 'bg-yellow-600' : 'bg-gray-600'}`}
//                   onPress={() => handleInputChange('status', 'Pending')}
//                 >
//                   <Text className="text-white text-center">Pending</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View className="mb-6">
//               <Text className="text-gray-300 text-lg mb-2">Notes</Text>
//               <TextInput
//                 className="bg-gray-700 text-white rounded-lg p-4 text-lg"
//                 value={formData.notes}
//                 onChangeText={(value) => handleInputChange('notes', value)}
//                 placeholder="Additional notes"
//                 placeholderTextColor="#9ca3af"
//                 multiline
//               />
//             </View>

//             <TouchableOpacity
//               className="bg-[#4ade80] py-4 rounded-lg items-center"
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#1A2033" />
//               ) : (
//                 <Text className="text-[#1A2033] font-bold text-xl">Submit Expense</Text>
//               )}
//             </TouchableOpacity>
//           </BlurView>
//         )}
//       </ScrollView>

//       {/* Expense Detail Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={!!selectedExpense}
//         onRequestClose={closeExpenseDetails}
//       >
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <View className="bg-[#1A2033] m-5 p-5 rounded-2xl w-11/12 max-h-80">
//             <ScrollView>
//               {selectedExpense && (
//                 <>
//                   <Text className="text-white text-xl font-bold mb-4">Expense Details</Text>
                  
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Expense Code</Text>
//                     <Text className="text-white">{selectedExpense.expense_code || 'N/A'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Item Name</Text>
//                     <Text className="text-white">{selectedExpense.item_name || 'N/A'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Category</Text>
//                     <Text className="text-white">{selectedExpense.category || 'N/A'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Description</Text>
//                     <Text className="text-white">{selectedExpense.description || 'No description'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Supplier</Text>
//                     <Text className="text-white">{selectedExpense.supplier_name || 'N/A'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Quantity</Text>
//                     <Text className="text-white">{selectedExpense.quantity || 1}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Unit Price</Text>
//                     <Text className="text-white">KES {(selectedExpense.unit_price || 0).toLocaleString()}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Total Cost</Text>
//                     <Text className="text-white">KES {(selectedExpense.total_cost || selectedExpense.amount || 0).toLocaleString()}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Payment Method</Text>
//                     <Text className="text-white">{selectedExpense.payment_method || 'N/A'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Status</Text>
//                     <Text className="text-white">{selectedExpense.status || 'N/A'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Notes</Text>
//                     <Text className="text-white">{selectedExpense.notes || 'No notes'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Staff ID</Text>
//                     <Text className="text-white">{selectedExpense.staff_id || 'N/A'}</Text>
//                   </View>
//                   <View className="mb-3">
//                     <Text className="text-gray-400 text-sm">Date</Text>
//                     <Text className="text-white">
//                       {selectedExpense.expense_date ? new Date(selectedExpense.expense_date).toLocaleString() : 'No date'}
//                     </Text>
//                   </View>
                  
//                   <TouchableOpacity
//                     onPress={closeExpenseDetails}
//                     className="bg-[#4ade80] py-3 rounded-lg mt-4"
//                   >
//                     <Text className="text-[#1A2033] font-bold text-center">Close</Text>
//                   </TouchableOpacity>
//                 </>
//               )}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default AddExpensesPage;

// src/app/AddExpenses.tsx

// import { BlurView } from 'expo-blur';
// import { router } from 'expo-router';
// import { Lock, Mail, MapPin, Phone, Plus, Search, User, X } from 'lucide-react';
// import React, { useState } from 'react';
// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   Modal,
//   Pressable,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { GradientCard } from '../../lib/components/GradientCard';
// import { Colors } from '../../lib/constants/colors';
// import { useStaffData } from '../../lib/pages/useStaffData';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// // Responsive sizing functions
// const responsiveWidth = (percentage: number) => (percentage / 100) * screenWidth;
// const responsiveHeight = (percentage: number) => (percentage / 100) * screenHeight;
// const responsiveFontSize = (baseSize: number) => {
//   if (screenWidth < 375) return baseSize - 2; // Small phones
//   if (screenWidth >= 375 && screenWidth < 414) return baseSize; // Medium phones
//   if (screenWidth >= 414 && screenWidth < 768) return baseSize + 1; // Large phones
//   if (screenWidth >= 768 && screenWidth < 1024) return baseSize + 2; // Tablets
//   return baseSize + 4; // Large tablets
// };

// export default function EmployeesPage() {
//   const { staff, loading, error } = useStaffData();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newEmployee, setNewEmployee] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone: '',
//     password: '',
//     location: ''
//   });

//   const filteredStaff = staff?.filter(employee =>
//     `${employee.first_name} ${employee.last_name} ${employee.email} ${employee.phone}`
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   ) || [];

//   const handleAddEmployee = async () => {
//     try {
//       console.log("Adding new employee:", newEmployee);
//       // API call implementation here
//       setNewEmployee({ first_name: '', last_name: '', email: '', phone: '', password: '', location: '' });
//       setShowAddModal(false);
//     } catch (err) {
//       console.error("Error adding employee:", err);
//     }
//   };

//   // Responsive styles
//   const styles = {
//     container: {
//       paddingHorizontal: screenWidth < 768 ? responsiveWidth(4) : responsiveWidth(6),
//       paddingTop: screenHeight < 700 ? responsiveHeight(2) : responsiveHeight(4),
//     },
//     header: {
//       marginBottom: screenHeight < 700 ? responsiveHeight(2) : responsiveHeight(4),
//     },
//     title: {
//       fontSize: responsiveFontSize(28),
//     },
//     addButton: {
//       paddingHorizontal: screenWidth < 375 ? 12 : 16,
//       paddingVertical: screenHeight < 700 ? 10 : 12,
//     },
//     searchContainer: {
//       marginBottom: screenHeight < 700 ? responsiveHeight(2) : responsiveHeight(4),
//     },
//     searchInput: {
//       padding: screenWidth < 375 ? 12 : 16,
//       paddingLeft: screenWidth < 375 ? 44 : 48,
//       fontSize: responsiveFontSize(14),
//     },
//     searchIcon: {
//       left: screenWidth < 375 ? 12 : 16,
//       top: screenWidth < 375 ? 12 : 16,
//     },
//     employeeCard: {
//       marginBottom: screenHeight < 700 ? 12 : 16,
//     },
//     avatar: {
//       width: screenWidth < 375 ? 48 : 56,
//       height: screenWidth < 375 ? 48 : 56,
//       marginRight: screenWidth < 375 ? 12 : 16,
//     },
//     arrowButton: {
//       width: screenWidth < 375 ? 32 : 40,
//       height: screenWidth < 375 ? 32 : 40,
//     },
//     modalContent: {
//       width: screenWidth < 768 ? screenWidth * 0.9 : Math.min(screenWidth * 0.8, 500),
//       padding: screenWidth < 375 ? 16 : 24,
//     },
//     inputGroup: {
//       marginBottom: screenHeight < 700 ? 12 : 16,
//     },
//     label: {
//       fontSize: responsiveFontSize(12),
//       marginBottom: 6,
//     },
//     textInput: {
//       padding: screenWidth < 375 ? 10 : 12,
//       paddingLeft: screenWidth < 375 ? 36 : 40,
//       fontSize: responsiveFontSize(14),
//     },
//     inputIcon: {
//       left: screenWidth < 375 ? 10 : 12,
//       top: screenWidth < 375 ? 10 : 12,
//     },
//     buttonGroup: {
//       marginTop: screenHeight < 700 ? 16 : 24,
//     },
//     button: {
//       paddingVertical: screenHeight < 700 ? 10 : 12,
//     },
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color={Colors.primary} />
//         <Text className="text-white mt-4 text-lg" style={{ fontSize: responsiveFontSize(16) }}>
//           Loading employees...
//         </Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-6">
//         <Text className="text-red-400 text-lg text-center mb-4" style={{ fontSize: responsiveFontSize(16) }}>
//           Error: {error}
//         </Text>
//         <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-xl">
//           <Text className="text-white font-semibold" style={{ fontSize: responsiveFontSize(14) }}>
//             Try Again
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E]" style={styles.container}>
//       {/* Header */}
//       <View className="flex-row justify-between items-center" style={styles.header}>
//         <Text className="text-white font-bold" style={styles.title}>
//           Team Members
//         </Text>
//         <TouchableOpacity
//           onPress={() => setShowAddModal(true)}
//           className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex-row items-center space-x-2"
//           style={styles.addButton}
//         >
//           <Plus size={responsiveFontSize(16)} color="white" />
//           <Text className="text-white font-semibold" style={{ fontSize: responsiveFontSize(14) }}>
//             Add Staff
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Search */}
//       <View className="relative" style={styles.searchContainer}>
//         <TextInput
//           className="bg-gray-800 text-white rounded-xl border border-gray-700"
//           placeholder="Search team members..."
//           placeholderTextColor="#9ca3af"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           style={styles.searchInput}
//         />
//         <Search size={responsiveFontSize(16)} color="#9ca3af" style={styles.searchIcon} />
//       </View>

//       {/* Staff List */}
//       <FlatList
//         data={filteredStaff}
//         keyExtractor={item => item.staff_id}
//         renderItem={({ item }) => (
//           <Pressable
//             onPress={() => router.push({ pathname: "/StaffDetails", params: { id: item.staff_id } })}
//             style={styles.employeeCard}
//           >
//             <GradientCard colors={Colors.gradient.darkToDarker}>
//               <View className="flex-row items-center">
//                 <View 
//                   className="bg-blue-600 rounded-full items-center justify-center"
//                   style={styles.avatar}
//                 >
//                   <User size={responsiveFontSize(18)} color="white" />
//                 </View>
//                 <View className="flex-1">
//                   <Text className="text-white font-semibold" style={{ fontSize: responsiveFontSize(16) }}>
//                     {item.first_name} {item.last_name}
//                   </Text>
//                   <Text className="text-gray-400" style={{ fontSize: responsiveFontSize(12) }}>
//                     {item.email}
//                   </Text>
//                   {item.phone && (
//                     <Text className="text-gray-400" style={{ fontSize: responsiveFontSize(12) }}>
//                       {item.phone}
//                     </Text>
//                   )}
//                 </View>
//                 <View 
//                   className="bg-blue-600 rounded-full items-center justify-center"
//                   style={styles.arrowButton}
//                 >
//                   <Text className="text-white" style={{ fontSize: responsiveFontSize(12) }}>→</Text>
//                 </View>
//               </View>
//             </GradientCard>
//           </Pressable>
//         )}
//         ListEmptyComponent={
//           <View className="flex-1 justify-center items-center py-12">
//             <Text className="text-gray-400" style={{ fontSize: responsiveFontSize(16) }}>
//               No team members found
//             </Text>
//           </View>
//         }
//       />

//       {/* Add Employee Modal */}
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={showAddModal}
//         onRequestClose={() => setShowAddModal(false)}
//       >
//         <BlurView intensity={20} className="flex-1 justify-center items-center p-4">
//           <View 
//             className="bg-gray-800 rounded-2xl border border-gray-700"
//             style={styles.modalContent}
//           >
//             <View className="flex-row justify-between items-center mb-6">
//               <Text className="text-white font-bold" style={{ fontSize: responsiveFontSize(20) }}>
//                 Add Team Member
//               </Text>
//               <TouchableOpacity onPress={() => setShowAddModal(false)}>
//                 <X size={responsiveFontSize(20)} color="#9ca3af" />
//               </TouchableOpacity>
//             </View>

//             <View className="space-y-4">
//               <View className={`flex-row ${screenWidth < 375 ? 'flex-col space-y-4' : 'space-x-3'}`}>
//                 <View className={screenWidth < 375 ? 'w-full' : 'flex-1'}>
//                   <Text className="text-gray-400 mb-2" style={styles.label}>
//                     First Name
//                   </Text>
//                   <TextInput
//                     placeholder="First name"
//                     placeholderTextColor="#6b7280"
//                     value={newEmployee.first_name}
//                     onChangeText={(v) => setNewEmployee({ ...newEmployee, first_name: v })}
//                     className="bg-gray-700 text-white rounded-lg border border-gray-600"
//                     style={styles.textInput}
//                   />
//                 </View>
//                 <View className={screenWidth < 375 ? 'w-full' : 'flex-1'}>
//                   <Text className="text-gray-400 mb-2" style={styles.label}>
//                     Last Name
//                   </Text>
//                   <TextInput
//                     placeholder="Last name"
//                     placeholderTextColor="#6b7280"
//                     value={newEmployee.last_name}
//                     onChangeText={(v) => setNewEmployee({ ...newEmployee, last_name: v })}
//                     className="bg-gray-700 text-white rounded-lg border border-gray-600"
//                     style={styles.textInput}
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text className="text-gray-400 mb-2" style={styles.label}>
//                   Email
//                 </Text>
//                 <View className="relative">
//                   <Mail size={responsiveFontSize(14)} color="#6b7280" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Email address"
//                     placeholderTextColor="#6b7280"
//                     value={newEmployee.email}
//                     onChangeText={(v) => setNewEmployee({ ...newEmployee, email: v })}
//                     className="bg-gray-700 text-white rounded-lg border border-gray-600"
//                     style={styles.textInput}
//                     keyboardType="email-address"
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text className="text-gray-400 mb-2" style={styles.label}>
//                   Phone
//                 </Text>
//                 <View className="relative">
//                   <Phone size={responsiveFontSize(14)} color="#6b7280" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Phone number"
//                     placeholderTextColor="#6b7280"
//                     value={newEmployee.phone}
//                     onChangeText={(v) => setNewEmployee({ ...newEmployee, phone: v })}
//                     className="bg-gray-700 text-white rounded-lg border border-gray-600"
//                     style={styles.textInput}
//                     keyboardType="phone-pad"
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text className="text-gray-400 mb-2" style={styles.label}>
//                   Password
//                 </Text>
//                 <View className="relative">
//                   <Lock size={responsiveFontSize(14)} color="#6b7280" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Password"
//                     placeholderTextColor="#6b7280"
//                     value={newEmployee.password}
//                     onChangeText={(v) => setNewEmployee({ ...newEmployee, password: v })}
//                     secureTextEntry
//                     className="bg-gray-700 text-white rounded-lg border border-gray-600"
//                     style={styles.textInput}
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text className="text-gray-400 mb-2" style={styles.label}>
//                   Location
//                 </Text>
//                 <View className="relative">
//                   <MapPin size={responsiveFontSize(14)} color="#6b7280" style={styles.inputIcon} />
//                   <TextInput
//                     placeholder="Location"
//                     placeholderTextColor="#6b7280"
//                     value={newEmployee.location}
//                     onChangeText={(v) => setNewEmployee({ ...newEmployee, location: v })}
//                     className="bg-gray-700 text-white rounded-lg border border-gray-600"
//                     style={styles.textInput}
//                   />
//                 </View>
//               </View>
//             </View>

//             <View className={`flex-row ${screenWidth < 375 ? 'flex-col space-y-3' : 'space-x-3'}`} style={styles.buttonGroup}>
//               <TouchableOpacity
//                 onPress={() => setShowAddModal(false)}
//                 className="bg-gray-700 rounded-lg flex-1"
//                 style={styles.button}
//               >
//                 <Text className="text-white text-center font-semibold" style={{ fontSize: responsiveFontSize(14) }}>
//                   Cancel
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleAddEmployee}
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex-1"
//                 style={styles.button}
//               >
//                 <Text className="text-white text-center font-semibold" style={{ fontSize: responsiveFontSize(14) }}>
//                   Add Member
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </BlurView>
//       </Modal>
//     </View>
//   );
// }