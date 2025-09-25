
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { AlertTriangle, ArrowLeft, BarChart3, Calendar, Package, Plus, Save } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   Modal,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { createInventoryItem, fetchInventoryItemByCode, updateInventoryItem } from '../../lib/pages/useInventoryData';
// import { InventoryItem } from '../../lib/types';

// const { width } = Dimensions.get('window');
// const isMobile = width < 768;

// export default function GarageInventoryEditPage() {
//   const { item_code } = useLocalSearchParams();
//   const [item, setItem] = useState<InventoryItem | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [saving, setSaving] = useState<boolean>(false);
//   const [showAddModal, setShowAddModal] = useState<boolean>(false);
//   const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
//     item_code: '',
//     item_name: '',
//     category: '',
//     description: '',
//     quantity_in: 0,
//     current_stock: 0,
//     purchase_price: 0,
//     selling_price: 0,
//     supplier_name: '',
//     status: 'available',
//     mechanic_notes: '',
//     min_stock_level: 5,
//     location: 'garage'
//   });
//   const router = useRouter();

//   useEffect(() => {
//     if (item_code && item_code !== 'new') {
//       loadItemData();
//     } else if (item_code === 'new') {
//       setLoading(false);
//       setShowAddModal(true);
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

//   const handleAddItem = async (): Promise<void> => {
//     if (!newItem.item_code || !newItem.item_name) {
//       Alert.alert('Error', 'Item code and name are required');
//       return;
//     }
    
//     try {
//       setSaving(true);
//       const response = await createInventoryItem(newItem as InventoryItem);
//       if (response.success) {
//         Alert.alert('Success', 'Inventory item added successfully');
//         setShowAddModal(false);
//         router.back();
//       } else {
//         Alert.alert('Error', response.message || 'Failed to add inventory item');
//       }
//     } catch (error) {
//       console.error('Error adding inventory item:', error);
//       Alert.alert('Error', 'Failed to add inventory item');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChange = (field: keyof InventoryItem, value: string | number): void => {
//     if (item) {
//       setItem({ ...item, [field]: value });
//     }
//   };

//   const handleNewItemChange = (field: keyof InventoryItem, value: string | number): void => {
//     setNewItem({ ...newItem, [field]: value });
//   };

//   const getStockStatus = (stock: number, minStock: number) => {
//     if (stock === 0) return { color: 'text-red-400', bg: 'bg-red-500/20', label: 'Out of Stock' };
//     if (stock < minStock) return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Low Stock' };
//     return { color: 'text-green-400', bg: 'bg-green-500/20', label: 'In Stock' };
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <ActivityIndicator size="large" color="#3B82F6" />
//         <Text className="text-white mt-4">Loading item data...</Text>
//       </View>
//     );
//   }

//   if (!item && item_code !== 'new') {
//     return (
//       <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
//         <AlertTriangle size={48} color="#EF4444" />
//         <Text className="text-white text-lg mt-4">Inventory item not found</Text>
//         <TouchableOpacity 
//           className="bg-blue-600 px-6 py-3 rounded-lg mt-4"
//           onPress={() => router.back()}
//         >
//           <Text className="text-white font-semibold">Go Back</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const stockStatus = item ? getStockStatus(item.current_stock || 0, item.min_stock_level || 5) : 
//     getStockStatus(newItem.current_stock || 0, newItem.min_stock_level || 5);

//   const renderContent = () => (
//     <>
//       {/* Header */}
//       <View className={`${isMobile ? 'px-6' : 'px-8'} py-6 bg-white/5 border-b border-white/10`}>
//         <View className={`flex-row items-center justify-between ${isMobile ? 'flex-col' : ''} gap-4`}>
//           <View className="flex-row items-center flex-1">
//             <TouchableOpacity onPress={() => router.back()} className="mr-4">
//               <ArrowLeft size={24} color="white" />
//             </TouchableOpacity>
//             <View>
//               <Text className="text-white text-2xl font-bold">
//                 {item_code === 'new' ? 'Add New Item' : 'Edit Inventory Item'}
//               </Text>
//               <Text className="text-gray-400">
//                 {item_code === 'new' ? 'Add new item to inventory' : `Managing ${item?.item_code}`}
//               </Text>
//             </View>
//           </View>
          
//           <View className="flex-row items-center gap-3">
//             {item_code !== 'new' && (
//               <View className={`px-3 py-1 rounded-full ${stockStatus.bg}`}>
//                 <Text className={`text-sm font-bold ${stockStatus.color}`}>
//                   {stockStatus.label}
//                 </Text>
//               </View>
//             )}
            
