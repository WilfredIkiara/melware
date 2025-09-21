import { useLocalSearchParams, useRouter } from 'expo-router';
import { Save, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useClientData } from '../../lib/pages/clientData';

export default function AddVehicle() {
  const { clientId } = useLocalSearchParams();
  const router = useRouter();
  const { addClientVehicle, loading, error } = useClientData();
  const [formData, setFormData] = useState({
    make: '',
    licence_plate: '',
    engine_type: '',
    notes: '',
    mileage: '',
    color: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSave = async () => {
    if (!formData.make || !formData.licence_plate) {
      Alert.alert('Error', 'Make and Licence Plate are required.');
      return;
    }
    
    try {
      await addClientVehicle(clientId as string, {
        ...formData,
        mileage: formData.mileage ? parseFloat(formData.mileage) : undefined,
      });
      Alert.alert('Success', 'Vehicle added successfully!');
      router.back(); // Go back to client details
      // Optionally refresh the client data on the previous screen
    } catch (err) {
      Alert.alert('Error', 'Failed to add vehicle.');
    }
  };


  return (
    <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
      {loading && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-white mt-2">Adding vehicle...</Text>
        </View>
      )}

      <ScrollView className="flex-1">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={handleGoBack} className="p-2 rounded-full">
            <Text className="text-blue-500 text-base">← Back</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Add New Vehicle</Text>
          <View className="w-10" />
        </View>

        <View className="bg-gray-800 rounded-xl p-4 mb-6 space-y-4">
          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-24">Make:</Text>
            <TextInput
              className="flex-1 bg-gray-700 text-white p-3 rounded"
              placeholder="e.g., Toyota"
              placeholderTextColor="#9ca3af"
              value={formData.make}
              onChangeText={(text) => handleInputChange('make', text)}
            />
          </View>

          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-24">Licence Plate:</Text>
            <TextInput
              className="flex-1 bg-gray-700 text-white p-3 rounded"
              placeholder="e.g., KBC 123Z"
              placeholderTextColor="#9ca3af"
              value={formData.licence_plate}
              onChangeText={(text) => handleInputChange('licence_plate', text)}
            />
          </View>

          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-24">Engine Type:</Text>
            <TextInput
              className="flex-1 bg-gray-700 text-white p-3 rounded"
              placeholder="e.g., Petrol, Diesel"
              placeholderTextColor="#9ca3af"
              value={formData.engine_type}
              onChangeText={(text) => handleInputChange('engine_type', text)}
            />
          </View>

          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-24">Mileage:</Text>
            <TextInput
              className="flex-1 bg-gray-700 text-white p-3 rounded"
              placeholder="e.g., 50000"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              value={formData.mileage}
              onChangeText={(text) => handleInputChange('mileage', text)}
            />
          </View>

          <View className="flex-row items-center">
            <Text className="text-gray-400 font-bold w-24">Color:</Text>
            <TextInput
              className="flex-1 bg-gray-700 text-white p-3 rounded"
              placeholder="e.g., Blue"
              placeholderTextColor="#9ca3af"
              value={formData.color}
              onChangeText={(text) => handleInputChange('color', text)}
            />
          </View>

          <View>
            <Text className="text-gray-400 font-bold mb-2">Notes:</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded h-24"
              placeholder="Add any notes about the vehicle..."
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
              <Text className="text-white ml-2">Save Vehicle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}