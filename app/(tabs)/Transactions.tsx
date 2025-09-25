
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
//                 {monthData.items.filter(item => 'transaction_id' in item).length === 0 ? (
//                   <Text className="text-gray-400 text-sm mb-4">No transactions found</Text>
//                 ) : (
//                   monthData.items.filter(item => 'transaction_id' in item).map((item, itemIndex) => {
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
//                               <Text className="text-gray-300 text-sm">From: {transaction.sender_name || 'N/A'}</Text>
//                               <Text className="text-gray-400 text-xs mt-1">
//                                 Acc: {transaction.account_number || 'N/A'}
//                               </Text>
//                               <Text className="text-gray-400 text-xs">
//                                 {transaction.payment_date ? new Date(transaction.payment_date).toLocaleDateString() : 'No date'}
//                               </Text>
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
//                 {monthData.items.filter(item => !('transaction_id' in item)).length === 0 ? (
//                   <Text className="text-gray-400 text-sm mb-4">No expenses found</Text>
//                 ) : (
//                   monthData.items.filter(item => !('transaction_id' in item)).map((item, itemIndex) => {
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
//                               <Text className="text-white font-semibold">{expense.item_name || 'Expense'}</Text>
//                               <Text className="text-gray-300 text-sm">{expense.category || 'No category'}</Text>
//                               <Text className="text-gray-400 text-xs mt-1">
//                                 {expense.expense_date ? new Date(expense.expense_date).toLocaleDateString() : 'No date'}
//                               </Text>
//                               <Text className="text-gray-400 text-xs">Status: {expense.status || 'N/A'}</Text>
//                             </View>
//                           </View>
//                           <View className="items-end">
//                             <Text className="font-bold text-lg text-[#f87171]">
//                               KES {(expense.total_cost || 0).toLocaleString()}
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
//           <View className="bg-[#1A2033] m-5 p-5 rounded-2xl w-11/12 max-h-80">
//             <ScrollView>
//               {selectedItem && (
//                 <>
//                   <Text className="text-white text-xl font-bold mb-4">
//                     {('transaction_id' in selectedItem) ? 'Transaction Details' : 'Expense Details'}
//                   </Text>
                  
//                   {('transaction_id' in selectedItem) ? (
//                     // Transaction Details
//                     <>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Transaction ID</Text>
//                         <Text className="text-white">{selectedItem.transaction_id || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Amount</Text>
//                         <Text className="text-white">KES {(selectedItem.amount || 0).toLocaleString()}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Account Number</Text>
//                         <Text className="text-white">{selectedItem.account_number || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Sender Name</Text>
//                         <Text className="text-white">{selectedItem.sender_name || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Payment Date</Text>
//                         <Text className="text-white">
//                           {selectedItem.payment_date ? new Date(selectedItem.payment_date).toLocaleString() : 'No date'}
//                         </Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Created At</Text>
//                         <Text className="text-white">
//                           {selectedItem.created_at ? new Date(selectedItem.created_at).toLocaleString() : 'No date'}
//                         </Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Updated At</Text>
//                         <Text className="text-white">
//                           {selectedItem.updated_at ? new Date(selectedItem.updated_at).toLocaleString() : 'No date'}
//                         </Text>
//                       </View>
//                     </>
//                   ) : (
//                     // Expense Details
//                     <>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Expense Code</Text>
//                         <Text className="text-white">{selectedItem.expense_code || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Item Name</Text>
//                         <Text className="text-white">{selectedItem.item_name || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Category</Text>
//                         <Text className="text-white">{selectedItem.category || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Description</Text>
//                         <Text className="text-white">{selectedItem.description || 'No description'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Supplier</Text>
//                         <Text className="text-white">{selectedItem.supplier_name || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Quantity</Text>
//                         <Text className="text-white">{selectedItem.quantity || 1}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Unit Price</Text>
//                         <Text className="text-white">KES {(selectedItem.unit_price || 0).toLocaleString()}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Total Cost</Text>
//                         <Text className="text-white">KES {(selectedItem.total_cost || 0).toLocaleString()}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Payment Method</Text>
//                         <Text className="text-white">{selectedItem.payment_method || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Status</Text>
//                         <Text className="text-white">{selectedItem.status || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Notes</Text>
//                         <Text className="text-white">{selectedItem.notes || 'No notes'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Staff ID</Text>
//                         <Text className="text-white">{selectedItem.staff_id || 'N/A'}</Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Expense Date</Text>
//                         <Text className="text-white">
//                           {selectedItem.expense_date ? new Date(selectedItem.expense_date).toLocaleString() : 'No date'}
//                         </Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Created At</Text>
//                         <Text className="text-white">
//                           {selectedItem.created_at ? new Date(selectedItem.created_at).toLocaleString() : 'No date'}
//                         </Text>
//                       </View>
//                       <View className="mb-3">
//                         <Text className="text-gray-400 text-sm">Updated At</Text>
//                         <Text className="text-white">
//                           {selectedItem.updated_at ? new Date(selectedItem.updated_at).toLocaleString() : 'No date'}
//                         </Text>
//                       </View>
//                     </>
//                   )}
                  
