
// // import { useRouter } from 'expo-router';
// // import { Bell, Car, MapPin, Package, Search, Settings, User } from 'lucide-react';
// // import React, { useEffect, useState } from 'react';
// // import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // import { fetchAllCars, fetchAllGarageInventory } from '../../lib/pages/useInventoryData';
// // import { Car as CarType, InventoryItem as InventoryItemType } from '../../lib/types';

// // type TabType = 'cars' | 'inventory';

// // export default function InventoryPage() {
// //   const [activeTab, setActiveTab] = useState<TabType>('cars');
// //   const [searchQuery, setSearchQuery] = useState<string>('');
// //   const [cars, setCars] = useState<CarType[]>([]);
// //   const [inventory, setInventory] = useState<InventoryItemType[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const router = useRouter();

// //   useEffect(() => {
// //     loadData();
// //   }, [activeTab]);

// //   const loadData = async (): Promise<void> => {
// //     try {
// //       setLoading(true);
// //       if (activeTab === 'cars') {
// //         const response = await fetchAllCars();
// //         if (response.success && response.data) {
// //           setCars(response.data);
// //         }
// //       } else {
// //         const response = await fetchAllGarageInventory();
// //         if (response.success && response.data) {
// //           setInventory(response.data);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error loading data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredCars = cars.filter((car: CarType) =>
// //     car.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     car.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     car.licence_plate?.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const filteredInventory = inventory.filter((item: InventoryItemType) =>
// //     item.item_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     item.item_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     item.category?.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const handleCarPress = (car: CarType): void => {
// //     router.push({
// //       pathname: '/cars',
// //       params: { 
// //         licence_plate: car.licence_plate,
// //         client_id: car.client_id || '',
// //         client_email: car.client_email || ''
// //       }
// //     });
// //   };

// //   const handleInventoryPress = (item: InventoryItemType): void => {
// //     router.push({
// //       pathname: '/garage',
// //       params: { item_code: item.item_code }
// //     });
// //   };

// //   return (
// //     <View className="flex-1 bg-[#0A0F1E] pt-14">
// //       {/* Header */}
// //       <View className="flex-row items-center justify-between px-6 mb-4">
// //         <Text className="text-white text-xl font-bold">Inventory Management</Text>
// //         <View className="flex-row items-center space-x-6">
// //           <TouchableOpacity>
// //             <Bell size={24} color="red" />
// //           </TouchableOpacity>
// //           <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
// //             <MapPin size={16} color="green" />
// //             <Text className="text-white">Main Branch</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity>
// //             <Settings size={24} color="white" />
// //           </TouchableOpacity>
// //         </View>
// //       </View>

// //       {/* Tabs */}
// //       <View className="flex-row px-6 mb-4">
// //         <TouchableOpacity 
// //           className={`flex-1 py-3 rounded-l-lg ${activeTab === 'cars' ? 'bg-blue-600' : 'bg-white/10'}`}
// //           onPress={() => setActiveTab('cars')}
// //         >
// //           <Text className="text-white text-center font-semibold">Cars</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity 
// //           className={`flex-1 py-3 rounded-r-lg ${activeTab === 'inventory' ? 'bg-blue-600' : 'bg-white/10'}`}
// //           onPress={() => setActiveTab('inventory')}
// //         >
// //           <Text className="text-white text-center font-semibold">Garage Inventory</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Search Bar */}
// //       <View className="px-6 mb-4">
// //         <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3">
// //           <Search size={20} color="white" />
// //           <TextInput
// //             value={searchQuery}
// //             onChangeText={setSearchQuery}
// //             placeholder={`Search ${activeTab === 'cars' ? 'cars' : 'inventory'}...`}
// //             placeholderTextColor="#9ca3af"
// //             className="flex-1 text-white ml-3"
// //           />
// //         </View>
// //       </View>

