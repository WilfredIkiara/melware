// // app/index.tsx (Landing Page)
// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
// import { useRouter } from "expo-router";
// import { BlurView } from "expo-blur";
// // import { motion } from "framer-motion";
// import { Ionicons } from '@expo/vector-icons';
// import { images } from '@/constants/images'
// import { icons } from '@/constants/icons'
// import { useTheme } from '../../lib/theme'

// export default function LandingPage() {
//   const router = useRouter();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedService, setSelectedService] = useState<any>(null);

//   const services = [
//     { id: 1, title: "Car Repair", icon: <Ionicons name="build" size={32} color="red" />, desc: "Expert repair services to keep your car in top shape." },
//     { id: 2, title: "Diagnostics", icon: <Ionicons name="settings" size={32} color="red" />, desc: "Computerized checks to detect and solve issues fast." },
//     { id: 3, title: "Car Wash", icon: <Ionicons name="car" size={32} color="red" />, desc: "Premium wash and detailing for a brand-new shine." },
//     { id: 4, title: "Fuel Services", icon: <Ionicons name="battery-charging" size={32} color="red" />, desc: "Quick refueling and oil change services." },
//   ];

//   const openServiceModal = (service: any) => {
//     setSelectedService(service);
//     setModalVisible(true);
//   };

//   const { isDark } = useTheme();

//   return (
//     <View className={`flex-1 ${isDark ? 'bg-[#0A0F1E]' : 'bg-gray-50'} items-center justify-center px-6`}>
//       {/* Logo */}
//       <Image
//         source={images.tristarlogo}
//         className="w-32 h-32 mb-4"
//         resizeMode="contain"
//       />

//       {/* Title */}
//       <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Welcome to Tristar Garage</Text>
//       <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 text-center`}>
//         Quality repairs, trusted service, and modern automotive care.
//       </Text>

//       {/* Services Showcase */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         className="mb-6"
//         contentContainerStyle={{ gap: 16 }}
//       >
//         {services.map((service) => (
//           <TouchableOpacity
//             key={service.id}
//             onPress={() => openServiceModal(service)}
//           >
//             <BlurView
//               intensity={50}
//               tint={isDark ? "dark" : "light"}
//               className="w-40 h-40 rounded-2xl items-center justify-center p-4"
//             >
//               {service.icon}
//               <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold mt-2`}>{service.title}</Text>
//             </BlurView>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Login Button */}
//       <View className="grid grid-cols-2 gap-4 mb-6">
//         <TouchableOpacity
//           onPress={() => router.push("/login")}
//           className="bg-red-600 px-6 py-3 rounded-2xl shadow-lg"
//         >
//           <Text className="text-white font-bold text-lg">Login</Text>
//         </TouchableOpacity>
        
//       </View>
//       {/* Service Modal */}
//       <Modal
//         visible={modalVisible}
//         animationType="fade"
//         transparent
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View className="flex-1 bg-black/70 items-center justify-center px-6">
//           <BlurView
//             intensity={80}
//             tint={isDark ? "dark" : "light"}
//             className="w-full rounded-2xl p-6"
//           >
//             <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{selectedService?.title}</Text>
//             <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{selectedService?.desc}</Text>

//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//               className="bg-red-600 px-4 py-2 rounded-xl self-center"
//             >
//               <Text className="text-white font-semibold">Close</Text>
//             </TouchableOpacity>
//           </BlurView>
//         </View>
//       </Modal>
//     </View>
//   );
// }
// app/index.tsx (Landing Page)
import { images } from '@/constants/images';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from '../../lib/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive sizing functions
const responsiveWidth = (percentage: number) => (percentage / 100) * screenWidth;
const responsiveHeight = (percentage: number) => (percentage / 100) * screenHeight;
const responsiveFontSize = (baseSize: number) => {
  if (screenWidth < 375) return baseSize - 2;
  if (screenWidth >= 375 && screenWidth < 414) return baseSize;
  if (screenWidth >= 414 && screenWidth < 768) return baseSize + 1;
  if (screenWidth >= 768 && screenWidth < 1024) return baseSize + 2;
  return baseSize + 4;
};

