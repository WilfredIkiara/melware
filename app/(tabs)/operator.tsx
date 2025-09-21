// // import React, { useState } from 'react'
// // import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Modal } from 'react-native'
// // import { useApp } from '@/lib/store'
// // import { BlurView } from 'expo-blur'
// // import { DollarSign, Users, Car, CheckCircle, XCircle, Plus, Minus, User, Package, CreditCard, Search, Wrench, Lock, Bell, Settings, MapPin } from 'lucide-react'
// // import { images } from '@/constants/images'

// // export default function Operator() {

// //   const branchName = "Main Branch"
// //   const todayStats = {
// //     revenue: 25000,
// //     jobsCompleted: 12,
// //     pendingJobs: 5,
// //     expenses: 5000,
// //     staffAttendance: 8 // out of 10
// //   }

// //   const { cars, clients, employees } = useApp()
// //   const [activeModal, setActiveModal] = useState<string | null>(null)
// //   const [searchQuery, setSearchQuery] = useState('')
// //   const [passwordModal, setPasswordModal] = useState(false)
// //   const [password, setPassword] = useState('')

// //   // Modal states
// //   const [customerForm, setCustomerForm] = useState({ name: '', phone: '', carPlate: '', carMake: '', carModel: '', mileage: '' })
// //   const [jobForm, setJobForm] = useState({ customerId: '', carId: '', issue: '', mechanicId: '' })
// //   const [inventoryForm, setInventoryForm] = useState({ name: '', quantity: '', price: '', supplier: '' })
// //   const [paymentForm, setPaymentForm] = useState({ customerId: '', jobId: '', amount: '', method: '' })

// //   const activeJobs = cars.filter(car => car.working)
// //   const filteredCustomers = clients.filter(c => 
// //     c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     c.phone.includes(searchQuery)
// //   )

// //   const handleAddCustomer = () => {
// //     if (!customerForm.name || !customerForm.phone) {
// //       Alert.alert('Error', 'Please fill in all required fields')
// //       return
// //     }
// //     Alert.alert('Success', 'Customer added successfully!')
// //     setCustomerForm({ name: '', phone: '', carPlate: '', carMake: '', carModel: '', mileage: '' })
// //     setActiveModal(null)
// //   }

// //   const handleAddJob = () => {
// //     if (!jobForm.customerId || !jobForm.carId || !jobForm.issue) {
// //       Alert.alert('Error', 'Please fill in all required fields')
// //       return
// //     }
// //     Alert.alert('Success', 'Job added successfully!')
// //     setJobForm({ customerId: '', carId: '', issue: '', mechanicId: '' })
// //     setActiveModal(null)
// //   }

// //   const handleAddInventory = () => {
// //     if (!inventoryForm.name || !inventoryForm.quantity) {
// //       Alert.alert('Error', 'Please fill in all required fields')
// //       return
// //     }
// //     Alert.alert('Success', 'Inventory item added successfully!')
// //     setInventoryForm({ name: '', quantity: '', price: '', supplier: '' })
// //     setActiveModal(null)
// //   }

// //   const handleRecordPayment = () => {
// //     if (!paymentForm.customerId || !paymentForm.amount) {
// //       Alert.alert('Error', 'Please fill in all required fields')
// //       return
// //     }
// //     Alert.alert('Success', 'Payment recorded successfully!')
// //     setPaymentForm({ customerId: '', jobId: '', amount: '', method: '' })
// //     setActiveModal(null)
// //   }

// //   const handleDeleteInventory = () => {
// //     setPasswordModal(true)
// //   }

// //   const verifyPassword = () => {
// //     if (password === 'admin123') { // Mock password
// //       Alert.alert('Success', 'Inventory item deleted!')
// //       setPasswordModal(false)
// //       setPassword('')
// //     } else {
// //       Alert.alert('Error', 'Incorrect password')
// //     }
// //   }

// //   const updateJobProgress = (jobId: string, status: string) => {
// //     Alert.alert('Success', `Job status updated to ${status}`)
// //   }

