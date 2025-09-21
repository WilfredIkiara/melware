
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { RotateCcw, Search, UserPlus } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GradientCard } from '../../lib/components/GradientCard';
import { Colors } from '../../lib/constants/colors';
import { useClientData } from '../../lib/pages/clientData';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  total_spent: number;
}

export default function Clients() {
  const router = useRouter();
  const { clients, loading, error, fetchClients } = useClientData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filteredClients = useMemo(() => {
    if (!clients) return [];
    const lowerCaseQuery = searchQuery.toLowerCase();
    return clients.filter(client =>
      client.first_name.toLowerCase().includes(lowerCaseQuery) ||
      client.last_name.toLowerCase().includes(lowerCaseQuery) ||
      client.email.toLowerCase().includes(lowerCaseQuery) ||
      client.phone_number.toLowerCase().includes(lowerCaseQuery)
    );
  }, [clients, searchQuery]);

  const handleAddClient = async () => {
    try {
      console.log("Adding new client:", newClient);
      // API call implementation here
      setNewClient({ first_name: '', last_name: '', email: '', phone_number: '' });
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding client:", err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text className="text-white mt-4 text-lg">Loading clients...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-6">
        <Text className="text-red-400 text-lg text-center mb-4">Error: {error}</Text>
        <TouchableOpacity onPress={fetchClients} className="bg-blue-600 px-6 py-3 rounded-xl">
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderClientItem = ({ item }: { item: Customer }) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: "/ClientDetails", params: { id: item.id } })}
      className="mb-4"
    >
      <GradientCard colors={Colors.gradient.darkToDarker}>
        <View className="flex-row items-center">
          <View className="bg-purple-600 rounded-full w-14 h-14 items-center justify-center mr-4">
            <Text className="text-white font-bold text-xl">
              {item.first_name[0]}{item.last_name[0]}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-white font-semibold text-lg">
              {item.first_name} {item.last_name}
            </Text>
            <Text className="text-gray-400 text-sm">{item.email}</Text>
            <Text className="text-gray-400 text-sm">{item.phone_number}</Text>
          </View>
          <View className="items-end">
            <Text className="text-green-400 text-lg font-semibold">
              ${item.total_spent?.toLocaleString() || 0}
            </Text>
            <Text className="text-gray-400 text-xs">Total Spent</Text>
          </View>
        </View>
      </GradientCard>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-3xl font-bold">Clients</Text>
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={fetchClients}
            className="p-3 bg-gray-700 rounded-full"
          >
            <RotateCcw size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 rounded-xl flex-row items-center space-x-2"
          >
            <UserPlus size={20} color="white" />
            <Text className="text-white font-semibold">Add Client</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View className="relative mb-6">
        <TextInput
          className="bg-gray-800 text-white p-4 pl-12 rounded-xl text-base border border-gray-700"
          placeholder="Search clients..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Search size={20} color="#9ca3af" className="absolute left-4 top-4" />
      </View>

      {/* Clients List */}
      {filteredClients.length > 0 ? (
        <FlatList
          data={filteredClients}
          renderItem={renderClientItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center py-12">
          <Text className="text-gray-400 text-lg">No clients found</Text>
        </View>
      )}

      {/* Add Client Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
      >
        <BlurView intensity={20} className="flex-1 justify-center items-center p-4">
          <View className="w-full max-w-md bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-2xl font-bold">Add New Client</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text className="text-gray-400 text-2xl">×</Text>
              </TouchableOpacity>
            </View>

            <View className="space-y-4">
              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-gray-400 text-sm mb-2">First Name</Text>
                  <TextInput
                    placeholder="First name"
                    placeholderTextColor="#6b7280"
                    value={newClient.first_name}
                    onChangeText={(v) => setNewClient({ ...newClient, first_name: v })}
                    className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-400 text-sm mb-2">Last Name</Text>
                  <TextInput
                    placeholder="Last name"
                    placeholderTextColor="#6b7280"
                    value={newClient.last_name}
                    onChangeText={(v) => setNewClient({ ...newClient, last_name: v })}
                    className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-400 text-sm mb-2">Email</Text>
                <TextInput
                  placeholder="Email address"
                  placeholderTextColor="#6b7280"
                  value={newClient.email}
                  onChangeText={(v) => setNewClient({ ...newClient, email: v })}
                  className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
                  keyboardType="email-address"
                />
              </View>

              <View>
                <Text className="text-gray-400 text-sm mb-2">Phone</Text>
                <TextInput
                  placeholder="Phone number"
                  placeholderTextColor="#6b7280"
                  value={newClient.phone_number}
                  onChangeText={(v) => setNewClient({ ...newClient, phone_number: v })}
                  className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
                  keyboardType="phone-pad"
                />
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
                onPress={handleAddClient}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">Add Client</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}