//             {item_code !== 'new' && (
//               <TouchableOpacity 
//                 className="bg-green-600 px-4 py-2 rounded-lg flex-row items-center"
//                 onPress={() => setShowAddModal(true)}
//               >
//                 <Plus size={18} color="white" />
//                 <Text className="text-white ml-2 font-semibold">Add Another</Text>
//               </TouchableOpacity>
//             )}
            
//             <TouchableOpacity 
//               onPress={item_code === 'new' ? handleAddItem : handleSave} 
//               disabled={saving}
//               className="bg-blue-600 px-6 py-3 rounded-lg flex-row items-center"
//             >
//               {saving ? (
//                 <ActivityIndicator size="small" color="white" />
//               ) : (
//                 <>
//                   <Save size={18} color="white" />
//                   <Text className="text-white ml-2 font-semibold">
//                     {item_code === 'new' ? 'Create Item' : 'Save Changes'}
//                   </Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       <ScrollView className={`flex-1 ${isMobile ? 'px-6' : 'px-8'}`}>
//         <View className={`py-6 ${isMobile ? '' : 'flex-row gap-8'}`}>
//           {/* Item Details */}
//           <View className={`bg-white/5 rounded-2xl p-6 border border-white/10 ${isMobile ? 'mb-6' : 'flex-1'}`}>
//             <Text className="text-white text-xl font-bold mb-6 flex-row items-center">
//               <Package className="mr-3" size={24} color="#3B82F6" />
//               Item Information
//             </Text>
            
//             <View className={`gap-4 ${isMobile ? '' : 'grid grid-cols-2'}`}>
//               <View>
//                 <Text className="text-gray-400 mb-2">Item Code *</Text>
//                 {item_code === 'new' ? (
//                   <TextInput
//                     value={newItem.item_code || ''}
//                     onChangeText={(text) => handleNewItemChange('item_code', text)}
//                     className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                     placeholder="Enter item code"
//                     placeholderTextColor="#6B7280"
//                   />
//                 ) : (
//                   <Text className="text-white text-lg bg-white/10 rounded-lg px-4 py-3 border border-white/20">
//                     {item?.item_code}
//                   </Text>
//                 )}
//               </View>
              
//               <View>
//                 <Text className="text-gray-400 mb-2">Name *</Text>
//                 <TextInput
//                   value={item_code === 'new' ? newItem.item_name || '' : item?.item_name || ''}
//                   onChangeText={(text) => item_code === 'new' ? 
//                     handleNewItemChange('item_name', text) : handleChange('item_name', text)}
//                   className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                   placeholder="Enter item name"
//                   placeholderTextColor="#6B7280"
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-400 mb-2">Category</Text>
//                 <TextInput
//                   value={item_code === 'new' ? newItem.category || '' : item?.category || ''}
//                   onChangeText={(text) => item_code === 'new' ? 
//                     handleNewItemChange('category', text) : handleChange('category', text)}
//                   className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                   placeholder="Enter category"
//                   placeholderTextColor="#6B7280"
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-400 mb-2">Current Stock</Text>
//                 <TextInput
//                   value={item_code === 'new' ? newItem.current_stock?.toString() || '' : item?.current_stock?.toString() || ''}
//                   onChangeText={(text) => item_code === 'new' ? 
//                     handleNewItemChange('current_stock', parseInt(text) || 0) : handleChange('current_stock', parseInt(text) || 0)}
//                   keyboardType="numeric"
//                   className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                   placeholder="Enter current stock"
//                   placeholderTextColor="#6B7280"
//                 />
//               </View>
              
//               <View className={isMobile ? '' : 'col-span-2'}>
//                 <Text className="text-gray-400 mb-2">Description</Text>
//                 <TextInput
//                   value={item_code === 'new' ? newItem.description || '' : item?.description || ''}
//                   onChangeText={(text) => item_code === 'new' ? 
//                     handleNewItemChange('description', text) : handleChange('description', text)}
//                   multiline
//                   className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 h-20"
//                   placeholder="Enter description"
//                   placeholderTextColor="#6B7280"
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Pricing & Supplier */}
//           <View className={`bg-white/5 rounded-2xl p-6 border border-white/10 ${isMobile ? 'mb-6' : 'flex-1'}`}>
//             <Text className="text-white text-xl font-bold mb-6 flex-row items-center">
//               <BarChart3 className="mr-3" size={24} color="#10B981" />
//               Pricing & Supplier
//             </Text>
            