// //   return (
// //     <View className="flex-1 bg-[#0A0F1E] pt-14">
// //       {/* Header / Top Bar */}
// //       <View className="flex-row items-center justify-between px-6 mb-4">
// //         <View className="flex-row items-center space-x-4">
// //           <Image source={images.tristarlogo} style={{ width: 104, height: 44 }} />
// //           <Text className="text-white text-xl font-bold">Operator Dashboard</Text>
// //         </View>
// //        <View className="flex-row items-center space-x-6">
// //                   <TouchableOpacity>
// //                     <Bell size={24} color="red" />
// //                   </TouchableOpacity>
// //                   <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
// //                     <MapPin size={16} color="green" />
// //                     <Text className="text-white">{branchName}</Text>
// //                   </TouchableOpacity>
// //                   <TouchableOpacity>
// //                     <Settings size={24} color="white" />
// //                   </TouchableOpacity>
                  
// //                 </View>
// //       </View>

// //       <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
// //         {/* Quick Action Buttons */}
// //         <View className="flex-row flex-wrap gap-4">
// //           <TouchableOpacity 
// //             onPress={() => setActiveModal('customer')}
// //             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
// //           >
// //             <User size={24} color="white" />
// //             <Text className="text-white text-sm mt-2">Add Customer</Text>
// //           </TouchableOpacity>
          
// //           <TouchableOpacity 
// //             onPress={() => setActiveModal('job')}
// //             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
// //           >
// //             <Wrench size={24} color="white" />
// //             <Text className="text-white text-sm mt-2">Add Job</Text>
// //           </TouchableOpacity>
          
// //           <TouchableOpacity 
// //             onPress={() => setActiveModal('inventory')}
// //             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
// //           >
// //             <Package size={24} color="white" />
// //             <Text className="text-white text-sm mt-2">Add Inventory</Text>
// //           </TouchableOpacity>
          
// //           <TouchableOpacity 
// //             onPress={() => setActiveModal('payment')}
// //             className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
// //           >
// //             <CreditCard size={24} color="white" />
// //             <Text className="text-white text-sm mt-2">Record Payment</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Current Jobs */}
// //         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
// //           <Text className="text-xl font-bold text-white mb-4">Current Jobs</Text>
// //           {activeJobs.map(job => (
// //             <View key={job.id} className="bg-white/10 rounded p-3 mb-2">
// //               <View className="flex-row justify-between items-center mb-2">
// //                 <Text className="text-white font-semibold">{job.model}</Text>
// //                 <Text className="text-green-400 font-bold">Active</Text>
// //               </View>
// //               <Text className="text-gray-300 text-sm">Owner: {job.owner}</Text>
// //               <Text className="text-gray-300 text-sm">Work: {job.work}</Text>
// //               <View className="flex-row space-x-2 mt-2">
// //                 <TouchableOpacity 
// //                   onPress={() => updateJobProgress(job.id, 'diagnosed')}
// //                   className="bg-blue-600 rounded px-3 py-1"
// //                 >
// //                   <Text className="text-white text-sm">Diagnosed</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity 
// //                   onPress={() => updateJobProgress(job.id, 'in-progress')}
// //                   className="bg-yellow-600 rounded px-3 py-1"
// //                 >
// //                   <Text className="text-white text-sm">In Progress</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity 
// //                   onPress={() => updateJobProgress(job.id, 'done')}
// //                   className="bg-green-600 rounded px-3 py-1"
// //                 >
// //                   <Text className="text-white text-sm">Done</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //           ))}
// //         </BlurView>

