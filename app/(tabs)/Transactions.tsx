
// // import { BlurView } from 'expo-blur';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { useRouter } from 'expo-router';
// // import { DollarSign, FileText } from 'lucide-react';
// // import React from 'react';
// // import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// // import { useFinancialData } from '../../lib/pages/useTransactionsData';

// // const TransactionsPage: React.FC = () => {
// //   const { data, loading, error } = useFinancialData();
// //   const router = useRouter();

// //   const navigateToAddExpenses = () => {
// //     // Navigate to the add expenses page
// //     router.push({ pathname: "/AddExpenses",  })
// //   };

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
// //           {data.length === 0 ? (
// //             <Text className="text-gray-300">No financial data found.</Text>
// //           ) : (
// //             data.map((monthData, index) => (
// //               <View key={index} className="mb-8">
// //                 <Text className="text-white text-lg font-bold mb-2">{monthData.month}</Text>
                
// //                 {/* Monthly Summary Card */}
// //                 <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4">
// //                   <View className="flex-row justify-between mb-2">
// //                     <View className="flex-row items-center">
// //                       <DollarSign size={20} color="#4ade80" />
// //                       <Text className="text-gray-300 ml-2">Total Revenue:</Text>
// //                     </View>
// //                     <Text className="text-white font-bold">KES {monthData.totalTransactions?.toLocaleString() || '0'}</Text>
// //                   </View>
// //                   <View className="flex-row justify-between">
// //                     <View className="flex-row items-center">
// //                       <DollarSign size={20} color="#f87171" />
// //                       <Text className="text-gray-300 ml-2">Total Expenses:</Text>
// //                     </View>
// //                     <Text className="text-white font-bold">KES {monthData.totalExpenses?.toLocaleString() || '0'}</Text>
// //                   </View>
// //                 </BlurView>

// //                 {/* Individual Transaction/Expense Cards */}
// //                 {monthData.items.map((item, itemIndex) => {
// //                   const isTransaction = 'status' in item;
// //                   const amount = item.amount || 0;
// //                   const date = isTransaction ? item.created_at : item.expense_date;
// //                   const description = isTransaction ? `Ref: ${item.CheckoutRequestID || 'N/A'}` : item.description || 'No description';
                  
// //                   return (
// //                     <LinearGradient
// //                       key={itemIndex}
// //                       colors={isTransaction ? ['#1f2937', '#111827'] : ['#2d2d3e', '#1f202a']}
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
// //                             {description}
// //                           </Text>
// //                           <Text className="text-gray-400 text-xs mt-1">
// //                             {date ? new Date(date).toLocaleDateString() : 'No date'}
// //                           </Text>
// //                         </View>
// //                         <View className="items-end">
// //                           <Text className={`font-bold text-lg ${isTransaction ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
// //                             KES {amount.toLocaleString()}
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
// import { DollarSign, Eye, FileText } from 'lucide-react';
// import React, { useState } from 'react';
// import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { Expense, Transaction, useFinancialData } from '../../lib/pages/useTransactionsData';

// const TransactionsPage: React.FC = () => {
//   const { data, loading, error } = useFinancialData();
//   const router = useRouter();
//   const [selectedItem, setSelectedItem] = useState<Transaction | Expense | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const navigateToAddExpenses = () => {
//     router.push({ pathname: "/AddExpenses" });
//   };

//   const viewDetails = (item: Transaction | Expense) => {
//     setSelectedItem(item);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedItem(null);
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
//                     <Text className="text-white font-bold">KES {monthData.totalTransactions?.toLocaleString() || '0'}</Text>
//                   </View>
//                   <View className="flex-row justify-between">
//                     <View className="flex-row items-center">
//                       <DollarSign size={20} color="#f87171" />
//                       <Text className="text-gray-300 ml-2">Total Expenses:</Text>
//                     </View>
//                     <Text className="text-white font-bold">KES {monthData.totalExpenses?.toLocaleString() || '0'}</Text>
//                   </View>
//                 </BlurView>

