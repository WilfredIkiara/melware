
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { ArrowLeft, Mail, MapPin, Phone, Save, User } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { fetchCarByLicencePlate, fetchClientById, updateCar } from '../../lib/pages/useInventoryData';
// import { Car as CarType, Client } from '../../lib/types';

// export default function CarEditingPage() {
//   const { licence_plate, client_id, client_email } = useLocalSearchParams();
//   const [car, setCar] = useState<CarType | null>(null);
//   const [client, setClient] = useState<Client | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [saving, setSaving] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (licence_plate) {
//       loadCarData();
//     }
//   }, [licence_plate]);

//   const loadCarData = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const carResponse = await fetchCarByLicencePlate(licence_plate as string);
//       if (carResponse.success && carResponse.data) {
//         setCar(carResponse.data);
        
//         // Try to load client data if we have client_id
//         if (carResponse.data.client_id) {
//           try {
//             const clientResponse = await fetchClientById(carResponse.data.client_id);
//             if (clientResponse.success && clientResponse.data) {
//               setClient(clientResponse.data);
//             }
//           } catch (error) {
//             console.error('Error loading client:', error);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error loading car:', error);
//       Alert.alert('Error', 'Failed to load car data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = async (): Promise<void> => {
//     if (!car) return;
    
//     try {
//       setSaving(true);
//       const response = await updateCar(car.licence_plate, car);
//       if (response.success) {
//         Alert.alert('Success', 'Car details updated successfully');
//         router.back();
//       } else {
//         Alert.alert('Error', response.message || 'Failed to update car details');
//       }
//     } catch (error) {
//       console.error('Error updating car:', error);
//       Alert.alert('Error', 'Failed to update car details');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChange = (field: keyof CarType, value: string | number): void => {
//     if (car) {
//       setCar({ ...car, [field]: value });
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3B82F6" />
//       </View>
//     );
//   }

//   if (!car) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <Text className="text-white">Car not found</Text>
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
//         <Text className="text-white text-xl font-bold">Edit Car Details</Text>
//         <TouchableOpacity onPress={handleSave} disabled={saving}>
//           {saving ? (
//             <ActivityIndicator size="small" color="#3B82F6" />
//           ) : (
//             <Save size={24} color="white" />
//           )}
//         </TouchableOpacity>
//       </View>

//       <ScrollView className="px-6">
//         {/* Car Details */}
//         <View className="mb-6">
//           <Text className="text-white text-lg font-semibold mb-4">Car Information</Text>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Make</Text>
//             <TextInput
//               value={car.make || ''}
//               onChangeText={(text) => handleChange('make', text)}
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Model</Text>
//             <TextInput
//               value={car.model || ''}
//               onChangeText={(text) => handleChange('model', text)}
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">License Plate</Text>
//             <Text className="text-white text-lg">{car.licence_plate}</Text>
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Mileage</Text>
//             <TextInput
//               value={car.milage ? car.milage.toString() : ''}
//               onChangeText={(text) => handleChange('milage', parseInt(text) || 0)}
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
          
//           <View className="mb-4">
//             <Text className="text-gray-400 mb-2">Balance</Text>
//             <TextInput
//               value={car.balance ? car.balance.toString() : ''}
//               onChangeText={(text) => handleChange('balance', parseFloat(text) || 0)}
//               keyboardType="numeric"
//               className="bg-white/10 text-white rounded-lg px-4 py-3"
//             />
//           </View>
//         </View>

//         {/* Owner Information */}
//         {client && (
//           <View className="mb-6">
//             <Text className="text-white text-lg font-semibold mb-4">Owner Information</Text>
            
//             <View className="flex-row items-center mb-3">
//               <User size={16} color="#9ca3af" />
//               <Text className="text-gray-300 ml-2">
//                 {client.first_name} {client.last_name}
//               </Text>
//             </View>
            
//             {client.email && (
//               <View className="flex-row items-center mb-3">
//                 <Mail size={16} color="#9ca3af" />
//                 <Text className="text-gray-300 ml-2">{client.email}</Text>
//               </View>
//             )}
            
