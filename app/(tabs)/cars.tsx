// import React, { useState, useEffect } from 'react'
// import { View, Text, TextInput, FlatList, Image, Pressable, Modal, TouchableOpacity, Alert } from 'react-native'
// import { BlurView } from 'expo-blur'
// import { Ionicons } from '@expo/vector-icons'
// import { apiService } from '../../backend/api'
// import { DollarSign, Car, Clock, Users, BarChart3, Bell, Settings, User, MapPin, Package, ClipboardList, Calendar, Plus, FileText, Activity, CheckCircle, AlertTriangle } from 'lucide-react'


// export default function CarsPage() {
//   const branchName = "Main Branch"
//   const [cars, setCars] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [q, setQ] = useState('')
//   const [selected, setSelected] = useState<string | null>(null)
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [newCar, setNewCar] = useState({ model: '', owner: '', work: '', image: '' })

//   // Load cars on component mount
//   useEffect(() => {
//     loadCars()
//   }, [])

//   const loadCars = async () => {
//     try {
//       setLoading(true)
//       const response = await apiService.cars.getAll()
//       setCars(response.data)
//     } catch (error) {
//       console.error('Error loading cars:', error)
//       Alert.alert('Error', 'Failed to load cars')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const toggleCarPaid = async (id: string) => {
//     try {
//       await apiService.cars.togglePaid(id)
//       // Reload cars to get updated data
//       await loadCars()
//     } catch (error) {
//       console.error('Error toggling paid status:', error)
//       Alert.alert('Error', 'Failed to update payment status')
//     }
//   }

//   const toggleCarWorking = async (id: string) => {
//     try {
//       await apiService.cars.toggleWorking(id)
//       // Reload cars to get updated data
//       await loadCars()
//     } catch (error) {
//       console.error('Error toggling working status:', error)
//       Alert.alert('Error', 'Failed to update working status')
//     }
//   }

//   const updateCar = async (id: string, carData: any) => {
//     try {
//       await apiService.cars.update(id, carData)
//       await loadCars()
//     } catch (error) {
//       console.error('Error updating car:', error)
//       Alert.alert('Error', 'Failed to update car')
//     }
//   }

//   const addCar = async (carData: any) => {
//     try {
//       await apiService.cars.create(carData)
//       await loadCars()
//     } catch (error) {
//       console.error('Error adding car:', error)
//       Alert.alert('Error', 'Failed to add car')
//     }
//   }

//   const filtered = cars.filter((c: any) => `${c.model} ${c.owner}`.toLowerCase().includes(q.toLowerCase()))
//   const current = cars.find((c: any) => c.id === selected)

//   const handleAddCar = async () => {
//     if (newCar.model && newCar.owner && newCar.work) {
//       try {
//         await addCar({
//           model: newCar.model,
//           owner: newCar.owner,
//           bookedAt: new Date().toISOString().split('T')[0],
//           work: newCar.work,
//           paid: false,
//           working: false,
//           image: newCar.image || 'https://i.imgur.com/default-car.png'
//         })
//         setNewCar({ model: '', owner: '', work: '', image: '' })
//         setShowAddModal(false)
//       } catch (error) {
//         console.error('Error adding car:', error)
//       }
//     } else {
//       Alert.alert('Error', 'Please fill in all required fields')
//     }
//   }

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       <View className="flex-row justify-between items-center px-4 mb-3">
//         <Text className="text-white text-2xl font-bold">Cars</Text>
//          <View className="flex-row items-center space-x-6">
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
//           <Ionicons name="add" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <View className="px-4 mb-3 flex-row items-center bg-white/10 rounded-xl px-3 py-2">
//         <Ionicons name="search" size={18} color="white" />
//         <TextInput value={q} onChangeText={setQ} placeholder="Search cars or owners" placeholderTextColor="#9ca3af" className="flex-1 text-white ml-2" />
//         <Ionicons name="calendar" size={18} color="white" />
//       </View>

