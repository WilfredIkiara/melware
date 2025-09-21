import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, Edit, Mail, MapPin, Phone, Save, User, X } from 'lucide-react-native';
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
import { useAuth } from '../../lib/auth'; // Import your auth hook
import { useStaffDetails } from '../../lib/pages/useStaffDetails';

export default function StaffDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth(); // Get user from auth context
  const staffId = id as string;
  
  const { data: staffDetails, loading, error, refetch } = useStaffDetails(staffId);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    location: ''
  });

  // Set edit data when staff details are loaded
  React.useEffect(() => {
    if (staffDetails?.staff) {
      setEditData({
        first_name: staffDetails.staff.first_name,
        last_name: staffDetails.staff.last_name,
        email: staffDetails.staff.email,
        phone: staffDetails.staff.phone || '',
        location: staffDetails.staff.location || ''
      });
    }
  }, [staffDetails]);

  const handleSave = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/api/staff/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}` // Fixed this line
        },
        body: JSON.stringify(editData)
      });

      if (!response.ok) {
        throw new Error('Failed to update staff');
      }

      setIsEditing(false);
      refetch();
      Alert.alert('Success', 'Staff details updated successfully');
    } catch (err) {
      Alert.alert('Error', 'Failed to update staff details');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-white mt-4">Loading staff details...</Text>
      </View>
    );
  }

  if (error || !staffDetails) {
    return (
      <View className="flex-1 bg-[#0A0F1E] justify-center items-center p-4">
        <Text className="text-red-500 text-lg text-center">{error || 'Staff not found'}</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { staff, appointments, services, monthlyStats } = staffDetails;

  return (
    <ScrollView className="flex-1 bg-[#0A0F1E] p-4 pt-14">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <X size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Staff Details</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)} className="p-2">
          {isEditing ? <Save size={24} color="#10b981" /> : <Edit size={24} color="#3b82f6" />}
        </TouchableOpacity>
      </View>

      {/* Staff Information */}
      <View className="bg-gray-800 rounded-xl p-6 mb-6">
        <View className="flex-row items-center mb-4">
          <View className="bg-blue-600 rounded-full w-16 h-16 items-center justify-center mr-4">
            <User size={32} color="white" />
          </View>
          <View className="flex-1">
            {isEditing ? (
              <>
                <TextInput
                  className="text-white text-xl font-bold bg-gray-700 p-2 rounded mb-1"
                  value={editData.first_name}
                  onChangeText={(text) => setEditData({ ...editData, first_name: text })}
                />
                <TextInput
                  className="text-white text-xl font-bold bg-gray-700 p-2 rounded"
                  value={editData.last_name}
                  onChangeText={(text) => setEditData({ ...editData, last_name: text })}
                />
              </>
            ) : (
              <Text className="text-white text-2xl font-bold">
                {staff.first_name} {staff.last_name}
              </Text>
            )}
            <Text className="text-gray-400 text-sm mt-1">Role: {staff.role}</Text>
          </View>
        </View>

        <View className="space-y-3">
          <View className="flex-row items-center">
            <Mail size={18} color="#9ca3af" className="mr-3" />
            {isEditing ? (
              <TextInput
                className="flex-1 text-white bg-gray-700 p-2 rounded"
                value={editData.email}
                onChangeText={(text) => setEditData({ ...editData, email: text })}
                keyboardType="email-address"
              />
            ) : (
              <Text className="text-white flex-1">{staff.email}</Text>
            )}
          </View>

          <View className="flex-row items-center">
            <Phone size={18} color="#9ca3af" className="mr-3" />
            {isEditing ? (
              <TextInput
                className="flex-1 text-white bg-gray-700 p-2 rounded"
                value={editData.phone}
                onChangeText={(text) => setEditData({ ...editData, phone: text })}
                keyboardType="phone-pad"
              />
            ) : (
              <Text className="text-white flex-1">{staff.phone || 'Not provided'}</Text>
            )}
          </View>

          <View className="flex-row items-center">
            <MapPin size={18} color="#9ca3af" className="mr-3" />
            {isEditing ? (
              <TextInput
                className="flex-1 text-white bg-gray-700 p-2 rounded"
                value={editData.location}
                onChangeText={(text) => setEditData({ ...editData, location: text })}
              />
            ) : (
              <Text className="text-white flex-1">{staff.location || 'Not specified'}</Text>
            )}
          </View>

          <View className="flex-row items-center">
            <Calendar size={18} color="#9ca3af" className="mr-3" />
            <Text className="text-gray-400">Joined: {new Date(staff.created_at).toLocaleDateString()}</Text>
          </View>
        </View>

        {isEditing && (
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity onPress={handleSave} className="flex-1 bg-green-600 py-3 rounded-lg">
              <Text className="text-white text-center font-semibold">Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditing(false)} className="flex-1 bg-gray-600 py-3 rounded-lg">
              <Text className="text-white text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Monthly Stats */}
      <View className="bg-gray-800 rounded-xl p-6 mb-6">
        <Text className="text-white text-xl font-bold mb-4">This Month's Performance</Text>
        <View className="grid grid-cols-2 gap-4">
          <View className="bg-gray-700 p-4 rounded-lg">
            <Text className="text-white text-lg font-semibold">{monthlyStats.totalServices}</Text>
            <Text className="text-gray-400 text-sm">Services Completed</Text>
          </View>
          <View className="bg-gray-700 p-4 rounded-lg">
            <Text className="text-green-400 text-lg font-semibold">{formatCurrency(monthlyStats.totalRevenue)}</Text>
            <Text className="text-gray-400 text-sm">Revenue Generated</Text>
          </View>
          <View className="bg-gray-700 p-4 rounded-lg">
            <Text className="text-blue-400 text-lg font-semibold">{monthlyStats.completedAppointments}</Text>
            <Text className="text-gray-400 text-sm">Completed Appointments</Text>
          </View>
          <View className="bg-gray-700 p-4 rounded-lg">
            <Text className="text-yellow-400 text-lg font-semibold">{monthlyStats.pendingAppointments}</Text>
            <Text className="text-gray-400 text-sm">Pending Appointments</Text>
          </View>
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View className="bg-gray-800 rounded-xl p-6 mb-6">
        <Text className="text-white text-xl font-bold mb-4">Upcoming Appointments</Text>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <View key={appointment.id} className="bg-gray-700 p-4 rounded-lg mb-3">
              <Text className="text-white font-semibold">{appointment.service_type}</Text>
              <Text className="text-gray-400 text-sm">
                Client: {appointment.clients.first_name} {appointment.clients.last_name}
              </Text>
              <Text className="text-gray-400 text-sm">
                Vehicle: {appointment.client_vehicles.make} ({appointment.client_vehicles.licence_plate})
              </Text>
              <View className="flex-row items-center mt-2">
                <Clock size={14} color="#9ca3af" />
                <Text className="text-gray-400 text-sm ml-1">
                  {formatDate(appointment.scheduled_time)}
                </Text>
              </View>
              <Text className={`text-sm mt-1 ${
                appointment.status === 'completed' ? 'text-green-400' :
                appointment.status === 'scheduled' ? 'text-blue-400' : 'text-yellow-400'
              }`}>
                Status: {appointment.status}
              </Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-400 text-center">No upcoming appointments</Text>
        )}
      </View>

      {/* Recent Services */}
      <View className="bg-gray-800 rounded-xl p-6 mb-6">
        <Text className="text-white text-xl font-bold mb-4">Recent Services This Month</Text>
        {services.length > 0 ? (
          services.map((service) => (
            <View key={service.id} className="bg-gray-700 p-4 rounded-lg mb-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-white font-semibold">{service.service_type}</Text>
                  <Text className="text-gray-400 text-sm">
                    Client: {service.clients.first_name} {service.clients.last_name}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    Vehicle: {service.client_vehicles.make} ({service.client_vehicles.licence_plate})
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-green-400 font-semibold">{formatCurrency(service.service_cost)}</Text>
                  <Text className={`text-xs ${
                    service.paid_status ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {service.paid_status ? 'Paid' : 'Unpaid'}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-400 text-sm mt-2">
                Date: {formatDate(service.created_at)}
              </Text>
              {service.notes && (
                <Text className="text-gray-400 text-sm mt-1">Notes: {service.notes}</Text>
              )}
            </View>
          ))
        ) : (
          <Text className="text-gray-400 text-center">No services this month</Text>
        )}
      </View>
    </ScrollView>
  );
}