//             <View className={`gap-4 ${isMobile ? '' : 'grid grid-cols-2'}`}>
//               <View>
//                 <Text className="text-gray-400 mb-2">Purchase Price (KES)</Text>
//                 <TextInput
//                   value={item_code === 'new' ? newItem.purchase_price?.toString() || '' : item?.purchase_price?.toString() || ''}
//                   onChangeText={(text) => item_code === 'new' ? 
//                     handleNewItemChange('purchase_price', parseFloat(text) || 0) : handleChange('purchase_price', parseFloat(text) || 0)}
//                   keyboardType="numeric"
//                   className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                   placeholder="0.00"
//                   placeholderTextColor="#6B7280"
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-400 mb-2">Selling Price (KES)</Text>
//                 <TextInput
//                   value={item_code === 'new' ? newItem.selling_price?.toString() || '' : item?.selling_price?.toString() || ''}
//                   onChangeText={(text) => item_code === 'new' ? 
//                     handleNewItemChange('selling_price', parseFloat(text) || 0) : handleChange('selling_price', parseFloat(text) || 0)}
//                   keyboardType="numeric"
//                   className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                   placeholder="0.00"
//                   placeholderTextColor="#6B7280"
//                 />
//               </View>
              
//               <View className={isMobile ? '' : 'col-span-2'}>
//                 <Text className="text-gray-400 mb-2">Supplier</Text>
//                 <TextInput
//                   value={item_code === 'new' ? newItem.supplier_name || '' : item?.supplier_name || ''}
//                   onChangeText={(text) => item_code === 'new' ? 
//                     handleNewItemChange('supplier_name', text) : handleChange('supplier_name', text)}
//                   className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                   placeholder="Enter supplier name"
//                   placeholderTextColor="#6B7280"
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-400 mb-2">Minimum Stock Level</Text>
//                 <TextInput
//                   value={item_code === 'new' ? newItem.min_stock_level?.toString() || '' : item?.min_stock_level?.toString() || ''}
//                   onChangeText={(text) => item_code === 'new' ? 
//                     handleNewItemChange('min_stock_level', parseInt(text) || 0) : handleChange('min_stock_level', parseInt(text) || 0)}
//                   keyboardType="numeric"
//                   className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                   placeholder="5"
//                   placeholderTextColor="#6B7280"
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-400 mb-2">Status</Text>
//                 <View className="bg-white/10 rounded-lg px-4 py-3 border border-white/20">
//                   <Text className="text-white">
//                     {item_code === 'new' ? newItem.status : item?.status}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Notes Section */}
//         <View className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
//           <Text className="text-white text-xl font-bold mb-4 flex-row items-center">
//             <Calendar className="mr-3" size={24} color="#F59E0B" />
//             Mechanic Notes
//           </Text>
//           <TextInput
//             value={item_code === 'new' ? newItem.mechanic_notes || '' : item?.mechanic_notes || ''}
//             onChangeText={(text) => item_code === 'new' ? 
//               handleNewItemChange('mechanic_notes', text) : handleChange('mechanic_notes', text)}
//             multiline
//             className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20 h-32"
//             placeholder="Add mechanic notes, usage instructions, or special handling requirements..."
//             placeholderTextColor="#6B7280"
//           />
//         </View>
//       </ScrollView>

//       {/* Add Item Modal */}
//       <Modal
//         visible={showAddModal}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowAddModal(false)}
//       >
//         <View className="flex-1 bg-black/50 justify-center items-center p-4">
//           <View className="bg-[#0A0F1E] rounded-2xl w-full max-w-2xl border border-white/20">
//             <View className="p-6 border-b border-white/10">
//               <Text className="text-white text-xl font-bold">Add New Inventory Item</Text>
//               <Text className="text-gray-400">Add a new item to the garage inventory</Text>
//             </View>
            
//             <ScrollView className="max-h-96 p-6">
//               <View className="grid grid-cols-2 gap-4">
//                 {Object.entries(newItem).map(([key, value]) => (
//                   <View key={key} className={key === 'description' || key === 'mechanic_notes' ? 'col-span-2' : ''}>
//                     <Text className="text-gray-400 mb-2 capitalize">
//                       {key.replace(/_/g, ' ')}
//                     </Text>
//                     <TextInput
//                       value={value?.toString() || ''}
//                       onChangeText={(text) => handleNewItemChange(key as keyof InventoryItem, text)}
//                       multiline={key === 'description' || key === 'mechanic_notes'}
//                       className="bg-white/10 text-white rounded-lg px-4 py-3 border border-white/20"
//                       placeholder={`Enter ${key.replace(/_/g, ' ')}`}
//                       placeholderTextColor="#6B7280"
//                     />
//                   </View>
//                 ))}
//               </View>
//             </ScrollView>
            
