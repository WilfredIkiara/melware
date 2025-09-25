// components/ActivityModal.tsx
import { BlurView } from 'expo-blur';
import { X } from 'lucide-react';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Activity {
  id: string;
  profiles?: { first_name: string };
  activity_type: string;
  description: string;
  timestamp: string;
  route?: string;
}

interface ActivityModalProps {
  visible: boolean;
  activity: Activity | null;
  onClose: () => void;
}

export default function ActivityModal({ visible, activity, onClose }: ActivityModalProps) {
  if (!activity) return null;

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
      <BlurView intensity={50} tint="dark" className="flex-1 justify-center items-center">
        <View className="bg-[#2A2F45] rounded-2xl mx-6 max-w-md w-full max-h-96">
          {/* Header */}
          <View className="flex-row justify-between items-center p-6 border-b border-gray-700">
            <Text className="text-white text-xl font-bold">Activity Details</Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Content */}
          <ScrollView className="p-6">
            <View className="space-y-4">
              <DetailRow label="Activity Type" value={activity.activity_type} />
              <DetailRow label="User" value={activity.profiles?.first_name || 'Unknown'} />
              <DetailRow label="Description" value={activity.description} />
              <DetailRow label="Route" value={activity.route || 'N/A'} />
              <DetailRow label="Timestamp" value={formattedDate(activity.timestamp)} />
              <DetailRow label="Activity ID" value={activity.id} />
            </View>
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View>
    <Text className="text-gray-400 text-sm mb-1">{label}</Text>
    <Text className="text-white text-base">{value}</Text>
  </View>
);