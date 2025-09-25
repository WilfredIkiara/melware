// components/AppointmentModal.tsx
import { BlurView } from 'expo-blur';
import { Calendar, Car, Clock, Phone, User, X } from 'lucide-react';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Appointment {
  id: string;
  client_id: string;
  vehicle_id: string;
  service_type: string;
  scheduled_time: string;
  notes: string;
  status: string;
  clients?: { first_name: string; last_name: string; phone_number: string };
  client_vehicles?: { make: string; model: string; licence_plate: string };
}

interface AppointmentModalProps {
  visible: boolean;
  appointment: Appointment | null;
  onClose: () => void;
}

export default function AppointmentModal({ visible, appointment, onClose }: AppointmentModalProps) {
  if (!appointment) return null;

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
              <Calendar size={24} color="#facc15" className="mr-2" />
              <Text className="text-white text-xl font-bold">Appointment Details</Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-2">
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Content */}
          <ScrollView className="p-6">
            <View className="space-y-4">
              <DetailRow icon={<User size={16} color="#facc15" />} label="Client" value={`${appointment.clients?.first_name} ${appointment.clients?.last_name}`} />
              <DetailRow icon={<Phone size={16} color="#facc15" />} label="Phone" value={appointment.clients?.phone_number || 'N/A'} />
              <DetailRow icon={<Car size={16} color="#facc15" />} label="Vehicle" value={`${appointment.client_vehicles?.make} - ${appointment.client_vehicles?.licence_plate}`} />
              <DetailRow icon={<Clock size={16} color="#facc15" />} label="Service Type" value={appointment.service_type} />
              <DetailRow icon={<Calendar size={16} color="#facc15" />} label="Scheduled Time" value={formattedDate(appointment.scheduled_time)} />
              <DetailRow label="Status" value={appointment.status} />
              
              {appointment.notes && (
                <DetailRow label="Notes" value={appointment.notes} />
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
// import { Calendar, Car, Clock, Phone, User, X } from 'lucide-react';
// import React from 'react';
// import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';

// interface Appointment {
//   id: string;
//   client_id: string;
//   vehicle_id: string;
//   service_type: string;
//   scheduled_time: string;
//   notes: string;
//   status: string;
//   clients?: { first_name: string; last_name: string; phone_number: string };
//   client_vehicles?: { make: string; model: string; licence_plate: string };
// }

// interface AppointmentModalProps {
//   visible: boolean;
//   appointment: Appointment | null;
//   onClose: () => void;
// }

// const { height: screenHeight } = Dimensions.get('window');

// export default function AppointmentModal({ visible, appointment, onClose }: AppointmentModalProps) {
//   if (!appointment) return null;

//   const formattedDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'scheduled': return 'bg-blue-500';
//       case 'in-progress': return 'bg-yellow-500';
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
//               <Calendar size={24} color="#facc15" className="mr-3" />
//               <Text className="text-white text-xl font-bold">Appointment Details</Text>
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
//                 <Text className="text-yellow-400 font-semibold mb-3 text-lg">Client Information</Text>
//                 <DetailRow icon={<User size={18} color="#facc15" />} label="Name" value={`${appointment.clients?.first_name} ${appointment.clients?.last_name}`} />
//                 <DetailRow icon={<Phone size={18} color="#facc15" />} label="Phone" value={appointment.clients?.phone_number || 'N/A'} />
//               </View>

//               {/* Vehicle Information */}
//               <View className="bg-white/5 rounded-xl p-4">
//                 <Text className="text-yellow-400 font-semibold mb-3 text-lg">Vehicle Details</Text>
//                 <DetailRow icon={<Car size={18} color="#facc15" />} label="Vehicle" value={`${appointment.client_vehicles?.make || 'N/A'} ${appointment.client_vehicles?.model || ''}`} />
//                 <DetailRow label="License Plate" value={appointment.client_vehicles?.licence_plate || 'N/A'} />
//               </View>

//               {/* Appointment Details */}
//               <View className="bg-white/5 rounded-xl p-4">
//                 <Text className="text-yellow-400 font-semibold mb-3 text-lg">Appointment Details</Text>
//                 <DetailRow icon={<Clock size={18} color="#facc15" />} label="Service Type" value={appointment.service_type} />
//                 <DetailRow icon={<Calendar size={18} color="#facc15" />} label="Scheduled Time" value={formattedDate(appointment.scheduled_time)} />
                
//                 <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-600">
//                   <Text className="text-gray-400 text-base">Status</Text>
//                   <View className={`px-3 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
//                     <Text className="text-white font-semibold text-sm capitalize">
//                       {appointment.status}
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               {/* Notes Section - Only if notes exist */}
//               {appointment.notes && (
//                 <View className="bg-white/5 rounded-xl p-4">
//                   <Text className="text-yellow-400 font-semibold mb-3 text-lg">Additional Notes</Text>
//                   <View className="bg-black/30 rounded-lg p-3">
//                     <Text className="text-white text-base leading-6">{appointment.notes}</Text>
//                   </View>
//                 </View>
//               )}
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
//                 // Add action for editing appointment
//                 console.log('Edit appointment:', appointment.id);
//               }}
//               className="flex-1 bg-yellow-500 rounded-lg py-3 mx-2 items-center"
//             >
//               <Text className="text-white font-semibold text-base">Edit</Text>
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
// import { Calendar, Car, Clock, Phone, User, X } from 'lucide-react';
// import React from 'react';
// import { Dimensions, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// interface Appointment {
//   id: string;
//   client_id: string;
//   vehicle_id: string;
//   service_type: string;
//   scheduled_time: string;
//   notes: string;
//   status: string;
//   clients?: { first_name: string; last_name: string; phone_number: string };
//   client_vehicles?: { make: string; model: string; licence_plate: string };
// }

// interface AppointmentModalProps {
//   visible: boolean;
//   appointment: Appointment | null;
//   onClose: () => void;
// }

// const { height: screenHeight } = Dimensions.get('window');

// export default function AppointmentModal({ visible, appointment, onClose }: AppointmentModalProps) {
//   if (!appointment) return null;

//   const formattedDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'scheduled': return 'bg-blue-500';
//       case 'in-progress': return 'bg-yellow-500';
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
//               <Calendar size={24} color="#facc15" className="mr-3" />
//               <Text className="text-white text-xl font-bold">Appointment Details</Text>
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
//                 <Text className="text-yellow-400 font-semibold mb-4 text-lg">Client Information</Text>
//                 <DetailRow icon={<User size={18} color="#facc15" />} label="Name" value={`${appointment.clients?.first_name} ${appointment.clients?.last_name}`} />
//                 <DetailRow icon={<Phone size={18} color="#facc15" />} label="Phone" value={appointment.clients?.phone_number || 'N/A'} />
//               </View>

//               {/* Vehicle Information */}
//               <View className="bg-white/5 rounded-xl p-5"> {/* Increased padding */}
//                 <Text className="text-yellow-400 font-semibold mb-4 text-lg">Vehicle Details</Text>
//                 <DetailRow icon={<Car size={18} color="#facc15" />} label="Vehicle" value={`${appointment.client_vehicles?.make || 'N/A'} ${appointment.client_vehicles?.model || ''}`} />
//                 <DetailRow label="License Plate" value={appointment.client_vehicles?.licence_plate || 'N/A'} />
//               </View>

//               {/* Appointment Details */}
//               <View className="bg-white/5 rounded-xl p-5"> {/* Increased padding */}
//                 <Text className="text-yellow-400 font-semibold mb-4 text-lg">Appointment Details</Text>
//                 <DetailRow icon={<Clock size={18} color="#facc15" />} label="Service Type" value={appointment.service_type} />
//                 <DetailRow icon={<Calendar size={18} color="#facc15" />} label="Scheduled Time" value={formattedDate(appointment.scheduled_time)} />
                
//                 <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-600"> {/* Increased margin */}
//                   <Text className="text-gray-400 text-base">Status</Text>
//                   <View className={`px-4 py-2 rounded-full ${getStatusColor(appointment.status)}`}> {/* Increased padding */}
//                     <Text className="text-white font-semibold text-sm capitalize">
//                       {appointment.status}
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               {/* Notes Section - Only if notes exist */}
//               {appointment.notes && (
//                 <View className="bg-white/5 rounded-xl p-5"> {/* Increased padding */}
//                   <Text className="text-yellow-400 font-semibold mb-4 text-lg">Additional Notes</Text>
//                   <View className="bg-black/30 rounded-lg p-4"> {/* Increased padding */}
//                     <Text className="text-white text-base leading-6">{appointment.notes}</Text>
//                   </View>
//                 </View>
//               )}
//             </View>
//           </ScrollView>

//           {/* Action Buttons */}
//           <View className="flex-row border-t border-gray-700 p-5">
//             <TouchableOpacity 
//               onPress={onClose}
//               className="flex-1 bg-gray-600 rounded-lg py-4 mx-2 items-center" 
//             >
//               <Text className="text-white font-semibold text-base">Close</Text>
//             </TouchableOpacity>
//             <TouchableOpacity 
//               onPress={() => {
//                 // Add action for editing appointment
//                 console.log('Edit appointment:', appointment.id);
//               }}
//               className="flex-1 bg-yellow-500 rounded-lg py-4 mx-2 items-center" 
//             >
//               <Text className="text-white font-semibold text-base">Edit</Text>
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