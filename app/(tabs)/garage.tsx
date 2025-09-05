import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { useApp } from '@/lib/store';
import { BlurView } from 'expo-blur';
import { Wrench, Clock, CheckCircle, AlertTriangle, User, Plus, Search, CarIcon, Settings, MapPin,Bell } from 'lucide-react';

type GarageCar = {
  id: string;
  plate?: string;
  make: string;
  issue: string;
  status: 'in-progress' | 'completed' | 'pending';
  mechanic: string;
  owner: string;
  bookedAt: string;
  working: boolean;
  paid: boolean;
};

export default function GarageScreen() {

  const branchName = "Main Branch"
  const todayStats = {
    revenue: 25000,
    jobsCompleted: 12,
    pendingJobs: 5,
    expenses: 5000,
    staffAttendance: 8 // out of 10
  }
  const { cars, employees, updateCar } = useApp();
  
  const [editingCar, setEditingCar] = useState<GarageCar | null>(null);
  const [editedData, setEditedData] = useState<Partial<GarageCar>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Transform cars data to garage format
  const garageCars: GarageCar[] = useMemo(() => {
    return cars.map(car => ({
      id: car.id,
      plate: car.id, // Using ID as plate for now
      make: car.model,
      issue: car.work,
      status: car.working ? 'in-progress' : (car.paid ? 'completed' : 'pending'),
      mechanic: employees.length > 0 ? employees[0].name : 'Unassigned', // Default to first employee
      owner: car.owner,
      bookedAt: car.bookedAt,
      working: car.working,
      paid: car.paid,
    }));
  }, [cars, employees]);

  // Filter cars based on search
  const filteredCars = useMemo(() => {
    return garageCars.filter(car =>
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.issue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [garageCars, searchQuery]);
  
  const [showAddModal, setShowAddModal] = useState(false)

  // Stats
  const stats = useMemo(() => ({
    inProgress: filteredCars.filter(c => c.status === 'in-progress').length,
    completed: filteredCars.filter(c => c.status === 'completed').length,
    pending: filteredCars.filter(c => c.status === 'pending').length,
    total: filteredCars.length,
  }), [filteredCars]);

  // Save Edits
  const saveEdits = () => {
    if (editingCar) {
      // Update the car in the store
      updateCar(editingCar.id, {
        model: editedData.make || editingCar.make,
        owner: editedData.owner || editingCar.owner,
        work: editedData.issue || editingCar.issue,
        working: editedData.status === 'in-progress',
        paid: editedData.status === 'completed',
      });
      setEditingCar(null);
      setEditedData({});
      Alert.alert('Success', 'Car information updated successfully!');
    }
  };

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white text-2xl font-bold">Garage Operations</Text>
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
        <TouchableOpacity onPress={() => setShowAddModal(true)} className="bg-green-600 p-2 rounded-full">
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-3 flex-row items-center bg-white/10 rounded-xl px-3 py-2">
        <Search size={18} color="white" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search cars, owners, or issues"
          placeholderTextColor="#9ca3af"
          className="flex-1 text-white ml-2"
        />
      </View>

      {/* Stats */}
      <View className="flex-row justify-between mb-4 px-4">
        <BlurView intensity={60} tint="dark" className="p-4 rounded-xl w-[30%]">
          <Text className="text-gray-300 text-xs">In Progress</Text>
          <Text className="text-yellow-400 text-xl font-bold">{stats.inProgress}</Text>
        </BlurView>
        <BlurView intensity={60} tint="dark" className="p-4 rounded-xl w-[30%]">
          <Text className="text-gray-300 text-xs">Completed</Text>
          <Text className="text-green-400 text-xl font-bold">{stats.completed}</Text>
        </BlurView>
        <BlurView intensity={60} tint="dark" className="p-4 rounded-xl w-[30%]">
          <Text className="text-gray-300 text-xs">Pending</Text>
          <Text className="text-red-400 text-xl font-bold">{stats.pending}</Text>
        </BlurView>
      </View>

      {/* Car List */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {filteredCars.map((car) => (
          <BlurView key={car.id} intensity={50} tint="dark" className="rounded-2xl p-4 mb-3 overflow-hidden">
            <TouchableOpacity
              onPress={() => {
                setEditingCar(car);
                setEditedData(car);
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-white text-lg font-bold">{car.make}</Text>
                <View className={`px-2 py-1 rounded-full ${
                  car.status === "in-progress" ? "bg-yellow-600"
                  : car.status === "completed" ? "bg-green-600"
                  : "bg-gray-600"
                }`}>
                  <Text className="text-white text-xs capitalize">{car.status}</Text>
                </View>
              </View>

              <Text className="text-gray-300 text-sm">Owner: {car.owner}</Text>
              <Text className="text-gray-300 text-sm">Issue: {car.issue}</Text>
              <Text className="text-gray-400 text-sm">Mechanic: {car.mechanic}</Text>
              <Text className="text-gray-500 text-xs">Booked: {car.bookedAt}</Text>
            </TouchableOpacity>
          </BlurView>
        ))}
      </ScrollView>

      {/* Edit Modal */}
      {editingCar && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!editingCar}
        >
          <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="bg-white rounded-2xl p-6 w-11/12">
              <Text className="text-xl font-bold mb-4">Edit Car Info</Text>

              {/* Plate */}
              <TextInput
                value={editedData.plate}
                onChangeText={(t) => setEditedData({ ...editedData, plate: t })}
                className="bg-gray-100 p-3 rounded-lg mb-3"
                placeholder="Plate Number"
              />

              {/* Make */}
              <TextInput
                value={editedData.make}
                onChangeText={(t) => setEditedData({ ...editedData, make: t })}
                className="bg-gray-100 p-3 rounded-lg mb-3"
                placeholder="Car Make/Model"
              />

              {/* Issue */}
              <TextInput
                value={editedData.issue}
                onChangeText={(t) => setEditedData({ ...editedData, issue: t })}
                className="bg-gray-100 p-3 rounded-lg mb-3"
                placeholder="Issue/Job"
              />

              {/* Status */}
              <TextInput
                value={editedData.status}
                onChangeText={(t) => setEditedData({ ...editedData, status: t as GarageCar['status'] })}
                className="bg-gray-100 p-3 rounded-lg mb-3"
                placeholder="Status (pending/in-progress/completed)"
              />

              {/* Mechanic */}
              <TextInput
                value={editedData.mechanic}
                onChangeText={(t) => setEditedData({ ...editedData, mechanic: t })}
                className="bg-gray-100 p-3 rounded-lg mb-3"
                placeholder="Mechanic Name"
              />

              {/* Actions */}
              <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                  onPress={() => setEditingCar(null)}
                  className="bg-gray-400 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveEdits}
                  className="bg-blue-600 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
