
// import { BlurView } from 'expo-blur';
// import { AlertTriangle, Bell, Car, CreditCard, DollarSign, MapPin, Package, Plus, Search, Settings, User, Users, Wrench } from 'lucide-react';
// import React, { useState } from 'react';
// import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { images } from '../../constants/images';
// import { useAuth } from '../../lib/auth';
// import { useCustomers, useOperatorData } from '../../lib/pages/useOperatorData';

// export default function Operator() {
//   const { user } = useAuth();
//   // const branchName = user?.location || "Main Branch";
//   const branchName =  "Main Branch";
//   const { stats, activeJobs, appointments, lowInventory, loading, error, refetch } = useOperatorData();
//   const [searchQuery, setSearchQuery] = useState('');
//   const { customers, loading: customersLoading } = useCustomers(searchQuery);
//   const [activeModal, setActiveModal] = useState<string | null>(null);
//   const [passwordModal, setPasswordModal] = useState(false);
//   const [password, setPassword] = useState('');

//   // Modal states
//   const [customerForm, setCustomerForm] = useState({
//     first_name: '', 
//     last_name: '', 
//     email: '', 
//     phone_number: '', 
//     address: '', 
//     licence_plate: '', 
//     registration_make: ''
//   });
  
//   const [jobForm, setJobForm] = useState({ 
//     client_id: '', 
//     vehicle_id: '', 
//     services: '', 
//     assigned_staff: '', 
//     estimated_cost: '' 
//   });

//   if (loading) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#DC2626" />
//         <Text className="text-white mt-4">Loading dashboard data...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-4">
//         <Text className="text-red-500 text-lg mb-4">Error: {error}</Text>
//         <TouchableOpacity onPress={refetch} className="bg-red-600 px-6 py-3 rounded-lg">
//           <Text className="text-white">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const handleAddCustomer = async () => {
//     // Implementation for adding customer
//     Alert.alert('Success', 'Customer added successfully!');
//     setActiveModal(null);
//   };

//   const handleAddJob = async () => {
//     // Implementation for adding job
//     Alert.alert('Success', 'Job added successfully!');
//     setActiveModal(null);
//   };

//   const updateJobStatus = async (jobId: string, status: string) => {
//     // Implementation for updating job status
//     Alert.alert('Success', `Job status updated to ${status}`);
//   };

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-6 mb-4">
//         <View className="flex-row items-center space-x-4">
//           <Image source={images.tristarlogo} style={{ width: 104, height: 44 }} />
//           <Text className="text-white text-xl font-bold">Operator Dashboard</Text>
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
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
//         {/* Stats Overview */}
//         <View className="flex-row flex-wrap gap-4 mb-6">
//           <View className="bg-red-600 p-4 rounded-xl flex-1 min-w-[45%]">
//             <DollarSign size={24} color="white" />
//             <Text className="text-white text-lg font-bold mt-2">KES {stats?.revenue?.toLocaleString() || 0}</Text>
//             <Text className="text-white text-sm">Today's Revenue</Text>
//           </View>
          
//           <View className="bg-blue-600 p-4 rounded-xl flex-1 min-w-[45%]">
//             <Users size={24} color="white" />
//             <Text className="text-white text-lg font-bold mt-2">{stats?.activeJobs || 0}</Text>
//             <Text className="text-white text-sm">Active Jobs</Text>
//           </View>
          
//           <View className="bg-green-600 p-4 rounded-xl flex-1 min-w-[45%]">
//             <Car size={24} color="white" />
//             <Text className="text-white text-lg font-bold mt-2">{stats?.jobsCompleted || 0}</Text>
//             <Text className="text-white text-sm">Jobs Completed</Text>
//           </View>
          
//           <View className="bg-yellow-600 p-4 rounded-xl flex-1 min-w-[45%]">
//             <AlertTriangle size={24} color="white" />
//             <Text className="text-white text-lg font-bold mt-2">{lowInventory.length}</Text>
//             <Text className="text-white text-sm">Low Stock Items</Text>
//           </View>
//         </View>