//             <View className="flex-row justify-end gap-3 p-6 border-t border-white/10">
//               <TouchableOpacity 
//                 onPress={() => setShowAddModal(false)}
//                 className="px-6 py-3 rounded-lg border border-white/20"
//               >
//                 <Text className="text-white">Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity 
//                 onPress={handleAddItem}
//                 disabled={saving}
//                 className="bg-blue-600 px-6 py-3 rounded-lg"
//               >
//                 <Text className="text-white font-semibold">
//                   {saving ? 'Adding...' : 'Add Item'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );

//   return (
//     <View className="flex-1 bg-[#0A0F1E]">
//       {isMobile ? (
//         <View className="flex-1 pt-14">
//           {renderContent()}
//         </View>
//       ) : (
//         <View className="flex-1">
//           {renderContent()}
//         </View>
//       )}
//     </View>
//   );
// }
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, ArrowLeft, BarChart3, Calendar, Package, Plus, Save } from 'lucide-react';
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
import { createInventoryItem, fetchInventoryItemByCode, updateInventoryItem } from '../../lib/pages/useInventoryData';
import { InventoryItem } from '../../lib/types';

const { width, height } = Dimensions.get('window');

// Responsive breakpoints
const BREAKPOINTS = {
  xs: 480,    // Small phones
  sm: 768,    // Phones/Tablets
  md: 1024,   // Tablets/Small laptops
  lg: 1280,   // Laptops/Desktops
  xl: 1536    // Large desktops
};

// Responsive utility functions
const isMobile = width < BREAKPOINTS.sm;
const isTablet = width >= BREAKPOINTS.sm && width < BREAKPOINTS.md;
const isDesktop = width >= BREAKPOINTS.md;

// Responsive value function
const responsiveValue = (mobile: any, tablet?: any, desktop?: any) => {
  if (isMobile) return mobile;
  if (isTablet) return tablet !== undefined ? tablet : mobile;
  return desktop !== undefined ? desktop : (tablet !== undefined ? tablet : mobile);
};

// Responsive spacing
const responsiveSpacing = {
  padding: responsiveValue(24, 32, 40),
  gap: responsiveValue(16, 24, 32),
  sectionGap: responsiveValue(24, 32, 40),
};

