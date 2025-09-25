
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Car, FileText, Gauge, Palette, Save, Settings, X } from 'lucide-react-native';
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
// import { DropdownPicker } from '../../lib/components/DropdownPicker';
// import { useClientData } from '../../lib/pages/clientData';

// export default function AddVehicle() {
//   const { clientId } = useLocalSearchParams();
//   const router = useRouter();
//   const { addClientVehicle, loading, clientDetails, fetchClientDetails } = useClientData();
  
//   const [formData, setFormData] = useState({
//     make: '',
//     licence_plate: '',
//     engine_type: '',
//     notes: '',
//     mileage: '',
//     color: '',
//     fuel_type: '',
//     vehicle_identification_number: '',
//     client_id: clientId as string, // Ensure client_id is always set
//   });

//   const [isLoading, setIsLoading] = useState(true);

//   const fuelTypeOptions = [
//     { label: 'Petrol', value: 'Petrol' },
//     { label: 'Diesel', value: 'Diesel' },
//     { label: 'Electric', value: 'Electric' },
//     { label: 'Hybrid', value: 'Hybrid' },
//     { label: 'LPG', value: 'LPG' },
//     { label: 'Other', value: 'Other' },
//   ];

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
//     if (!formData.make || !formData.licence_plate) {
//       Alert.alert('Error', 'Make and Licence Plate are required.');
//       return;
//     }
    
//     if (!clientId) {
//       Alert.alert('Error', 'Client ID is missing. Please go back and try again.');
//       return;
//     }

//     try {
//       await addClientVehicle(clientId as string, {
//         ...formData,
//         client_id: clientId as string, // Explicitly include client_id
//         mileage: formData.mileage ? parseFloat(formData.mileage) : undefined,
//       });
//       Alert.alert('Success', 'Vehicle added successfully!');
//       router.back();
//     } catch (err) {
//       Alert.alert('Error', 'Failed to add vehicle.');
//     }
//   };

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
//       {loading && (
//         <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
//           <ActivityIndicator size="large" color="#3b82f6" />
//           <Text className="text-white mt-2">Adding vehicle...</Text>
//         </View>
//       )}

//       {/* Header */}
//       <View className="bg-[#1A2033] pt-12 pb-4 px-4 shadow-lg">
//         <View className="flex-row items-center justify-between">
//           <TouchableOpacity onPress={handleGoBack} className="p-2">
//             <X size={24} color="white" />
//           </TouchableOpacity>
//           <Text className="text-white text-xl font-bold">Add New Vehicle</Text>
//           <View className="w-8" />
//         </View>
//       </View>

//       <ScrollView className="flex-1">
//         {/* Client Info Card */}
//         {clientDetails?.customer && (
//           <View className="p-4">
//             <View className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-2xl p-4 border border-green-700/30">
//               <Text className="text-green-400 text-sm font-bold mb-2">CLIENT INFORMATION</Text>
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
//             {/* Basic Information Section */}
//             <View className="mb-6">
//               <View className="flex-row items-center mb-4">
//                 <Car size={24} color="#4F46E5" />
//                 <Text className="text-white text-xl font-bold ml-3">Basic Information</Text>
//               </View>
              
//               <View className="grid grid-cols-2 gap-4">
//                 <View>
//                   <Text className="text-gray-400 font-bold mb-2">Make *</Text>
//                   <TextInput
//                     className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
//                     placeholder="e.g., Toyota"
//                     placeholderTextColor="#9ca3af"
//                     value={formData.make}
//                     onChangeText={(text) => handleInputChange('make', text)}
//                   />
//                 </View>

//                 <View>
//                   <Text className="text-gray-400 font-bold mb-2">Licence Plate *</Text>
//                   <TextInput
//                     className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
//                     placeholder="e.g., KBC 123Z"
//                     placeholderTextColor="#9ca3af"
//                     value={formData.licence_plate}
//                     onChangeText={(text) => handleInputChange('licence_plate', text)}
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Vehicle Details Section */}
//             <View className="mb-6">
//               <View className="flex-row items-center mb-4">
//                 <Settings size={24} color="#4F46E5" />
//                 <Text className="text-white text-xl font-bold ml-3">Vehicle Details</Text>
//               </View>
              
//               <View className="grid grid-cols-2 gap-4">
//                 <View>
//                   <Text className="text-gray-400 font-bold mb-2">Engine Type</Text>
//                   <TextInput
//                     className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
//                     placeholder="e.g., V6, 4-cylinder"
//                     placeholderTextColor="#9ca3af"
//                     value={formData.engine_type}
//                     onChangeText={(text) => handleInputChange('engine_type', text)}
//                   />
//                 </View>

//                 <View>
//                   <Text className="text-gray-400 font-bold mb-2">Fuel Type</Text>
//                   <DropdownPicker
//                     options={fuelTypeOptions}
//                     selectedValue={formData.fuel_type}
//                     onValueChange={(value) => handleInputChange('fuel_type', value)}
//                     placeholder="Select fuel type"
//                   />
//                 </View>

