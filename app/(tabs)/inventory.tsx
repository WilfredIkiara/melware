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
import { useRouter } from 'expo-router';
import { Bell, Car, MapPin, Package, Search, Settings, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchAllCars, fetchAllGarageInventory } from '../../lib/pages/useInventoryData';
import { Car as CarType, InventoryItem as InventoryItemType } from '../../lib/types';

type TabType = 'cars' | 'inventory';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('cars');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cars, setCars] = useState<CarType[]>([]);
  const [inventory, setInventory] = useState<InventoryItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async (): Promise<void> => {
    try {
      setLoading(true);
      if (activeTab === 'cars') {
        const response = await fetchAllCars();
        if (response.success && response.data) {
          setCars(response.data);
        }
      } else {
        const response = await fetchAllGarageInventory();
        if (response.success && response.data) {
          setInventory(response.data);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter((car: CarType) =>
    car.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.licence_plate?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInventory = inventory.filter((item: InventoryItemType) =>
    item.item_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.item_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCarPress = (car: CarType): void => {
    router.push({
      pathname: '/cars',
      params: { 
        licence_plate: car.licence_plate,
        client_id: car.client_id || '',
        client_email: car.client_email || ''
      }
    });
  };

  const handleInventoryPress = (item: InventoryItemType): void => {
    router.push({
      pathname: '/garage',
      params: { item_code: item.item_code }
    });
  };

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 mb-4">
        <Text className="text-white text-xl font-bold">Inventory Management</Text>
        <View className="flex-row items-center space-x-6">
          <TouchableOpacity>
            <Bell size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
            <MapPin size={16} color="green" />
            <Text className="text-white">Main Branch</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 mb-4">
        <TouchableOpacity 
          className={`flex-1 py-3 rounded-l-lg ${activeTab === 'cars' ? 'bg-blue-600' : 'bg-white/10'}`}
          onPress={() => setActiveTab('cars')}
        >
          <Text className="text-white text-center font-semibold">Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-3 rounded-r-lg ${activeTab === 'inventory' ? 'bg-blue-600' : 'bg-white/10'}`}
          onPress={() => setActiveTab('inventory')}
        >
          <Text className="text-white text-center font-semibold">Garage Inventory</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
          <Search size={20} color="white" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search ${activeTab === 'cars' ? 'cars' : 'inventory'}...`}
            placeholderTextColor="#9ca3af"
            className="flex-1 text-white ml-3"
          />
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          {activeTab === 'cars' ? (
            <>
              {filteredCars.length === 0 ? (
                <View className="items-center py-8">
                  <Car size={48} color="#9ca3af" />
                  <Text className="text-gray-400 text-lg mt-4">No cars found</Text>
                </View>
              ) : (
                filteredCars.map((car: CarType) => (
                  <TouchableOpacity
                    key={car.licence_plate}
                    onPress={() => handleCarPress(car)}
                    className="bg-white/10 rounded-2xl p-4"
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-white text-lg font-semibold">
                        {car.make} {car.model}
                      </Text>
                      <Text className="text-gray-400 text-sm">{car.licence_plate}</Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                      <Text className="text-gray-300 text-sm">Mileage: {car.milage || 0} km</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <User size={14} color="#9ca3af" />
                        <Text className="text-gray-300 text-sm ml-1">
                          {car.client_email || 'No owner'}
                        </Text>
                      </View>
                      <Text className="text-white font-bold">KES {car.balance || 0}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </>
          ) : (
            <>
              {filteredInventory.length === 0 ? (
                <View className="items-center py-8">
                  <Package size={48} color="#9ca3af" />
                  <Text className="text-gray-400 text-lg mt-4">No inventory items found</Text>
                </View>
              ) : (
                filteredInventory.map((item: InventoryItemType) => (
                  <TouchableOpacity
                    key={item.item_code}
                    onPress={() => handleInventoryPress(item)}
                    className={`bg-white/10 rounded-2xl p-4 ${(item.current_stock || 0) < 5 ? 'border-2 border-red-500' : ''}`}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-white text-lg font-semibold">{item.item_name}</Text>
                      <Text className="text-gray-400 text-sm">{item.item_code}</Text>
                    </View>
                    <Text className="text-gray-300 text-sm mb-2">{item.category}</Text>
                    <View className="flex-row items-center justify-between">
                      <Text className={`text-sm font-bold ${(item.current_stock || 0) < 5 ? 'text-red-400' : 'text-green-400'}`}>
                        Stock: {item.current_stock}
                      </Text>
                      <Text className="text-gray-300 text-sm">{item.supplier_name}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className="text-gray-300 text-sm">
                        Cost: KES {item.purchase_price} | Sell: KES {item.selling_price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}