// //         {/* Customer List */}
// //         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
// //           <Text className="text-xl font-bold text-white mb-4">Customer List</Text>
// //           <View className="flex-row items-center bg-white/10 rounded-lg px-3 py-2 mb-4">
// //             <Search size={20} color="white" />
// //             <TextInput
// //               value={searchQuery}
// //               onChangeText={setSearchQuery}
// //               placeholder="Search customers..."
// //               placeholderTextColor="#9ca3af"
// //               className="flex-1 text-white ml-2"
// //             />
// //           </View>
// //           {filteredCustomers.map(cust => (
// //             <TouchableOpacity key={cust.id} className="bg-white/10 rounded p-3 mb-2">
// //               <View className="flex-row items-center space-x-3">
// //                 <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
// //                 <View>
// //                   <Text className="text-white font-semibold">{cust.name}</Text>
// //                   <Text className="text-gray-300 text-sm">{cust.phone}</Text>
// //                   <Text className="text-gray-400 text-xs">Cars: {cust.cars.join(', ')}</Text>
// //                 </View>
// //               </View>
// //             </TouchableOpacity>
// //           ))}
// //         </BlurView>

// //         {/* Inventory Snapshot */}
// //         <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
// //           <Text className="text-xl font-bold text-white mb-4">Inventory (View Only)</Text>
// //           <View className="bg-white/10 rounded p-3 mb-2 flex-row justify-between items-center">
// //             <View>
// //               <Text className="text-white">Engine Oil</Text>
// //               <Text className="text-gray-300 text-sm">Current: 15 | Min: 20</Text>
// //             </View>
// //             <TouchableOpacity 
// //               onPress={handleDeleteInventory}
// //               className="bg-red-600 rounded px-3 py-1"
// //             >
// //               <Text className="text-white text-sm">Delete</Text>
// //             </TouchableOpacity>
// //           </View>
// //           <View className="bg-white/10 rounded p-3 mb-2 flex-row justify-between items-center">
// //             <View>
// //               <Text className="text-white">Brake Pads</Text>
// //               <Text className="text-gray-300 text-sm">Current: 25 | Min: 10</Text>
// //             </View>
// //             <TouchableOpacity 
// //               onPress={handleDeleteInventory}
// //               className="bg-red-600 rounded px-3 py-1"
// //             >
// //               <Text className="text-white text-sm">Delete</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </BlurView>
// //       </ScrollView>

// //       {/* Footer Quick Actions */}
// //       <View className="h-16 bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700">
// //         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
// //           <Plus size={20} color="white" />
// //           <Text className="text-white font-semibold">Add Customer</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
// //           <Wrench size={20} color="white" />
// //           <Text className="text-white font-semibold">Add Job</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
// //           <Package size={20} color="white" />
// //           <Text className="text-white font-semibold">Add Item</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
// //           <CreditCard size={20} color="white" />
// //           <Text className="text-white font-semibold">Payments</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Add Customer Modal */}
// //       <Modal visible={activeModal === 'customer'} animationType="slide" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/50">
// //           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
// //             <Text className="text-white text-xl font-bold mb-4">Add New Customer</Text>
// //             <TextInput
// //               value={customerForm.name}
// //               onChangeText={(text) => setCustomerForm({...customerForm, name: text})}
// //               placeholder="Customer Name"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.phone}
// //               onChangeText={(text) => setCustomerForm({...customerForm, phone: text})}
// //               placeholder="Phone Number"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="phone-pad"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.carPlate}
// //               onChangeText={(text) => setCustomerForm({...customerForm, carPlate: text})}
// //               placeholder="Car Plate"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.carMake}
// //               onChangeText={(text) => setCustomerForm({...customerForm, carMake: text})}
// //               placeholder="Car Make"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.carModel}
// //               onChangeText={(text) => setCustomerForm({...customerForm, carModel: text})}
// //               placeholder="Car Model"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={customerForm.mileage}
// //               onChangeText={(text) => setCustomerForm({...customerForm, mileage: text})}
// //               placeholder="Mileage"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={handleAddCustomer}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Add Customer</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => setActiveModal(null)}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>

