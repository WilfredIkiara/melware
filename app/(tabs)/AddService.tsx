
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
//   const { addClientService, loading: serviceLoading, clientDetails, fetchClientDetails } = useClientData();
//   const { staff, loading: staffLoading, fetchStaff } = useStaffData();
  
//   const [formData, setFormData] = useState({
//     service_type: '',
//     service_cost: '',
//     service_expenses: '',
//     paid_status: false,
//     notes: '',
//     staff_id: '',
//     client_id: clientId as string, // Ensure client_id is always set
//   });

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initializePage = async () => {
//       if (!clientId) {
//         Alert.alert('Error', 'No client selected. Please go back and try again.');
//         router.back();
//         return;
//       }

//       try {
//         setIsLoading(true);
//         // Fetch client details to show in the header
//         await fetchClientDetails(clientId as string);
//         await fetchStaff();
//       } catch (error) {
//         console.error('Error initializing page:', error);
//         Alert.alert('Error', 'Failed to load client details.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializePage();
//   }, [clientId]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleGoBack = () => {
//     router.push("/inventory");
//   };

//   const handleSave = async () => {
//     if (!formData.service_type) {
//       Alert.alert('Error', 'Service Type is required.');
//       return;
//     }
    
//     if (!clientId) {
//       Alert.alert('Error', 'Client ID is missing. Please go back and try again.');
//       return;
//     }

//     try {
//       await addClientService(clientId as string, {
//         ...formData,
//         client_id: clientId as string, // Explicitly include client_id
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

//   if (isLoading) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text className="text-white mt-4">Loading client details...</Text>
//       </View>
//     );
//   }

//   if (!clientId) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-4">
//         <Text className="text-red-500 text-lg text-center mb-4">
//           Error: No client selected
//         </Text>
//         <TouchableOpacity 
//           onPress={handleGoBack}
//           className="bg-blue-600 px-6 py-3 rounded-xl"
//         >
//           <Text className="text-white font-bold">Go Back</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

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
//               <Text className="text-gray-500 text-xs mt-1">Client ID: {clientId}</Text>
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clipboard, DollarSign, Save, User, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DropdownPicker } from '../../lib/components/DropdownPicker';
import { useClientData } from '../../lib/pages/clientData';
import { useStaffData } from '../../lib/pages/useStaffModal';