export default function GarageInventoryEditPage() {
  const { item_code } = useLocalSearchParams();
  const [item, setItem] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    item_code: '',
    item_name: '',
    category: '',
    description: '',
    quantity_in: 0,
    current_stock: 0,
    purchase_price: 0,
    selling_price: 0,
    supplier_name: '',
    status: 'available',
    mechanic_notes: '',
    min_stock_level: 5,
    location: 'garage'
  });
  const router = useRouter();

  // Handle orientation changes
  const [dimensions, setDimensions] = useState({ width, height });
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (item_code && item_code !== 'new') {
      loadItemData();
    } else if (item_code === 'new') {
      setLoading(false);
      setShowAddModal(true);
    }
  }, [item_code]);

  const loadItemData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetchInventoryItemByCode(item_code as string);
      if (response.success && response.data) {
        setItem(response.data);
      }
    } catch (error) {
      console.error('Error loading inventory item:', error);
      Alert.alert('Error', 'Failed to load inventory item');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!item) return;
    
    try {
      setSaving(true);
      const response = await updateInventoryItem(item.item_code, item);
      if (response.success) {
        Alert.alert('Success', 'Inventory item updated successfully');
        router.back();
      } else {
        Alert.alert('Error', response.message || 'Failed to update inventory item');
      }
    } catch (error) {
      console.error('Error updating inventory item:', error);
      Alert.alert('Error', 'Failed to update inventory item');
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = async (): Promise<void> => {
    if (!newItem.item_code || !newItem.item_name) {
      Alert.alert('Error', 'Item code and name are required');
      return;
    }
    
    try {
      setSaving(true);
      const response = await createInventoryItem(newItem as InventoryItem);
      if (response.success) {
        Alert.alert('Success', 'Inventory item added successfully');
        setShowAddModal(false);
        router.back();
      } else {
        Alert.alert('Error', response.message || 'Failed to add inventory item');
      }
    } catch (error) {
      console.error('Error adding inventory item:', error);
      Alert.alert('Error', 'Failed to add inventory item');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof InventoryItem, value: string | number): void => {
    if (item) {
      setItem({ ...item, [field]: value });
    }
  };

  const handleNewItemChange = (field: keyof InventoryItem, value: string | number): void => {
    setNewItem({ ...newItem, [field]: value });
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return { color: 'text-red-400', bg: 'bg-red-500/20', label: 'Out of Stock' };
    if (stock < minStock) return { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Low Stock' };
    return { color: 'text-green-400', bg: 'bg-green-500/20', label: 'In Stock' };
  };

  // Responsive styles based on current dimensions
  const currentIsMobile = dimensions.width < BREAKPOINTS.sm;
  const currentIsTablet = dimensions.width >= BREAKPOINTS.sm && dimensions.width < BREAKPOINTS.md;
  const currentIsDesktop = dimensions.width >= BREAKPOINTS.md;

  const responsiveStyles = {
    // Container padding
    containerPadding: responsiveValue(24, 32, 40),
    
    // Header styles
    headerPadding: responsiveValue(20, 24, 32),
    headerTitleSize: responsiveValue(20, 24, 28),
    headerSubtitleSize: responsiveValue(14, 16, 16),
    
    // Card styles
    cardPadding: responsiveValue(16, 20, 24),
    cardMargin: responsiveValue(16, 20, 24),
    cardBorderRadius: responsiveValue(12, 16, 20),
    
    // Input styles
    inputPadding: responsiveValue(12, 14, 16),
    inputHeight: responsiveValue(44, 48, 52),
    inputFontSize: responsiveValue(14, 16, 16),
    
    // Button styles
    buttonPadding: responsiveValue(12, 14, 16),
    buttonFontSize: responsiveValue(14, 15, 16),
    
    // Icon sizes
    iconSize: responsiveValue(18, 20, 22),
    headerIconSize: responsiveValue(20, 22, 24),
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-white mt-4" style={{ fontSize: responsiveStyles.inputFontSize }}>
          Loading item data...
        </Text>
      </View>
    );
  }

  if (!item && item_code !== 'new') {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center" style={{ padding: responsiveStyles.containerPadding }}>
        <AlertTriangle size={responsiveValue(40, 48, 56)} color="#EF4444" />
        <Text className="text-white mt-4" style={{ fontSize: responsiveStyles.headerSubtitleSize }}>
          Inventory item not found
        </Text>
        <TouchableOpacity 
          className="bg-blue-600 rounded-lg mt-4"
          style={{ 
            paddingHorizontal: responsiveStyles.buttonPadding * 2,
            paddingVertical: responsiveStyles.buttonPadding
          }}
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold" style={{ fontSize: responsiveStyles.buttonFontSize }}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const stockStatus = item ? getStockStatus(item.current_stock || 0, item.min_stock_level || 5) : 
    getStockStatus(newItem.current_stock || 0, newItem.min_stock_level || 5);

  const renderContent = () => (
    <>
      {/* Header */}
      <View 
        className="bg-white/5 border-b border-white/10"
        style={{ 
          paddingHorizontal: responsiveStyles.containerPadding,
          paddingVertical: responsiveStyles.headerPadding
        }}
      >
        <View className={`flex-row items-center justify-between ${currentIsMobile ? 'flex-col' : ''} gap-4`}>
          <View className={`flex-row items-center ${currentIsMobile ? 'w-full justify-between mb-4' : 'flex-1'}`}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              className={currentIsMobile ? '' : 'mr-4'}
            >
              <ArrowLeft size={responsiveStyles.headerIconSize} color="white" />
            </TouchableOpacity>
            <View className={currentIsMobile ? 'flex-1 ml-4' : 'flex-1'}>
              <Text 
                className="text-white font-bold"
                style={{ fontSize: responsiveStyles.headerTitleSize }}
              >
                {item_code === 'new' ? 'Add New Item' : 'Edit Inventory Item'}
              </Text>
              <Text 
                className="text-gray-400"
                style={{ fontSize: responsiveStyles.headerSubtitleSize }}
              >
                {item_code === 'new' ? 'Add new item to inventory' : `Managing ${item?.item_code}`}
              </Text>
            </View>
          </View>
          
          <View className={`flex-row items-center gap-3 ${currentIsMobile ? 'w-full justify-between' : ''}`}>
            {item_code !== 'new' && (
              <View className={`px-3 py-1 rounded-full ${stockStatus.bg}`}>
                <Text className={`text-sm font-bold ${stockStatus.color}`}>
                  {stockStatus.label}
                </Text>
              </View>
            )}
            
            {item_code !== 'new' && (
              <TouchableOpacity 
                className="bg-green-600 rounded-lg flex-row items-center"
                style={{ 
                  paddingHorizontal: responsiveStyles.buttonPadding,
                  paddingVertical: responsiveStyles.buttonPadding - 4
                }}
                onPress={() => setShowAddModal(true)}
              >
                <Plus size={responsiveStyles.iconSize} color="white" />
                <Text 
                  className="text-white ml-2 font-semibold"
                  style={{ fontSize: responsiveStyles.buttonFontSize }}
                >
                  Add Another
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              onPress={item_code === 'new' ? handleAddItem : handleSave} 
              disabled={saving}
              className="bg-blue-600 rounded-lg flex-row items-center"
              style={{ 
                paddingHorizontal: responsiveStyles.buttonPadding * 1.5,
                paddingVertical: responsiveStyles.buttonPadding
              }}
            >
              {saving ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Save size={responsiveStyles.iconSize} color="white" />
                  <Text 
                    className="text-white ml-2 font-semibold"
                    style={{ fontSize: responsiveStyles.buttonFontSize }}
                  >
                    {item_code === 'new' ? 'Create Item' : 'Save Changes'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        style={{ 
          flex: 1,
          paddingHorizontal: responsiveStyles.containerPadding
        }}
        contentContainerStyle={{ 
          paddingVertical: responsiveStyles.cardMargin 
        }}
      >
        <View className={`${currentIsMobile ? '' : 'flex-row gap-8'}`}>
          {/* Item Details */}
          <View 
            className="bg-white/5 rounded-2xl border border-white/10"
            style={{ 
              padding: responsiveStyles.cardPadding,
              marginBottom: currentIsMobile ? responsiveStyles.cardMargin : 0,
              flex: currentIsMobile ? 0 : 1
            }}
          >
            <Text 
              className="text-white font-bold mb-6 flex-row items-center"
              style={{ fontSize: responsiveStyles.headerTitleSize - 4 }}
            >
              <Package className="mr-3" size={responsiveStyles.headerIconSize} color="#3B82F6" />
              Item Information
            </Text>
            
            <View className={`gap-4 ${currentIsMobile ? '' : currentIsTablet ? 'grid grid-cols-1' : 'grid grid-cols-2'}`}>
              <View>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Item Code *
                </Text>
                {item_code === 'new' ? (
                  <TextInput
                    value={newItem.item_code || ''}
                    onChangeText={(text) => handleNewItemChange('item_code', text)}
                    className="bg-white/10 text-white rounded-lg border border-white/20"
                    style={{
                      padding: responsiveStyles.inputPadding,
                      height: responsiveStyles.inputHeight,
                      fontSize: responsiveStyles.inputFontSize
                    }}
                    placeholder="Enter item code"
                    placeholderTextColor="#6B7280"
                  />
                ) : (
                  <Text 
                    className="text-white bg-white/10 rounded-lg border border-white/20"
                    style={{
                      padding: responsiveStyles.inputPadding,
                      height: responsiveStyles.inputHeight,
                      fontSize: responsiveStyles.inputFontSize,
                      lineHeight: responsiveStyles.inputHeight - (responsiveStyles.inputPadding * 2)
                    }}
                  >
                    {item?.item_code}
                  </Text>
                )}
              </View>
              
              <View>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Name *
                </Text>
                <TextInput
                  value={item_code === 'new' ? newItem.item_name || '' : item?.item_name || ''}
                  onChangeText={(text) => item_code === 'new' ? 
                    handleNewItemChange('item_name', text) : handleChange('item_name', text)}
                  className="bg-white/10 text-white rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight,
                    fontSize: responsiveStyles.inputFontSize
                  }}
                  placeholder="Enter item name"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Category
                </Text>
                <TextInput
                  value={item_code === 'new' ? newItem.category || '' : item?.category || ''}
                  onChangeText={(text) => item_code === 'new' ? 
                    handleNewItemChange('category', text) : handleChange('category', text)}
                  className="bg-white/10 text-white rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight,
                    fontSize: responsiveStyles.inputFontSize
                  }}
                  placeholder="Enter category"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Current Stock
                </Text>
                <TextInput
                  value={item_code === 'new' ? newItem.current_stock?.toString() || '' : item?.current_stock?.toString() || ''}
                  onChangeText={(text) => item_code === 'new' ? 
                    handleNewItemChange('current_stock', parseInt(text) || 0) : handleChange('current_stock', parseInt(text) || 0)}
                  keyboardType="numeric"
                  className="bg-white/10 text-white rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight,
                    fontSize: responsiveStyles.inputFontSize
                  }}
                  placeholder="Enter current stock"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View className={currentIsMobile ? '' : 'col-span-2'}>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Description
                </Text>
                <TextInput
                  value={item_code === 'new' ? newItem.description || '' : item?.description || ''}
                  onChangeText={(text) => item_code === 'new' ? 
                    handleNewItemChange('description', text) : handleChange('description', text)}
                  multiline
                  className="bg-white/10 text-white rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight * 2,
                    fontSize: responsiveStyles.inputFontSize,
                    textAlignVertical: 'top'
                  }}
                  placeholder="Enter description"
                  placeholderTextColor="#6B7280"
                />
              </View>
            </View>
          </View>

          {/* Pricing & Supplier */}
          <View 
            className="bg-white/5 rounded-2xl border border-white/10"
            style={{ 
              padding: responsiveStyles.cardPadding,
              marginBottom: currentIsMobile ? responsiveStyles.cardMargin : 0,
              flex: currentIsMobile ? 0 : 1
            }}
          >
            <Text 
              className="text-white font-bold mb-6 flex-row items-center"
              style={{ fontSize: responsiveStyles.headerTitleSize - 4 }}
            >
              <BarChart3 className="mr-3" size={responsiveStyles.headerIconSize} color="#10B981" />
              Pricing & Supplier
            </Text>
            
            <View className={`gap-4 ${currentIsMobile ? '' : currentIsTablet ? 'grid grid-cols-1' : 'grid grid-cols-2'}`}>
              <View>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Purchase Price (KES)
                </Text>
                <TextInput
                  value={item_code === 'new' ? newItem.purchase_price?.toString() || '' : item?.purchase_price?.toString() || ''}
                  onChangeText={(text) => item_code === 'new' ? 
                    handleNewItemChange('purchase_price', parseFloat(text) || 0) : handleChange('purchase_price', parseFloat(text) || 0)}
                  keyboardType="numeric"
                  className="bg-white/10 text-white rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight,
                    fontSize: responsiveStyles.inputFontSize
                  }}
                  placeholder="0.00"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Selling Price (KES)
                </Text>
                <TextInput
                  value={item_code === 'new' ? newItem.selling_price?.toString() || '' : item?.selling_price?.toString() || ''}
                  onChangeText={(text) => item_code === 'new' ? 
                    handleNewItemChange('selling_price', parseFloat(text) || 0) : handleChange('selling_price', parseFloat(text) || 0)}
                  keyboardType="numeric"
                  className="bg-white/10 text-white rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight,
                    fontSize: responsiveStyles.inputFontSize
                  }}
                  placeholder="0.00"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View className={currentIsMobile ? '' : 'col-span-2'}>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Supplier
                </Text>
                <TextInput
                  value={item_code === 'new' ? newItem.supplier_name || '' : item?.supplier_name || ''}
                  onChangeText={(text) => item_code === 'new' ? 
                    handleNewItemChange('supplier_name', text) : handleChange('supplier_name', text)}
                  className="bg-white/10 text-white rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight,
                    fontSize: responsiveStyles.inputFontSize
                  }}
                  placeholder="Enter supplier name"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Minimum Stock Level
                </Text>
                <TextInput
                  value={item_code === 'new' ? newItem.min_stock_level?.toString() || '' : item?.min_stock_level?.toString() || ''}
                  onChangeText={(text) => item_code === 'new' ? 
                    handleNewItemChange('min_stock_level', parseInt(text) || 0) : handleChange('min_stock_level', parseInt(text) || 0)}
                  keyboardType="numeric"
                  className="bg-white/10 text-white rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight,
                    fontSize: responsiveStyles.inputFontSize
                  }}
                  placeholder="5"
                  placeholderTextColor="#6B7280"
                />
              </View>
              
              <View>
                <Text 
                  className="text-gray-400 mb-2"
                  style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                >
                  Status
                </Text>
                <View 
                  className="bg-white/10 rounded-lg border border-white/20"
                  style={{
                    padding: responsiveStyles.inputPadding,
                    height: responsiveStyles.inputHeight,
                    justifyContent: 'center'
                  }}
                >
                  <Text 
                    className="text-white"
                    style={{ fontSize: responsiveStyles.inputFontSize }}
                  >
                    {item_code === 'new' ? newItem.status : item?.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Notes Section */}
        <View 
          className="bg-white/5 rounded-2xl border border-white/10"
          style={{ 
            padding: responsiveStyles.cardPadding,
            marginBottom: responsiveStyles.cardMargin
          }}
        >
          <Text 
            className="text-white font-bold mb-4 flex-row items-center"
            style={{ fontSize: responsiveStyles.headerTitleSize - 4 }}
          >
            <Calendar className="mr-3" size={responsiveStyles.headerIconSize} color="#F59E0B" />
            Mechanic Notes
          </Text>
          <TextInput
            value={item_code === 'new' ? newItem.mechanic_notes || '' : item?.mechanic_notes || ''}
            onChangeText={(text) => item_code === 'new' ? 
              handleNewItemChange('mechanic_notes', text) : handleChange('mechanic_notes', text)}
            multiline
            className="bg-white/10 text-white rounded-lg border border-white/20"
            style={{
              padding: responsiveStyles.inputPadding,
              height: responsiveStyles.inputHeight * 3,
              fontSize: responsiveStyles.inputFontSize,
              textAlignVertical: 'top'
            }}
            placeholder="Add mechanic notes, usage instructions, or special handling requirements..."
            placeholderTextColor="#6B7280"
          />
        </View>
      </ScrollView>

      {/* Add Item Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View 
            className="bg-[#0A0F1E] rounded-2xl border border-white/20"
            style={{ 
              width: currentIsMobile ? '100%' : currentIsTablet ? '90%' : '70%',
              maxWidth: 800
            }}
          >
            <View className="p-6 border-b border-white/10">
              <Text 
                className="text-white font-bold"
                style={{ fontSize: responsiveStyles.headerTitleSize }}
              >
                Add New Inventory Item
              </Text>
              <Text 
                className="text-gray-400"
                style={{ fontSize: responsiveStyles.headerSubtitleSize }}
              >
                Add a new item to the garage inventory
              </Text>
            </View>
            
            <ScrollView 
              style={{ maxHeight: dimensions.height * 0.6 }}
              contentContainerStyle={{ padding: responsiveStyles.cardPadding }}
            >
              <View className={`gap-4 ${currentIsMobile ? 'grid grid-cols-1' : 'grid grid-cols-2'}`}>
                {Object.entries(newItem).map(([key, value]) => (
                  <View 
                    key={key} 
                    className={key === 'description' || key === 'mechanic_notes' ? 'col-span-2' : ''}
                  >
                    <Text 
                      className="text-gray-400 mb-2 capitalize"
                      style={{ fontSize: responsiveStyles.inputFontSize - 2 }}
                    >
                      {key.replace(/_/g, ' ')}
                    </Text>
                    <TextInput
                      value={value?.toString() || ''}
                      onChangeText={(text) => handleNewItemChange(key as keyof InventoryItem, text)}
                      multiline={key === 'description' || key === 'mechanic_notes'}
                      className="bg-white/10 text-white rounded-lg border border-white/20"
                      style={{
                        padding: responsiveStyles.inputPadding,
                        height: key === 'description' || key === 'mechanic_notes' 
                          ? responsiveStyles.inputHeight * 2 
                          : responsiveStyles.inputHeight,
                        fontSize: responsiveStyles.inputFontSize,
                        textAlignVertical: key === 'description' || key === 'mechanic_notes' ? 'top' : 'center'
                      }}
                      placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
            
            <View className="flex-row justify-end gap-3 p-6 border-t border-white/10">
              <TouchableOpacity 
                onPress={() => setShowAddModal(false)}
                className="border border-white/20 rounded-lg"
                style={{ paddingHorizontal: responsiveStyles.buttonPadding * 1.5, paddingVertical: responsiveStyles.buttonPadding }}
              >
                <Text 
                  className="text-white"
                  style={{ fontSize: responsiveStyles.buttonFontSize }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleAddItem}
                disabled={saving}
                className="bg-blue-600 rounded-lg"
                style={{ paddingHorizontal: responsiveStyles.buttonPadding * 1.5, paddingVertical: responsiveStyles.buttonPadding }}
              >
                <Text 
                  className="text-white font-semibold"
                  style={{ fontSize: responsiveStyles.buttonFontSize }}
                >
                  {saving ? 'Adding...' : 'Add Item'}
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
      {currentIsMobile ? (
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