export default function LandingPage() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    { id: 1, title: "Car Repair", icon: <Ionicons name="build" size={responsiveFontSize(24)} color="red" />, desc: "Expert repair services to keep your car in top shape." },
    { id: 2, title: "Diagnostics", icon: <Ionicons name="settings" size={responsiveFontSize(24)} color="red" />, desc: "Computerized checks to detect and solve issues fast." },
    { id: 3, title: "Car Wash", icon: <Ionicons name="car" size={responsiveFontSize(24)} color="red" />, desc: "Premium wash and detailing for a brand-new shine." },
    { id: 4, title: "Fuel Services", icon: <Ionicons name="battery-charging" size={responsiveFontSize(24)} color="red" />, desc: "Quick refueling and oil change services." },
  ];

  const openServiceModal = (service: any) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const { isDark } = useTheme();

  // Responsive styles - FIXED: Using proper DimensionValue types
  const styles = {
    container: {
      paddingHorizontal: screenWidth < 768 ? responsiveWidth(5) : responsiveWidth(8),
      paddingTop: screenHeight < 700 ? responsiveHeight(2) : responsiveHeight(4),
    },
    logo: {
      width: screenWidth < 375 ? 80 : screenWidth < 768 ? 120 : 150,
      height: screenWidth < 375 ? 80 : screenWidth < 768 ? 120 : 150,
      marginBottom: screenHeight < 700 ? 12 : 16,
    },
    title: {
      fontSize: responsiveFontSize(screenWidth < 768 ? 28 : 36),
      marginBottom: screenHeight < 700 ? 8 : 12,
    },
    subtitle: {
      fontSize: responsiveFontSize(14),
      marginBottom: screenHeight < 700 ? 20 : 24,
      maxWidth: screenWidth < 768 ? responsiveWidth(90) : responsiveWidth(70), // FIXED: Using number instead of string
    },
    serviceCard: {
      width: screenWidth < 375 ? 100 : 
             screenWidth < 768 ? 120 : 
             screenWidth < 1024 ? 140 : 160,
      height: screenWidth < 375 ? 100 : 
              screenWidth < 768 ? 120 : 
              screenWidth < 1024 ? 140 : 160,
      padding: screenWidth < 375 ? 8 : 12,
    },
    serviceIcon: {
      marginBottom: screenHeight < 700 ? 4 : 8,
    },
    serviceTitle: {
      fontSize: responsiveFontSize(screenWidth < 768 ? 14 : 16),
      textAlign: 'center' as const,
    },
    buttonContainer: {
      flexDirection: screenWidth < 375 ? 'column' as const : 'row' as const,
      gap: screenWidth < 375 ? 12 : 16,
      marginBottom: screenHeight < 700 ? 20 : 24,
    },
    button: {
      paddingHorizontal: screenWidth < 375 ? 20 : 
                         screenWidth < 768 ? 24 : 32,
      paddingVertical: screenWidth < 375 ? 12 : 
                       screenWidth < 768 ? 14 : 16,
      minWidth: screenWidth < 375 ? responsiveWidth(70) : 
                screenWidth < 768 ? responsiveWidth(40) : responsiveWidth(35),
    },
    buttonText: {
      fontSize: responsiveFontSize(screenWidth < 768 ? 16 : 18),
    },
    modalContent: {
      width: screenWidth < 768 ? screenWidth * 0.85 : 
             screenWidth < 1024 ? screenWidth * 0.7 : Math.min(screenWidth * 0.6, 500),
      padding: screenWidth < 375 ? 16 : 
               screenWidth < 768 ? 20 : 24,
    },
    modalTitle: {
      fontSize: responsiveFontSize(screenWidth < 768 ? 20 : 24),
      marginBottom: screenHeight < 700 ? 8 : 12,
    },
    modalDesc: {
      fontSize: responsiveFontSize(14),
      marginBottom: screenHeight < 700 ? 16 : 20,
    },
    closeButton: {
      paddingHorizontal: screenWidth < 375 ? 16 : 20,
      paddingVertical: screenWidth < 375 ? 10 : 12,
    },
    closeButtonText: {
      fontSize: responsiveFontSize(14),
    }
  };

  return (
    <View 
      className={`flex-1 ${isDark ? 'bg-[#0A0F1E]' : 'bg-gray-50'} items-center justify-center`}
      style={styles.container}
    >
      {/* Logo */}
      <Image
        source={images.tristarlogo}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text 
        className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
        style={styles.title}
      >
        Welcome to Tristar Garage
      </Text>
      <Text 
        className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}
        style={styles.subtitle}
      >
        Quality repairs, trusted service, and modern automotive care.
      </Text>

      {/* Services Showcase */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
        contentContainerStyle={{ 
          gap: screenWidth < 375 ? 12 : 
               screenWidth < 768 ? 16 : 20,
          paddingHorizontal: screenWidth < 375 ? 10 : 0
        }}
      >
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => openServiceModal(service)}
            activeOpacity={0.7}
          >
            <BlurView
              intensity={50}
              tint={isDark ? "dark" : "light"}
              className="rounded-2xl items-center justify-center"
              style={styles.serviceCard}
            >
              <View style={styles.serviceIcon}>
                {service.icon}
              </View>
              <Text 
                className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={styles.serviceTitle}
                numberOfLines={2}
              >
                {service.title}
              </Text>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="bg-red-600 rounded-2xl shadow-lg items-center justify-center"
          style={styles.button}
        >
          <Text className="text-white font-bold" style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
        
        {/* Optional: Add Sign Up button for better UX */}
        <TouchableOpacity
          // onPress={() => router.push("/signup")}
          className={`rounded-2xl shadow-lg items-center justify-center border-2 ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          }`}
          style={styles.button}
        >
          <Text 
            className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={styles.buttonText}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Service Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/70 items-center justify-center px-6">
          <BlurView
            intensity={80}
            tint={isDark ? "dark" : "light"}
            className="rounded-2xl"
            style={styles.modalContent}
          >
            <Text 
              className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={styles.modalTitle}
            >
              {selectedService?.title}
            </Text>
            <Text 
              className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              style={styles.modalDesc}
            >
              {selectedService?.desc}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-red-600 rounded-xl self-center"
              style={styles.closeButton}
            >
              <Text className="text-white font-semibold" style={styles.closeButtonText}>
                Close
              </Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}