export default function AddService() {
  const { clientId } = useLocalSearchParams();
  const router = useRouter();
  const { addClientService, loading: serviceLoading, clientDetails, fetchClientDetails } = useClientData();
  const { staff, loading: staffLoading, fetchStaff } = useStaffData();
  
  // Get device dimensions
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isSmallDevice = screenWidth < 375; // iPhone SE, small Android devices
  const isMediumDevice = screenWidth >= 375 && screenWidth < 414; // iPhone 6-8, standard Android
  const isLargeDevice = screenWidth >= 414; // iPhone 6-8 Plus, large Android devices
  const isTablet = screenWidth >= 768; // iPad, tablets
  
  // Responsive sizing functions
  const getResponsiveFontSize = (baseSize: number) => {
    if (isTablet) return baseSize * 1.3;
    if (isLargeDevice) return baseSize * 1.1;
    if (isSmallDevice) return baseSize * 0.9;
    return baseSize;
  };

  const getResponsivePadding = () => {
    if (isTablet) return 6;
    if (isLargeDevice) return 5;
    if (isSmallDevice) return 3;
    return 4;
  };

  const getResponsiveIconSize = () => {
    if (isTablet) return 28;
    if (isLargeDevice) return 26;
    if (isSmallDevice) return 20;
    return 24;
  };

  const getResponsiveSpacing = () => {
    if (isTablet) return 8;
    if (isLargeDevice) return 6;
    if (isSmallDevice) return 3;
    return 4;
  };

  const [formData, setFormData] = useState({
    service_type: '',
    service_cost: '',
    service_expenses: '',
    paid_status: false,
    notes: '',
    staff_id: '',
    client_id: clientId as string,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      if (!clientId) {
        Alert.alert('Error', 'No client selected. Please go back and try again.');
        router.back();
        return;
      }

      try {
        setIsLoading(true);
        await fetchClientDetails(clientId as string);
        await fetchStaff();
      } catch (error) {
        console.error('Error initializing page:', error);
        Alert.alert('Error', 'Failed to load client details.');
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [clientId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGoBack = () => {
    router.push("/inventory");
  };

  const handleSave = async () => {
    if (!formData.service_type) {
      Alert.alert('Error', 'Service Type is required.');
      return;
    }
    
    if (!clientId) {
      Alert.alert('Error', 'Client ID is missing. Please go back and try again.');
      return;
    }

    try {
      await addClientService(clientId as string, {
        ...formData,
        client_id: clientId as string,
        service_cost: formData.service_cost ? parseFloat(formData.service_cost) : 0,
        service_expenses: formData.service_expenses ? parseFloat(formData.service_expenses) : 0,
      });
      Alert.alert('Success', 'Service added successfully!');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Failed to add service.');
    }
  };

  const staffOptions = staff.map(s => ({
    label: `${s.first_name} ${s.last_name}`,
    value: s.staff_id,
    ...s
  }));

  const serviceCost = parseFloat(formData.service_cost || '0');
  const serviceExpenses = parseFloat(formData.service_expenses || '0');
  const netProfit = serviceCost - serviceExpenses;

  // Responsive styles
  const responsiveStyles = {
    headerHeight: isTablet ? 100 : isSmallDevice ? 70 : 80,
    headerPaddingTop: isTablet ? 16 : isSmallDevice ? 10 : 12,
    headerPaddingHorizontal: getResponsivePadding(),
    headerIconSize: getResponsiveIconSize(),
    headerFontSize: getResponsiveFontSize(isTablet ? 24 : 20),
    
    cardPadding: isTablet ? 8 : getResponsivePadding(),
    sectionSpacing: getResponsiveSpacing() * 4, // 16 for standard, adjusted for others
    inputPadding: isTablet ? 6 : isSmallDevice ? 3 : 4,
    inputHeight: isTablet ? 60 : isSmallDevice ? 45 : 50,
    notesHeight: isTablet ? 120 : isSmallDevice ? 80 : 100,
    
    buttonPadding: isTablet ? 6 : isSmallDevice ? 3 : 4,
    buttonFontSize: getResponsiveFontSize(16),
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-white mt-4" style={{ fontSize: getResponsiveFontSize(16) }}>
          Loading client details...
        </Text>
      </View>
    );
  }

  if (!clientId) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-4">
        <Text 
          className="text-red-500 text-lg text-center mb-4"
          style={{ fontSize: getResponsiveFontSize(18) }}
        >
          Error: No client selected
        </Text>
        <TouchableOpacity 
          onPress={handleGoBack}
          className="bg-blue-600 px-6 py-3 rounded-xl"
          style={{ 
            paddingHorizontal: responsiveStyles.buttonPadding * 6,
            paddingVertical: responsiveStyles.buttonPadding * 3,
          }}
        >
          <Text 
            className="text-white font-bold"
            style={{ fontSize: responsiveStyles.buttonFontSize }}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0A0F1E]">
      {serviceLoading && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text 
            className="text-white mt-2"
            style={{ fontSize: getResponsiveFontSize(14) }}
          >
            Adding service...
          </Text>
        </View>
      )}

      {/* Header */}
      <View 
        className="bg-[#1A2033] pb-4 shadow-lg"
        style={{
          height: responsiveStyles.headerHeight,
          paddingTop: responsiveStyles.headerPaddingTop,
          paddingHorizontal: responsiveStyles.headerPaddingHorizontal,
        }}
      >
        <View className="flex-row items-center justify-between flex-1">
          <TouchableOpacity 
            onPress={handleGoBack} 
            className="p-2"
            style={{ padding: responsiveStyles.headerPaddingHorizontal }}
          >
            <X size={responsiveStyles.headerIconSize} color="white" />
          </TouchableOpacity>
          <Text 
            className="text-white font-bold text-center"
            style={{ fontSize: responsiveStyles.headerFontSize }}
          >
            Add New Service
          </Text>
          <View style={{ width: responsiveStyles.headerIconSize + responsiveStyles.headerPaddingHorizontal * 2 }} />
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Client Info Card */}
        {clientDetails?.customer && (
          <View 
            className="p-4"
            style={{ padding: responsiveStyles.cardPadding * 4 }}
          >
            <View className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-4 border border-blue-700/30">
              <Text 
                className="text-blue-400 text-sm font-bold mb-2"
                style={{ fontSize: getResponsiveFontSize(12) }}
              >
                CLIENT INFORMATION
              </Text>
              <Text 
                className="text-white font-bold"
                style={{ fontSize: getResponsiveFontSize(18) }}
              >
                {clientDetails.customer.first_name} {clientDetails.customer.last_name}
              </Text>
              <Text 
                className="text-gray-300"
                style={{ fontSize: getResponsiveFontSize(14) }}
              >
                {clientDetails.customer.email}
              </Text>
              <Text 
                className="text-gray-400 text-sm"
                style={{ fontSize: getResponsiveFontSize(12) }}
              >
                {clientDetails.customer.phone_number}
              </Text>
              <Text 
                className="text-gray-500 text-xs mt-1"
                style={{ fontSize: getResponsiveFontSize(10) }}
              >
                Client ID: {clientId}
              </Text>
            </View>
          </View>
        )}

        <View 
          className="p-4"
          style={{ padding: responsiveStyles.cardPadding * 4 }}
        >
          <View className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
            {/* Service Details Section */}
            <View style={{ marginBottom: responsiveStyles.sectionSpacing }}>
              <View className="flex-row items-center mb-4">
                <Clipboard size={responsiveStyles.headerIconSize} color="#4F46E5" />
                <Text 
                  className="text-white font-bold ml-3"
                  style={{ fontSize: getResponsiveFontSize(18) }}
                >
                  Service Details
                </Text>
              </View>
              
              <View style={{ gap: responsiveStyles.sectionSpacing }}>
                <View>
                  <Text 
                    className="text-gray-400 font-bold mb-2"
                    style={{ fontSize: getResponsiveFontSize(14) }}
                  >
                    Service Type *
                  </Text>
                  <TextInput
                    className="bg-gray-700 text-white rounded-xl border border-gray-600"
                    placeholder="e.g., Oil Change, Brake Service"
                    placeholderTextColor="#9ca3af"
                    value={formData.service_type}
                    onChangeText={(text) => handleInputChange('service_type', text)}
                    style={{
                      padding: responsiveStyles.inputPadding * 4,
                      fontSize: getResponsiveFontSize(16),
                      height: responsiveStyles.inputHeight,
                    }}
                  />
                </View>

                {/* Responsive Grid for Cost and Expenses */}
                <View className={isSmallDevice ? "flex-col" : "flex-row"} style={{ gap: responsiveStyles.sectionSpacing }}>
                  <View className={isSmallDevice ? "w-full" : "flex-1"}>
                    <Text 
                      className="text-gray-400 font-bold mb-2"
                      style={{ fontSize: getResponsiveFontSize(14) }}
                    >
                      Service Cost (KES)
                    </Text>
                    <View 
                      className="flex-row items-center bg-gray-700 rounded-xl border border-gray-600"
                      style={{ height: responsiveStyles.inputHeight }}
                    >
                      <DollarSign 
                        size={getResponsiveFontSize(16)} 
                        color="#9ca3af" 
                        style={{ marginLeft: responsiveStyles.inputPadding * 3 }} 
                      />
                      <TextInput
                        className="flex-1 text-white"
                        placeholder="0.00"
                        placeholderTextColor="#9ca3af"
                        keyboardType="numeric"
                        value={formData.service_cost}
                        onChangeText={(text) => handleInputChange('service_cost', text)}
                        style={{
                          padding: responsiveStyles.inputPadding * 4,
                          fontSize: getResponsiveFontSize(16),
                        }}
                      />
                    </View>
                  </View>

                  <View className={isSmallDevice ? "w-full" : "flex-1"}>
                    <Text 
                      className="text-gray-400 font-bold mb-2"
                      style={{ fontSize: getResponsiveFontSize(14) }}
                    >
                      Expenses (KES)
                    </Text>
                    <View 
                      className="flex-row items-center bg-gray-700 rounded-xl border border-gray-600"
                      style={{ height: responsiveStyles.inputHeight }}
                    >
                      <DollarSign 
                        size={getResponsiveFontSize(16)} 
                        color="#9ca3af" 
                        style={{ marginLeft: responsiveStyles.inputPadding * 3 }} 
                      />
                      <TextInput
                        className="flex-1 text-white"
                        placeholder="0.00"
                        placeholderTextColor="#9ca3af"
                        keyboardType="numeric"
                        value={formData.service_expenses}
                        onChangeText={(text) => handleInputChange('service_expenses', text)}
                        style={{
                          padding: responsiveStyles.inputPadding * 4,
                          fontSize: getResponsiveFontSize(16),
                        }}
                      />
                    </View>
                  </View>
                </View>

                {/* Profit Calculator */}
                {(serviceCost > 0 || serviceExpenses > 0) && (
                  <View 
                    className="bg-gray-700/50 rounded-xl p-4 border border-gray-600"
                    style={{ padding: responsiveStyles.inputPadding * 4 }}
                  >
                    <Text 
                      className="text-gray-400 font-bold mb-3"
                      style={{ fontSize: getResponsiveFontSize(14) }}
                    >
                      PROFIT CALCULATION
                    </Text>
                    <View style={{ gap: responsiveStyles.sectionSpacing / 2 }}>
                      <View className="flex-row justify-between">
                        <Text 
                          className="text-gray-300"
                          style={{ fontSize: getResponsiveFontSize(14) }}
                        >
                          Revenue:
                        </Text>
                        <Text 
                          className="text-green-400 font-bold"
                          style={{ fontSize: getResponsiveFontSize(14) }}
                        >
                          KES {serviceCost.toLocaleString()}
                        </Text>
                      </View>
                      <View className="flex-row justify-between">
                        <Text 
                          className="text-gray-300"
                          style={{ fontSize: getResponsiveFontSize(14) }}
                        >
                          Expenses:
                        </Text>
                        <Text 
                          className="text-red-400 font-bold"
                          style={{ fontSize: getResponsiveFontSize(14) }}
                        >
                          KES {serviceExpenses.toLocaleString()}
                        </Text>
                      </View>
                      <View className="flex-row justify-between border-t border-gray-600 pt-2">
                        <Text 
                          className="text-gray-300 font-bold"
                          style={{ fontSize: getResponsiveFontSize(14) }}
                        >
                          Net Profit:
                        </Text>
                        <Text 
                          className={`font-bold ${
                            netProfit >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                          style={{ fontSize: getResponsiveFontSize(14) }}
                        >
                          KES {netProfit.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Assignment Section */}
            <View style={{ marginBottom: responsiveStyles.sectionSpacing }}>
              <View className="flex-row items-center mb-4">
                <User size={responsiveStyles.headerIconSize} color="#4F46E5" />
                <Text 
                  className="text-white font-bold ml-3"
                  style={{ fontSize: getResponsiveFontSize(18) }}
                >
                  Assignment
                </Text>
              </View>
              
              <View style={{ gap: responsiveStyles.sectionSpacing }}>
                <View>
                  <Text 
                    className="text-gray-400 font-bold mb-2"
                    style={{ fontSize: getResponsiveFontSize(14) }}
                  >
                    Assign to Staff
                  </Text>
                  <DropdownPicker
                    options={staffOptions}
                    selectedValue={formData.staff_id}
                    onValueChange={(value) => handleInputChange('staff_id', value)}
                    placeholder="Select staff member"
                    searchable={true}
                  />
                </View>

                <View 
                  className="flex-row items-center justify-between bg-gray-700/50 rounded-xl"
                  style={{
                    padding: responsiveStyles.inputPadding * 4,
                    height: responsiveStyles.inputHeight,
                  }}
                >
                  <Text 
                    className="text-gray-400 font-bold"
                    style={{ fontSize: getResponsiveFontSize(14) }}
                  >
                    Payment Status
                  </Text>
                  <View className="flex-row items-center">
                    <Text 
                      className={`mr-3 font-bold ${
                        formData.paid_status ? 'text-green-400' : 'text-red-400'
                      }`}
                      style={{ fontSize: getResponsiveFontSize(14) }}
                    >
                      {formData.paid_status ? 'Paid' : 'Pending'}
                    </Text>
                    <Switch
                      trackColor={{ false: '#767577', true: '#10b981' }}
                      thumbColor={formData.paid_status ? '#f5dd4b' : '#f4f3f4'}
                      onValueChange={(value) => setFormData({ ...formData, paid_status: value })}
                      value={formData.paid_status}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Notes Section */}
            <View style={{ marginBottom: responsiveStyles.sectionSpacing }}>
              <View className="flex-row items-center mb-4">
                <Calendar size={responsiveStyles.headerIconSize} color="#4F46E5" />
                <Text 
                  className="text-white font-bold ml-3"
                  style={{ fontSize: getResponsiveFontSize(18) }}
                >
                  Additional Information
                </Text>
              </View>
              
              <View>
                <Text 
                  className="text-gray-400 font-bold mb-2"
                  style={{ fontSize: getResponsiveFontSize(14) }}
                >
                  Service Notes
                </Text>
                <TextInput
                  className="bg-gray-700 text-white rounded-xl border border-gray-600"
                  placeholder="Add any notes about the service..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  textAlignVertical="top"
                  value={formData.notes}
                  onChangeText={(text) => handleInputChange('notes', text)}
                  style={{
                    padding: responsiveStyles.inputPadding * 4,
                    fontSize: getResponsiveFontSize(16),
                    height: responsiveStyles.notesHeight,
                  }}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View className={isSmallDevice ? "flex-col" : "flex-row"} style={{ gap: responsiveStyles.sectionSpacing }}>
              <TouchableOpacity
                onPress={handleGoBack}
                className="bg-red-600/20 border border-red-600 rounded-xl flex-row items-center justify-center"
                style={{
                  padding: responsiveStyles.buttonPadding * 4,
                  flex: isSmallDevice ? undefined : 1,
                }}
              >
                <X size={getResponsiveFontSize(16)} color="#ef4444" />
                <Text 
                  className="text-red-400 font-bold ml-2"
                  style={{ fontSize: responsiveStyles.buttonFontSize }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleSave}
                disabled={!formData.service_type}
                className={`rounded-xl flex-row items-center justify-center ${
                  formData.service_type 
                    ? 'bg-green-600 border border-green-600' 
                    : 'bg-gray-600 border border-gray-600'
                }`}
                style={{
                  padding: responsiveStyles.buttonPadding * 4,
                  flex: isSmallDevice ? undefined : 1,
                }}
              >
                <Save size={getResponsiveFontSize(16)} color="white" />
                <Text 
                  className="text-white font-bold ml-2"
                  style={{ fontSize: responsiveStyles.buttonFontSize }}
                >
                  Save Service
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}