//         {/* Quick Action Buttons */}
//         <View className="flex-row flex-wrap gap-4 mb-6">
//           <TouchableOpacity 
//             onPress={() => setActiveModal('customer')}
//             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
//           >
//             <User size={24} color="white" />
//             <Text className="text-white text-sm mt-2">Add Customer</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             onPress={() => setActiveModal('job')}
//             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
//           >
//             <Wrench size={24} color="white" />
//             <Text className="text-white text-sm mt-2">Add Job</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             onPress={() => setActiveModal('inventory')}
//             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
//           >
//             <Package size={24} color="white" />
//             <Text className="text-white text-sm mt-2">Add Inventory</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             onPress={() => setActiveModal('payment')}
//             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
//           >
//             <CreditCard size={24} color="white" />
//             <Text className="text-white text-sm mt-2">Record Payment</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Current Jobs */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-6">
//           <Text className="text-xl font-bold text-white mb-4">Current Jobs</Text>
//           {activeJobs.map(job => (
//             <View key={job.id} className="bg-white/10 rounded p-3 mb-2">
//               <View className="flex-row justify-between items-center mb-2">
//                 <Text className="text-white font-semibold">
//                   {job.client_vehicles?.make} - {job.client_vehicles?.licence_plate}
//                 </Text>
//                 <Text className={`font-bold ${
//                   job.status === 'pending' ? 'text-yellow-400' :
//                   job.status === 'in-progress' ? 'text-blue-400' :
//                   'text-green-400'
//                 }`}>
//                   {job.status}
//                 </Text>
//               </View>
//               <Text className="text-gray-300 text-sm">
//                 Owner: {job.clients?.first_name} {job.clients?.last_name}
//               </Text>
//               <Text className="text-gray-300 text-sm">
//                 Cost: KES {job.total_cost?.toLocaleString() || '0'}
//               </Text>
//               <View className="flex-row space-x-2 mt-2">
//                 <TouchableOpacity 
//                   onPress={() => updateJobStatus(job.id, 'in-progress')}
//                   className="bg-blue-600 rounded px-3 py-1"
//                 >
//                   <Text className="text-white text-sm">Start</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   onPress={() => updateJobStatus(job.id, 'done')}
//                   className="bg-green-600 rounded px-3 py-1"
//                 >
//                   <Text className="text-white text-sm">Complete</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </BlurView>

//         {/* Today's Appointments */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-6">
//           <Text className="text-xl font-bold text-white mb-4">Today's Appointments</Text>
//           {appointments.map(appointment => (
//             <View key={appointment.id} className="bg-white/10 rounded p-3 mb-2">
//               <View className="flex-row justify-between items-center mb-2">
//                 <Text className="text-white font-semibold">{appointment.service_type}</Text>
//                 <Text className="text-gray-300 text-sm">
//                   {new Date(appointment.scheduled_time).toLocaleTimeString()}
//                 </Text>
//               </View>
//               <Text className="text-gray-300 text-sm">
//                 {appointment.clients?.first_name} {appointment.clients?.last_name} - {appointment.clients?.phone_number}
//               </Text>
//               <Text className="text-gray-300 text-sm">
//                 Vehicle: {appointment.client_vehicles?.make} ({appointment.client_vehicles?.licence_plate})
//               </Text>
//             </View>
//           ))}
//         </BlurView>

//         {/* Customer List */}
//         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-6">
//           <Text className="text-xl font-bold text-white mb-4">Customer List</Text>
//           <View className="flex-row items-center bg-white/10 rounded-lg px-3 py-2 mb-4">
//             <Search size={20} color="white" />
//             <TextInput
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               placeholder="Search customers..."
//               placeholderTextColor="#9ca3af"
//               className="flex-1 text-white ml-2"
//             />
//           </View>
//           {customers.map(customer => (
//             <TouchableOpacity key={customer.id} className="bg-white/10 rounded p-3 mb-2">
//               <View className="flex-row items-center space-x-3">
//                 <View className="w-8 h-8 bg-red-600 rounded-full items-center justify-center">
//                   <Text className="text-white font-bold">
//                     {customer.first_name[0]}{customer.last_name[0]}
//                   </Text>
//                 </View>
//                 <View>
//                   <Text className="text-white font-semibold">
//                     {customer.first_name} {customer.last_name}
//                   </Text>
//                   <Text className="text-gray-300 text-sm">{customer.phone_number}</Text>
//                   <Text className="text-gray-400 text-xs">
//                     Vehicles: {customer.client_vehicles?.map(v => v.make).join(', ') || 'None'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </BlurView>