// //       {loading ? (
// //         <View className="flex-1 justify-center items-center">
// //           <ActivityIndicator size="large" color="#3B82F6" />
// //         </View>
// //       ) : (
// //         <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
// //           {activeTab === 'cars' ? (
// //             <>
// //               {filteredCars.length === 0 ? (
// //                 <View className="items-center py-8">
// //                   <Car size={48} color="#9ca3af" />
// //                   <Text className="text-gray-400 text-lg mt-4">No cars found</Text>
// //                 </View>
// //               ) : (
// //                 filteredCars.map((car: CarType) => (
// //                   <TouchableOpacity
// //                     key={car.licence_plate}
// //                     onPress={() => handleCarPress(car)}
// //                     className="bg-white/10 rounded-2xl p-4"
// //                   >
// //                     <View className="flex-row items-center justify-between mb-2">
// //                       <Text className="text-white text-lg font-semibold">
// //                         {car.make} {car.model}
// //                       </Text>
// //                       <Text className="text-gray-400 text-sm">{car.licence_plate}</Text>
// //                     </View>
// //                     <View className="flex-row items-center mb-2">
// //                       <Text className="text-gray-300 text-sm">Mileage: {car.milage || 0} km</Text>
// //                     </View>
// //                     <View className="flex-row items-center justify-between">
// //                       <View className="flex-row items-center">
// //                         <User size={14} color="#9ca3af" />
// //                         <Text className="text-gray-300 text-sm ml-1">
// //                           {car.client_email || 'No owner'}
// //                         </Text>
// //                       </View>
// //                       <Text className="text-white font-bold">KES {car.balance || 0}</Text>
// //                     </View>
// //                   </TouchableOpacity>
// //                 ))
// //               )}
// //             </>
// //           ) : (
// //             <>
// //               {filteredInventory.length === 0 ? (
// //                 <View className="items-center py-8">
// //                   <Package size={48} color="#9ca3af" />
// //                   <Text className="text-gray-400 text-lg mt-4">No inventory items found</Text>
// //                 </View>
// //               ) : (
// //                 filteredInventory.map((item: InventoryItemType) => (
// //                   <TouchableOpacity
// //                     key={item.item_code}
// //                     onPress={() => handleInventoryPress(item)}
// //                     className={`bg-white/10 rounded-2xl p-4 ${(item.current_stock || 0) < 5 ? 'border-2 border-red-500' : ''}`}
// //                   >
// //                     <View className="flex-row items-center justify-between mb-2">
// //                       <Text className="text-white text-lg font-semibold">{item.item_name}</Text>
// //                       <Text className="text-gray-400 text-sm">{item.item_code}</Text>
// //                     </View>
// //                     <Text className="text-gray-300 text-sm mb-2">{item.category}</Text>
// //                     <View className="flex-row items-center justify-between">
// //                       <Text className={`text-sm font-bold ${(item.current_stock || 0) < 5 ? 'text-red-400' : 'text-green-400'}`}>
// //                         Stock: {item.current_stock}
// //                       </Text>
// //                       <Text className="text-gray-300 text-sm">{item.supplier_name}</Text>
// //                     </View>
// //                     <View className="flex-row items-center justify-between mt-2">
// //                       <Text className="text-gray-300 text-sm">
// //                         Cost: KES {item.purchase_price} | Sell: KES {item.selling_price}
// //                       </Text>
// //                     </View>
// //                   </TouchableOpacity>
// //                 ))
// //               )}
// //             </>
// //           )}
// //         </ScrollView>
// //       )}
// //     </View>
// //   );
// // }

// import { useRouter } from 'expo-router';
// import { Bell, Car, Filter, Package, Search, Settings, User } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Animated, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { fetchAllCars, fetchAllGarageInventory } from '../../lib/pages/useInventoryData';
// import { Car as CarType, InventoryItem as InventoryItemType } from '../../lib/types';

// type TabType = 'cars' | 'inventory';
// type LocationType = 'garage' | 'caryard';

// export default function InventoryPage() {
//   const [activeTab, setActiveTab] = useState<TabType>('cars');
//   const [activeLocation, setActiveLocation] = useState<LocationType>('garage');
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [cars, setCars] = useState<CarType[]>([]);
//   const [inventory, setInventory] = useState<InventoryItemType[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const router = useRouter();

//   useEffect(() => {
//     loadData();
//   }, [activeTab, activeLocation]);

//   const loadData = async (isRefresh = false): Promise<void> => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }
      
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();

//       if (activeTab === 'cars') {
//         const response = await fetchAllCars(activeLocation);
//         if (response.success && response.data) {
//           setCars(response.data);
//         }
//       } else {
//         const response = await fetchAllGarageInventory(activeLocation);
//         if (response.success && response.data) {
//           setInventory(response.data);
//         }
//       }

//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } catch (error) {
//       console.error('Error loading data:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleRefresh = () => {
//     loadData(true);
//   };

//   const filteredCars = cars.filter((car: CarType) =>
//     car.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     car.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     car.licence_plate?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const filteredInventory = inventory.filter((item: InventoryItemType) =>
//     item.item_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.item_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.category?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCarPress = (car: CarType): void => {
//     router.push({
//       pathname: '/cars',
//       params: { 
//         licence_plate: car.licence_plate,
//         client_id: car.client_id || '',
//         client_email: car.client_email || '',
//         location: activeLocation
//       }
//     });
//   };