// //       {/* Add Job Modal */}
// //       <Modal visible={activeModal === 'job'} animationType="slide" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/50">
// //           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
// //             <Text className="text-white text-xl font-bold mb-4">Add New Job</Text>
// //             <TextInput
// //               value={jobForm.customerId}
// //               onChangeText={(text) => setJobForm({...jobForm, customerId: text})}
// //               placeholder="Select Customer"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={jobForm.carId}
// //               onChangeText={(text) => setJobForm({...jobForm, carId: text})}
// //               placeholder="Select Car"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={jobForm.issue}
// //               onChangeText={(text) => setJobForm({...jobForm, issue: text})}
// //               placeholder="Issue Description"
// //               placeholderTextColor="#9ca3af"
// //               multiline
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3 h-20"
// //             />
// //             <TextInput
// //               value={jobForm.mechanicId}
// //               onChangeText={(text) => setJobForm({...jobForm, mechanicId: text})}
// //               placeholder="Assign Mechanic"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={handleAddJob}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Add Job</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => setActiveModal(null)}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>

// //       {/* Add Inventory Modal */}
// //       <Modal visible={activeModal === 'inventory'} animationType="slide" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/50">
// //           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
// //             <Text className="text-white text-xl font-bold mb-4">Add Inventory Item</Text>
// //             <TextInput
// //               value={inventoryForm.name}
// //               onChangeText={(text) => setInventoryForm({...inventoryForm, name: text})}
// //               placeholder="Item Name"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={inventoryForm.quantity}
// //               onChangeText={(text) => setInventoryForm({...inventoryForm, quantity: text})}
// //               placeholder="Quantity"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={inventoryForm.price}
// //               onChangeText={(text) => setInventoryForm({...inventoryForm, price: text})}
// //               placeholder="Price (KES)"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={inventoryForm.supplier}
// //               onChangeText={(text) => setInventoryForm({...inventoryForm, supplier: text})}
// //               placeholder="Supplier"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={handleAddInventory}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Add Item</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => setActiveModal(null)}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>

// //       {/* Record Payment Modal */}
// //       <Modal visible={activeModal === 'payment'} animationType="slide" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/50">
// //           <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
// //             <Text className="text-white text-xl font-bold mb-4">Record Payment</Text>
// //             <TextInput
// //               value={paymentForm.customerId}
// //               onChangeText={(text) => setPaymentForm({...paymentForm, customerId: text})}
// //               placeholder="Select Customer"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={paymentForm.jobId}
// //               onChangeText={(text) => setPaymentForm({...paymentForm, jobId: text})}
// //               placeholder="Select Job"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={paymentForm.amount}
// //               onChangeText={(text) => setPaymentForm({...paymentForm, amount: text})}
// //               placeholder="Amount (KES)"
// //               placeholderTextColor="#9ca3af"
// //               keyboardType="numeric"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
// //             />
// //             <TextInput
// //               value={paymentForm.method}
// //               onChangeText={(text) => setPaymentForm({...paymentForm, method: text})}
// //               placeholder="Payment Method"
// //               placeholderTextColor="#9ca3af"
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={handleRecordPayment}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Record Payment</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => setActiveModal(null)}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>

// //       {/* Password Modal for Inventory Deletion */}
// //       <Modal visible={passwordModal} animationType="fade" transparent>
// //         <View className="flex-1 justify-center items-center bg-black/70">
// //           <BlurView intensity={80} tint="dark" className="w-10/12 rounded-2xl p-6">
// //             <View className="flex-row items-center mb-4">
// //               <Lock size={24} color="#DC2626" />
// //               <Text className="text-white text-lg font-bold ml-2">Admin Authorization Required</Text>
// //             </View>
// //             <Text className="text-gray-300 mb-4">Enter admin password to delete inventory item:</Text>
// //             <TextInput
// //               value={password}
// //               onChangeText={setPassword}
// //               placeholder="Enter password"
// //               placeholderTextColor="#9ca3af"
// //               secureTextEntry
// //               className="bg-white/10 text-white rounded-lg px-4 py-3 mb-4"
// //             />
// //             <View className="flex-row space-x-3">
// //               <TouchableOpacity 
// //                 onPress={verifyPassword}
// //                 className="flex-1 bg-red-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Verify</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity 
// //                 onPress={() => {
// //                   setPasswordModal(false)
// //                   setPassword('')
// //                 }}
// //                 className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
// //               >
// //                 <Text className="text-white font-semibold">Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </BlurView>
// //         </View>
// //       </Modal>
// //     </View>
// //   )
// // }
// // app/(tabs)/operator.tsx
// import { Text, View } from 'react-native';