//         {/* Low Inventory Alert */}
//         {lowInventory.length > 0 && (
//           <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-6">
//             <Text className="text-xl font-bold text-white mb-4">Low Inventory Alert</Text>
//             {lowInventory.map((item, index) => (
//               <View key={index} className="bg-yellow-600/20 rounded p-3 mb-2">
//                 <Text className="text-white font-semibold">{item.item_name}</Text>
//                 <Text className="text-yellow-300 text-sm">
//                   Current Stock: {item.current_stock} (Low stock!)
//                 </Text>
//               </View>
//             ))}
//           </BlurView>
//         )}
//       </ScrollView>

//       {/* Footer Quick Actions */}
//       <View className="h-16 bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700">
//         <TouchableOpacity 
//           onPress={() => setActiveModal('customer')}
//           className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2"
//         >
//           <Plus size={20} color="white" />
//           <Text className="text-white font-semibold">Add Customer</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           onPress={() => setActiveModal('job')}
//           className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2"
//         >
//           <Wrench size={20} color="white" />
//           <Text className="text-white font-semibold">Add Job</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Add Customer Modal */}
//       <Modal visible={activeModal === 'customer'} animationType="slide" transparent>
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
//             <Text className="text-white text-xl font-bold mb-4">Add New Customer</Text>
//             <TextInput
//               value={customerForm.first_name}
//               onChangeText={(text) => setCustomerForm({...customerForm, first_name: text})}
//               placeholder="First Name"
//               placeholderTextColor="#9ca3af"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <TextInput
//               value={customerForm.last_name}
//               onChangeText={(text) => setCustomerForm({...customerForm, last_name: text})}
//               placeholder="Last Name"
//               placeholderTextColor="#9ca3af"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <TextInput
//               value={customerForm.email}
//               onChangeText={(text) => setCustomerForm({...customerForm, email: text})}
//               placeholder="Email"
//               placeholderTextColor="#9ca3af"
//               keyboardType="email-address"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <TextInput
//               value={customerForm.phone_number}
//               onChangeText={(text) => setCustomerForm({...customerForm, phone_number: text})}
//               placeholder="Phone Number"
//               placeholderTextColor="#9ca3af"
//               keyboardType="phone-pad"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <View className="flex-row space-x-3">
//               <TouchableOpacity 
//                 onPress={handleAddCustomer}
//                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
//               >
//                 <Text className="text-white font-semibold">Add Customer</Text>
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

//       {/* Add Job Modal */}
//       <Modal visible={activeModal === 'job'} animationType="slide" transparent>
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
//             <Text className="text-white text-xl font-bold mb-4">Add New Job</Text>
//             <TextInput
//               value={jobForm.client_id}
//               onChangeText={(text) => setJobForm({...jobForm, client_id: text})}
//               placeholder="Client ID"
//               placeholderTextColor="#9ca3af"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <TextInput
//               value={jobForm.vehicle_id}
//               onChangeText={(text) => setJobForm({...jobForm, vehicle_id: text})}
//               placeholder="Vehicle ID"
//               placeholderTextColor="#9ca3af"
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
//             />
//             <TextInput
//               value={jobForm.services}
//               onChangeText={(text) => setJobForm({...jobForm, services: text})}
//               placeholder="Services (JSON)"
//               placeholderTextColor="#9ca3af"
//               multiline
//               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3 h-20"
//             />
//             <View className="flex-row space-x-3">
//               <TouchableOpacity 
//                 onPress={handleAddJob}
//                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
//               >
//                 <Text className="text-white font-semibold">Add Job</Text>
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
//     </View>
//   );
// }