//   const handleInventoryPress = (item: InventoryItemType): void => {
//     router.push({
//       pathname: '/garage',
//       params: { 
//         item_code: item.item_code,
//         location: activeLocation
//       }
//     });
//   };

//   const getStats = () => {
//     if (activeTab === 'cars') {
//       const total = filteredCars.length;
//       const available = filteredCars.filter(car => car.status === 'available').length;
//       const inService = filteredCars.filter(car => car.status === 'in_service').length;
//       return { total, available, inService };
//     } else {
//       const total = filteredInventory.length;
//       const lowStock = filteredInventory.filter(item => (item.current_stock || 0) < 5).length;
//       const outOfStock = filteredInventory.filter(item => (item.current_stock || 0) === 0).length;
//       return { total, lowStock, outOfStock };
//     }
//   };

//   const stats = getStats();

//   return (
//     <View className="flex-1 bg-[#0A0F1E] pt-14">
//       {/* Header */}
//       <View className="px-6 mb-4">
//         <View className="flex-row items-center justify-between mb-4">
//           <View>
//             <Text className="text-white text-2xl font-bold">Inventory Management</Text>
//             <Text className="text-gray-400 text-sm">Managing {activeLocation} operations</Text>
//           </View>
//           <View className="flex-row items-center space-x-3">
//             <TouchableOpacity className="relative p-2">
//               <Bell size={22} color="white" />
//               <View className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2" />
//             </TouchableOpacity>
//             <TouchableOpacity className="p-2">
//               <Settings size={22} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Location Switch */}
//         {/* <View className="flex-row items-center justify-between mb-4">
//           <View className="flex-row bg-white/10 rounded-xl p-1 flex-1 mr-3">
//             <TouchableOpacity 
//               className={`flex-row items-center justify-center flex-1 py-2 rounded-lg ${
//                 activeLocation === 'garage' ? 'bg-blue-600 shadow' : 'bg-transparent'
//               }`}
//               onPress={() => setActiveLocation('garage')}
//             >
//               <Warehouse size={16} color="white" />
//               <Text className="text-white ml-2 font-medium text-sm">Garage</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               className={`flex-row items-center justify-center flex-1 py-2 rounded-lg ${
//                 activeLocation === 'caryard' ? 'bg-blue-600 shadow' : 'bg-transparent'
//               }`}
//               onPress={() => setActiveLocation('caryard')}
//             >
//               <Home size={16} color="white" />
//               <Text className="text-white ml-2 font-medium text-sm">Caryard</Text>
//             </TouchableOpacity>
//           </View>
          
//           <TouchableOpacity className="flex-row items-center bg-white/10 rounded-xl px-3 py-2">
//             <MapPin size={14} color="#10B981" />
//             <Text className="text-white ml-2 text-sm capitalize">{activeLocation}</Text>
//           </TouchableOpacity>
//         </View> */}
//       </View>