// export default function OperatorScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Operator Screen - Coming Soon</Text>
//     </View>
//   );
// }
import { BlurView } from 'expo-blur';
import { AlertTriangle, Bell, Car, CreditCard, DollarSign, MapPin, Package, Plus, Search, Settings, User, Users, Wrench } from 'lucide-react';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { images } from '../../constants/images';
import { useAuth } from '../../lib/auth';
import { useCustomers, useOperatorData } from '../../lib/pages/useOperatorData';

export default function Operator() {
  const { user } = useAuth();
  // const branchName = user?.location || "Main Branch";
  const branchName =  "Main Branch";
  const { stats, activeJobs, appointments, lowInventory, loading, error, refetch } = useOperatorData();
  const [searchQuery, setSearchQuery] = useState('');
  const { customers, loading: customersLoading } = useCustomers(searchQuery);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [passwordModal, setPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  // Modal states
  const [customerForm, setCustomerForm] = useState({
    first_name: '', 
    last_name: '', 
    email: '', 
    phone_number: '', 
    address: '', 
    licence_plate: '', 
    registration_make: ''
  });
  
  const [jobForm, setJobForm] = useState({ 
    client_id: '', 
    vehicle_id: '', 
    services: '', 
    assigned_staff: '', 
    estimated_cost: '' 
  });

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#DC2626" />
        <Text className="text-white mt-4">Loading dashboard data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-4">
        <Text className="text-red-500 text-lg mb-4">Error: {error}</Text>
        <TouchableOpacity onPress={refetch} className="bg-red-600 px-6 py-3 rounded-lg">
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddCustomer = async () => {
    // Implementation for adding customer
    Alert.alert('Success', 'Customer added successfully!');
    setActiveModal(null);
  };

  const handleAddJob = async () => {
    // Implementation for adding job
    Alert.alert('Success', 'Job added successfully!');
    setActiveModal(null);
  };

  const updateJobStatus = async (jobId: string, status: string) => {
    // Implementation for updating job status
    Alert.alert('Success', `Job status updated to ${status}`);
  };

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 mb-4">
        <View className="flex-row items-center space-x-4">
          <Image source={images.tristarlogo} style={{ width: 104, height: 44 }} />
          <Text className="text-white text-xl font-bold">Operator Dashboard</Text>
        </View>
        <View className="flex-row items-center space-x-6">
          <TouchableOpacity>
            <Bell size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center space-x-1 bg-white/10 rounded px-3 py-1">
            <MapPin size={16} color="green" />
            <Text className="text-white">{branchName}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Stats Overview */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          <View className="bg-red-600 p-4 rounded-xl flex-1 min-w-[45%]">
            <DollarSign size={24} color="white" />
            <Text className="text-white text-lg font-bold mt-2">KES {stats?.revenue?.toLocaleString() || 0}</Text>
            <Text className="text-white text-sm">Today's Revenue</Text>
          </View>
          
          <View className="bg-blue-600 p-4 rounded-xl flex-1 min-w-[45%]">
            <Users size={24} color="white" />
            <Text className="text-white text-lg font-bold mt-2">{stats?.activeJobs || 0}</Text>
            <Text className="text-white text-sm">Active Jobs</Text>
          </View>
          
          <View className="bg-green-600 p-4 rounded-xl flex-1 min-w-[45%]">
            <Car size={24} color="white" />
            <Text className="text-white text-lg font-bold mt-2">{stats?.jobsCompleted || 0}</Text>
            <Text className="text-white text-sm">Jobs Completed</Text>
          </View>
          
          <View className="bg-yellow-600 p-4 rounded-xl flex-1 min-w-[45%]">
            <AlertTriangle size={24} color="white" />
            <Text className="text-white text-lg font-bold mt-2">{lowInventory.length}</Text>
            <Text className="text-white text-sm">Low Stock Items</Text>
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View className="flex-row flex-wrap gap-4 mb-6">
          <TouchableOpacity 
            onPress={() => setActiveModal('customer')}
            className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
          >
            <User size={24} color="white" />
            <Text className="text-white text-sm mt-2">Add Customer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveModal('job')}
            className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
          >
            <Wrench size={24} color="white" />
            <Text className="text-white text-sm mt-2">Add Job</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveModal('inventory')}
            className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
          >
            <Package size={24} color="white" />
            <Text className="text-white text-sm mt-2">Add Inventory</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setActiveModal('payment')}
            className="bg-red-600 p-4 rounded-xl items-center flex-1 min-w-[45%]"
          >
            <CreditCard size={24} color="white" />
            <Text className="text-white text-sm mt-2">Record Payment</Text>
          </TouchableOpacity>
        </View>

        {/* Current Jobs */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-6">
          <Text className="text-xl font-bold text-white mb-4">Current Jobs</Text>
          {activeJobs.map(job => (
            <View key={job.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white font-semibold">
                  {job.client_vehicles?.make} - {job.client_vehicles?.licence_plate}
                </Text>
                <Text className={`font-bold ${
                  job.status === 'pending' ? 'text-yellow-400' :
                  job.status === 'in-progress' ? 'text-blue-400' :
                  'text-green-400'
                }`}>
                  {job.status}
                </Text>
              </View>
              <Text className="text-gray-300 text-sm">
                Owner: {job.clients?.first_name} {job.clients?.last_name}
              </Text>
              <Text className="text-gray-300 text-sm">
                Cost: KES {job.total_cost?.toLocaleString() || '0'}
              </Text>
              <View className="flex-row space-x-2 mt-2">
                <TouchableOpacity 
                  onPress={() => updateJobStatus(job.id, 'in-progress')}
                  className="bg-blue-600 rounded px-3 py-1"
                >
                  <Text className="text-white text-sm">Start</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => updateJobStatus(job.id, 'done')}
                  className="bg-green-600 rounded px-3 py-1"
                >
                  <Text className="text-white text-sm">Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </BlurView>

        {/* Today's Appointments */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-6">
          <Text className="text-xl font-bold text-white mb-4">Today's Appointments</Text>
          {appointments.map(appointment => (
            <View key={appointment.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white font-semibold">{appointment.service_type}</Text>
                <Text className="text-gray-300 text-sm">
                  {new Date(appointment.scheduled_time).toLocaleTimeString()}
                </Text>
              </View>
              <Text className="text-gray-300 text-sm">
                {appointment.clients?.first_name} {appointment.clients?.last_name} - {appointment.clients?.phone_number}
              </Text>
              <Text className="text-gray-300 text-sm">
                Vehicle: {appointment.client_vehicles?.make} ({appointment.client_vehicles?.licence_plate})
              </Text>
            </View>
          ))}
        </BlurView>

        {/* Customer List */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-6">
          <Text className="text-xl font-bold text-white mb-4">Customer List</Text>
          <View className="flex-row items-center bg-white/10 rounded-lg px-3 py-2 mb-4">
            <Search size={20} color="white" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search customers..."
              placeholderTextColor="#9ca3af"
              className="flex-1 text-white ml-2"
            />
          </View>
          {customers.map(customer => (
            <TouchableOpacity key={customer.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row items-center space-x-3">
                <View className="w-8 h-8 bg-red-600 rounded-full items-center justify-center">
                  <Text className="text-white font-bold">
                    {customer.first_name[0]}{customer.last_name[0]}
                  </Text>
                </View>
                <View>
                  <Text className="text-white font-semibold">
                    {customer.first_name} {customer.last_name}
                  </Text>
                  <Text className="text-gray-300 text-sm">{customer.phone_number}</Text>
                  <Text className="text-gray-400 text-xs">
                    Vehicles: {customer.client_vehicles?.map(v => v.make).join(', ') || 'None'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </BlurView>

        {/* Low Inventory Alert */}
        {lowInventory.length > 0 && (
          <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-6">
            <Text className="text-xl font-bold text-white mb-4">Low Inventory Alert</Text>
            {lowInventory.map((item, index) => (
              <View key={index} className="bg-yellow-600/20 rounded p-3 mb-2">
                <Text className="text-white font-semibold">{item.item_name}</Text>
                <Text className="text-yellow-300 text-sm">
                  Current Stock: {item.current_stock} (Low stock!)
                </Text>
              </View>
            ))}
          </BlurView>
        )}
      </ScrollView>

      {/* Footer Quick Actions */}
      <View className="h-16 bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700">
        <TouchableOpacity 
          onPress={() => setActiveModal('customer')}
          className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2"
        >
          <Plus size={20} color="white" />
          <Text className="text-white font-semibold">Add Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveModal('job')}
          className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2"
        >
          <Wrench size={20} color="white" />
          <Text className="text-white font-semibold">Add Job</Text>
        </TouchableOpacity>
      </View>

      {/* Add Customer Modal */}
      <Modal visible={activeModal === 'customer'} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/50">
          <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
            <Text className="text-white text-xl font-bold mb-4">Add New Customer</Text>
            <TextInput
              value={customerForm.first_name}
              onChangeText={(text) => setCustomerForm({...customerForm, first_name: text})}
              placeholder="First Name"
              placeholderTextColor="#9ca3af"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
            />
            <TextInput
              value={customerForm.last_name}
              onChangeText={(text) => setCustomerForm({...customerForm, last_name: text})}
              placeholder="Last Name"
              placeholderTextColor="#9ca3af"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
            />
            <TextInput
              value={customerForm.email}
              onChangeText={(text) => setCustomerForm({...customerForm, email: text})}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
            />
            <TextInput
              value={customerForm.phone_number}
              onChangeText={(text) => setCustomerForm({...customerForm, phone_number: text})}
              placeholder="Phone Number"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
            />
            <View className="flex-row space-x-3">
              <TouchableOpacity 
                onPress={handleAddCustomer}
                className="flex-1 bg-red-600 rounded-lg py-3 items-center"
              >
                <Text className="text-white font-semibold">Add Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setActiveModal(null)}
                className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>

      {/* Add Job Modal */}
      <Modal visible={activeModal === 'job'} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/50">
          <BlurView intensity={80} tint="dark" className="w-11/12 rounded-2xl p-6">
            <Text className="text-white text-xl font-bold mb-4">Add New Job</Text>
            <TextInput
              value={jobForm.client_id}
              onChangeText={(text) => setJobForm({...jobForm, client_id: text})}
              placeholder="Client ID"
              placeholderTextColor="#9ca3af"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
            />
            <TextInput
              value={jobForm.vehicle_id}
              onChangeText={(text) => setJobForm({...jobForm, vehicle_id: text})}
              placeholder="Vehicle ID"
              placeholderTextColor="#9ca3af"
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3"
            />
            <TextInput
              value={jobForm.services}
              onChangeText={(text) => setJobForm({...jobForm, services: text})}
              placeholder="Services (JSON)"
              placeholderTextColor="#9ca3af"
              multiline
              className="bg-white/10 text-white rounded-lg px-4 py-3 mb-3 h-20"
            />
            <View className="flex-row space-x-3">
              <TouchableOpacity 
                onPress={handleAddJob}
                className="flex-1 bg-red-600 rounded-lg py-3 items-center"
              >
                <Text className="text-white font-semibold">Add Job</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setActiveModal(null)}
                className="flex-1 bg-gray-600 rounded-lg py-3 items-center"
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}