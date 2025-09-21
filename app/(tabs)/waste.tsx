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