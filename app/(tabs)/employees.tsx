
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Lock, Mail, MapPin, Phone, Plus, Search, User, X } from 'lucide-react';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GradientCard } from '../../lib/components/GradientCard';
import { Colors } from '../../lib/constants/colors';
import { useStaffData } from '../../lib/pages/useStaffData';

export default function EmployeesPage() {
  const { staff, loading, error } = useStaffData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    location: ''
  });

  const filteredStaff = staff?.filter(employee =>
    `${employee.first_name} ${employee.last_name} ${employee.email} ${employee.phone}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  ) || [];

  const handleAddEmployee = async () => {
    try {
      console.log("Adding new employee:", newEmployee);
      // API call implementation here
      setNewEmployee({ first_name: '', last_name: '', email: '', phone: '', password: '', location: '' });
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text className="text-white mt-4 text-lg">Loading employees...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-6">
        <Text className="text-red-400 text-lg text-center mb-4">Error: {error}</Text>
        <TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-xl">
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-3xl font-bold">Team Members</Text>
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 rounded-xl flex-row items-center space-x-2"
        >
          <Plus size={20} color="white" />
          <Text className="text-white font-semibold">Add Staff</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="relative mb-6">
        <TextInput
          className="bg-gray-800 text-white p-4 pl-12 rounded-xl text-base border border-gray-700"
          placeholder="Search team members..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Search size={20} color="#9ca3af" className="absolute left-4 top-4" />
      </View>

      {/* Staff List */}
      <FlatList
        data={filteredStaff}
        keyExtractor={item => item.staff_id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: "/StaffDetails", params: { id: item.staff_id } })}
            className="mb-4"
          >
            <GradientCard colors={Colors.gradient.darkToDarker}>
              <View className="flex-row items-center">
                <View className="bg-blue-600 rounded-full w-14 h-14 items-center justify-center mr-4">
                  <User size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold text-lg">
                    {item.first_name} {item.last_name}
                  </Text>
                  <Text className="text-gray-400 text-sm">{item.email}</Text>
                  {item.phone && (
                    <Text className="text-gray-400 text-sm">{item.phone}</Text>
                  )}
                </View>
                <View className="bg-blue-600 rounded-full w-8 h-8 items-center justify-center">
                  <Text className="text-white text-sm">→</Text>
                </View>
              </View>
            </GradientCard>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-400 text-lg">No team members found</Text>
          </View>
        }
      />

      {/* Add Employee Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
      >
        <BlurView intensity={20} className="flex-1 justify-center items-center p-4">
          <View className="w-full max-w-md bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-2xl font-bold">Add Team Member</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <View className="space-y-4">
              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-gray-400 text-sm mb-2">First Name</Text>
                  <TextInput
                    placeholder="First name"
                    placeholderTextColor="#6b7280"
                    value={newEmployee.first_name}
                    onChangeText={(v) => setNewEmployee({ ...newEmployee, first_name: v })}
                    className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-400 text-sm mb-2">Last Name</Text>
                  <TextInput
                    placeholder="Last name"
                    placeholderTextColor="#6b7280"
                    value={newEmployee.last_name}
                    onChangeText={(v) => setNewEmployee({ ...newEmployee, last_name: v })}
                    className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-400 text-sm mb-2">Email</Text>
                <View className="relative">
                  <Mail size={18} color="#6b7280" className="absolute left-3 top-3 z-10" />
                  <TextInput
                    placeholder="Email address"
                    placeholderTextColor="#6b7280"
                    value={newEmployee.email}
                    onChangeText={(v) => setNewEmployee({ ...newEmployee, email: v })}
                    className="bg-gray-700 text-white p-3 pl-10 rounded-lg border border-gray-600"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-400 text-sm mb-2">Phone</Text>
                <View className="relative">
                  <Phone size={18} color="#6b7280" className="absolute left-3 top-3 z-10" />
                  <TextInput
                    placeholder="Phone number"
                    placeholderTextColor="#6b7280"
                    value={newEmployee.phone}
                    onChangeText={(v) => setNewEmployee({ ...newEmployee, phone: v })}
                    className="bg-gray-700 text-white p-3 pl-10 rounded-lg border border-gray-600"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-400 text-sm mb-2">Password</Text>
                <View className="relative">
                  <Lock size={18} color="#6b7280" className="absolute left-3 top-3 z-10" />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#6b7280"
                    value={newEmployee.password}
                    onChangeText={(v) => setNewEmployee({ ...newEmployee, password: v })}
                    secureTextEntry
                    className="bg-gray-700 text-white p-3 pl-10 rounded-lg border border-gray-600"
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-400 text-sm mb-2">Location</Text>
                <View className="relative">
                  <MapPin size={18} color="#6b7280" className="absolute left-3 top-3 z-10" />
                  <TextInput
                    placeholder="Location"
                    placeholderTextColor="#6b7280"
                    value={newEmployee.location}
                    onChangeText={(v) => setNewEmployee({ ...newEmployee, location: v })}
                    className="bg-gray-700 text-white p-3 pl-10 rounded-lg border border-gray-600"
                  />
                </View>
              </View>
            </View>

            <View className="flex-row space-x-3 mt-6">
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                className="flex-1 bg-gray-700 py-3 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddEmployee}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">Add Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}