//       {/* Stats Overview */}
//       <View className="px-6 mb-4">
//         <View className="flex-row space-x-3">
//           <View className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
//             <Text className="text-gray-400 text-xs">Total</Text>
//             <Text className="text-white text-lg font-bold">{stats.total}</Text>
//           </View>
//           <View className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
//             <Text className="text-gray-400 text-xs">
//               {activeTab === 'cars' ? 'Available' : 'Low Stock'}
//             </Text>
//             <Text className={`text-lg font-bold ${
//               activeTab === 'cars' ? 'text-green-400' : 'text-yellow-400'
//             }`}>
//               {activeTab === 'cars' ? stats.available : stats.lowStock}
//             </Text>
//           </View>
//           <View className="flex-1 bg-white/5 rounded-xl p-3 border border-white/10">
//             <Text className="text-gray-400 text-xs">
//               {activeTab === 'cars' ? 'In Service' : 'Out of Stock'}
//             </Text>
//             <Text className={`text-lg font-bold ${
//               activeTab === 'cars' ? 'text-blue-400' : 'text-red-400'
//             }`}>
//               {activeTab === 'cars' ? stats.inService : stats.outOfStock}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Tabs */}
//       <View className="flex-row px-6 mb-4">
//         <TouchableOpacity 
//           className={`flex-row items-center justify-center flex-1 py-3 rounded-l-xl ${
//             activeTab === 'cars' ? 'bg-blue-600' : 'bg-white/10'
//           }`}
//           onPress={() => setActiveTab('cars')}
//         >
//           <Car size={18} color="white" />
//           <Text className="text-white ml-2 font-semibold">
//             Cars ({cars.length})
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           className={`flex-row items-center justify-center flex-1 py-3 rounded-r-xl ${
//             activeTab === 'inventory' ? 'bg-blue-600' : 'bg-white/10'
//           }`}
//           onPress={() => setActiveTab('inventory')}
//         >
//           <Package size={18} color="white" />
//           <Text className="text-white ml-2 font-semibold">
//             Inventory ({inventory.length})
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       <View className="px-6 mb-4">
//         <View className="flex-row items-center bg-white/10 rounded-xl px-4 py-3 border border-white/20">
//           <Search size={20} color="#9CA3AF" />
//           <TextInput
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholder={`Search ${activeTab === 'cars' ? 'cars by model, make, plate...' : 'inventory by name, code, category...'}`}
//             placeholderTextColor="#6B7280"
//             className="flex-1 text-white ml-3 text-base"
//             clearButtonMode="while-editing"
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Text className="text-gray-400 text-sm">Clear</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {loading ? (
//         <View className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#3B82F6" />
//           <Text className="text-white mt-3">Loading {activeLocation} data...</Text>
//         </View>
//       ) : (
//         <Animated.ScrollView 
//           style={{ opacity: fadeAnim }}
//           contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <ScrollView refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#3B82F6" />
//             } />
//           }
//         >
//           {/* Results Count */}
//           <View className="flex-row justify-between items-center mb-3">
//             <Text className="text-gray-400 text-sm">
//               Showing {activeTab === 'cars' ? filteredCars.length : filteredInventory.length} items
//             </Text>
//             <TouchableOpacity className="flex-row items-center">
//               <Filter size={14} color="#9CA3AF" />
//               <Text className="text-gray-400 text-sm ml-1">Filter</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Content */}
//           <View className="space-y-3">
//             {activeTab === 'cars' ? (
//               filteredCars.length === 0 ? (
//                 <View className="items-center justify-center py-16">
//                   <Car size={64} color="#4B5563" />
//                   <Text className="text-gray-400 text-lg mt-4 font-medium">
//                     {searchQuery ? 'No matching cars found' : `No cars in ${activeLocation}`}
//                   </Text>
//                   <Text className="text-gray-500 text-sm mt-1">
//                     {searchQuery ? 'Try adjusting your search terms' : 'Add cars to get started'}
//                   </Text>
//                 </View>
//               ) : (
//                 filteredCars.map((car: CarType) => (
//                   <TouchableOpacity
//                     key={car.licence_plate}
//                     onPress={() => handleCarPress(car)}
//                     className="bg-white/5 rounded-2xl p-4 border border-white/10 active:bg-white/10"
//                   >
//                     <View className="flex-row items-center justify-between mb-3">
//                       <Text className="text-white text-lg font-bold flex-1">
//                         {car.make} {car.model}
//                       </Text>
//                       <View className="bg-blue-500/20 rounded-full px-3 py-1">
//                         <Text className="text-blue-400 text-xs font-medium">{car.licence_plate}</Text>
//                       </View>
//                     </View>
                    
//                     <View className="flex-row items-center justify-between mb-2">
//                       <Text className="text-gray-300 text-sm">
//                         Mileage: {(car.milage || 0).toLocaleString()} km
//                       </Text>
//                       <View className={`px-2 py-1 rounded-full ${
//                         car.status === 'available' ? 'bg-green-500/20' : 
//                         car.status === 'in_service' ? 'bg-yellow-500/20' : 'bg-gray-500/20'
//                       }`}>
//                         <Text className={`text-xs font-medium ${
//                           car.status === 'available' ? 'text-green-400' : 
//                           car.status === 'in_service' ? 'text-yellow-400' : 'text-gray-400'
//                         }`}>
//                           {car.status?.replace('_', ' ') || 'Unknown'}
//                         </Text>
//                       </View>
//                     </View>
                    
//                     <View className="flex-row items-center justify-between">
//                       <View className="flex-row items-center flex-1">
//                         <User size={14} color="#9CA3AF" />
//                         <Text className="text-gray-300 text-sm ml-2 truncate">
//                           {car.client_email || 'No owner assigned'}
//                         </Text>
//                       </View>
//                       <Text className="text-white font-bold text-lg">
//                         KES {(car.balance || 0).toLocaleString()}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))
//               )
//             ) : (
//               filteredInventory.length === 0 ? (
//                 <View className="items-center justify-center py-16">
//                   <Package size={64} color="#4B5563" />
//                   <Text className="text-gray-400 text-lg mt-4 font-medium">
//                     {searchQuery ? 'No matching items found' : `No inventory in ${activeLocation}`}
//                   </Text>
//                   <Text className="text-gray-500 text-sm mt-1">
//                     {searchQuery ? 'Try adjusting your search terms' : 'Add inventory items to get started'}
//                   </Text>
//                 </View>
//               ) : (
//                 filteredInventory.map((item: InventoryItemType) => (
//                   <TouchableOpacity
//                     key={item.item_code}
//                     onPress={() => handleInventoryPress(item)}
//                     className={`bg-white/5 rounded-2xl p-4 border ${
//                       (item.current_stock || 0) < 5 ? 'border-red-500/30' : 'border-white/10'
//                     } active:bg-white/10`}
//                   >
//                     <View className="flex-row items-center justify-between mb-3">
//                       <Text className="text-white text-lg font-bold flex-1 mr-2">{item.item_name}</Text>
//                       <View className="bg-purple-500/20 rounded-full px-3 py-1">
//                         <Text className="text-purple-400 text-xs font-medium">{item.item_code}</Text>
//                       </View>
//                     </View>
                    
//                     <Text className="text-gray-300 text-sm mb-3 capitalize">{item.category}</Text>
                    
//                     <View className="flex-row items-center justify-between mb-2">
//                       <View className={`px-3 py-1 rounded-full ${
//                         (item.current_stock || 0) === 0 ? 'bg-red-500/20' :
//                         (item.current_stock || 0) < 5 ? 'bg-yellow-500/20' : 'bg-green-500/20'
//                       }`}>
//                         <Text className={`text-sm font-bold ${
//                           (item.current_stock || 0) === 0 ? 'text-red-400' :
//                           (item.current_stock || 0) < 5 ? 'text-yellow-400' : 'text-green-400'
//                         }`}>
//                           Stock: {item.current_stock}
//                         </Text>
//                       </View>
//                       <Text className="text-gray-300 text-sm">{item.supplier_name}</Text>
//                     </View>
                    
//                     <View className="flex-row items-center justify-between">
//                       <Text className="text-gray-300 text-sm">
//                         Cost: <Text className="text-red-400">KES {(item.purchase_price || 0).toLocaleString()}</Text>
//                       </Text>
//                       <Text className="text-gray-300 text-sm">
//                         Sell: <Text className="text-green-400">KES {(item.selling_price || 0).toLocaleString()}</Text>
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))
//               )
//             )}
//           </View>
//         </Animated.ScrollView>
//       )}
//     </View>
//   );
// }


