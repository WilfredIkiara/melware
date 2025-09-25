

import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Calendar,
  Car,
  DollarSign,
  Edit,
  Eye,
  Fuel,
  Gauge,
  MapPin,
  Plus,
  Save,
  Settings,
  User,
  X
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useClientData } from '../../lib/pages/clientData';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isDesktop = width >= 1024;

interface VehicleFormData {
  id: string;
  make: string;
  licence_plate: string;
  engine_type?: string;
  notes?: string;
  mileage?: string;
  color?: string;
  vehicle_identification_number?: string;
  fuel_type?: string;
}

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  address?: string;
  total_spent?: number;
  created_at: string;  // ← Add this
}
interface Vehicle {
  id: string;
  make: string;
  licence_plate: string;
  engine_type?: string;
  mileage?: number;
  color?: string;
  notes?: string;
  vehicle_identification_number?: string;
  fuel_type?: string; // ← Add this
}
interface Service {
  id: string;
  client_id: string;
  service_type: string;
  service_cost?: number;
  paid_status?: boolean;
  notes?: string;
  service_expenses?: number;
  created_at: string;
  staff?: {
    first_name: string;
    last_name: string;
  };
}

interface ServiceModalProps {
  visible: boolean;
  service: Service | null;
  onClose: () => void;
}