//             {client.phone_number && (
//               <View className="flex-row items-center mb-3">
//                 <Phone size={16} color="#9ca3af" />
//                 <Text className="text-gray-300 ml-2">{client.phone_number}</Text>
//               </View>
//             )}
            
//             {client.address && (
//               <View className="flex-row items-start mb-3">
//                 <MapPin size={16} color="#9ca3af" className="mt-1" />
//                 <Text className="text-gray-300 ml-2 flex-1">{client.address}</Text>
//               </View>
//             )}
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }
// cars.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, ArrowLeft, Calendar, Car, Mail, MapPin, Phone, Plus, Save, User, Wrench } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { createCar, fetchCarByLicencePlate, fetchClientById, updateCar } from '../../lib/pages/useInventoryData';
import { Car as CarType, Client } from '../../lib/types';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function CarEditingPage() {
  const { licence_plate, client_id, client_email } = useLocalSearchParams();
  const [car, setCar] = useState<CarType | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newCar, setNewCar] = useState<Partial<CarType>>({
    make: '',
    model: '',
    licence_plate: '',
    milage: 0,
    balance: 0,
    status: 'available',
    last_service_date: new Date().toISOString().split('T')[0],
    next_service_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const router = useRouter();

  useEffect(() => {
    if (licence_plate && licence_plate !== 'new') {
      loadCarData();
    } else if (licence_plate === 'new') {
      setLoading(false);
      setShowAddModal(true);
    }
  }, [licence_plate]);

  const loadCarData = async (): Promise<void> => {
    try {
      setLoading(true);
      const carResponse = await fetchCarByLicencePlate(licence_plate as string);
      if (carResponse.success && carResponse.data) {
        setCar(carResponse.data);
        
        if (carResponse.data.client_id) {
          try {
            const clientResponse = await fetchClientById(carResponse.data.client_id);
            if (clientResponse.success && clientResponse.data) {
              setClient(clientResponse.data);
            }
          } catch (error) {
            console.error('Error loading client:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error loading car:', error);
      Alert.alert('Error', 'Failed to load car data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!car) return;
    
    try {
      setSaving(true);
      const response = await updateCar(car.licence_plate, car);
      if (response.success) {
        Alert.alert('Success', 'Car details updated successfully');
        router.back();
      } else {
        Alert.alert('Error', response.message || 'Failed to update car details');
      }
    } catch (error) {
      console.error('Error updating car:', error);
      Alert.alert('Error', 'Failed to update car details');
    } finally {
      setSaving(false);
    }
  };

  const handleAddCar = async (): Promise<void> => {
    if (!newCar.licence_plate || !newCar.make || !newCar.model) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    try {
      setSaving(true);
      const response = await createCar(newCar as CarType);
      if (response.success) {
        Alert.alert('Success', 'Car added successfully');
        setShowAddModal(false);
        router.back();
      } else {
        Alert.alert('Error', response.message || 'Failed to add car');
      }
    } catch (error) {
      console.error('Error adding car:', error);
      Alert.alert('Error', 'Failed to add car');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof CarType, value: string | number): void => {
    if (car) {
      setCar({ ...car, [field]: value });
    }
  };

  const handleNewCarChange = (field: keyof CarType, value: string | number): void => {
    setNewCar({ ...newCar, [field]: value });
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-white mt-4">Loading car data...</Text>
      </View>
    );
  }

  if (!car && licence_plate !== 'new') {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <AlertTriangle size={48} color="#EF4444" />
        <Text className="text-white text-lg mt-4">Car not found</Text>
        <TouchableOpacity 
          className="bg-blue-600 px-6 py-3 rounded-lg mt-4"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderContent = () => (
    <>
      {/* Header */}
      <View className={`${isMobile ? 'px-6' : 'px-8'} py-6 bg-white/5 border-b border-white/10`}>
        <View className={`flex-row items-center justify-between ${isMobile ? 'flex-col' : ''} gap-4`}>
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-2xl font-bold">
                {licence_plate === 'new' ? 'Add New Car' : 'Edit Car Details'}
              </Text>
              <Text className="text-gray-400">
                {licence_plate === 'new' ? 'Register a new vehicle' : `Managing ${car?.licence_plate}`}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center gap-3">
            {licence_plate !== 'new' && (
              <TouchableOpacity 
                className="bg-green-600 px-4 py-2 rounded-lg flex-row items-center"
                onPress={() => setShowAddModal(true)}
              >
                <Plus size={18} color="white" />
                <Text className="text-white ml-2 font-semibold">Add Another</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={licence_plate === 'new' ? handleAddCar : handleSave} 
              disabled={saving}
              className="bg-blue-600 px-6 py-3 rounded-lg flex-row items-center"
            >
              {saving ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Save size={18} color="white" />
                  <Text className="text-white ml-2 font-semibold">
                    {licence_plate === 'new' ? 'Create Car' : 'Save Changes'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className={`flex-1 ${isMobile ? 'px-6' : 'px-8'}`}>
        <View className={`py-6 ${isMobile ? '' : 'flex-row gap-8'}`}>
          {/* Car Details */}
          <View className={`bg-white/5 rounded-2xl p-6 border border-white/10 ${isMobile ? 'mb-6' : 'flex-1'}`}>
            <Text className="text-white text-xl font-bold mb-6 flex-row items-center">
              <Car className="mr-3" size={24} color="#3B82F6" />
              Car Information
            </Text>
            
            <View className={`gap-4 ${isMobile ? '' : 'grid grid-cols-2'}`}>
              <View>
                <Text className="text-gray-400 mb-2">Make *</Text>
                <TextInput
                  value={licence_plate === 'new' ? newCar.make || '' : car?.make || ''}
                  onChangeText={(text) => licence_plate === 'new' ? 
                    handleNewCarChange('make', text) : handleChange('make', text)}
                  className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
                  placeholder="Enter car make"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text className="text-gray-400 mb-2">Model *</Text>
                <TextInput
                  value={licence_plate === 'new' ? newCar.model || '' : car?.model || ''}
                  onChangeText={(text) => licence_plate === 'new' ? 
                    handleNewCarChange('model', text) : handleChange('model', text)}
                  className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
                  placeholder="Enter car model"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text className="text-gray-400 mb-2">License Plate *</Text>
                {licence_plate === 'new' ? (
                  <TextInput
                    value={newCar.licence_plate || ''}
                    onChangeText={(text) => handleNewCarChange('licence_plate', text)}
                    className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
                    placeholder="Enter license plate"
                    placeholderTextColor="#6B7280"
                  />
                ) : (
                  <Text className="text-white text-lg bg-white/10 rounded-lg px-4 py-3 border border-white/20">
                    {car?.licence_plate}
                  </Text>
                )}
              </View>
              
              <View>
                <Text className="text-gray-400 mb-2">Mileage (km)</Text>
                <TextInput
                  value={licence_plate === 'new' ? newCar.milage?.toString() || '' : car?.milage?.toString() || ''}
                  onChangeText={(text) => licence_plate === 'new' ? 
                    handleNewCarChange('milage', parseInt(text) || 0) : handleChange('milage', parseInt(text) || 0)}
                  keyboardType="numeric"
                  className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
                  placeholder="Enter mileage"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text className="text-gray-400 mb-2">Balance (KES)</Text>
                <TextInput
                  value={licence_plate === 'new' ? newCar.balance?.toString() || '' : car?.balance?.toString() || ''}
                  onChangeText={(text) => licence_plate === 'new' ? 
                    handleNewCarChange('balance', parseFloat(text) || 0) : handleChange('balance', parseFloat(text) || 0)}
                  keyboardType="numeric"
                  className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
                  placeholder="Enter balance"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text className="text-gray-400 mb-2">Status</Text>
                <View className="bg-white/10 rounded-lg px-4 py-3 border border-white/20">
                  <Text className="text-white">
                    {licence_plate === 'new' ? newCar.status : car?.status}
                  </Text>
                </View>
              </View>

              <View>
                <Text className="text-gray-400 mb-2 flex-row items-center">
                  <Calendar size={16} className="mr-2" />
                  Last Service Date
                </Text>
                <TextInput
                  value={licence_plate === 'new' ? newCar.last_service_date || '' : car?.last_service_date || ''}
                  onChangeText={(text) => licence_plate === 'new' ? 
                    handleNewCarChange('last_service_date', text) : handleChange('last_service_date', text)}
                  className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#6B7280"
                />
              </View>

              <View>
                <Text className="text-gray-400 mb-2 flex-row items-center">
                  <Wrench size={16} className="mr-2" />
                  Next Service Date
                </Text>
                <TextInput
                  value={licence_plate === 'new' ? newCar.next_service_date || '' : car?.next_service_date || ''}
                  onChangeText={(text) => licence_plate === 'new' ? 
                    handleNewCarChange('next_service_date', text) : handleChange('next_service_date', text)}
                  className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#6B7280"
                />
              </View>
            </View>
          </View>

          {/* Owner Information */}
          {client && !isMobile && (
            <View className="bg-white/5 rounded-2xl p-6 border border-white/10 flex-1">
              <Text className="text-white text-xl font-bold mb-6 flex-row items-center">
                <User className="mr-3" size={24} color="#10B981" />
                Owner Information
              </Text>
              
              <View className="space-y-4">
                <View className="flex-row items-center p-3 bg-white/5 rounded-lg">
                  <User size={20} color="#9ca3af" />
                  <Text className="text-gray-300 ml-3 text-lg">
                    {client.first_name} {client.last_name}
                  </Text>
                </View>
                
                {client.email && (
                  <View className="flex-row items-center p-3 bg-white/5 rounded-lg">
                    <Mail size={20} color="#9ca3af" />
                    <Text className="text-gray-300 ml-3 text-lg">{client.email}</Text>
                  </View>
                )}
                
                {client.phone_number && (
                  <View className="flex-row items-center p-3 bg-white/5 rounded-lg">
                    <Phone size={20} color="#9ca3af" />
                    <Text className="text-gray-300 ml-3 text-lg">{client.phone_number}</Text>
                  </View>
                )}
                
                {client.address && (
                  <View className="flex-row items-start p-3 bg-white/5 rounded-lg">
                    <MapPin size={20} color="#9ca3af" className="mt-1" />
                    <Text className="text-gray-300 ml-3 text-lg flex-1">{client.address}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Service History & Notes for Desktop */}
        {!isMobile && (
          <View className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
            <Text className="text-white text-xl font-bold mb-4">Service History & Notes</Text>
            <TextInput
              multiline
              className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 h-32"
              placeholder="Add service notes or maintenance history..."
              placeholderTextColor="#6B7280"
            />
          </View>
        )}
      </ScrollView>

      {/* Add Car Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-[#0A0F1E] rounded-2xl w-full max-w-2xl border border-white/20">
            <View className="p-6 border-b border-white/10">
              <Text className="text-white text-xl font-bold">Add New Car</Text>
              <Text className="text-gray-400">Register a new vehicle to the inventory</Text>
            </View>
            
            <ScrollView className="max-h-96 p-6">
              <View className="grid grid-cols-2 gap-4">
                {Object.entries(newCar).map(([key, value]) => (
                  <View key={key}>
                    <Text className="text-gray-400 mb-2 capitalize">
                      {key.replace('_', ' ')}
                    </Text>
                    <TextInput
                      value={value?.toString() || ''}
                      onChangeText={(text) => handleNewCarChange(key as keyof CarType, text)}
                      className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
                      placeholder={`Enter ${key.replace('_', ' ')}`}
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
            
            <View className="flex-row justify-end gap-3 p-6 border-t border-white/10">
              <TouchableOpacity 
                onPress={() => setShowAddModal(false)}
                className="px-6 py-3 rounded-lg border border-white/20"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleAddCar}
                disabled={saving}
                className="bg-blue-600 px-6 py-3 rounded-lg"
              >
                <Text className="text-white font-semibold">
                  {saving ? 'Adding...' : 'Add Car'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );

  return (
    <View className="flex-1 bg-[#0A0F1E]">
      {isMobile ? (
        <View className="flex-1 pt-14">
          {renderContent()}
        </View>
      ) : (
        <View className="flex-1">
          {renderContent()}
        </View>
      )}
    </View>
  );
}

