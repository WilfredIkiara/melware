
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
//                         KES {(expense.total_cost || 0).toLocaleString()}
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
//                     <Text className="text-white">KES {(selectedExpense.total_cost || 0).toLocaleString()}</Text>
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
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator, Alert,
  Dimensions,
  Modal, ScrollView, Text, TextInput,
  TouchableOpacity, View
} from 'react-native';
import { useAuth } from '../../lib/auth';
import { addExpense, Expense, useFinancialData } from '../../lib/pages/useTransactionsData';

const { width, height } = Dimensions.get('window');

// Define breakpoints
const isSmallScreen = width < 380;
const isMediumScreen = width >= 380 && width < 768;
const isLargeScreen = width >= 768;

const AddExpensesPage: React.FC = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    description: '',
    supplier_name: '',
    quantity: '1',
    unit_price: '',
    payment_method: 'Cash',
    status: 'Paid' as 'Paid' | 'Pending',
    notes: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [viewExpenses, setViewExpenses] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { data } = useFinancialData();

  const allExpenses: Expense[] = data.flatMap(monthData => 
    monthData.items.filter(item => !('transaction_id' in item)) as Expense[]
  );

  const handleSubmit = async () => {
    if (!isAuthenticated || !user?.email) {
      Alert.alert('Error', 'You must be logged in to add an expense.');
      return;
    }

    if (!formData.item_name || !formData.unit_price) {
      Alert.alert('Error', 'Please fill in required fields (Item Name and Unit Price).');
      return;
    }

    setLoading(true);
    try {
      const newExpense = {
        ...formData,
        quantity: parseFloat(formData.quantity) || 1,
        unit_price: parseFloat(formData.unit_price),
        expense_date: new Date().toISOString(),
        staff_id: user.email
      };

      await addExpense(newExpense, user.token);
      Alert.alert('Success', 'Expense added successfully!');
      setFormData({
        item_name: '',
        category: '',
        description: '',
        supplier_name: '',
        quantity: '1',
        unit_price: '',
        payment_method: 'Cash',
        status: 'Paid',
        notes: '',
      });
    } catch (error) {
      console.error('Failed to add expense:', error);
      Alert.alert('Error', 'Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const viewExpenseDetails = (expense: Expense) => setSelectedExpense(expense);
  const closeExpenseDetails = () => setSelectedExpense(null);

  // Dynamic styles based on screen size
  const dynamicFontSize = isSmallScreen ? 14 : isMediumScreen ? 16 : 18;
  const modalWidth = isLargeScreen ? '60%' : isMediumScreen ? '80%' : '90%';
  const padding = isSmallScreen ? 8 : isMediumScreen ? 12 : 16;

  return (
    <View className="flex-1 bg-[#1A2033]" style={{ paddingTop: 12, paddingHorizontal: padding }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text style={{ color: 'white', fontSize: dynamicFontSize + 6, fontWeight: 'bold' }}>
            Expense Management
          </Text>
          <TouchableOpacity
            onPress={() => setViewExpenses(!viewExpenses)}
            className="bg-[#4ade80] px-4 py-2 rounded-lg"
          >
            <Text style={{ color: '#1A2033', fontWeight: '600', fontSize: dynamicFontSize }}>
              {viewExpenses ? 'Add Expense' : 'View Expenses'}
            </Text>
          </TouchableOpacity>
        </View>

        {viewExpenses ? (
          // View Expenses Section
          <View>
            <Text style={{ color: 'white', fontSize: dynamicFontSize + 2, fontWeight: '600', marginBottom: 10 }}>
              All Expenses
            </Text>
            {allExpenses.length === 0 ? (
              <Text style={{ color: '#9ca3af' }}>No expenses found.</Text>
            ) : (
              allExpenses.map((expense, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => viewExpenseDetails(expense)}
                  className="bg-white/10 p-4 rounded-xl mb-3"
                >
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text style={{ color: 'white', fontWeight: '600', fontSize: dynamicFontSize }}>
                        {expense.item_name}
                      </Text>
                      <Text style={{ color: '#9ca3af', fontSize: dynamicFontSize - 2 }}>
                        {expense.category}
                      </Text>
                      <Text style={{ color: '#9ca3af', fontSize: dynamicFontSize - 4 }}>
                        {expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : 'No date'}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text style={{ color: '#f87171', fontWeight: '700', fontSize: dynamicFontSize }}>
                        KES {(expense.total_cost || 0).toLocaleString()}
                      </Text>
                      <Text style={{ color: '#9ca3af', fontSize: dynamicFontSize - 4 }}>
                        Code: {expense.expense_code?.substring(0, 8)}...
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        ) : (
          // Add Expense Section
          <BlurView intensity={30} tint="dark" className="bg-white/10 p-6 rounded-2xl">
            <Text style={{ color: 'white', fontSize: dynamicFontSize + 8, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
              Add New Expense
            </Text>

            {/* Form Inputs */}
            {['item_name', 'category', 'description', 'supplier_name', 'unit_price', 'payment_method', 'notes'].map((field, i) => (
              <View key={i} className="mb-4">
                <Text style={{ color: '#9ca3af', fontSize: dynamicFontSize, marginBottom: 4 }}>
                  {field.replace('_', ' ').toUpperCase()}
                </Text>
                <TextInput
                  className="bg-gray-700 text-white rounded-lg p-4"
                  style={{ fontSize: dynamicFontSize }}
                  value={formData[field as keyof typeof formData]}
                  onChangeText={(value) => handleInputChange(field, value)}
                  placeholder={`Enter ${field}`}
                  placeholderTextColor="#9ca3af"
                  multiline={field === 'description' || field === 'notes'}
                />
              </View>
            ))}

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-[#4ade80] py-4 rounded-lg items-center"
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#1A2033" />
              ) : (
                <Text style={{ color: '#1A2033', fontWeight: '700', fontSize: dynamicFontSize + 2 }}>
                  Submit Expense
                </Text>
              )}
            </TouchableOpacity>
          </BlurView>
        )}
      </ScrollView>

      {/* Expense Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!selectedExpense}
        onRequestClose={closeExpenseDetails}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-[#1A2033] p-5 rounded-2xl" style={{ width: modalWidth, maxHeight: height * 0.7 }}>
            <ScrollView>
              {selectedExpense && (
                <>
                  <Text style={{ color: 'white', fontSize: dynamicFontSize + 4, fontWeight: 'bold', marginBottom: 10 }}>
                    Expense Details
                  </Text>
                  {Object.entries(selectedExpense).map(([key, value], i) => (
                    <View key={i} className="mb-3">
                      <Text style={{ color: '#9ca3af', fontSize: dynamicFontSize - 2 }}>{key}</Text>
                      <Text style={{ color: 'white', fontSize: dynamicFontSize }}>
                        {typeof value === 'string' || typeof value === 'number' ? value : 'N/A'}
                      </Text>
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={closeExpenseDetails}
                    className="bg-[#4ade80] py-3 rounded-lg mt-4"
                  >
                    <Text style={{ color: '#1A2033', fontWeight: '700', textAlign: 'center', fontSize: dynamicFontSize }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddExpensesPage;