//                 {/* Transactions Section */}
//                 <Text className="text-white text-lg font-semibold mb-3 text-[#4ade80]">Transactions</Text>
//                 {monthData.items.filter(item => 'status' in item).length === 0 ? (
//                   <Text className="text-gray-400 text-sm mb-4">No transactions found</Text>
//                 ) : (
//                   monthData.items.filter(item => 'status' in item).map((item, itemIndex) => {
//                     const transaction = item as Transaction;
//                     return (
//                       <LinearGradient
//                         key={`transaction-${itemIndex}`}
//                         colors={['#1f2937', '#111827']}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 1 }}
//                         className="p-4 rounded-xl mb-3"
//                       >
//                         <View className="flex-row items-center justify-between">
//                           <View className="flex-row items-center flex-1">
//                             <DollarSign size={24} color="#4ade80" />
//                             <View className="ml-4 flex-1">
//                               <Text className="text-white font-semibold">Payment Received</Text>
//                               <Text className="text-gray-300 text-sm">Ref: {transaction.CheckoutRequestID || 'N/A'}</Text>
//                               <Text className="text-gray-400 text-xs mt-1">
//                                 {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'No date'}
//                               </Text>
//                               <Text className="text-gray-400 text-xs">Status: {transaction.status}</Text>
//                             </View>
//                           </View>
//                           <View className="items-end">
//                             <Text className="font-bold text-lg text-[#4ade80]">
//                               KES {(transaction.amount || 0).toLocaleString()}
//                             </Text>
//                             <TouchableOpacity 
//                               onPress={() => viewDetails(transaction)}
//                               className="mt-2 p-1"
//                             >
//                               <Eye size={16} color="#9ca3af" />
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       </LinearGradient>
//                     );
//                   })
//                 )}

//                 {/* Expenses Section */}
//                 <Text className="text-white text-lg font-semibold mb-3 mt-6 text-[#f87171]">Expenses</Text>
//                 {monthData.items.filter(item => !('status' in item)).length === 0 ? (
//                   <Text className="text-gray-400 text-sm mb-4">No expenses found</Text>
//                 ) : (
//                   monthData.items.filter(item => !('status' in item)).map((item, itemIndex) => {
//                     const expense = item as Expense;
//                     return (
//                       <LinearGradient
//                         key={`expense-${itemIndex}`}
//                         colors={['#2d2d3e', '#1f202a']}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 1 }}
//                         className="p-4 rounded-xl mb-3"
//                       >
//                         <View className="flex-row items-center justify-between">
//                           <View className="flex-row items-center flex-1">
//                             <FileText size={24} color="#f87171" />
//                             <View className="ml-4 flex-1">
//                               <Text className="text-white font-semibold">Expense</Text>
//                               <Text className="text-gray-300 text-sm">{expense.description || 'No description'}</Text>
//                               <Text className="text-gray-400 text-xs mt-1">
//                                 {expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : 'No date'}
//                               </Text>
//                               <Text className="text-gray-400 text-xs">Staff ID: {expense.staff_id || 'N/A'}</Text>
//                             </View>
//                           </View>
//                           <View className="items-end">
//                             <Text className="font-bold text-lg text-[#f87171]">
//                               KES {(expense.amount || 0).toLocaleString()}
//                             </Text>
//                             <TouchableOpacity 
//                               onPress={() => viewDetails(expense)}
//                               className="mt-2 p-1"
//                             >
//                               <Eye size={16} color="#9ca3af" />
//                             </TouchableOpacity>
//                           </View>
//                         </View>
//                       </LinearGradient>
//                     );
//                   })
//                 )}
//               </View>
//             ))
//           )}
//         </View>
//       </ScrollView>

//       {/* Detail Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//       >
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <View className="bg-[#1A2033] m-5 p-5 rounded-2xl w-11/12">
//             {selectedItem && (
//               <>
//                 <Text className="text-white text-xl font-bold mb-4">
//                   {('status' in selectedItem) ? 'Transaction Details' : 'Expense Details'}
//                 </Text>
                
//                 {('status' in selectedItem) ? (
//                   // Transaction Details
//                   <>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Transaction ID</Text>
//                       <Text className="text-white">{selectedItem.id || 'N/A'}</Text>
//                     </View>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Amount</Text>
//                       <Text className="text-white">KES {(selectedItem.amount || 0).toLocaleString()}</Text>
//                     </View>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Checkout Request ID</Text>
//                       <Text className="text-white">{selectedItem.CheckoutRequestID || 'N/A'}</Text>
//                     </View>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Status</Text>
//                       <Text className="text-white">{selectedItem.status || 'N/A'}</Text>
//                     </View>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Date</Text>
//                       <Text className="text-white">
//                         {selectedItem.created_at ? new Date(selectedItem.created_at).toLocaleString() : 'No date'}
//                       </Text>
//                     </View>
//                   </>
//                 ) : (
//                   // Expense Details
//                   <>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Expense ID</Text>
//                       <Text className="text-white">{selectedItem.id || 'N/A'}</Text>
//                     </View>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Amount</Text>
//                       <Text className="text-white">KES {(selectedItem.amount || 0).toLocaleString()}</Text>
//                     </View>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Description</Text>
//                       <Text className="text-white">{selectedItem.description || 'No description'}</Text>
//                     </View>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Staff ID</Text>
//                       <Text className="text-white">{selectedItem.staff_id || 'N/A'}</Text>
//                     </View>
//                     <View className="mb-3">
//                       <Text className="text-gray-400 text-sm">Date</Text>
//                       <Text className="text-white">
//                         {selectedItem.expense_date ? new Date(selectedItem.expense_date).toLocaleString() : 'No date'}
//                       </Text>
//                     </View>
//                   </>
//                 )}
                