export default function ClientDetails() {
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);

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
    router.push("/clients");
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
    setVehicleEditData({ 
      ...vehicle, 
      mileage: vehicle.mileage?.toString(),
      fuel_type: vehicle.fuel_type || 'Petrol',
      notes: vehicle.notes || '',
    });
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
    fetchClientDetails(actualClientId);
  } catch (e) {
    Alert.alert('Error', 'Failed to save vehicle details.');
  }
};

  const handleCancelEdit = () => {
    setIsEditingClient(false);
    setEditingVehicleId(null);
    setVehicleEditData(null);
  };

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setServiceModalVisible(true);
  };


  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  const getStatusColor = (status: boolean) => {
    return status ? '#10b981' : '#ef4444';
  };

  const getStatusText = (status: boolean) => {
    return status ? 'Paid' : 'Pending';
  };

  const ServiceModal = ({ visible, service, onClose }: ServiceModalProps) => {
    if (!service) return null;

    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className={`bg-gray-800 rounded-2xl mx-4 ${isTablet ? 'w-1/2' : 'w-full'} max-w-md`}>
            <View className="p-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white text-2xl font-bold">Service Details</Text>
                <TouchableOpacity onPress={onClose} className="p-2">
                  <X size={24} color="white" />
                </TouchableOpacity>
              </View>

              <View className="space-y-4">
                <View className="bg-gray-700 p-4 rounded-xl">
                  <Text className="text-white text-lg font-bold mb-2">{service.service_type}</Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gray-400">Amount:</Text>
                    <Text className="text-green-400 font-bold">{formatCurrency(service.service_cost || 0)}</Text>
                  </View>
                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-gray-400">Status:</Text>
                    <Text className="text-green-400 font-bold">{getStatusText(service.paid_status || false)}</Text>
                  </View>
                </View>

                {service.staff && (
                  <View className="bg-gray-700 p-4 rounded-xl">
                    <Text className="text-white font-bold mb-2">Service Provider</Text>
                    <View className="flex-row items-center">
                      <User size={16} color="#6b7280" />
                      <Text className="text-gray-300 ml-2">
                        {service.staff.first_name} {service.staff.last_name}
                      </Text>
                    </View>
                  </View>
                )}

                <View className="bg-gray-700 p-4 rounded-xl">
                  <Text className="text-white font-bold mb-2">Service Information</Text>
                  <View className="flex-row items-center mb-2">
                    <Calendar size={16} color="#6b7280" />
                    <Text className="text-gray-300 ml-2">{formatDate(service.created_at)}</Text>
                  </View>
                  
                  {/* Service Revenue */}
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-400">Revenue:</Text>
                    <Text className="text-green-400 font-bold">
                      {formatCurrency(service.service_cost || 0)}
                    </Text>
                  </View>
                  
                  {/* Service Expenses */}
                  {service.service_expenses && Number(service.service_expenses) > 0 && (
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-gray-400">Expenses:</Text>
                      <Text className="text-red-400 font-bold">
                        {formatCurrency(Number(service.service_expenses))}
                      </Text>
                    </View>
                  )}
                  
                  {/* Net Profit */}
                  {service.service_expenses && (
                    <View className="flex-row justify-between items-center border-t border-gray-600 pt-2">
                      <Text className="text-gray-300 font-bold">Net Profit:</Text>
                      <Text className={
                        (Number(service.service_cost || 0) - Number(service.service_expenses)) >= 0 
                          ? 'text-green-400 font-bold' 
                          : 'text-red-400 font-bold'
                      }>
                        {formatCurrency(Number(service.service_cost || 0) - Number(service.service_expenses))}
                      </Text>
                    </View>
                  )}
                </View>

                {service.notes && (
                  <View className="bg-gray-700 p-4 rounded-xl">
                    <Text className="text-white font-bold mb-2">Notes</Text>
                    <Text className="text-gray-300">{service.notes}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity 
                onPress={onClose}
                className="bg-blue-600 py-3 rounded-xl mt-6"
              >
                <Text className="text-white text-center font-bold">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0A0F1E]">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="text-white mt-4">Loading client details...</Text>
      </View>
    );
  }

  if (error || !clientDetails?.customer) {
    return (
      <View className="flex-1 justify-center items-center bg-[#0A0F1E] p-4">
        <Text className="text-red-500 text-lg text-center mb-4">
          {error || 'Client not found.'}
        </Text>
        <TouchableOpacity 
          onPress={handleGoBack} 
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { customer, vehicles, service_records } = clientDetails;

  return (
    <View className="flex-1 bg-[#0A0F1E]">
      {/* Header */}
      <View className="bg-[#1A2033] pt-12 pb-4 px-4 shadow-lg">
        <View className={`flex-row items-center justify-between ${isTablet ? 'max-w-6xl mx-auto' : ''}`}>
          <TouchableOpacity 
            onPress={handleGoBack} 
            className="p-3 bg-gray-700 rounded-xl"
          >
            <X size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold text-center flex-1 mx-4">
            Client Details
          </Text>
          <View className="w-10" />
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className={`p-4 ${isTablet ? 'max-w-6xl mx-auto w-full' : ''}`}>
          
          {/* Client Details Card */}
          <View className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 shadow-2xl">
            <View className="flex-row justify-between items-start mb-6">
              <View className="flex-1">
                <Text className="text-white text-3xl font-bold mb-2">
                  {customer.first_name} {customer.last_name}
                </Text>
                <Text className="text-gray-400 text-sm">
                  {/* Client since {String(formatDate(customer.created_at))} */}
                </Text>
              </View>
              {isEditingClient ? (
                <View className="flex-row space-x-2">
                  <TouchableOpacity 
                    onPress={handleSaveClient} 
                    className="p-3 bg-green-600 rounded-xl"
                  >
                    <Save size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleCancelEdit} 
                    className="p-3 bg-red-600 rounded-xl"
                  >
                    <X size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  onPress={handleEditClient} 
                  className="p-3 bg-blue-600 rounded-xl"
                >
                  <Edit size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>

            <View className={`gap-4 ${isTablet ? 'grid grid-cols-2' : ''}`}>
              <View className="bg-gray-700/50 p-4 rounded-xl">
                <View className="flex-row items-center mb-2">
                  <User size={20} color="#6b7280" />
                  <Text className="text-gray-400 ml-2 font-bold">Personal Info</Text>
                </View>
                <View className="space-y-2">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Email:</Text>
                    {isEditingClient ? (
                      <TextInput
                        className="flex-1 bg-gray-600 text-white p-2 rounded ml-2"
                        value={clientEditData.email}
                        onChangeText={(text) => setClientEditData({ ...clientEditData, email: text })}
                      />
                    ) : (
                      <Text className="text-white">{customer.email}</Text>
                    )}
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Phone:</Text>
                    {isEditingClient ? (
                      <TextInput
                        className="flex-1 bg-gray-600 text-white p-2 rounded ml-2"
                        value={clientEditData.phone_number}
                        onChangeText={(text) => setClientEditData({ ...clientEditData, phone_number: text })}
                      />
                    ) : (
                      <Text className="text-white">{customer.phone_number}</Text>
                    )}
                  </View>
                </View>
              </View>

              <View className="bg-gray-700/50 p-4 rounded-xl">
                <View className="flex-row items-center mb-2">
                  <MapPin size={20} color="#6b7280" />
                  <Text className="text-gray-400 ml-2 font-bold">Address & Finance</Text>
                </View>
                <View className="space-y-2">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Address:</Text>
                    {isEditingClient ? (
                      <TextInput
                        className="flex-1 bg-gray-600 text-white p-2 rounded ml-2"
                        value={clientEditData.address}
                        onChangeText={(text) => setClientEditData({ ...clientEditData, address: text })}
                      />
                    ) : (
                      <Text className="text-white text-right">{customer.address || 'N/A'}</Text>
                    )}
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400">Total Spent:</Text>
                    <Text className="text-green-400 font-bold">{formatCurrency(customer.total_spent || 0)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Vehicles Section */}
          <View className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 shadow-2xl">
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center">
                <Car size={24} color="#4F46E5" />
                <Text className="text-white text-2xl font-bold ml-3">Vehicles</Text>
                <Text className="text-gray-400 ml-3">({clientVehicles?.length || 0})</Text>
              </View>
              <TouchableOpacity 
                onPress={handleAddVehicle} 
                className="bg-green-600 px-4 py-3 rounded-xl flex-row items-center"
              >
                <Plus size={20} color="white" />
                <Text className="text-white font-bold ml-2">Add Vehicle</Text>
              </TouchableOpacity>
            </View>

            {clientVehicles && clientVehicles.length > 0 ? (
              <View className={`gap-4 ${isTablet ? 'grid grid-cols-2' : ''}`}>
                {clientVehicles.map((vehicle) => (
                  <View key={vehicle.id} className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
                    <View className="flex-row justify-between items-start mb-4">
                      <View className="flex-1">
                        <Text className="text-white text-xl font-bold mb-1">{vehicle.make}</Text>
                        <Text className="text-gray-400 text-sm">{vehicle.licence_plate}</Text>
                      </View>
                      {editingVehicleId === vehicle.id ? (
                        <View className="flex-row space-x-2">
                          <TouchableOpacity 
                            onPress={handleSaveVehicle} 
                            className="p-2 bg-green-600 rounded-lg"
                          >
                            <Save size={16} color="white" />
                          </TouchableOpacity>
                          <TouchableOpacity 
                            onPress={handleCancelEdit} 
                            className="p-2 bg-red-600 rounded-lg"
                          >
                            <X size={16} color="white" />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity 
                          onPress={() => handleEditVehicle(vehicle)} 
                          className="p-2 bg-blue-600 rounded-lg"
                        >
                          <Edit size={16} color="white" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View className="grid grid-cols-2 gap-3">
                      <View className="flex-row items-center">
                        <Gauge size={16} color="#6b7280" />
                        <Text className="text-gray-400 ml-2 text-sm">Mileage:</Text>
                      </View>
                      <Text className="text-white text-sm">
                        {editingVehicleId === vehicle.id ? (
                          <TextInput
                            className="bg-gray-600 text-white p-1 rounded"
                            value={vehicleEditData?.mileage}
                            onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, mileage: text })}
                          />
                        ) : (
                          vehicle.mileage || 'N/A'
                        )}
                      </Text>

                      <View className="flex-row items-center">
                        <Settings size={16} color="#6b7280" />
                        <Text className="text-gray-400 ml-2 text-sm">Engine:</Text>
                      </View>
                      <Text className="text-white text-sm">
                        {editingVehicleId === vehicle.id ? (
                          <TextInput
                            className="bg-gray-600 text-white p-1 rounded"
                            value={vehicleEditData?.engine_type}
                            onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, engine_type: text })}
                          />
                        ) : (
                          vehicle.engine_type || 'N/A'
                        )}
                      </Text>

                      <View className="flex-row items-center">
                        <Fuel size={16} color="#6b7280" />
                        <Text className="text-gray-400 ml-2 text-sm">Fuel:</Text>
                      </View>
                      {editingVehicleId === vehicle.id ? (
                        <TextInput
                          className="bg-gray-600 text-white p-1 rounded"
                          value={vehicleEditData?.fuel_type}
                          onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, fuel_type: text })}
                        />
                      ) : (
                        <Text className="text-white text-sm">{vehicle.fuel_type || 'N/A'}</Text>
                      )}

                      {vehicle.color && (
                        <>
                          <View className="flex-row items-center">
                            <Text className="text-gray-400 text-sm">Color:</Text>
                          </View>
                          <Text className="text-white text-sm">{vehicle.color}</Text>
                        </>
                      )}
                    </View>

                    <Text className="text-gray-400 text-sm">Notes:</Text>
                    {editingVehicleId === vehicle.id ? (
                      <TextInput
                        className="bg-gray-600 text-white p-2 rounded mt-2"
                        multiline
                        value={vehicleEditData?.notes}
                        onChangeText={(text) => setVehicleEditData({ ...vehicleEditData, notes: text })}
                        placeholder="Enter notes"
                        placeholderTextColor="#9CA3AF"
                      />
                    ) : (
                      <View className="mt-3 p-2 bg-gray-600 rounded">
                        <Text className="text-gray-300 text-sm">{vehicle.notes || 'No notes available'}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View className="bg-gray-700/30 p-8 rounded-xl border border-dashed border-gray-600">
                <Text className="text-gray-400 text-center text-lg">No vehicles registered</Text>
                <Text className="text-gray-500 text-center mt-2">Add the first vehicle for this client</Text>
              </View>
            )}
          </View>

          {/* Service Records Section */}
          <View className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl">
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center">
                <Settings size={24} color="#4F46E5" />
                <Text className="text-white text-2xl font-bold ml-3">Service Records</Text>
                <Text className="text-gray-400 ml-3">({clientServices?.length || 0})</Text>
              </View>
              <TouchableOpacity 
                onPress={handleAddService} 
                className="bg-green-600 px-4 py-3 rounded-xl flex-row items-center"
              >
                <Plus size={20} color="white" />
                <Text className="text-white font-bold ml-2">Add Service</Text>
              </TouchableOpacity>
            </View>

            {clientServices && clientServices.length > 0 ? (
              <View className="gap-4">
                {clientServices.map((service) => (
                  <TouchableOpacity 
                    key={service.id} 
                    onPress={() => handleViewService(service)}
                    className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 active:bg-gray-600/50"
                  >
                    <View className="flex-row justify-between items-center mb-3">
                      <Text className="text-white text-lg font-bold">{service.service_type}</Text>
                      <View className="flex-row items-center">
                        <DollarSign size={16} color={getStatusColor(service.paid_status || false)} />
                        <Text className={`ml-1 font-bold ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(service.service_cost || 0)}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <Calendar size={14} color="#6b7280" />
                        <Text className="text-gray-400 text-sm ml-2">{formatDate(service.created_at)}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <View 
                          className={`px-3 py-1 rounded-full ${service.paid_status ? 'bg-green-400/20' : 'bg-red-400/20'}`}
                        >
                          <Text className={`text-xs font-bold ${service.paid_status ? 'text-green-400' : 'text-red-400'}`}>
                            {getStatusText(service.paid_status || false)}
                          </Text>
                        </View>
                        <Eye size={16} color="#6b7280" className="ml-3" />
                      </View>
                    </View>

                    {service.notes && (
                      <Text className="text-gray-400 text-sm mt-3" numberOfLines={2}>
                        {service.notes}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className="bg-gray-700/30 p-8 rounded-xl border border-dashed border-gray-600">
                <Text className="text-gray-400 text-center text-lg">No service records</Text>
                <Text className="text-gray-500 text-center mt-2">Add the first service for this client</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <ServiceModal 
        visible={serviceModalVisible}
        service={selectedService}
        onClose={() => setServiceModalVisible(false)}
      />
    </View>
  );
}