//       {loading ? (
//         <View className="flex-1 items-center justify-center">
//           <Ionicons name="car" size={50} color="#ef4444" />
//           <Text className="text-white mt-4">Loading cars...</Text>
//         </View>
//       ) : (
//         <FlatList
//           contentContainerStyle={{ padding: 16 }}
//           data={filtered}
//           keyExtractor={(i: any)=>i.id}
//           ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
//         renderItem={({ item }) => (
//           <BlurView intensity={50} tint="dark" className="rounded-2xl overflow-hidden">
//             <View className="flex-row p-4 gap-3 items-center">
//               <Image source={{ uri: item.image }} style={{ width: 72, height: 72, borderRadius: 12 }} />
//               <View className="flex-1">
//                 <Text className="text-white font-bold text-lg">{item.model}</Text>
//                 <Text className="text-gray-300 text-xs">Owner: {item.owner}</Text>
//                 <Text className="text-gray-400 text-xs">Booked: {item.bookedAt}</Text>
//                 <Text className="text-gray-400 text-xs">Work: {item.work}</Text>
//                 <View className="flex-row items-center mt-1 gap-2">
//                   <Pressable onPress={()=>toggleCarWorking(item.id)} className={`px-3 py-1 rounded-lg ${item.working ? 'bg-green-600' : 'bg-gray-600'}`}>
//                     <Text className="text-white text-xs">{item.working ? 'Working' : 'Not Working'}</Text>
//                   </Pressable>
//                   <Pressable onPress={()=>toggleCarPaid(item.id)} className={`px-3 py-1 rounded-lg ${item.paid ? 'bg-green-600' : 'bg-red-600'}`}>
//                     <Text className="text-white text-xs">{item.paid ? 'Paid' : 'Not Paid'}</Text>
//                   </Pressable>
//                 </View>
//               </View>
//               <Pressable onPress={() => setSelected(item.id)} className="bg-white/10 h-10 w-10 rounded-xl items-center justify-center">
//                 <Ionicons name="pencil" size={18} color="white" />
//               </Pressable>
//             </View>
//           </BlurView>
//         )}
//         />
//       )}

//       {/* Edit Modal */}
//       <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
//         <View className="flex-1 bg-black/70 justify-center items-center px-4">
//           <BlurView intensity={70} tint="dark" className="w-full rounded-2xl p-5">
//             <Text className="text-white text-xl font-bold mb-3">Edit Car</Text>
//             {current && (
//               <>
//                 <TextInput defaultValue={current.model} placeholder="Model" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateCar(current.id, { model: v })} />
//                 <TextInput defaultValue={current.owner} placeholder="Owner" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateCar(current.id, { owner: v })} />
//                 <TextInput defaultValue={current.work} placeholder="Work" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateCar(current.id, { work: v })} />
//                 <TextInput defaultValue={current.image} placeholder="Image URL" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateCar(current.id, { image: v })} />
//                 <View className="flex-row gap-3 mt-2">
//                   <TouchableOpacity onPress={async () => { if(current){ await updateCar(current.id, current) }; setSelected(null) }} className="flex-1 bg-red-600 py-3 rounded-xl"><Text className="text-white text-center font-semibold">Save</Text></TouchableOpacity>
//                   <TouchableOpacity onPress={() => setSelected(null)} className="flex-1 bg-white/10 py-3 rounded-xl"><Text className="text-white text-center">Cancel</Text></TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </BlurView>
//         </View>
//       </Modal>