//                 <TouchableOpacity
//                   onPress={closeModal}
//                   className="bg-[#4ade80] py-3 rounded-lg mt-4"
//                 >
//                   <Text className="text-[#1A2033] font-bold text-center">Close</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default TransactionsPage;

// src/app/Transactions.tsx
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { DollarSign, Eye, FileText } from 'lucide-react';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Expense, Transaction, useFinancialData } from '../../lib/pages/useTransactionsData';

const TransactionsPage: React.FC = () => {
  const { data, loading, error } = useFinancialData();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Transaction | Expense | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToAddExpenses = () => {
    router.push({ pathname: "/AddExpenses" });
  };

  const viewDetails = (item: Transaction | Expense) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1A2033]">
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#1A2033]">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#1A2033] pt-12">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header Section */}
        <View className="px-6 py-4 flex-row justify-between items-center">
          <Text className="text-white text-3xl font-bold">Financial Overview</Text>
          <TouchableOpacity
            onPress={navigateToAddExpenses}
            className="bg-[#4ade80] px-4 py-2 rounded-lg"
          >
            <Text className="text-[#1A2033] font-semibold">Add Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Monthly Financials Section */}
        <View className="p-6">
          <Text className="text-white text-xl font-semibold mb-4">Monthly Summary</Text>
          {data.length === 0 ? (
            <Text className="text-gray-300">No financial data found.</Text>
          ) : (
            data.map((monthData, index) => (
              <View key={index} className="mb-8">
                <Text className="text-white text-lg font-bold mb-2">{monthData.month}</Text>
                
                {/* Monthly Summary Card */}
                <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4">
                  <View className="flex-row justify-between mb-2">
                    <View className="flex-row items-center">
                      <DollarSign size={20} color="#4ade80" />
                      <Text className="text-gray-300 ml-2">Total Revenue:</Text>
                    </View>
                    <Text className="text-white font-bold">KES {monthData.totalTransactions?.toLocaleString() || '0'}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center">
                      <DollarSign size={20} color="#f87171" />
                      <Text className="text-gray-300 ml-2">Total Expenses:</Text>
                    </View>
                    <Text className="text-white font-bold">KES {monthData.totalExpenses?.toLocaleString() || '0'}</Text>
                  </View>
                </BlurView>

                {/* Transactions Section */}
                <Text className="text-white text-lg font-semibold mb-3 text-[#4ade80]">Transactions</Text>
                {monthData.items.filter(item => 'transaction_id' in item).length === 0 ? (
                  <Text className="text-gray-400 text-sm mb-4">No transactions found</Text>
                ) : (
                  monthData.items.filter(item => 'transaction_id' in item).map((item, itemIndex) => {
                    const transaction = item as Transaction;
                    return (
                      <LinearGradient
                        key={`transaction-${itemIndex}`}
                        colors={['#1f2937', '#111827']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="p-4 rounded-xl mb-3"
                      >
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center flex-1">
                            <DollarSign size={24} color="#4ade80" />
                            <View className="ml-4 flex-1">
                              <Text className="text-white font-semibold">Payment Received</Text>
                              <Text className="text-gray-300 text-sm">From: {transaction.sender_name || 'N/A'}</Text>
                              <Text className="text-gray-400 text-xs mt-1">
                                Acc: {transaction.account_number || 'N/A'}
                              </Text>
                              <Text className="text-gray-400 text-xs">
                                {transaction.payment_date ? new Date(transaction.payment_date).toLocaleDateString() : 'No date'}
                              </Text>
                            </View>
                          </View>
                          <View className="items-end">
                            <Text className="font-bold text-lg text-[#4ade80]">
                              KES {(transaction.amount || 0).toLocaleString()}
                            </Text>
                            <TouchableOpacity 
                              onPress={() => viewDetails(transaction)}
                              className="mt-2 p-1"
                            >
                              <Eye size={16} color="#9ca3af" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </LinearGradient>
                    );
                  })
                )}

                {/* Expenses Section */}
                <Text className="text-white text-lg font-semibold mb-3 mt-6 text-[#f87171]">Expenses</Text>
                {monthData.items.filter(item => !('transaction_id' in item)).length === 0 ? (
                  <Text className="text-gray-400 text-sm mb-4">No expenses found</Text>
                ) : (
                  monthData.items.filter(item => !('transaction_id' in item)).map((item, itemIndex) => {
                    const expense = item as Expense;
                    return (
                      <LinearGradient
                        key={`expense-${itemIndex}`}
                        colors={['#2d2d3e', '#1f202a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="p-4 rounded-xl mb-3"
                      >
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center flex-1">
                            <FileText size={24} color="#f87171" />
                            <View className="ml-4 flex-1">
                              <Text className="text-white font-semibold">{expense.item_name || 'Expense'}</Text>
                              <Text className="text-gray-300 text-sm">{expense.category || 'No category'}</Text>
                              <Text className="text-gray-400 text-xs mt-1">
                                {expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : 'No date'}
                              </Text>
                              <Text className="text-gray-400 text-xs">Status: {expense.status || 'N/A'}</Text>
                            </View>
                          </View>
                          <View className="items-end">
                            <Text className="font-bold text-lg text-[#f87171]">
                              KES {(expense.total_cost || 0).toLocaleString()}
                            </Text>
                            <TouchableOpacity 
                              onPress={() => viewDetails(expense)}
                              className="mt-2 p-1"
                            >
                              <Eye size={16} color="#9ca3af" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </LinearGradient>
                    );
                  })
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-[#1A2033] m-5 p-5 rounded-2xl w-11/12 max-h-80">
            <ScrollView>
              {selectedItem && (
                <>
                  <Text className="text-white text-xl font-bold mb-4">
                    {('transaction_id' in selectedItem) ? 'Transaction Details' : 'Expense Details'}
                  </Text>
                  
                  {('transaction_id' in selectedItem) ? (
                    // Transaction Details
                    <>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Transaction ID</Text>
                        <Text className="text-white">{selectedItem.transaction_id || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Amount</Text>
                        <Text className="text-white">KES {(selectedItem.amount || 0).toLocaleString()}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Account Number</Text>
                        <Text className="text-white">{selectedItem.account_number || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Sender Name</Text>
                        <Text className="text-white">{selectedItem.sender_name || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Payment Date</Text>
                        <Text className="text-white">
                          {selectedItem.payment_date ? new Date(selectedItem.payment_date).toLocaleString() : 'No date'}
                        </Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Created At</Text>
                        <Text className="text-white">
                          {selectedItem.created_at ? new Date(selectedItem.created_at).toLocaleString() : 'No date'}
                        </Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Updated At</Text>
                        <Text className="text-white">
                          {selectedItem.updated_at ? new Date(selectedItem.updated_at).toLocaleString() : 'No date'}
                        </Text>
                      </View>
                    </>
                  ) : (
                    // Expense Details
                    <>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Expense Code</Text>
                        <Text className="text-white">{selectedItem.expense_code || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Item Name</Text>
                        <Text className="text-white">{selectedItem.item_name || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Category</Text>
                        <Text className="text-white">{selectedItem.category || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Description</Text>
                        <Text className="text-white">{selectedItem.description || 'No description'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Supplier</Text>
                        <Text className="text-white">{selectedItem.supplier_name || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Quantity</Text>
                        <Text className="text-white">{selectedItem.quantity || 1}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Unit Price</Text>
                        <Text className="text-white">KES {(selectedItem.unit_price || 0).toLocaleString()}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Total Cost</Text>
                        <Text className="text-white">KES {(selectedItem.total_cost || 0).toLocaleString()}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Payment Method</Text>
                        <Text className="text-white">{selectedItem.payment_method || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Status</Text>
                        <Text className="text-white">{selectedItem.status || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Notes</Text>
                        <Text className="text-white">{selectedItem.notes || 'No notes'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Staff ID</Text>
                        <Text className="text-white">{selectedItem.staff_id || 'N/A'}</Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Expense Date</Text>
                        <Text className="text-white">
                          {selectedItem.expense_date ? new Date(selectedItem.expense_date).toLocaleString() : 'No date'}
                        </Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Created At</Text>
                        <Text className="text-white">
                          {selectedItem.created_at ? new Date(selectedItem.created_at).toLocaleString() : 'No date'}
                        </Text>
                      </View>
                      <View className="mb-3">
                        <Text className="text-gray-400 text-sm">Updated At</Text>
                        <Text className="text-white">
                          {selectedItem.updated_at ? new Date(selectedItem.updated_at).toLocaleString() : 'No date'}
                        </Text>
                      </View>
                    </>
                  )}
                  
                  <TouchableOpacity
                    onPress={closeModal}
                    className="bg-[#4ade80] py-3 rounded-lg mt-4"
                  >
                    <Text className="text-[#1A2033] font-bold text-center">Close</Text>
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

export default TransactionsPage;