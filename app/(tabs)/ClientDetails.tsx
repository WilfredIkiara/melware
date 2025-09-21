
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DollarSign, Edit, Plus, Save, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
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

interface VehicleFormData {
  id: string; // Add id for editing
  make: string;
  licence_plate: string;
  engine_type?: string;
  notes?: string;
  mileage?: string;
  color?: string;
}

interface ClientDetailsProps {
  onGoBack: () => void;
  onAddVehicle: (clientId: string) => void;
  onAddService: (clientId: string) => void;
}

export default function ClientDetails({ onGoBack, onAddVehicle, onAddService }: Omit<ClientDetailsProps, 'clientId'>) {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const actualClientId = id as string;
  const {
    clientDetails,
    clientVehicles,
    clientServices,
    loading,
    error,
    fetchClientDetails,
    updateClientDetails,
    updateClientVehicle,
  } = useClientData();

  const [isEditingClient, setIsEditingClient] = useState(false);
  const [clientEditData, setClientEditData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [vehicleEditData, setVehicleEditData] = useState<Partial<VehicleFormData> | null>(null);


  useEffect(() => {
    if (actualClientId) {
      fetchClientDetails(actualClientId);
    }
  }, [actualClientId, fetchClientDetails]);

  useEffect(() => {
    if (clientDetails?.customer) {
      setClientEditData({
        first_name: clientDetails.customer.first_name,
        last_name: clientDetails.customer.last_name,
        email: clientDetails.customer.email,
        phone_number: clientDetails.customer.phone_number,
        address: clientDetails.customer.address || '',
      });
    }
  }, [clientDetails]);
  const handleGoBack = () => {
    router.back();
  };

  const handleAddVehicle = () => {
    router.push(`/AddVehicle?clientId=${actualClientId}`);
  };

  const handleAddService = () => {
    router.push(`/AddService?clientId=${actualClientId}`);
  };
  const handleEditClient = () => {
    setIsEditingClient(true);
  };

  const handleSaveClient = async () => {
    try {
      await updateClientDetails(actualClientId, clientEditData);
      setIsEditingClient(false);
      Alert.alert('Success', 'Client details updated successfully!');
    } catch (e) {
      Alert.alert('Error', 'Failed to save client details.');
    }
  };

  const handleEditVehicle = (vehicle: any) => {
    setEditingVehicleId(vehicle.id);
    setVehicleEditData({ ...vehicle, mileage: vehicle.mileage?.toString() });
  };

  const handleSaveVehicle = async () => {
    if (!vehicleEditData || !editingVehicleId) return;

    try {
      const formattedData = {
        ...vehicleEditData,
        mileage: vehicleEditData.mileage ? parseFloat(vehicleEditData.mileage) : undefined,
      };
      await updateClientVehicle(editingVehicleId, formattedData);
      setEditingVehicleId(null);
      setVehicleEditData(null);
      Alert.alert('Success', 'Vehicle details updated successfully!');
      fetchClientDetails(actualClientId); // Refresh data
    } catch (e) {
      Alert.alert('Error', 'Failed to save vehicle details.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingClient(false);
    setEditingVehicleId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0A0F1E]">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (error || !clientDetails?.customer) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0A0F1E] p-4">
        <Text className="text-red-500 text-lg text-center">{error || 'Client not found.'}</Text>
        <TouchableOpacity onPress={onGoBack} className="mt-4 bg-gray-700 px-4 py-2 rounded-lg">
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { customer, vehicles, service_records } = clientDetails;

  return (
    <ScrollView className="flex-1 bg-[#0A0F1E] p-4 pt-14">
      <View className="flex-row justify-between items-center mb-5">
        <TouchableOpacity onPress={onGoBack} className="p-3 bg-gray-700 rounded-full">
          <X size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-3xl font-bold">Client Details</Text>
        <View className="w-10" />
      </View>

      {/* Client Details Section */}
      <View className="bg-gray-800 p-6 rounded-xl mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold">
            {customer.first_name} {customer.last_name}
          </Text>
          {isEditingClient ? (
            <View className="flex-row space-x-2">
              <TouchableOpacity onPress={handleSaveClient} className="p-2 bg-green-600 rounded-full">
                <Save size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelEdit} className="p-2 bg-red-600 rounded-full">
                <X size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleEditClient} className="p-2 bg-blue-600 rounded-full">
              <Edit size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <View className="space-y-3">
          <View className="flex-row">
            <Text className="text-gray-400 font-bold w-24">Email:</Text>
            {isEditingClient ? (
              <TextInput
                className="flex-1 bg-gray-700 text-white p-2 rounded"
                value={clientEditData.email}
                onChangeText={(text) => setClientEditData({ ...clientEditData, email: text })}
                keyboardType="email-address"
              />
            ) : (
              <Text className="text-white flex-1">{customer.email}</Text>
            )}
          </View>
          <View className="flex-row">
            <Text className="text-gray-400 font-bold w-24">Phone:</Text>
            {isEditingClient ? (
              <TextInput
                className="flex-1 bg-gray-700 text-white p-2 rounded"
                value={clientEditData.phone_number}
                onChangeText={(text) => setClientEditData({ ...clientEditData, phone_number: text })}
                keyboardType="phone-pad"
              />
            ) : (
              <Text className="text-white flex-1">{customer.phone_number}</Text>
            )}
          </View>
          <View className="flex-row">
            <Text className="text-gray-400 font-bold w-24">Address:</Text>
            {isEditingClient ? (
              <TextInput
                className="flex-1 bg-gray-700 text-white p-2 rounded"
                value={clientEditData.address}
                onChangeText={(text) => setClientEditData({ ...clientEditData, address: text })}
                multiline
              />
            ) : (
              <Text className="text-white flex-1">{customer.address || 'N/A'}</Text>
            )}
          </View>
          <View className="flex-row">
            <Text className="text-gray-400 font-bold w-24">Total Spent:</Text>
            <Text className="text-green-400 flex-1">{formatCurrency(customer.total_spent || 0)}</Text>
          </View>
        </View>
      </View>

      {/* Vehicles Section */}
      <View className="bg-gray-800 p-6 rounded-xl mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold">Vehicles</Text>
          <TouchableOpacity onPress={handleAddVehicle} className="p-2 bg-green-600 rounded-full">
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
        {clientVehicles && clientVehicles.length > 0 ? (
          clientVehicles.map((vehicle) => (
            <View key={vehicle.id} className="bg-gray-700 p-4 rounded-lg mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white text-lg font-bold">
                  {vehicle.make}
                </Text>
                {editingVehicleId === vehicle.id ? (
                  <View className="flex-row space-x-2">
                    <TouchableOpacity onPress={handleSaveVehicle} className="p-1 bg-green-600 rounded-full">
                      <Save size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelEdit} className="p-1 bg-red-600 rounded-full">
                      <X size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => handleEditVehicle(vehicle)} className="p-1 bg-blue-600 rounded-full">
                    <Edit size={16} color="white" />
                  </TouchableOpacity>
                )}
              </View>
              <View className="space-y-1">
                <View className="flex-row">
                  <Text className="text-gray-400 font-bold w-28">License Plate:</Text>
                  {editingVehicleId === vehicle.id ? (
                    <TextInput
                      className="flex-1 bg-gray-600 text-white p-1 rounded"
                      value={vehicleEditData?.licence_plate}
                      onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, licence_plate: text })}
                    />
                  ) : (
                    <Text className="text-white flex-1">{vehicle.licence_plate}</Text>
                  )}
                </View>
                <View className="flex-row">
                  <Text className="text-gray-400 font-bold w-28">Engine Type:</Text>
                  {editingVehicleId === vehicle.id ? (
                    <TextInput
                      className="flex-1 bg-gray-600 text-white p-1 rounded"
                      value={vehicleEditData?.engine_type}
                      onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, engine_type: text })}
                    />
                  ) : (
                    <Text className="text-white flex-1">{vehicle.engine_type || 'N/A'}</Text>
                  )}
                </View>
                <View className="flex-row">
                  <Text className="text-gray-400 font-bold w-28">Color:</Text>
                  {editingVehicleId === vehicle.id ? (
                    <TextInput
                      className="flex-1 bg-gray-600 text-white p-1 rounded"
                      value={vehicleEditData?.color}
                      onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, color: text })}
                    />
                  ) : (
                    <Text className="text-white flex-1">{vehicle.color || 'N/A'}</Text>
                  )}
                </View>
                <View className="flex-row">
                  <Text className="text-gray-400 font-bold w-28">Mileage:</Text>
                  {editingVehicleId === vehicle.id ? (
                    <TextInput
                      className="flex-1 bg-gray-600 text-white p-1 rounded"
                      value={vehicleEditData?.mileage}
                      onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, mileage: text })}
                      keyboardType="numeric"
                    />
                  ) : (
                    <Text className="text-white flex-1">{vehicle.mileage || 'N/A'}</Text>
                  )}
                </View>
                {vehicle.notes && (
                  <View className="flex-row">
                    <Text className="text-gray-400 font-bold w-28">Notes:</Text>
                    {editingVehicleId === vehicle.id ? (
                      <TextInput
                        className="flex-1 bg-gray-600 text-white p-1 rounded"
                        value={vehicleEditData?.notes}
                        onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, notes: text })}
                        multiline
                      />
                    ) : (
                      <Text className="text-white flex-1">{vehicle.notes}</Text>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text className="text-gray-400 text-center">No vehicles found for this client.</Text>
        )}
      </View>

      {/* Service Records Section */}
      <View className="bg-gray-800 p-6 rounded-xl mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold">Service Records</Text>
          <TouchableOpacity onPress={handleAddService} className="p-2 bg-green-600 rounded-full">
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
        {clientServices && clientServices.length > 0 ? (
          clientServices.map((service) => (
            <View key={service.id} className="bg-gray-700 p-4 rounded-lg mb-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-lg font-bold">{service.service_type}</Text>
                <View className="flex-row items-center">
                  <DollarSign size={14} color={service.paid_status ? "#10b981" : "#ef4444"} />
                  <Text className={`ml-1 ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(service.service_cost || 0)}
                  </Text>
                  <Text className={`ml-2 text-xs ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
                    {service.paid_status ? 'Paid' : 'Unpaid'}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-400 text-sm">
                Date: {formatDate(service.created_at)}
              </Text>
              {service.notes && (
                <Text className="text-gray-400 text-sm mt-1">Notes: {service.notes}</Text>
              )}
              {/* {service.service_expenses && service.service_expenses !== '0' && (
                <Text className="text-gray-400 text-sm mt-1">
                  Expenses: {formatCurrency(parseFloat(service.service_expenses))}
                </Text>
              )} */}
              {(() => {
                const expenses = Number(service.service_expenses || 0); // Convert safely
                if (expenses > 0) {
                  return (
                    <Text className="text-gray-400 text-sm mt-1">
                      Expenses: {formatCurrency(expenses)}
                    </Text>
                  );
                }
                return null;
              })()}
            </View>
          ))
        ) : (
          <Text className="text-gray-400 text-center">No service records found for this client.</Text>
        )}
      </View>
    </ScrollView>
  );
}