//       {/* Add Car Modal */}
//       <Modal visible={showAddModal} animationType="slide" transparent onRequestClose={() => setShowAddModal(false)}>
//         <View className="flex-1 bg-black/70 justify-center items-center px-4">
//           <BlurView intensity={70} tint="dark" className="w-full rounded-2xl p-5">
//             <Text className="text-white text-xl font-bold mb-3">Add Car</Text>
//             <TextInput placeholder="Model" placeholderTextColor="#9ca3af" value={newCar.model} onChangeText={(v) => setNewCar({...newCar, model: v})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
//             <TextInput placeholder="Owner" placeholderTextColor="#9ca3af" value={newCar.owner} onChangeText={(v) => setNewCar({...newCar, owner: v})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
//             <TextInput placeholder="Work" placeholderTextColor="#9ca3af" value={newCar.work} onChangeText={(v) => setNewCar({...newCar, work: v})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
//             <TextInput placeholder="Image URL (optional)" placeholderTextColor="#9ca3af" value={newCar.image} onChangeText={(v) => setNewCar({...newCar, image: v})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
//             <View className="flex-row gap-3 mt-2">
//               <TouchableOpacity onPress={handleAddCar} className="flex-1 bg-red-600 py-3 rounded-xl"><Text className="text-white text-center font-semibold">Add</Text></TouchableOpacity>
//               <TouchableOpacity onPress={() => setShowAddModal(false)} className="flex-1 bg-white/10 py-3 rounded-xl"><Text className="text-white text-center">Cancel</Text></TouchableOpacity>
//             </View>
//           </BlurView>
//         </View>
//       </Modal>
//     </View>
//   )
// }
// app/carEditing.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Mail, MapPin, Phone, Save, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchCarByLicencePlate, fetchClientById, updateCar } from '../../lib/pages/useInventoryData';
import { Car as CarType, Client } from '../../lib/types';

export default function CarEditingPage() {
  const { licence_plate, client_id, client_email } = useLocalSearchParams();
  const [car, setCar] = useState<CarType | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (licence_plate) {
      loadCarData();
    }
  }, [licence_plate]);

  const loadCarData = async (): Promise<void> => {
    try {
      setLoading(true);
      const carResponse = await fetchCarByLicencePlate(licence_plate as string);
      if (carResponse.success && carResponse.data) {
        setCar(carResponse.data);
        
        // Try to load client data if we have client_id
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

  const handleChange = (field: keyof CarType, value: string | number): void => {
    if (car) {
      setCar({ ...car, [field]: value });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!car) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <Text className="text-white">Car not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Edit Car Details</Text>
        <TouchableOpacity onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator size="small" color="#3B82F6" />
          ) : (
            <Save size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="px-6">
        {/* Car Details */}
        <View className="mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Car Information</Text>
          
          <View className="mb-4">
            <Text className="text-gray-400 mb-2">Make</Text>
            <TextInput
              value={car.make || ''}
              onChangeText={(text) => handleChange('make', text)}
              className="bg-white/10 text-white rounded-lg px-4 py-3"
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-400 mb-2">Model</Text>
            <TextInput
              value={car.model || ''}
              onChangeText={(text) => handleChange('model', text)}
              className="bg-white/10 text-white rounded-lg px-4 py-3"
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-400 mb-2">License Plate</Text>
            <Text className="text-white text-lg">{car.licence_plate}</Text>
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-400 mb-2">Mileage</Text>
            <TextInput
              value={car.milage ? car.milage.toString() : ''}
              onChangeText={(text) => handleChange('milage', parseInt(text) || 0)}
              keyboardType="numeric"
              className="bg-white/10 text-white rounded-lg px-4 py-3"
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-gray-400 mb-2">Balance</Text>
            <TextInput
              value={car.balance ? car.balance.toString() : ''}
              onChangeText={(text) => handleChange('balance', parseFloat(text) || 0)}
              keyboardType="numeric"
              className="bg-white/10 text-white rounded-lg px-4 py-3"
            />
          </View>
        </View>

        {/* Owner Information */}
        {client && (
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-4">Owner Information</Text>
            
            <View className="flex-row items-center mb-3">
              <User size={16} color="#9ca3af" />
              <Text className="text-gray-300 ml-2">
                {client.first_name} {client.last_name}
              </Text>
            </View>
            
            {client.email && (
              <View className="flex-row items-center mb-3">
                <Mail size={16} color="#9ca3af" />
                <Text className="text-gray-300 ml-2">{client.email}</Text>
              </View>
            )}
            
            {client.phone_number && (
              <View className="flex-row items-center mb-3">
                <Phone size={16} color="#9ca3af" />
                <Text className="text-gray-300 ml-2">{client.phone_number}</Text>
              </View>
            )}
            
            {client.address && (
              <View className="flex-row items-start mb-3">
                <MapPin size={16} color="#9ca3af" className="mt-1" />
                <Text className="text-gray-300 ml-2 flex-1">{client.address}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}