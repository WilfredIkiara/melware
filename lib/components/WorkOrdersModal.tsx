// components/WorkOrderModal.tsx
import { BlurView } from 'expo-blur';
import { Calendar, Car, ClipboardList, DollarSign, User, X } from 'lucide-react';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface WorkOrder {
  id: string;
  client_id: string;
  vehicle_id: string;
  services: any[];
  assigned_staff: string;
  estimated_cost: number;
  status: string;
  created_at: string;
  clients?: { first_name: string; last_name: string; email: string };
  client_vehicles?: { make: string; model: string; licence_plate: string };
  staff?: { first_name: string; last_name: string };
}

interface WorkOrderModalProps {
  visible: boolean;
  workOrder: WorkOrder | null;
  onClose: () => void;
}

export default function WorkOrderModal({ visible, workOrder, onClose }: WorkOrderModalProps) {
  if (!workOrder) return null;

  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={50} tint="dark" className="flex-1 justify-center items-center p-4">
        <View className="bg-[#2A2F45] rounded-2xl max-w-md w-full max-h-96">
          {/* Header */}
          <View className="flex-row justify-between items-center p-6 border-b border-gray-700">
            <View className="flex-row items-center">
              <ClipboardList size={24} color="#6366f1" className="mr-2" />
              <Text className="text-white text-xl font-bold">Work Order Details</Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-2">
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Content */}
          <ScrollView className="p-6">
            <View className="space-y-4">
              <DetailRow icon={<User size={16} color="#6366f1" />} label="Client" value={`${workOrder.clients?.first_name} ${workOrder.clients?.last_name}`} />
              <DetailRow icon={<Car size={16} color="#6366f1" />} label="Vehicle" value={`${workOrder.client_vehicles?.make} - ${workOrder.client_vehicles?.licence_plate}`} />
              <DetailRow icon={<DollarSign size={16} color="#6366f1" />} label="Estimated Cost" value={`KES ${workOrder.estimated_cost?.toLocaleString() || '0'}`} />
              <DetailRow icon={<Calendar size={16} color="#6366f1" />} label="Created" value={formattedDate(workOrder.created_at)} />
              <DetailRow label="Status" value={workOrder.status} />
              <DetailRow label="Assigned Staff" value={workOrder.staff ? `${workOrder.staff.first_name} ${workOrder.staff.last_name}` : 'Not assigned'} />
              
              {workOrder.services && workOrder.services.length > 0 && (
                <View>
                  <Text className="text-gray-400 text-sm mb-2">Services:</Text>
                  {workOrder.services.map((service, index) => (
                    <Text key={index} className="text-white text-sm ml-2">• {service}</Text>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );
}

const DetailRow = ({ icon, label, value }: { icon?: any, label: string, value: string }) => (
  <View className="flex-row items-start">
    {icon && <View className="mr-2 mt-0.5">{icon}</View>}
    <View className="flex-1">
      <Text className="text-gray-400 text-sm mb-1">{label}</Text>
      <Text className="text-white text-base">{value}</Text>
    </View>
  </View>
);

// import { BlurView } from 'expo-blur';
// import { Calendar, Car, ClipboardList, DollarSign, User, Wrench, X } from 'lucide-react';
// import React from 'react';
// import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';

// interface WorkOrder {
//   id: string;
//   client_id: string;
//   vehicle_id: string;
//   services: any[];
//   assigned_staff: string;
//   estimated_cost: number;
//   status: string;
//   created_at: string;
//   clients?: { first_name: string; last_name: string; email: string };
//   client_vehicles?: { make: string; model: string; licence_plate: string };
//   staff?: { first_name: string; last_name: string };
// }

// interface WorkOrderModalProps {
//   visible: boolean;
//   workOrder: WorkOrder | null;
//   onClose: () => void;
// }

// const { height: screenHeight } = Dimensions.get('window');

// export default function WorkOrderModal({ visible, workOrder, onClose }: WorkOrderModalProps) {
//   if (!workOrder) return null;

//   const formattedDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'pending': return 'bg-yellow-500';
//       case 'in-progress': return 'bg-blue-500';
//       case 'completed': return 'bg-green-500';
//       case 'cancelled': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View className="flex-1 justify-center items-center bg-black/60 p-4">
//         <BlurView intensity={80} tint="dark" className="rounded-2xl w-full max-w-md" style={{ maxHeight: screenHeight * 0.85 }}>
//           {/* Header */}
//           <View className="flex-row justify-between items-center p-6 border-b border-gray-700">
//             <View className="flex-row items-center">
//               <ClipboardList size={24} color="#6366f1" className="mr-3" />
//               <Text className="text-white text-xl font-bold">Work Order Details</Text>
//             </View>
//             <TouchableOpacity onPress={onClose} className="p-2 bg-white/10 rounded-full">
//               <X size={20} color="white" />
//             </TouchableOpacity>
//           </View>
          
//           {/* Content - No ScrollView, using flex layout */}
//           <View className="p-6">
//             <View className="space-y-5">
//               {/* Client Information */}
//               <View className="bg-white/5 rounded-xl p-4">
//                 <Text className="text-indigo-400 font-semibold mb-3 text-lg">Client Information</Text>
//                 <DetailRow icon={<User size={18} color="#6366f1" />} label="Client" value={`${workOrder.clients?.first_name} ${workOrder.clients?.last_name}`} />
//                 <DetailRow label="Email" value={workOrder.clients?.email || 'N/A'} />
//               </View>

//               {/* Vehicle Information */}
//               <View className="bg-white/5 rounded-xl p-4">
//                 <Text className="text-indigo-400 font-semibold mb-3 text-lg">Vehicle Details</Text>
//                 <DetailRow icon={<Car size={18} color="#6366f1" />} label="Vehicle" value={`${workOrder.client_vehicles?.make || 'N/A'} ${workOrder.client_vehicles?.model || ''}`} />
//                 <DetailRow label="License Plate" value={workOrder.client_vehicles?.licence_plate || 'N/A'} />
//               </View>

//               {/* Work Order Details */}
//               <View className="bg-white/5 rounded-xl p-4">
//                 <Text className="text-indigo-400 font-semibold mb-3 text-lg">Work Order Details</Text>
//                 <DetailRow icon={<DollarSign size={18} color="#6366f1" />} label="Estimated Cost" value={`KES ${workOrder.estimated_cost?.toLocaleString() || '0'}`} />
//                 <DetailRow icon={<Calendar size={18} color="#6366f1" />} label="Created" value={formattedDate(workOrder.created_at)} />
//                 <DetailRow label="Assigned Staff" value={workOrder.staff ? `${workOrder.staff.first_name} ${workOrder.staff.last_name}` : 'Not assigned'} />
                
//                 <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-600">
//                   <Text className="text-gray-400 text-base">Status</Text>
//                   <View className={`px-3 py-1 rounded-full ${getStatusColor(workOrder.status)}`}>
//                     <Text className="text-white font-semibold text-sm capitalize">
//                       {workOrder.status}
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               {/* Services Section */}
//               <View className="bg-white/5 rounded-xl p-4">
//                 <Text className="text-indigo-400 font-semibold mb-3 text-lg flex-row items-center">
//                   <Wrench size={18} color="#6366f1" className="mr-2" />
//                   Services Required
//                 </Text>
//                 {workOrder.services && workOrder.services.length > 0 ? (
//                   <View className="space-y-2">
//                     {workOrder.services.map((service, index) => (
//                       <View key={index} className="flex-row items-start bg-black/30 rounded-lg p-3">
//                         <Text className="text-green-400 mr-2 text-lg">•</Text>
//                         <Text className="text-white text-base flex-1">{service.name || service}</Text>
//                         {service.cost && (
//                           <Text className="text-green-400 font-semibold ml-2">
//                             KES {service.cost.toLocaleString()}
//                           </Text>
//                         )}
//                       </View>
//                     ))}
//                   </View>
//                 ) : (
//                   <Text className="text-gray-400 text-base italic">No services listed</Text>
//                 )}
//               </View>
//             </View>
//           </View>

//           {/* Action Buttons */}
//           <View className="flex-row border-t border-gray-700 p-4">
//             <TouchableOpacity 
//               onPress={onClose}
//               className="flex-1 bg-gray-600 rounded-lg py-3 mx-2 items-center"
//             >
//               <Text className="text-white font-semibold text-base">Close</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               onPress={() => {
//                 // Add action for updating work order
//                 console.log('Update work order:', workOrder.id);
//               }}
//               className="flex-1 bg-indigo-600 rounded-lg py-3 mx-2 items-center"
//             >
//               <Text className="text-white font-semibold text-base">Update</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               onPress={() => {
//                 // Add action for completing work order
//                 console.log('Complete work order:', workOrder.id);
//               }}
//               className="flex-1 bg-green-600 rounded-lg py-3 mx-2 items-center"
//             >
//               <Text className="text-white font-semibold text-base">Complete</Text>
//             </TouchableOpacity>
//           </View>
//         </BlurView>
//       </View>
//     </Modal>
//   );
// }

// const DetailRow = ({ icon, label, value }: { icon?: any, label: string, value: string }) => (
//   <View className="flex-row items-center justify-between py-2">
//     <View className="flex-row items-center flex-1">
//       {icon && <View className="mr-3">{icon}</View>}
//       <Text className="text-gray-400 text-base flex-1">{label}</Text>
//     </View>
//     <Text className="text-white text-base font-medium text-right flex-1">{value}</Text>
//   </View>
// );

// import { BlurView } from 'expo-blur';
// import { Calendar, Car, ClipboardList, DollarSign, User, Wrench, X } from 'lucide-react';
// import React from 'react';
// import { Dimensions, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// interface WorkOrder {
//   id: string;
//   client_id: string;
//   vehicle_id: string;
//   services: any[];
//   assigned_staff: string;
//   estimated_cost: number;
//   status: string;
//   created_at: string;
//   clients?: { first_name: string; last_name: string; email: string };
//   client_vehicles?: { make: string; model: string; licence_plate: string };
//   staff?: { first_name: string; last_name: string };
// }

// interface WorkOrderModalProps {
//   visible: boolean;
//   workOrder: WorkOrder | null;
//   onClose: () => void;
// }

// const { height: screenHeight } = Dimensions.get('window');

// export default function WorkOrderModal({ visible, workOrder, onClose }: WorkOrderModalProps) {
//   if (!workOrder) return null;

//   const formattedDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'pending': return 'bg-yellow-500';
//       case 'in-progress': return 'bg-blue-500';
//       case 'completed': return 'bg-green-500';
//       case 'cancelled': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View className="flex-1 justify-center items-center bg-black/60 p-4">
//         <BlurView intensity={80} tint="dark" className="rounded-2xl w-full max-w-md" style={{ maxHeight: screenHeight * 0.85 }}>
//           {/* Header */}
//           <View className="flex-row justify-between items-center p-6 border-b border-gray-700">
//             <View className="flex-row items-center">
//               <ClipboardList size={24} color="#6366f1" className="mr-3" />
//               <Text className="text-white text-xl font-bold">Work Order Details</Text>
//             </View>
//             <TouchableOpacity onPress={onClose} className="p-2 bg-white/10 rounded-full">
//               <X size={20} color="white" />
//             </TouchableOpacity>
//           </View>
          
//           {/* Content with ScrollView to prevent overflow */}
//           <ScrollView 
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ padding: 24 }}
//           >
//             <View className="space-y-6"> {/* Increased from space-y-5 to space-y-6 */}
//               {/* Client Information */}
//               <View className="bg-white/5 rounded-xl p-5"> {/* Increased padding */}
//                 <Text className="text-indigo-400 font-semibold mb-4 text-lg">Client Information</Text>
//                 <DetailRow icon={<User size={18} color="#6366f1" />} label="Client" value={`${workOrder.clients?.first_name} ${workOrder.clients?.last_name}`} />
//                 <DetailRow label="Email" value={workOrder.clients?.email || 'N/A'} />
//               </View>

//               {/* Vehicle Information */}
//               <View className="bg-white/5 rounded-xl p-5"> {/* Increased padding */}
//                 <Text className="text-indigo-400 font-semibold mb-4 text-lg">Vehicle Details</Text>
//                 <DetailRow icon={<Car size={18} color="#6366f1" />} label="Vehicle" value={`${workOrder.client_vehicles?.make || 'N/A'} ${workOrder.client_vehicles?.model || ''}`} />
//                 <DetailRow label="License Plate" value={workOrder.client_vehicles?.licence_plate || 'N/A'} />
//               </View>

//               {/* Work Order Details */}
//               <View className="bg-white/5 rounded-xl p-5"> {/* Increased padding */}
//                 <Text className="text-indigo-400 font-semibold mb-4 text-lg">Work Order Details</Text>
//                 <DetailRow icon={<DollarSign size={18} color="#6366f1" />} label="Estimated Cost" value={`KES ${workOrder.estimated_cost?.toLocaleString() || '0'}`} />
//                 <DetailRow icon={<Calendar size={18} color="#6366f1" />} label="Created" value={formattedDate(workOrder.created_at)} />
//                 <DetailRow label="Assigned Staff" value={workOrder.staff ? `${workOrder.staff.first_name} ${workOrder.staff.last_name}` : 'Not assigned'} />
                
//                 <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-600"> {/* Increased margin */}
//                   <Text className="text-gray-400 text-base">Status</Text>
//                   <View className={`px-4 py-2 rounded-full ${getStatusColor(workOrder.status)}`}> {/* Increased padding */}
//                     <Text className="text-white font-semibold text-sm capitalize">
//                       {workOrder.status}
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               {/* Services Section */}
//               <View className="bg-white/5 rounded-xl p-5"> {/* Increased padding */}
//                 <Text className="text-indigo-400 font-semibold mb-4 text-lg flex-row items-center">
//                   <Wrench size={18} color="#6366f1" className="mr-2" />
//                   Services Required
//                 </Text>
//                 {workOrder.services && workOrder.services.length > 0 ? (
//                   <View className="space-y-3"> {/* Increased spacing */}
//                     {workOrder.services.map((service, index) => (
//                       <View key={index} className="flex-row items-start bg-black/30 rounded-lg p-4"> {/* Increased padding */}
//                         <Text className="text-green-400 mr-3 text-lg">•</Text> {/* Increased margin */}
//                         <Text className="text-white text-base flex-1">{service.name || service}</Text>
//                         {service.cost && (
//                           <Text className="text-green-400 font-semibold ml-3"> {/* Increased margin */}
//                             KES {service.cost.toLocaleString()}
//                           </Text>
//                         )}
//                       </View>
//                     ))}
//                   </View>
//                 ) : (
//                   <Text className="text-gray-400 text-base italic">No services listed</Text>
//                 )}
//               </View>
//             </View>
//           </ScrollView>

//           {/* Action Buttons */}
//           <View className="flex-row border-t border-gray-700 p-5"> {/* Increased padding */}
//             <TouchableOpacity 
//               onPress={onClose}
//               className="flex-1 bg-gray-600 rounded-lg py-4 mx-2 items-center" 
//             >
//               <Text className="text-white font-semibold text-base">Close</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               onPress={() => {
//                 // Add action for updating work order
//                 console.log('Update work order:', workOrder.id);
//               }}
//               className="flex-1 bg-indigo-600 rounded-lg py-4 mx-2 items-center"
//             >
//               <Text className="text-white font-semibold text-base">Update</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               onPress={() => {
//                 // Add action for completing work order
//                 console.log('Complete work order:', workOrder.id);
//               }}
//               className="flex-1 bg-green-600 rounded-lg py-4 mx-2 items-center"
//             >
//               <Text className="text-white font-semibold text-base">Complete</Text>
//             </TouchableOpacity>
//           </View>
//         </BlurView>
//       </View>
//     </Modal>
//   );
// }

// const DetailRow = ({ icon, label, value }: { icon?: any, label: string, value: string }) => (
//   <View className="flex-row items-center justify-between py-3"> {/* Increased padding */}
//     <View className="flex-row items-center flex-1">
//       {icon && <View className="mr-4">{icon}</View>} {/* Increased margin */}
//       <Text className="text-gray-400 text-base flex-1">{label}</Text>
//     </View>
//     <Text className="text-white text-base font-medium text-right flex-1">{value}</Text>
//   </View>
// );