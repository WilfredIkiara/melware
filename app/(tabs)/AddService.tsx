import { useLocalSearchParams, useRouter } from 'expo-router';
import { Save, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useClientData } from '../../lib/pages/clientData';

export default function AddService() {
  const { clientId } = useLocalSearchParams();
  const router = useRouter();
  const { addClientService, loading, error } = useClientData();
  const [formData, setFormData] = useState({
    service_type: '',
    service_cost: '',
    service_expenses: '',
    paid_status: false,
    notes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSave = async () => {
    if (!formData.service_type) {
      Alert.alert('Error', 'Service Type is required.');
      return;
    }
    
    try {
      await addClientService(clientId as string, {
        ...formData,
        service_cost: formData.service_cost ? parseFloat(formData.service_cost) : 0,
        service_expenses: formData.service_expenses ? parseFloat(formData.service_expenses) : 0,
      });
      Alert.alert('Success', 'Service added successfully!');
      router.back(); // Go back to client details
      // Optionally refresh the client data on the previous screen
    } catch (err) {
      Alert.alert('Error', 'Failed to add service.');
    }
  };

  return (
    <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
      {loading && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-white mt-2">Adding service...</Text>
        </View>
      )}

      <ScrollView className="flex-1">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={handleGoBack} className="p-2 rounded-full">
            <Text className="text-blue-500 text-base">← Back</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Add New Service</Text>
          <View className="w-10" />
        </View>

        <View className="bg-gray-800 rounded-xl p-4 mb-6 space-y-4">
          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-24">Service Type:</Text>
            <TextInput
              className="flex-1 bg-gray-700 text-white p-3 rounded"
              placeholder="e.g., Oil Change"
              placeholderTextColor="#9ca3af"
              value={formData.service_type}
              onChangeText={(text) => handleInputChange('service_type', text)}
            />
          </View>

          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-24">Service Cost:</Text>
            <TextInput
              className="flex-1 bg-gray-700 text-white p-3 rounded"
              placeholder="e.g., 50.00"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              value={formData.service_cost}
              onChangeText={(text) => handleInputChange('service_cost', text)}
            />
          </View>

          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-24">Expenses:</Text>
            <TextInput
              className="flex-1 bg-gray-700 text-white p-3 rounded"
              placeholder="e.g., 20.00"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              value={formData.service_expenses}
              onChangeText={(text) => handleInputChange('service_expenses', text)}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-gray-400 font-bold">Paid Status:</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={formData.paid_status ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => setFormData({ ...formData, paid_status: value })}
              value={formData.paid_status}
            />
          </View>
          
          <View>
            <Text className="text-gray-400 font-bold mb-2">Notes:</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded h-24"
              placeholder="Add any notes about the service..."
              placeholderTextColor="#9ca3af"
              multiline
              value={formData.notes}
              onChangeText={(text) => handleInputChange('notes', text)}
            />
          </View>

          {error && <Text className="text-red-500 text-center">{error}</Text>}

          <View className="flex-row justify-end space-x-2 mt-4">
            <TouchableOpacity
              onPress={handleGoBack}
              className="bg-red-600 px-6 py-3 rounded-lg flex-row items-center"
            >
              <X size={20} color="white" />
              <Text className="text-white ml-2">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              className="bg-green-600 px-6 py-3 rounded-lg flex-row items-center"
            >
              <Save size={20} color="white" />
              <Text className="text-white ml-2">Save Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}