import { BlurView } from 'expo-blur';
import { AlertTriangle, Bell, Car, CreditCard, DollarSign, MapPin, Package, Plus, Search, Settings, User, Users, Wrench } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { images } from '../../constants/images';
import { useAuth } from '../../lib/auth';
import { useCustomers, useOperatorData } from '../../lib/pages/useOperatorData';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive sizing helper
const getResponsiveStyles = () => ({
  padding: screenWidth < 768 ? 12 : 16,
  margin: screenWidth < 768 ? 8 : 12,
  fontSize: {
    small: screenWidth < 768 ? 12 : 14,
    medium: screenWidth < 768 ? 14 : 16,
    large: screenWidth < 768 ? 16 : 18,
    xl: screenWidth < 768 ? 18 : 20,
    xxl: screenWidth < 768 ? 20 : 24,
  },
  icon: {
    small: screenWidth < 768 ? 16 : 20,
    medium: screenWidth < 768 ? 20 : 24,
    large: screenWidth < 768 ? 24 : 28,
  },
  card: {
    minWidth: screenWidth < 768 ? '100%' : screenWidth < 1024 ? '48%' : '23%',
  }
});

export default function Operator() {
  const { user } = useAuth();
  const branchName = "Main Branch";
  const { stats, activeJobs, appointments, lowInventory, loading, error, refetch } = useOperatorData();
  const [searchQuery, setSearchQuery] = useState('');
  const { customers, loading: customersLoading } = useCustomers(searchQuery);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [passwordModal, setPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [bottomTabHeight, setBottomTabHeight] = useState(80);

  // Get responsive styles
  const responsive = getResponsiveStyles();

  // Modal states
  const [customerForm, setCustomerForm] = useState({
    first_name: '', 
    last_name: '', 
    email: '', 
    phone_number: '', 
    address: '', 
    licence_plate: '', 
    registration_make: ''
  });
  
  const [jobForm, setJobForm] = useState({ 
    client_id: '', 
    vehicle_id: '', 
    services: '', 
    assigned_staff: '', 
    estimated_cost: '' 
  });

  // Calculate bottom tab height based on screen size
  useEffect(() => {
    const tabHeight = screenHeight < 700 ? 70 : screenHeight < 800 ? 80 : 90;
    setBottomTabHeight(tabHeight);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#DC2626" />
        <Text className="text-white mt-4" style={{ fontSize: responsive.fontSize.medium }}>
          Loading dashboard data...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-4">
        <Text className="text-red-500 text-lg mb-4" style={{ fontSize: responsive.fontSize.medium }}>
          Error: {error}
        </Text>
        <TouchableOpacity onPress={refetch} className="bg-red-600 px-6 py-3 rounded-lg">
          <Text className="text-white" style={{ fontSize: responsive.fontSize.medium }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddCustomer = async () => {
    Alert.alert('Success', 'Customer added successfully!');
    setActiveModal(null);
  };

  const handleAddJob = async () => {
    Alert.alert('Success', 'Job added successfully!');
    setActiveModal(null);
  };

  const updateJobStatus = async (jobId: string, status: string) => {
    Alert.alert('Success', `Job status updated to ${status}`);
  };

  // Helper function to get card width style
  const getCardWidthStyle = () => {
    if (screenWidth < 768) {
      return { flex: 1, minWidth: '100%' as const };
    } else if (screenWidth < 1024) {
      return { flex: 1, minWidth: '48%' as const };
    } else {
      return { flex: 1, minWidth: '23%' as const };
    }
  };

  const cardWidthStyle = getCardWidthStyle();

  return (
    <View className="flex-1 bg-[#0A0F1E]" style={{ paddingTop: screenHeight < 700 ? 40 : 56 }}>
      {/* Header */}
      <View 
        className="flex-row items-center justify-between mb-4" 
        style={{ 
          paddingHorizontal: responsive.padding,
          flexDirection: screenWidth < 768 ? 'column' : 'row',
          alignItems: screenWidth < 768 ? 'flex-start' : 'center',
          gap: screenWidth < 768 ? 12 : 0
        }}
      >
        <View className="flex-row items-center" style={{ gap: responsive.padding }}>
          <Image 
            source={images.tristarlogo} 
            style={{ 
              width: screenWidth < 768 ? 80 : 104, 
              height: screenWidth < 768 ? 34 : 44 
            }} 
          />
          <Text 
            className="text-white font-bold"
            style={{ fontSize: responsive.fontSize.xl }}
          >
            Operator Dashboard
          </Text>
        </View>
        <View 
          className="flex-row items-center"
          style={{ 
            gap: screenWidth < 768 ? 8 : 16,
            marginTop: screenWidth < 768 ? 8 : 0
          }}
        >
          <TouchableOpacity>
            <Bell size={responsive.icon.medium} color="red" />
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-row items-center bg-white/10 rounded px-3 py-1"
            style={{ gap: 4 }}
          >
            <MapPin size={responsive.icon.small} color="green" />
            <Text className="text-white" style={{ fontSize: responsive.fontSize.small }}>
              {branchName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings size={responsive.icon.medium} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ 
          padding: responsive.padding, 
          gap: responsive.margin,
          paddingBottom: bottomTabHeight + 20
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Overview */}
        <View 
          className="flex-row flex-wrap gap-4 mb-6"
          style={{ gap: responsive.margin }}
        >
          <View 
            className="bg-red-600 p-4 rounded-xl"
            style={{ 
              ...cardWidthStyle,
              padding: responsive.padding
            }}
          >
            <DollarSign size={responsive.icon.medium} color="white" />
            <Text 
              className="text-white font-bold mt-2"
              style={{ fontSize: responsive.fontSize.large }}
            >
              KES {stats?.revenue?.toLocaleString() || 0}
            </Text>
            <Text className="text-white text-sm" style={{ fontSize: responsive.fontSize.small }}>
              Today's Revenue
            </Text>
          </View>
          
          <View 
            className="bg-blue-600 p-4 rounded-xl"
            style={{ 
              ...cardWidthStyle,
              padding: responsive.padding
            }}
          >
            <Users size={responsive.icon.medium} color="white" />
            <Text 
              className="text-white font-bold mt-2"
              style={{ fontSize: responsive.fontSize.large }}
            >
              {stats?.activeJobs || 0}
            </Text>
            <Text className="text-white text-sm" style={{ fontSize: responsive.fontSize.small }}>
              Active Jobs
            </Text>
          </View>
          
          <View 
            className="bg-green-600 p-4 rounded-xl"
            style={{ 
              ...cardWidthStyle,
              padding: responsive.padding
            }}
          >
            <Car size={responsive.icon.medium} color="white" />
            <Text 
              className="text-white font-bold mt-2"
              style={{ fontSize: responsive.fontSize.large }}
            >
              {stats?.jobsCompleted || 0}
            </Text>
            <Text className="text-white text-sm" style={{ fontSize: responsive.fontSize.small }}>
              Jobs Completed
            </Text>
          </View>
          
          <View 
            className="bg-yellow-600 p-4 rounded-xl"
            style={{ 
              ...cardWidthStyle,
              padding: responsive.padding
            }}
          >
            <AlertTriangle size={responsive.icon.medium} color="white" />
            <Text 
              className="text-white font-bold mt-2"
              style={{ fontSize: responsive.fontSize.large }}
            >
              {lowInventory.length}
            </Text>
            <Text className="text-white text-sm" style={{ fontSize: responsive.fontSize.small }}>
              Low Stock Items
            </Text>
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View 
          className="flex-row flex-wrap gap-4 mb-6"
          style={{ gap: responsive.margin }}
        >
          <TouchableOpacity 
            onPress={() => setActiveModal('customer')}
            className="bg-red-600 p-4 rounded-xl items-center"
            style={{ 
              ...cardWidthStyle,
              padding: responsive.padding
            }}
          >
            <User size={responsive.icon.medium} color="white" />
            <Text className="text-white text-sm mt-2" style={{ fontSize: responsive.fontSize.small }}>
              Add Customer
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveModal('job')}
            className="bg-red-600 p-4 rounded-xl items-center"
            style={{ 
              ...cardWidthStyle,
              padding: responsive.padding
            }}
          >
            <Wrench size={responsive.icon.medium} color="white" />
            <Text className="text-white text-sm mt-2" style={{ fontSize: responsive.fontSize.small }}>
              Add Job
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveModal('inventory')}
            className="bg-red-600 p-4 rounded-xl items-center"
            style={{ 
              ...cardWidthStyle,
              padding: responsive.padding
            }}
          >
            <Package size={responsive.icon.medium} color="white" />
            <Text className="text-white text-sm mt-2" style={{ fontSize: responsive.fontSize.small }}>
              Add Inventory
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveModal('payment')}
            className="bg-red-600 p-4 rounded-xl items-center"
            style={{ 
              ...cardWidthStyle,
              padding: responsive.padding
            }}
          >
            <CreditCard size={responsive.icon.medium} color="white" />
            <Text className="text-white text-sm mt-2" style={{ fontSize: responsive.fontSize.small }}>
              Record Payment
            </Text>
          </TouchableOpacity>
        </View>

        {/* Current Jobs */}
        <BlurView 
          intensity={50} 
          tint="dark" 
          className="rounded-2xl p-6 mb-6"
          style={{ padding: responsive.padding * 1.5 }}
        >
          <Text 
            className="text-white font-bold mb-4"
            style={{ fontSize: responsive.fontSize.xl }}
          >
            Current Jobs
          </Text>
          {activeJobs.map(job => (
            <View key={job.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text 
                  className="text-white font-semibold"
                  style={{ fontSize: responsive.fontSize.medium }}
                >
                  {job.client_vehicles?.make} - {job.client_vehicles?.licence_plate}
                </Text>
                <Text 
                  className={`font-bold ${
                    job.status === 'pending' ? 'text-yellow-400' :
                    job.status === 'in-progress' ? 'text-blue-400' :
                    'text-green-400'
                  }`}
                  style={{ fontSize: responsive.fontSize.small }}
                >
                  {job.status}
                </Text>
              </View>
              <Text className="text-gray-300 text-sm" style={{ fontSize: responsive.fontSize.small }}>
                Owner: {job.clients?.first_name} {job.clients?.last_name}
              </Text>
              <Text className="text-gray-300 text-sm" style={{ fontSize: responsive.fontSize.small }}>
                Cost: KES {job.total_cost?.toLocaleString() || '0'}
              </Text>
              <View 
                className="flex-row mt-2"
                style={{ gap: responsive.margin }}
              >
                <TouchableOpacity 
                  onPress={() => updateJobStatus(job.id, 'in-progress')}
                  className="bg-blue-600 rounded px-3 py-1"
                >
                  <Text className="text-white text-sm" style={{ fontSize: responsive.fontSize.small }}>
                    Start
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => updateJobStatus(job.id, 'done')}
                  className="bg-green-600 rounded px-3 py-1"
                >
                  <Text className="text-white text-sm" style={{ fontSize: responsive.fontSize.small }}>
                    Complete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </BlurView>

        {/* Today's Appointments */}
        <BlurView 
          intensity={50} 
          tint="dark" 
          className="rounded-2xl p-6 mb-6"
          style={{ padding: responsive.padding * 1.5 }}
        >
          <Text 
            className="text-white font-bold mb-4"
            style={{ fontSize: responsive.fontSize.xl }}
          >
            Today's Appointments
          </Text>
          {appointments.map(appointment => (
            <View key={appointment.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text 
                  className="text-white font-semibold"
                  style={{ fontSize: responsive.fontSize.medium }}
                >
                  {appointment.service_type}
                </Text>
                <Text 
                  className="text-gray-300 text-sm"
                  style={{ fontSize: responsive.fontSize.small }}
                >
                  {new Date(appointment.scheduled_time).toLocaleTimeString()}
                </Text>
              </View>
              <Text className="text-gray-300 text-sm" style={{ fontSize: responsive.fontSize.small }}>
                {appointment.clients?.first_name} {appointment.clients?.last_name} - {appointment.clients?.phone_number}
              </Text>
              <Text className="text-gray-300 text-sm" style={{ fontSize: responsive.fontSize.small }}>
                Vehicle: {appointment.client_vehicles?.make} ({appointment.client_vehicles?.licence_plate})
              </Text>
            </View>
          ))}
        </BlurView>

        {/* Customer List */}
        <BlurView 
          intensity={50} 
          tint="dark" 
          className="rounded-2xl p-6 mb-6"
          style={{ padding: responsive.padding * 1.5 }}
        >
          <Text 
            className="text-white font-bold mb-4"
            style={{ fontSize: responsive.fontSize.xl }}
          >
            Customer List
          </Text>
          <View className="flex-row items-center bg-white/10 rounded-lg px-3 py-2 mb-4">
            <Search size={responsive.icon.small} color="white" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search customers..."
              placeholderTextColor="#9ca3af"
              className="flex-1 text-white ml-2"
              style={{ fontSize: responsive.fontSize.medium }}
            />
          </View>
          {customers.map(customer => (
            <TouchableOpacity key={customer.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row items-center" style={{ gap: responsive.padding }}>
                <View 
                  className="bg-red-600 rounded-full items-center justify-center"
                  style={{ 
                    width: responsive.icon.large, 
                    height: responsive.icon.large 
                  }}
                >
                  <Text 
                    className="text-white font-bold"
                    style={{ fontSize: responsive.fontSize.small }}
                  >
                    {customer.first_name[0]}{customer.last_name[0]}
                  </Text>
                </View>
                <View>
                  <Text 
                    className="text-white font-semibold"
                    style={{ fontSize: responsive.fontSize.medium }}
                  >
                    {customer.first_name} {customer.last_name}
                  </Text>
                  <Text 
                    className="text-gray-300 text-sm"
                    style={{ fontSize: responsive.fontSize.small }}
                  >
                    {customer.phone_number}
                  </Text>
                  <Text 
                    className="text-gray-400 text-xs"
                    style={{ fontSize: responsive.fontSize.small - 2 }}
                  >
                    Vehicles: {customer.client_vehicles?.map(v => v.make).join(', ') || 'None'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </BlurView>

        {/* Low Inventory Alert */}
        {lowInventory.length > 0 && (
          <BlurView 
            intensity={50} 
            tint="dark" 
            className="rounded-2xl p-6 mb-6"
            style={{ padding: responsive.padding * 1.5 }}
          >
            <Text 
              className="text-white font-bold mb-4"
              style={{ fontSize: responsive.fontSize.xl }}
            >
              Low Inventory Alert
            </Text>
            {lowInventory.map((item, index) => (
              <View key={index} className="bg-yellow-600/20 rounded p-3 mb-2">
                <Text 
                  className="text-white font-semibold"
                  style={{ fontSize: responsive.fontSize.medium }}
                >
                  {item.item_name}
                </Text>
                <Text 
                  className="text-yellow-300 text-sm"
                  style={{ fontSize: responsive.fontSize.small }}
                >
                  Current Stock: {item.current_stock} (Low stock!)
                </Text>
              </View>
            ))}
          </BlurView>
        )}
      </ScrollView>

      {/* Footer Quick Actions */}
      <View 
        className="bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700"
        style={{ 
          height: bottomTabHeight,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <TouchableOpacity 
          onPress={() => setActiveModal('customer')}
          className="flex-row items-center bg-red-600 rounded px-4 py-2"
          style={{ gap: 8 }}
        >
          <Plus size={responsive.icon.small} color="white" />
          <Text 
            className="text-white font-semibold"
            style={{ fontSize: responsive.fontSize.small }}
          >
            Add Customer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveModal('job')}
          className="flex-row items-center bg-red-600 rounded px-4 py-2"
          style={{ gap: 8 }}
        >
          <Wrench size={responsive.icon.small} color="white" />
          <Text 
            className="text-white font-semibold"
            style={{ fontSize: responsive.fontSize.small }}
          >
            Add Job
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Customer Modal */}
      <Modal visible={activeModal === 'customer'} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/50">
          <BlurView 
            intensity={80} 
            tint="dark" 
            className="rounded-2xl p-6"
            style={{ 
              width: screenWidth < 768 ? '90%' : '80%',
              maxWidth: 500,
              padding: responsive.padding * 1.5
            }}
          >
            <Text 
              className="text-white font-bold mb-4"
              style={{ fontSize: responsive.fontSize.xl }}
            >
              Add New Customer
            </Text>
            <TextInput
              value={customerForm.first_name}
              onChangeText={(text) => setCustomerForm({...customerForm, first_name: text})}
              placeholder="First Name"
              placeholderTextColor="#9ca3af"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
              style={{ fontSize: responsive.fontSize.medium }}
            />
            <TextInput
              value={customerForm.last_name}
              onChangeText={(text) => setCustomerForm({...customerForm, last_name: text})}
              placeholder="Last Name"
              placeholderTextColor="#9ca3af"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
              style={{ fontSize: responsive.fontSize.medium }}
            />
            <TextInput
              value={customerForm.email}
              onChangeText={(text) => setCustomerForm({...customerForm, email: text})}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
              style={{ fontSize: responsive.fontSize.medium }}
            />
            <TextInput
              value={customerForm.phone_number}
              onChangeText={(text) => setCustomerForm({...customerForm, phone_number: text})}
              placeholder="Phone Number"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
              style={{ fontSize: responsive.fontSize.medium }}
            />
            <View 
              className="flex-row"
              style={{ gap: responsive.padding }}
            >
              <TouchableOpacity 
                onPress={handleAddCustomer}
                className="flex-1 bg-red-600 rounded-lg py-3 items-center"
              >
                <Text 
                  className="text-white font-semibold"
                  style={{ fontSize: responsive.fontSize.medium }}
                >
                  Add Customer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setActiveModal(null)}
                className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
              >
                <Text 
                  className="text-white font-semibold"
                  style={{ fontSize: responsive.fontSize.medium }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>

      {/* Add Job Modal */}
      <Modal visible={activeModal === 'job'} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/50">
          <BlurView 
            intensity={80} 
            tint="dark" 
            className="rounded-2xl p-6"
            style={{ 
              width: screenWidth < 768 ? '90%' : '80%',
              maxWidth: 500,
              padding: responsive.padding * 1.5
            }}
          >
            <Text 
              className="text-white font-bold mb-4"
              style={{ fontSize: responsive.fontSize.xl }}
            >
              Add New Job
            </Text>
            <TextInput
              value={jobForm.client_id}
              onChangeText={(text) => setJobForm({...jobForm, client_id: text})}
              placeholder="Client ID"
              placeholderTextColor="#9ca3af"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
              style={{ fontSize: responsive.fontSize.medium }}
            />
            <TextInput
              value={jobForm.vehicle_id}
              onChangeText={(text) => setJobForm({...jobForm, vehicle_id: text})}
              placeholder="Vehicle ID"
              placeholderTextColor="#9ca3af"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
              style={{ fontSize: responsive.fontSize.medium }}
            />
            <TextInput
              value={jobForm.services}
              onChangeText={(text) => setJobForm({...jobForm, services: text})}
              placeholder="Services (JSON)"
              placeholderTextColor="#9ca3af"
              multiline
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3 h-20"
              style={{ fontSize: responsive.fontSize.medium }}
            />
            <View 
              className="flex-row"
              style={{ gap: responsive.padding }}
            >
              <TouchableOpacity 
                onPress={handleAddJob}
                className="flex-1 bg-red-600 rounded-lg py-3 items-center"
              >
                <Text 
                  className="text-white font-semibold"
                  style={{ fontSize: responsive.fontSize.medium }}
                >
                  Add Job
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setActiveModal(null)}
                className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
              >
                <Text 
                  className="text-white font-semibold"
                  style={{ fontSize: responsive.fontSize.medium }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}