//                   <TouchableOpacity
//                     onPress={closeModal}
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

// export default TransactionsPage;
// src/app/Transactions.tsx
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronDown, ChevronUp, DollarSign, Eye, FileText } from 'lucide-react';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Expense, Transaction, useFinancialData } from '../../lib/pages/useTransactionsData';

const { width } = Dimensions.get('window');
const isDesktop = width >= 768;

const TransactionsPage: React.FC = () => {
  const { data, loading, error } = useFinancialData();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Transaction | Expense | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

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

  const toggleSection = (month: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
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
        <View className={`${isDesktop ? 'px-12' : 'px-6'} py-6 flex-row justify-between items-center`}>
          <Text className="text-white text-3xl font-bold">Financial Overview</Text>
          <TouchableOpacity
            onPress={navigateToAddExpenses}
            className="bg-[#4ade80] px-6 py-3 rounded-lg shadow-lg"
          >
            <Text className="text-[#1A2033] font-semibold text-base">Add Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Monthly Financials Section */}
        <View className={`${isDesktop ? 'px-12' : 'p-6'}`}>
          <Text className="text-white text-xl font-semibold mb-6">Monthly Summary</Text>
          {data.length === 0 ? (
            <View className="bg-white/5 rounded-xl p-8 items-center">
              <DollarSign size={48} color="#6b7280" />
              <Text className="text-gray-400 text-lg mt-4">No financial data found</Text>
            </View>
          ) : (
            data.map((monthData, index) => {
              const isCollapsed = collapsedSections[monthData.month];
              const hasTransactions = monthData.items.filter(item => 'transaction_id' in item).length > 0;
              const hasExpenses = monthData.items.filter(item => !('transaction_id' in item)).length > 0;

              return (
                <View key={index} className="mb-6 bg-white/5 rounded-2xl overflow-hidden">
                  {/* Month Header - Collapsible */}
                  <TouchableOpacity 
                    onPress={() => toggleSection(monthData.month)}
                    className="p-6 flex-row justify-between items-center bg-white/10"
                  >
                    <View className="flex-1">
                      <Text className="text-white text-xl font-bold">{monthData.month}</Text>
                      <Text className="text-gray-400 text-sm mt-1">
                        {monthData.items.length} total items • 
                        Revenue: KES {monthData.totalTransactions?.toLocaleString() || '0'} • 
                        Expenses: KES {monthData.totalExpenses?.toLocaleString() || '0'}
                      </Text>
                    </View>
                    {isCollapsed ? (
                      <ChevronDown size={24} color="#9ca3af" />
                    ) : (
                      <ChevronUp size={24} color="#9ca3af" />
                    )}
                  </TouchableOpacity>

                  {!isCollapsed && (
                    <View className="p-6">
                      {/* Monthly Summary Card */}
                      <View className="bg-gradient-to-r from-[#1f2937] to-[#111827] p-6 rounded-xl mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                          <View className="flex-row items-center">
                            <DollarSign size={24} color="#4ade80" />
                            <Text className="text-white text-lg font-semibold ml-3">Revenue</Text>
                          </View>
                          <Text className="text-[#4ade80] text-xl font-bold">
                            KES {monthData.totalTransactions?.toLocaleString() || '0'}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <View className="flex-row items-center">
                            <FileText size={24} color="#f87171" />
                            <Text className="text-white text-lg font-semibold ml-3">Expenses</Text>
                          </View>
                          <Text className="text-[#f87171] text-xl font-bold">
                            KES {monthData.totalExpenses?.toLocaleString() || '0'}
                          </Text>
                        </View>
                      </View>

                      {/* Content Layout - Different for desktop/mobile */}
                      {isDesktop ? (
                        // Desktop Layout - Side by side
                        <View className="flex-row gap-6">
                          {/* Transactions Column */}
                          <View className="flex-1">
                            <Text className="text-[#4ade80] text-lg font-semibold mb-4">Transactions</Text>
                            {!hasTransactions ? (
                              <View className="bg-white/5 rounded-xl p-6 items-center">
                                <DollarSign size={32} color="#4ade80" opacity={0.5} />
                                <Text className="text-gray-400 text-sm mt-2">No transactions found</Text>
                              </View>
                            ) : (
                              monthData.items.filter(item => 'transaction_id' in item).map((item, itemIndex) => (
                                <TransactionCard 
                                  key={`transaction-${itemIndex}`} 
                                  item={item as Transaction} 
                                  onViewDetails={viewDetails}
                                />
                              ))
                            )}
                          </View>

                          {/* Expenses Column */}
                          <View className="flex-1">
                            <Text className="text-[#f87171] text-lg font-semibold mb-4">Expenses</Text>
                            {!hasExpenses ? (
                              <View className="bg-white/5 rounded-xl p-6 items-center">
                                <FileText size={32} color="#f87171" opacity={0.5} />
                                <Text className="text-gray-400 text-sm mt-2">No expenses found</Text>
                              </View>
                            ) : (
                              monthData.items.filter(item => !('transaction_id' in item)).map((item, itemIndex) => (
                                <ExpenseCard 
                                  key={`expense-${itemIndex}`} 
                                  item={item as Expense} 
                                  onViewDetails={viewDetails}
                                />
                              ))
                            )}
                          </View>
                        </View>
                      ) : (
                        // Mobile Layout - Stacked
                        <View>
                          {/* Transactions Section */}
                          <Text className="text-[#4ade80] text-lg font-semibold mb-4">Transactions</Text>
                          {!hasTransactions ? (
                            <View className="bg-white/5 rounded-xl p-6 items-center mb-6">
                              <DollarSign size={32} color="#4ade80" opacity={0.5} />
                              <Text className="text-gray-400 text-sm mt-2">No transactions found</Text>
                            </View>
                          ) : (
                            monthData.items.filter(item => 'transaction_id' in item).map((item, itemIndex) => (
                              <TransactionCard 
                                key={`transaction-${itemIndex}`} 
                                item={item as Transaction} 
                                onViewDetails={viewDetails}
                              />
                            ))
                          )}

                          {/* Expenses Section */}
                          <Text className="text-[#f87171] text-lg font-semibold mb-4 mt-6">Expenses</Text>
                          {!hasExpenses ? (
                            <View className="bg-white/5 rounded-xl p-6 items-center">
                              <FileText size={32} color="#f87171" opacity={0.5} />
                              <Text className="text-gray-400 text-sm mt-2">No expenses found</Text>
                            </View>
                          ) : (
                            monthData.items.filter(item => !('transaction_id' in item)).map((item, itemIndex) => (
                              <ExpenseCard 
                                key={`expense-${itemIndex}`} 
                                item={item as Expense} 
                                onViewDetails={viewDetails}
                              />
                            ))
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Professional Detail Modal */}
      <ProfessionalModal 
        visible={modalVisible}
        item={selectedItem}
        onClose={closeModal}
      />
    </View>
  );
};

// Transaction Card Component
const TransactionCard = ({ item, onViewDetails }: { item: Transaction, onViewDetails: (item: Transaction) => void }) => (
  <LinearGradient
    colors={['#1f2937', '#111827']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    className="p-4 rounded-xl mb-3"
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        <View className="bg-[#4ade80]/20 p-2 rounded-lg">
          <DollarSign size={20} color="#4ade80" />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-white font-semibold">Payment Received</Text>
          <Text className="text-gray-300 text-sm">From: {item.sender_name || 'N/A'}</Text>
          <Text className="text-gray-400 text-xs mt-1">
            Acc: {item.account_number || 'N/A'} • {item.payment_date ? new Date(item.payment_date).toLocaleDateString() : 'No date'}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="font-bold text-lg text-[#4ade80]">
          KES {(item.amount || 0).toLocaleString()}
        </Text>
        <TouchableOpacity 
          onPress={() => onViewDetails(item)}
          className="mt-2 bg-white/10 px-3 py-1 rounded-full"
        >
          <Eye size={14} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
);

// Expense Card Component
const ExpenseCard = ({ item, onViewDetails }: { item: Expense, onViewDetails: (item: Expense) => void }) => (
  <LinearGradient
    colors={['#2d2d3e', '#1f202a']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    className="p-4 rounded-xl mb-3"
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        <View className="bg-[#f87171]/20 p-2 rounded-lg">
          <FileText size={20} color="#f87171" />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-white font-semibold">{item.item_name || 'Expense'}</Text>
          <Text className="text-gray-300 text-sm">{item.category || 'No category'}</Text>
          <Text className="text-gray-400 text-xs mt-1">
            {item.expense_date ? new Date(item.expense_date).toLocaleDateString() : 'No date'} • Status: {item.status || 'N/A'}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="font-bold text-lg text-[#f87171]">
          KES {(item.total_cost || 0).toLocaleString()}
        </Text>
        <TouchableOpacity 
          onPress={() => onViewDetails(item)}
          className="mt-2 bg-white/10 px-3 py-1 rounded-full"
        >
          <Eye size={14} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
);

// Professional Modal Component
interface ProfessionalModalProps {
  visible: boolean;
  item: Transaction | Expense | null;
  onClose: () => void;
}

const ProfessionalModal = ({ visible, item, onClose }: ProfessionalModalProps) => {
  const modalWidth = isDesktop ? 'w-1/2' : 'w-11/12';
  const modalMaxHeight = isDesktop ? 'max-h-96' : 'max-h-80';

  if (!item) return null;

  const isTransaction = 'transaction_id' in item;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={50} tint="dark" className="flex-1 justify-center items-center p-4">
        <View className={`bg-[#2A2F45] rounded-2xl ${modalWidth} ${modalMaxHeight} shadow-2xl border border-white/10`}>
          {/* Header */}
          <View className="flex-row justify-between items-center p-6 border-b border-white/10">
            <View className="flex-row items-center">
              <View className={`p-2 rounded-lg mr-3 ${isTransaction ? 'bg-[#4ade80]/20' : 'bg-[#f87171]/20'}`}>
                {isTransaction ? (
                  <DollarSign size={24} color="#4ade80" />
                ) : (
                  <FileText size={24} color="#f87171" />
                )}
              </View>
              <View>
                <Text className="text-white text-xl font-bold">
                  {isTransaction ? 'Transaction Details' : 'Expense Details'}
                </Text>
                <Text className="text-gray-400 text-sm">
                  {isTransaction ? 'Payment Information' : 'Expense Record'}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={onClose}
              className="bg-white/10 p-2 rounded-full"
            >
              <Text className="text-white text-lg font-bold">×</Text>
            </TouchableOpacity>
          </View>
          
          {/* Content */}
          <ScrollView className="p-6">
            <View className="space-y-4">
              {isTransaction ? (
                <>
                  <DetailRow label="Transaction ID" value={item.transaction_id || 'N/A'} />
                  <DetailRow label="Amount" value={`KES ${(item.amount || 0).toLocaleString()}`} />
                  <DetailRow label="Account Number" value={item.account_number || 'N/A'} />
                  <DetailRow label="Sender Name" value={item.sender_name || 'N/A'} />
                  <DetailRow label="Payment Date" value={
                    item.payment_date ? new Date(item.payment_date).toLocaleString() : 'No date'
                  } />
                  <DetailRow label="Status" value={item.status || 'N/A'} />
                  <DetailRow label="Created" value={
                    item.created_at ? new Date(item.created_at).toLocaleString() : 'No date'
                  } />
                </>
              ) : (
                <>
                  <DetailRow label="Expense Code" value={item.expense_code || 'N/A'} />
                  <DetailRow label="Item Name" value={item.item_name || 'N/A'} />
                  <DetailRow label="Category" value={item.category || 'N/A'} />
                  <DetailRow label="Description" value={item.description || 'No description'} />
                  <DetailRow label="Supplier" value={item.supplier_name || 'N/A'} />
                  <DetailRow label="Quantity" value={item.quantity?.toString() || '1'} />
                  <DetailRow label="Unit Price" value={`KES ${(item.unit_price || 0).toLocaleString()}`} />
                  <DetailRow label="Total Cost" value={`KES ${(item.total_cost || 0).toLocaleString()}`} />
                  <DetailRow label="Payment Method" value={item.payment_method || 'N/A'} />
                  <DetailRow label="Status" value={item.status || 'N/A'} />
                  <DetailRow label="Expense Date" value={
                    item.expense_date ? new Date(item.expense_date).toLocaleString() : 'No date'
                  } />
                </>
              )}
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="p-6 border-t border-white/10">
            <TouchableOpacity
              onPress={onClose}
              className={`py-3 rounded-lg ${isTransaction ? 'bg-[#4ade80]' : 'bg-[#f87171]'}`}
            >
              <Text className="text-white font-bold text-center text-base">Close Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <View className="flex-row justify-between items-start py-2 border-b border-white/5">
    <Text className="text-gray-400 text-sm font-medium flex-1">{label}</Text>
    <Text className="text-white text-sm font-semibold flex-1 text-right">{value}</Text>
  </View>
);

export default TransactionsPage;