import { useRouter } from 'expo-router';
import { Bell, Car, Filter, Package, Search, Settings, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { fetchAllCars, fetchAllGarageInventory } from '../../lib/pages/useInventoryData';
import { Car as CarType, InventoryItem as InventoryItemType } from '../../lib/types';

type TabType = 'cars' | 'inventory';
type LocationType = 'garage' | 'caryard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('cars');
  const [activeLocation, setActiveLocation] = useState<LocationType>('garage');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cars, setCars] = useState<CarType[]>([]);
  const [inventory, setInventory] = useState<InventoryItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();
  
  const { width, height } = useWindowDimensions();
  
  // Responsive sizing based on screen dimensions
  const isSmallScreen = width < 375; // iPhone SE, small Android devices
  const isMediumScreen = width >= 375 && width < 414; // iPhone 12/13, etc.
  const isLargeScreen = width >= 414; // iPhone Plus, Android tablets
  const isTablet = width >= 768; // iPad, larger tablets
  
  // Responsive font sizes
  const titleSize = isSmallScreen ? 18 : isMediumScreen ? 20 : isTablet ? 24 : 22;
  const bodySize = isSmallScreen ? 14 : isMediumScreen ? 15 : isTablet ? 18 : 16;
  const smallSize = isSmallScreen ? 12 : isMediumScreen ? 13 : isTablet ? 15 : 14;
  
  // Responsive spacing
  const containerPadding = isSmallScreen ? 12 : isMediumScreen ? 16 : isTablet ? 24 : 20;
  const itemSpacing = isSmallScreen ? 8 : isMediumScreen ? 12 : isTablet ? 16 : 14;
  const sectionSpacing = isSmallScreen ? 12 : isMediumScreen ? 16 : isTablet ? 20 : 18;
  
  // Responsive icon sizes
  const iconSize = isSmallScreen ? 16 : isMediumScreen ? 18 : isTablet ? 22 : 20;
  const headerIconSize = isSmallScreen ? 20 : isMediumScreen ? 22 : isTablet ? 26 : 24;
  
  // Responsive component heights
  const headerHeight = isSmallScreen ? 50 : isMediumScreen ? 55 : isTablet ? 70 : 60;
  const tabHeight = isSmallScreen ? 40 : isMediumScreen ? 45 : isTablet ? 55 : 50;
  const searchHeight = isSmallScreen ? 45 : isMediumScreen ? 48 : isTablet ? 55 : 50;
  const cardHeight = isSmallScreen ? 90 : isMediumScreen ? 100 : isTablet ? 130 : 110;

  useEffect(() => {
    loadData();
  }, [activeTab, activeLocation]);

  const loadData = async (isRefresh = false): Promise<void> => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (activeTab === 'cars') {
        const response = await fetchAllCars(activeLocation);
        if (response.success && response.data) {
          setCars(response.data);
        }
      } else {
        const response = await fetchAllGarageInventory(activeLocation);
        if (response.success && response.data) {
          setInventory(response.data);
        }
      }

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadData(true);
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
        client_email: car.client_email || '',
        location: activeLocation
      }
    });
  };

  const handleInventoryPress = (item: InventoryItemType): void => {
    router.push({
      pathname: '/garage',
      params: { 
        item_code: item.item_code,
        location: activeLocation
      }
    });
  };

  const getStats = () => {
    if (activeTab === 'cars') {
      const total = filteredCars.length;
      const available = filteredCars.filter(car => car.status === 'available').length;
      const inService = filteredCars.filter(car => car.status === 'in_service').length;
      return { total, available, inService };
    } else {
      const total = filteredInventory.length;
      const lowStock = filteredInventory.filter(item => (item.current_stock || 0) < 5).length;
      const outOfStock = filteredInventory.filter(item => (item.current_stock || 0) === 0).length;
      return { total, lowStock, outOfStock };
    }
  };

  const stats = getStats();

  return (
    <View className="flex-1 bg-[#0A0F1E]" style={{ paddingTop: headerHeight }}>
      {/* Header */}
      <View style={{ paddingHorizontal: containerPadding, marginBottom: sectionSpacing }}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: sectionSpacing 
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ 
              color: 'white', 
              fontSize: titleSize, 
              fontWeight: 'bold',
              marginBottom: isSmallScreen ? 2 : 4
            }}>
              Inventory Management
            </Text>
            <Text style={{ 
              color: '#9CA3AF', 
              fontSize: smallSize 
            }}>
              Managing {activeLocation} operations
            </Text>
          </View>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            gap: isSmallScreen ? 8 : 12
          }}>
            <TouchableOpacity className="relative" style={{ padding: isSmallScreen ? 6 : 8 }}>
              <Bell size={headerIconSize} color="white" />
              <View className="absolute top-1 right-1 bg-red-500 rounded-full" 
                style={{ width: isSmallScreen ? 6 : 8, height: isSmallScreen ? 6 : 8 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: isSmallScreen ? 6 : 8 }}>
              <Settings size={headerIconSize} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={{ 
          flexDirection: 'row', 
          gap: itemSpacing 
        }}>
          <View style={{ 
            flex: 1, 
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: 12, 
            padding: containerPadding,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <Text style={{ color: '#9CA3AF', fontSize: smallSize }}>Total</Text>
            <Text style={{ color: 'white', fontSize: isTablet ? 20 : 18, fontWeight: 'bold' }}>
              {stats.total}
            </Text>
          </View>
          <View style={{ 
            flex: 1, 
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: 12, 
            padding: containerPadding,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <Text style={{ color: '#9CA3AF', fontSize: smallSize }}>
              {activeTab === 'cars' ? 'Available' : 'Low Stock'}
            </Text>
            <Text style={{ 
              fontSize: isTablet ? 20 : 18, 
              fontWeight: 'bold',
              color: activeTab === 'cars' ? '#10B981' : '#F59E0B'
            }}>
              {activeTab === 'cars' ? stats.available : stats.lowStock}
            </Text>
          </View>
          <View style={{ 
            flex: 1, 
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: 12, 
            padding: containerPadding,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <Text style={{ color: '#9CA3AF', fontSize: smallSize }}>
              {activeTab === 'cars' ? 'In Service' : 'Out of Stock'}
            </Text>
            <Text style={{ 
              fontSize: isTablet ? 20 : 18, 
              fontWeight: 'bold',
              color: activeTab === 'cars' ? '#60A5FA' : '#EF4444'
            }}>
              {activeTab === 'cars' ? stats.inService : stats.outOfStock}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={{ 
        flexDirection: 'row', 
        paddingHorizontal: containerPadding, 
        marginBottom: sectionSpacing,
        height: tabHeight
      }}>
        <TouchableOpacity 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingVertical: isSmallScreen ? 10 : 12,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            backgroundColor: activeTab === 'cars' ? '#2563EB' : 'rgba(255, 255, 255, 0.1)'
          }}
          onPress={() => setActiveTab('cars')}
        >
          <Car size={iconSize} color="white" />
          <Text style={{ 
            color: 'white', 
            marginLeft: 6, 
            fontWeight: '600',
            fontSize: bodySize
          }}>
            Cars ({cars.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingVertical: isSmallScreen ? 10 : 12,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            backgroundColor: activeTab === 'inventory' ? '#2563EB' : 'rgba(255, 255, 255, 0.1)'
          }}
          onPress={() => setActiveTab('inventory')}
        >
          <Package size={iconSize} color="white" />
          <Text style={{ 
            color: 'white', 
            marginLeft: 6, 
            fontWeight: '600',
            fontSize: bodySize
          }}>
            Inventory ({inventory.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={{ 
        paddingHorizontal: containerPadding, 
        marginBottom: sectionSpacing 
      }}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: 12, 
          paddingHorizontal: 16,
          paddingVertical: isSmallScreen ? 10 : 12,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          height: searchHeight
        }}>
          <Search size={iconSize} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={`Search ${activeTab === 'cars' ? 'cars by model, make, plate...' : 'inventory by name, code, category...'}`}
            placeholderTextColor="#6B7280"
            style={{ 
              flex: 1, 
              color: 'white', 
              marginLeft: 12,
              fontSize: bodySize
            }}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={{ color: '#9CA3AF', fontSize: smallSize }}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={{ color: 'white', marginTop: 12, fontSize: bodySize }}>
            Loading {activeLocation} data...
          </Text>
        </View>
      ) : (
        <Animated.ScrollView 
          style={{ opacity: fadeAnim }}
          contentContainerStyle={{ 
            paddingHorizontal: containerPadding, 
            paddingBottom: 20 
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={handleRefresh} 
              tintColor="#3B82F6" 
            />
          }
        >
          {/* Results Count */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: itemSpacing
          }}>
            <Text style={{ color: '#9CA3AF', fontSize: smallSize }}>
              Showing {activeTab === 'cars' ? filteredCars.length : filteredInventory.length} items
            </Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Filter size={iconSize} color="#9CA3AF" />
              <Text style={{ color: '#9CA3AF', fontSize: smallSize, marginLeft: 4 }}>
                Filter
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={{ gap: itemSpacing }}>
            {activeTab === 'cars' ? (
              filteredCars.length === 0 ? (
                <View style={{ 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  paddingVertical: isTablet ? 80 : 60 
                }}>
                  <Car size={isTablet ? 80 : 64} color="#4B5563" />
                  <Text style={{ 
                    color: '#9CA3AF', 
                    fontSize: isTablet ? 22 : 18, 
                    marginTop: 16,
                    fontWeight: '500',
                    textAlign: 'center'
                  }}>
                    {searchQuery ? 'No matching cars found' : `No cars in ${activeLocation}`}
                  </Text>
                  <Text style={{ 
                    color: '#6B7280', 
                    fontSize: smallSize, 
                    marginTop: 4,
                    textAlign: 'center'
                  }}>
                    {searchQuery ? 'Try adjusting your search terms' : 'Add cars to get started'}
                  </Text>
                </View>
              ) : (
                filteredCars.map((car: CarType) => (
                  <TouchableOpacity
                    key={car.licence_plate}
                    onPress={() => handleCarPress(car)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 16,
                      padding: containerPadding,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      minHeight: cardHeight
                    }}
                  >
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: 8
                    }}>
                      <Text style={{ 
                        color: 'white', 
                        fontSize: isTablet ? 20 : 18, 
                        fontWeight: 'bold',
                        flex: 1,
                        marginRight: 8
                      }}>
                        {car.make} {car.model}
                      </Text>
                      <View style={{ 
                        backgroundColor: 'rgba(59, 130, 246, 0.2)', 
                        borderRadius: 20, 
                        paddingHorizontal: 12,
                        paddingVertical: 4
                      }}>
                        <Text style={{ 
                          color: '#60A5FA', 
                          fontSize: smallSize, 
                          fontWeight: '500' 
                        }}>
                          {car.licence_plate}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: 6
                    }}>
                      <Text style={{ color: '#D1D5DB', fontSize: smallSize }}>
                        Mileage: {(car.milage || 0).toLocaleString()} km
                      </Text>
                      <View style={{ 
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 20,
                        backgroundColor: car.status === 'available' ? 'rgba(16, 185, 129, 0.2)' : 
                                        car.status === 'in_service' ? 'rgba(245, 158, 11, 0.2)' : 
                                        'rgba(107, 114, 128, 0.2)'
                      }}>
                        <Text style={{ 
                          fontSize: smallSize - 1, 
                          fontWeight: '500',
                          color: car.status === 'available' ? '#10B981' : 
                                car.status === 'in_service' ? '#F59E0B' : '#9CA3AF'
                        }}>
                          {car.status?.replace('_', ' ') || 'Unknown'}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between'
                    }}>
                      <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        flex: 1 
                      }}>
                        <User size={smallSize} color="#9CA3AF" />
                        <Text style={{ 
                          color: '#D1D5DB', 
                          fontSize: smallSize, 
                          marginLeft: 6,
                          flex: 1
                        }} numberOfLines={1}>
                          {car.client_email || 'No owner assigned'}
                        </Text>
                      </View>
                      <Text style={{ 
                        color: 'white', 
                        fontWeight: 'bold', 
                        fontSize: isTablet ? 18 : 16 
                      }}>
                        KES {(car.balance || 0).toLocaleString()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )
            ) : (
              filteredInventory.length === 0 ? (
                <View style={{ 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  paddingVertical: isTablet ? 80 : 60 
                }}>
                  <Package size={isTablet ? 80 : 64} color="#4B5563" />
                  <Text style={{ 
                    color: '#9CA3AF', 
                    fontSize: isTablet ? 22 : 18, 
                    marginTop: 16,
                    fontWeight: '500',
                    textAlign: 'center'
                  }}>
                    {searchQuery ? 'No matching items found' : `No inventory in ${activeLocation}`}
                  </Text>
                  <Text style={{ 
                    color: '#6B7280', 
                    fontSize: smallSize, 
                    marginTop: 4,
                    textAlign: 'center'
                  }}>
                    {searchQuery ? 'Try adjusting your search terms' : 'Add inventory items to get started'}
                  </Text>
                </View>
              ) : (
                filteredInventory.map((item: InventoryItemType) => (
                  <TouchableOpacity
                    key={item.item_code}
                    onPress={() => handleInventoryPress(item)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 16,
                      padding: containerPadding,
                      borderWidth: 1,
                      borderColor: (item.current_stock || 0) < 5 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                      minHeight: cardHeight
                    }}
                  >
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: 8
                    }}>
                      <Text style={{ 
                        color: 'white', 
                        fontSize: isTablet ? 20 : 18, 
                        fontWeight: 'bold',
                        flex: 1,
                        marginRight: 8
                      }}>
                        {item.item_name}
                      </Text>
                      <View style={{ 
                        backgroundColor: 'rgba(168, 85, 247, 0.2)', 
                        borderRadius: 20, 
                        paddingHorizontal: 12,
                        paddingVertical: 4
                      }}>
                        <Text style={{ 
                          color: '#A855F7', 
                          fontSize: smallSize, 
                          fontWeight: '500' 
                        }}>
                          {item.item_code}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={{ 
                      color: '#D1D5DB', 
                      fontSize: smallSize, 
                      marginBottom: 8,
                      textTransform: 'capitalize'
                    }}>
                      {item.category}
                    </Text>
                    
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      marginBottom: 6
                    }}>
                      <View style={{ 
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 20,
                        backgroundColor: (item.current_stock || 0) === 0 ? 'rgba(239, 68, 68, 0.2)' :
                                        (item.current_stock || 0) < 5 ? 'rgba(245, 158, 11, 0.2)' : 
                                        'rgba(16, 185, 129, 0.2)'
                      }}>
                        <Text style={{ 
                          fontSize: smallSize, 
                          fontWeight: 'bold',
                          color: (item.current_stock || 0) === 0 ? '#EF4444' :
                                (item.current_stock || 0) < 5 ? '#F59E0B' : '#10B981'
                        }}>
                          Stock: {item.current_stock}
                        </Text>
                      </View>
                      <Text style={{ color: '#D1D5DB', fontSize: smallSize }}>
                        {item.supplier_name}
                      </Text>
                    </View>
                    
                    <View style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between'
                    }}>
                      <Text style={{ color: '#D1D5DB', fontSize: smallSize }}>
                        Cost: <Text style={{ color: '#EF4444' }}>
                          KES {(item.purchase_price || 0).toLocaleString()}
                        </Text>
                      </Text>
                      <Text style={{ color: '#D1D5DB', fontSize: smallSize }}>
                        Sell: <Text style={{ color: '#10B981' }}>
                          KES {(item.selling_price || 0).toLocaleString()}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              )
            )}
          </View>
        </Animated.ScrollView>
      )}
    </View>
  );
}