//                 <View>
//                   <Text className="text-gray-400 font-bold mb-2">Mileage</Text>
//                   <View className="flex-row items-center bg-gray-700 rounded-xl border border-gray-600">
//                     <Gauge size={20} color="#9ca3af" className="ml-3" />
//                     <TextInput
//                       className="flex-1 text-white p-4"
//                       placeholder="0"
//                       placeholderTextColor="#9ca3af"
//                       keyboardType="numeric"
//                       value={formData.mileage}
//                       onChangeText={(text) => handleInputChange('mileage', text)}
//                     />
//                   </View>
//                 </View>

//                 <View>
//                   <Text className="text-gray-400 font-bold mb-2">Color</Text>
//                   <View className="flex-row items-center bg-gray-700 rounded-xl border border-gray-600">
//                     <Palette size={20} color="#9ca3af" className="ml-3" />
//                     <TextInput
//                       className="flex-1 text-white p-4"
//                       placeholder="e.g., Blue"
//                       placeholderTextColor="#9ca3af"
//                       value={formData.color}
//                       onChangeText={(text) => handleInputChange('color', text)}
//                     />
//                   </View>
//                 </View>
//               </View>

//               <View className="mt-4">
//                 <Text className="text-gray-400 font-bold mb-2">VIN (Vehicle Identification Number)</Text>
//                 <TextInput
//                   className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
//                   placeholder="17-character VIN"
//                   placeholderTextColor="#9ca3af"
//                   maxLength={17}
//                   value={formData.vehicle_identification_number}
//                   onChangeText={(text) => handleInputChange('vehicle_identification_number', text)}
//                 />
//               </View>
//             </View>

//             {/* Notes Section */}
//             <View className="mb-6">
//               <View className="flex-row items-center mb-4">
//                 <FileText size={24} color="#4F46E5" />
//                 <Text className="text-white text-xl font-bold ml-3">Additional Information</Text>
//               </View>
              
//               <View>
//                 <Text className="text-gray-400 font-bold mb-2">Vehicle Notes</Text>
//                 <TextInput
//                   className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600 h-32"
//                   placeholder="Add any notes about the vehicle..."
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
//                 disabled={!formData.make || !formData.licence_plate}
//                 className={`flex-1 py-4 rounded-xl flex-row items-center justify-center ${
//                   formData.make && formData.licence_plate
//                     ? 'bg-green-600 border border-green-600' 
//                     : 'bg-gray-600 border border-gray-600'
//                 }`}
//               >
//                 <Save size={20} color="white" />
//                 <Text className="text-white font-bold ml-2">Save Vehicle</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Car, FileText, Gauge, Palette, Save, Settings, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DropdownPicker } from '../../lib/components/DropdownPicker';
import { useClientData } from '../../lib/pages/clientData';

