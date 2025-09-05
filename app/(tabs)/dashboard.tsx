// app/index.tsx (Landing Page)
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
// import { motion } from "framer-motion";
import { Ionicons } from '@expo/vector-icons';
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { useTheme } from '../../lib/theme'

export default function LandingPage() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    { id: 1, title: "Car Repair", icon: <Ionicons name="build" size={32} color="red" />, desc: "Expert repair services to keep your car in top shape." },
    { id: 2, title: "Diagnostics", icon: <Ionicons name="settings" size={32} color="red" />, desc: "Computerized checks to detect and solve issues fast." },
    { id: 3, title: "Car Wash", icon: <Ionicons name="car" size={32} color="red" />, desc: "Premium wash and detailing for a brand-new shine." },
    { id: 4, title: "Fuel Services", icon: <Ionicons name="battery-charging" size={32} color="red" />, desc: "Quick refueling and oil change services." },
  ];

  const openServiceModal = (service: any) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const { isDark } = useTheme();

  return (
    <View className={`flex-1 ${isDark ? 'bg-[#0A0F1E]' : 'bg-gray-50'} items-center justify-center px-6`}>
      {/* Logo */}
      <Image
        source={images.tristarlogo}
        className="w-32 h-32 mb-4"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Welcome to Tristar Garage</Text>
      <Text className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 text-center`}>
        Quality repairs, trusted service, and modern automotive care.
      </Text>

      {/* Services Showcase */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
        contentContainerStyle={{ gap: 16 }}
      >
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => openServiceModal(service)}
          >
            <BlurView
              intensity={50}
              tint={isDark ? "dark" : "light"}
              className="w-40 h-40 rounded-2xl items-center justify-center p-4"
            >
              {service.icon}
              <Text className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold mt-2`}>{service.title}</Text>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Login Button */}
      <View className="grid grid-cols-2 gap-4 mb-6">
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="bg-red-600 px-6 py-3 rounded-2xl shadow-lg"
        >
          <Text className="text-white font-bold text-lg">Login</Text>
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
            className="w-full rounded-2xl p-6"
          >
            <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{selectedService?.title}</Text>
            <Text className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{selectedService?.desc}</Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="bg-red-600 px-4 py-2 rounded-xl self-center"
            >
              <Text className="text-white font-semibold">Close</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}