export default function AddVehicle() {
  const { clientId } = useLocalSearchParams();
  const router = useRouter();
  const { addClientVehicle, loading, clientDetails, fetchClientDetails } = useClientData();
  
  const [formData, setFormData] = useState({
    make: '',
    licence_plate: '',
    engine_type: '',
    notes: '',
    mileage: '',
    color: '',
    fuel_type: '',
    vehicle_identification_number: '',
    client_id: clientId as string,
  });

  const [isLoading, setIsLoading] = useState(true);
  const { width } = Dimensions.get('window');
  const isMobile = width < 768; // Mobile breakpoint

  const fuelTypeOptions = [
    { label: 'Petrol', value: 'Petrol' },
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Electric', value: 'Electric' },
    { label: 'Hybrid', value: 'Hybrid' },
    { label: 'LPG', value: 'LPG' },
    { label: 'Other', value: 'Other' },
  ];

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
    if (!formData.make || !formData.licence_plate) {
      Alert.alert('Error', 'Make and Licence Plate are required.');
      return;
    }
    
    if (!clientId) {
      Alert.alert('Error', 'Client ID is missing. Please go back and try again.');
      return;
    }

    try {
      await addClientVehicle(clientId as string, {
        ...formData,
        client_id: clientId as string,
        mileage: formData.mileage ? parseFloat(formData.mileage) : undefined,
      });
      Alert.alert('Success', 'Vehicle added successfully!');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Failed to add vehicle.');
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-white mt-4">Loading client details...</Text>
      </View>
    );
  }

  if (!clientId) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-4">
        <Text className="text-red-500 text-lg text-center mb-4">
          Error: No client selected
        </Text>
        <TouchableOpacity 
          onPress={handleGoBack}
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0A0F1E]">
      {loading && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-white mt-2">Adding vehicle...</Text>
        </View>
      )}

      {/* Header */}
      <View className="bg-[#1A2033] pt-12 pb-4 px-4 shadow-lg">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={handleGoBack} className="p-2">
            <X size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Add New Vehicle</Text>
          <View className="w-8" />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Client Info Card */}
        {clientDetails?.customer && (
          <View className="p-4">
            <View className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-2xl p-4 border border-green-700/30">
              <Text className="text-green-400 text-sm font-bold mb-2">CLIENT INFORMATION</Text>
              <Text className="text-white text-lg font-bold">
                {clientDetails.customer.first_name} {clientDetails.customer.last_name}
              </Text>
              <Text className="text-gray-300">{clientDetails.customer.email}</Text>
              <Text className="text-gray-400 text-sm">{clientDetails.customer.phone_number}</Text>
              <Text className="text-gray-500 text-xs mt-1">Client ID: {clientId}</Text>
            </View>
          </View>
        )}

        <View className="p-4">
          <View className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
            {/* Basic Information Section */}
            <View className="mb-6">
              <View className="flex-row items-center mb-4">
                <Car size={24} color="#4F46E5" />
                <Text className="text-white text-xl font-bold ml-3">Basic Information</Text>
              </View>

              <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
                <View style={{ flex: 1 }}>
                  <Text className="text-gray-400 font-bold mb-2">Make *</Text>
                  <TextInput
                    className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
                    placeholder="e.g., Toyota"
                    placeholderTextColor="#9ca3af"
                    value={formData.make}
                    onChangeText={(text) => handleInputChange('make', text)}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text className="text-gray-400 font-bold mb-2">Licence Plate *</Text>
                  <TextInput
                    className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
                    placeholder="e.g., KBC 123Z"
                    placeholderTextColor="#9ca3af"
                    value={formData.licence_plate}
                    onChangeText={(text) => handleInputChange('licence_plate', text)}
                  />
                </View>
              </View>
            </View>

            {/* Vehicle Details Section */}
            <View className="mb-6">
              <View className="flex-row items-center mb-4">
                <Settings size={24} color="#4F46E5" />
                <Text className="text-white text-xl font-bold ml-3">Vehicle Details</Text>
              </View>

              <View style={{ flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: 16 }}>
                <View style={{ flex: 1 }}>
                  <Text className="text-gray-400 font-bold mb-2">Engine Type</Text>
                  <TextInput
                    className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
                    placeholder="e.g., V6, 4-cylinder"
                    placeholderTextColor="#9ca3af"
                    value={formData.engine_type}
                    onChangeText={(text) => handleInputChange('engine_type', text)}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text className="text-gray-400 font-bold mb-2">Fuel Type</Text>
                  <DropdownPicker
                    options={fuelTypeOptions}
                    selectedValue={formData.fuel_type}
                    onValueChange={(value) => handleInputChange('fuel_type', value)}
                    placeholder="Select fuel type"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text className="text-gray-400 font-bold mb-2">Mileage</Text>
                  <View className="flex-row items-center bg-gray-700 rounded-xl border border-gray-600">
                    <Gauge size={20} color="#9ca3af" className="ml-3" />
                    <TextInput
                      className="flex-1 text-white p-4"
                      placeholder="0"
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                      value={formData.mileage}
                      onChangeText={(text) => handleInputChange('mileage', text)}
                    />
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Text className="text-gray-400 font-bold mb-2">Color</Text>
                  <View className="flex-row items-center bg-gray-700 rounded-xl border border-gray-600">
                    <Palette size={20} color="#9ca3af" className="ml-3" />
                    <TextInput
                      className="flex-1 text-white p-4"
                      placeholder="e.g., Blue"
                      placeholderTextColor="#9ca3af"
                      value={formData.color}
                      onChangeText={(text) => handleInputChange('color', text)}
                    />
                  </View>
                </View>
              </View>

              <View className="mt-4">
                <Text className="text-gray-400 font-bold mb-2">VIN (Vehicle Identification Number)</Text>
                <TextInput
                  className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600"
                  placeholder="17-character VIN"
                  placeholderTextColor="#9ca3af"
                  maxLength={17}
                  value={formData.vehicle_identification_number}
                  onChangeText={(text) => handleInputChange('vehicle_identification_number', text)}
                />
              </View>
            </View>

            {/* Notes Section */}
            <View className="mb-6">
              <View className="flex-row items-center mb-4">
                <FileText size={24} color="#4F46E5" />
                <Text className="text-white text-xl font-bold ml-3">Additional Information</Text>
              </View>

              <View>
                <Text className="text-gray-400 font-bold mb-2">Vehicle Notes</Text>
                <TextInput
                  className="bg-gray-700 text-white p-4 rounded-xl border border-gray-600 h-32"
                  placeholder="Add any notes about the vehicle..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  textAlignVertical="top"
                  value={formData.notes}
                  onChangeText={(text) => handleInputChange('notes', text)}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row justify-between space-x-4">
              <TouchableOpacity
                onPress={handleGoBack}
                className="flex-1 bg-red-600/20 border border-red-600 py-4 rounded-xl flex-row items-center justify-center"
              >
                <X size={20} color="#ef4444" />
                <Text className="text-red-400 font-bold ml-2">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleSave}
                disabled={!formData.make || !formData.licence_plate}
                className={`flex-1 py-4 rounded-xl flex-row items-center justify-center ${
                  formData.make && formData.licence_plate
                    ? 'bg-green-600 border border-green-600' 
                    : 'bg-gray-600 border border-gray-600'
                }`}
              >
                <Save size={20} color="white" />
                <Text className="text-white font-bold ml-2">Save Vehicle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
