
import AppointmentModal from '@/lib/components/Appointments';
import WorkOrderModal from '@/lib/components/WorkOrdersModal';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Bell, Car, ChevronDown, ChevronUp, ClipboardList, Clock, DollarSign, FileText, LogOut, MapPin, Package } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../lib/auth';
import ActivityModal from '../../lib/components/ActivityModal'; // Adjust path as needed
import { useSuperAdminData } from '../../lib/pages/useSuperAdminData';


// Define the types that match your backend response
interface CustomerData {
  id?: string;
  client_id?: string; // Add this - your backend might use client_id instead of id
  first_name: string;
  last_name: string;
  phone_number?: string;
  total_spent?: number;
  created_at?: string;
  balance?: number;
}

interface Activity {
  id: string;
  profile_id: string;
  profiles?: { first_name: string; last_name?: string }; // Make last_name optional
  activity_type: string;
  description: string;
  timestamp: string;
  route?: string;
}
interface WorkOrder {
  id: string;
  client_id: string;
  vehicle_id: string;
  services: any[];
  assigned_staff: string;
  estimated_cost: number;
  status: string;
  created_at: string;
  clients?: { first_name: string; last_name: string; email: string };
  client_vehicles?: { make: string; model: string; licence_plate: string };
  staff?: { first_name: string; last_name: string };
}

interface Appointment {
  id: string;
  client_id: string;
  vehicle_id: string;
  service_type: string;
  scheduled_time: string;
  notes: string;
  status: string;
  clients?: { first_name: string; last_name: string; phone_number: string };
  client_vehicles?: { make: string; model: string; licence_plate: string };
}


// Get the screen width to apply responsive classes conditionally
const { width } = Dimensions.get('window');
const isWeb = width >= 768;

export default function SuperAdmin() {
  const { stats, activities, workOrders, appointments, financials, inventory, customers, staff, loading, error } = useSuperAdminData();
  
  const { user, logout } = useAuth();
  const router = useRouter();
  const branchName = "Main Branch";

  // State for collapsible lists
  const [workOrdersCollapsed, setWorkOrdersCollapsed] = useState(false);
  const [appointmentsCollapsed, setAppointmentsCollapsed] = useState(false);
  const [customersCollapsed, setCustomersCollapsed] = useState(false);
  const [activitiesCollapsed, setActivitiesCollapsed] = useState(false); // NEW

// State for modals
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [workOrderModalVisible, setWorkOrderModalVisible] = useState(false);
  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
useEffect(() => {
  console.log('=== DEBUG DATA ===');
  console.log('Activities:', activities);
  console.log('Customers:', customers);
  console.log('User:', user);
}, [activities, customers, user]);
  // Fixed logout function
// In superadmin.tsx - Replace the existing handleLogout function
const handleLogout = async () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      { 
        text: "Cancel", 
        style: "cancel" 
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            console.log('Starting logout process...');
            await logout();
            console.log('Logout completed, navigating to login...');
            
            // Clear any navigation state and replace
            router.replace({
              pathname: '/login',
              params: { logout: 'true' }
            });
            
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        }
      }
    ]
  );
};
  const SectionHeader = ({ title, collapsed, toggle }: any) => (
  <TouchableOpacity
    onPress={toggle}
    className="flex-row justify-between items-center mb-4"
  >
    <Text className="text-white text-xl font-semibold">{title}</Text>
    {collapsed ? <ChevronDown size={20} color="white" /> : <ChevronUp size={20} color="white" />}
  </TouchableOpacity>
);

const InfoCard = ({ title, subtitle, meta, amount, status, icon, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white/5 rounded-xl mb-3 p-4 active:bg-white/10 transition duration-200"
    style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 3 }}
  >
    <View className="flex-row items-start">
      <View className="mr-3">{icon}</View>
      <View className="flex-1">
        <Text className="text-white font-semibold">{title}</Text>
        {subtitle && <Text className="text-gray-300 text-sm mt-1">{subtitle}</Text>}
        {meta && <Text className="text-gray-400 text-xs mt-1">{meta}</Text>}
      </View>
      <View className="items-end">
        {amount && <Text className="text-white text-sm font-bold mb-1">{amount}</Text>}
        {status && (
          <View className="px-2 py-1 rounded-full bg-blue-600/30">
            <Text className="text-xs text-blue-200">{status}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);
const handleCustomerPress = (customer: CustomerData) => {
  console.log("Customer pressed:", customer);
  
  // Try different possible ID fields
  const customerId = customer.id || customer.client_id;
  
  if (customerId) {
    console.log("Navigating to client details with ID:", customerId);
    router.push(`/ClientDetails?id=${customerId}`);
  } else {
    console.log("No ID found in customer object");
    Alert.alert('Info', 'Customer ID not available. Cannot open details.');
  }
};
  const formattedDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString();
  };

  // Helper function to get total customers count from nested structure
  const getTotalCustomers = () => {
    if (!customers) return 0;
    // Check if customers is an array (flat structure) or object with nested arrays
    if (Array.isArray(customers)) {
      return customers.length;
    } else {
      // Handle nested structure
      const topCustomers = customers.topCustomers?.length || 0;
      const newCustomers = customers.newCustomersThisWeek?.length || 0;
      const outstanding = customers.outstandingBalances?.length || 0;
      return topCustomers + newCustomers + outstanding;
    }
  };
  // const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    // Function to handle activity click - NEW
  const handleActivityPress = (activity: Activity) => {
    setSelectedActivity(activity);
    setActivityModalVisible(true);
  };

  // Function to close modal - NEW
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedActivity(null);
  };
  const handleWorkOrderPress = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setWorkOrderModalVisible(true);
  };

  const handleAppointmentPress = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentModalVisible(true);
  };
  const closeAllModals = () => {
    setActivityModalVisible(false);
    setWorkOrderModalVisible(false);
    setAppointmentModalVisible(false);
    setSelectedActivity(null);
    setSelectedWorkOrder(null);
    setSelectedAppointment(null);
  };

  // Helper to get flat customers array for display
  // const getCustomersForDisplay = () => {
  //   if (!customers) return [];
  //   if (Array.isArray(customers)) {
  //     return customers;
  //   } else {
  //     // Combine all customer arrays from nested structure
  //     return [
  //       ...(customers.topCustomers || []),
  //       ...(customers.newCustomersThisWeek || []),
  //       ...(customers.outstandingBalances || [])
  //     ];
  //   }
  // };
const getCustomersForDisplay = () => {
  if (!customers) return [];
  
  if (Array.isArray(customers)) {
    return customers;
  } else {
    // Combine all customer arrays and remove duplicates based on customer ID
    const allCustomers = [
      ...(customers.topCustomers || []),
      ...(customers.newCustomersThisWeek || []),
      ...(customers.outstandingBalances || [])
    ];
    
    // Remove duplicates using a Set based on customer ID
    const uniqueCustomers = allCustomers.filter((customer, index, self) => {
      const customerId = customer.id || customer.client_id;
      return index === self.findIndex(c => 
        (c.id || c.client_id) === customerId
      );
    });
    
    return uniqueCustomers;
  }
};
  if (loading) {
    return <View className="flex-1 justify-center items-center bg-[#1A2033]"><Text className="text-white text-2xl">Loading...</Text></View>;
  }

  if (error) {
    return <View className="flex-1 justify-center items-center bg-[#1A2033]"><Text className="text-red-500 text-2xl">Error: {error}</Text></View>;
  }

  return (
    <View className="flex-1 bg-[#1A2033] pt-12">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header Section */}
        <View className={`px-6 md:px-12 py-4 flex-row justify-between items-center`}>
          <View>
            <Text className="text-white text-3xl font-bold">Hello, {user?.name || "Super Admin"}</Text>
            <Text className="text-gray-400 text-sm">{branchName}</Text>
          </View>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => router.push('/notifications' as any)}>
              <Bell size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <LogOut size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dashboard Cards Section */}
        <View className={`p-6 md:p-12`}>
          <View className={`flex-row flex-wrap justify-between md:grid md:grid-cols-3 md:gap-4`}>
            {/* Total Revenue Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <DollarSign size={36} color="#4ade80" />
              <Text className="text-gray-300 text-sm mt-2">Total Revenue</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : `KES ${stats?.financials?.total_revenue?.toLocaleString() || '0'}`}
              </Text>
            </BlurView>

            {/* Total Work Orders Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <ClipboardList size={36} color="#6366f1" />
              <Text className="text-gray-300 text-sm mt-2">Work Orders</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : workOrders?.length || 0}
              </Text>
            </BlurView>
            
            {/* Total Clients Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <MapPin size={36} color="#38bdf8" />
              <Text className="text-gray-300 text-sm mt-2">Total Clients</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : stats?.clients?.total_clients || getTotalCustomers()}
              </Text>
            </BlurView>
            
            {/* Total Expenses Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <DollarSign size={36} color="#f87171" />
              <Text className="text-gray-300 text-sm mt-2">Total Expenses</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : `KES ${stats?.expenses?.total_expenses?.toLocaleString() || '0'}`}
              </Text>
            </BlurView>

            {/* Low Stock Items Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <Package size={36} color="#facc15" />
              <Text className="text-gray-300 text-sm mt-2">Low Stock Items</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : stats?.inventory?.low_stock_count || inventory?.lowStockItems?.length || 0}
              </Text>
            </BlurView>
            
            {/* Total Vehicles Card */}
            <BlurView intensity={30} tint="dark" className="bg-white/10 p-4 rounded-xl mb-4 w-full md:w-auto md:mb-0 items-center justify-center h-36">
              <Car size={36} color="#c084fc" />
              <Text className="text-gray-300 text-sm mt-2">Total Vehicles</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {loading ? '...' : stats?.cars?.total_cars || 0}
              </Text>
            </BlurView>
          </View>
        </View>

        {/* Work Orders Section */}
        {/* <View className={`px-6 md:px-12 mb-8`}>
          <TouchableOpacity onPress={() => setWorkOrdersCollapsed(!workOrdersCollapsed)} className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-semibold">Latest Work Orders</Text>
            {workOrdersCollapsed ? <ChevronDown size={20} color="white" /> : <ChevronUp size={20} color="white" />}
          </TouchableOpacity>
          <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
            {loading ? <Text className="text-gray-300">Loading work orders...</Text> : (workOrdersCollapsed ? null : (workOrders?.length === 0 ? <Text className="text-gray-300">No work orders found.</Text> : workOrders?.slice(0, 5).map((order) => (
              <TouchableOpacity 
                key={String(order.id)} 
                onPress={() => handleWorkOrderPress(order)}
                className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0 active:bg-white/5"
              >
                <ClipboardList size={20} color="#6366f1" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">
                    Work Order #{String(order.id).substring(0, 8)}
                  </Text>
                  <Text className="text-gray-300 text-sm">
                    {order.clients?.first_name} {order.clients?.last_name}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {order.client_vehicles?.make} - {order.client_vehicles?.licence_plate}
                  </Text>
                </View>
                <View className="flex-col items-end">
                  <Text className="text-white text-sm font-bold">KES {order.estimated_cost?.toLocaleString() || '0'}</Text>
                  <Text className="text-gray-400 text-xs">{order.status}</Text>
                </View>
              </TouchableOpacity>
            ))))}
          </BlurView>
        </View> */}
<View className="px-6 md:px-12 mb-8">
  <SectionHeader
    title="Latest Work Orders"
    collapsed={workOrdersCollapsed}
    toggle={() => setWorkOrdersCollapsed(!workOrdersCollapsed)}
  />
  <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
    {loading ? (
      <Text className="text-gray-300">Loading work orders...</Text>
    ) : workOrdersCollapsed ? null : workOrders?.length === 0 ? (
      <Text className="text-gray-300">No work orders found.</Text>
    ) : (
      workOrders?.slice(0, 5).map((order) => (
        <InfoCard
          key={order.id}
          title={`Work Order #${String(order.id).substring(0, 8)}`}
          subtitle={`${order.clients?.first_name} ${order.clients?.last_name}`}
          meta={`${order.client_vehicles?.make} - ${order.client_vehicles?.licence_plate}`}
          amount={`KES ${order.estimated_cost?.toLocaleString() || '0'}`}
          status={order.status}
          icon={<ClipboardList size={20} color="#6366f1" />}
          onPress={() => handleWorkOrderPress(order)}
        />
      ))
    )}
  </BlurView>
</View>


        {/* Upcoming Appointments Section */}
        {/* <View className={`px-6 md:px-12 mb-8`}>
            <TouchableOpacity onPress={() => setAppointmentsCollapsed(!appointmentsCollapsed)} className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-xl font-semibold">Upcoming Appointments</Text>
              {appointmentsCollapsed ? <ChevronDown size={20} color="white" /> : <ChevronUp size={20} color="white" />}
            </TouchableOpacity>
            <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
              {loading ? <Text className="text-gray-300">Loading appointments...</Text> : (appointmentsCollapsed ? null : (appointments?.length === 0 ? <Text className="text-gray-300">No upcoming appointments.</Text> : appointments?.slice(0, 5).map((appt) => (
                <TouchableOpacity 
                  key={appt.id} 
                  onPress={() => handleAppointmentPress(appt)}
                  className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0 active:bg-white/5"
                >
                  <Clock size={20} color="#facc15" />
                  <View className="ml-4 flex-1">
                    <Text className="text-white font-semibold">{appt.service_type}</Text>
                    <Text className="text-gray-300 text-sm">
                      {appt.clients?.first_name} {appt.clients?.last_name}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      {appt.client_vehicles?.licence_plate}
                    </Text>
                  </View>
                  <View className="flex-col items-end">
                    <Text className="text-gray-300 text-sm">{formattedDate(appt.scheduled_time)}</Text>
                    <Text className="text-gray-400 text-xs">{appt.status}</Text>
                  </View>
                </TouchableOpacity>
              ))))}
            </BlurView>
          </View> */}
        <View className="px-6 md:px-12 mb-8">
  <SectionHeader
    title="Upcoming Appointments"
    collapsed={appointmentsCollapsed}
    toggle={() => setAppointmentsCollapsed(!appointmentsCollapsed)}
  />
  <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
    {loading ? (
      <Text className="text-gray-300">Loading appointments...</Text>
    ) : appointmentsCollapsed ? null : appointments?.length === 0 ? (
      <Text className="text-gray-300">No upcoming appointments.</Text>
    ) : (
      appointments?.slice(0, 5).map((appt) => (
        <InfoCard
          key={appt.id}
          title={appt.service_type}
          subtitle={`${appt.clients?.first_name} ${appt.clients?.last_name}`}
          meta={`${appt.client_vehicles?.licence_plate} | ${formattedDate(appt.scheduled_time)}`}
          status={appt.status}
          icon={<Clock size={20} color="#facc15" />}
          onPress={() => handleAppointmentPress(appt)}
        />
      ))
    )}
  </BlurView>
</View>

        {/* Latest Customers Section */}
          {/* <View className={`px-6 md:px-12 mb-8`}>
            <TouchableOpacity onPress={() => setCustomersCollapsed(!customersCollapsed)} className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-xl font-semibold">Latest Customers</Text>
              {customersCollapsed ? <ChevronDown size={20} color="white" /> : <ChevronUp size={20} color="white" />}
            </TouchableOpacity>
            <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
              {loading ? <Text className="text-gray-300">Loading customers...</Text> : (customersCollapsed ? null : (getCustomersForDisplay().length === 0 ? <Text className="text-gray-300">No customers found.</Text> : getCustomersForDisplay().slice(0, 5).map((customer, index) => (
                <TouchableOpacity 
                  key={customer.id || index} 
                  onPress={() => handleCustomerPress(customer)}
                  className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0 active:bg-white/5"
                >
                  <View className="ml-4 flex-1">
                    <Text className="text-white font-semibold">{customer.first_name} {customer.last_name}</Text>
                    {customer.phone_number && (
                      <Text className="text-gray-300 text-sm">Phone: {customer.phone_number}</Text>
                    )}
                    {customer.created_at && (
                      <Text className="text-gray-400 text-xs">Joined: {formattedDate(customer.created_at)}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))))}
            </BlurView>
          </View> */}
<View className="px-6 md:px-12 mb-8">
  <SectionHeader
    title="Latest Customers"
    collapsed={customersCollapsed}
    toggle={() => setCustomersCollapsed(!customersCollapsed)}
  />
  <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
    {loading ? (
      <Text className="text-gray-300">Loading customers...</Text>
    ) : customersCollapsed ? null : getCustomersForDisplay().length === 0 ? (
      <Text className="text-gray-300">No customers found.</Text>
    ) : (
      getCustomersForDisplay().slice(0, 5).map((customer, index) => (
        <InfoCard
          key={customer.id || index}
          title={`${customer.first_name} ${customer.last_name}`}
          subtitle={customer.phone_number ? `Phone: ${customer.phone_number}` : ""}
          meta={customer.created_at ? `Joined: ${formattedDate(customer.created_at)}` : ""}
          icon={<FileText size={20} color="#38bdf8" />}
          onPress={() => handleCustomerPress(customer)}
        />
      ))
    )}
  </BlurView>
</View>

        {/* Recent Activities Section - collapsible */}
        {/* <View className={`px-6 md:px-12 mb-8`}>
        <TouchableOpacity 
          onPress={() => setActivitiesCollapsed(!activitiesCollapsed)} 
          className="flex-row justify-between items-center mb-4"
        >
          <Text className="text-white text-xl font-semibold">Recent Activities</Text>
          {activitiesCollapsed ? <ChevronDown size={20} color="white" /> : <ChevronUp size={20} color="white" />}
        </TouchableOpacity>
        
        <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
          {loading ? (
            <Text className="text-gray-300">Loading activities...</Text>
          ) : activitiesCollapsed ? null : activities?.length === 0 ? (
            <Text className="text-gray-300">No activities found.</Text>
          ) : (
            activities?.slice(0, 5).map((act) => (
              <TouchableOpacity 
                key={act.id} 
                onPress={() => handleActivityPress(act)}
                className="flex-row items-center border-b border-gray-700 py-3 last:border-b-0 active:bg-white/5"
              >
                <FileText size={20} color="#a855f7" />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-semibold">
                    {act.activity_type} • {act.profiles?.first_name}
                  </Text>
                  <Text className="text-gray-300 text-sm" numberOfLines={1}>
                    {act.description}
                  </Text>
                  <Text className="text-gray-400 text-xs">{formattedDate(act.timestamp)}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </BlurView>
      </View> */}
<View className="px-6 md:px-12 mb-8">
  <SectionHeader
    title="Recent Activities"
    collapsed={activitiesCollapsed}
    toggle={() => setActivitiesCollapsed(!activitiesCollapsed)}
  />
  <BlurView intensity={30} tint="dark" className="bg-white/10 rounded-xl p-4">
    {loading ? (
      <Text className="text-gray-300">Loading activities...</Text>
    ) : activitiesCollapsed ? null : activities?.length === 0 ? (
      <Text className="text-gray-300">No activities found.</Text>
    ) : (
      activities?.slice(0, 5).map((act) => (
        <InfoCard
          key={act.id}
          title={`${act.activity_type} • ${act.profiles?.first_name || "Unknown"}`}
          subtitle={act.description}
          meta={formattedDate(act.timestamp)}
          icon={<FileText size={20} color="#a855f7" />}
          onPress={() => handleActivityPress(act)}
        />
      ))
    )}
  </BlurView>
</View>

      <ActivityModal 
        visible={activityModalVisible}
        activity={selectedActivity}
        onClose={closeAllModals}
      />
      
      <WorkOrderModal 
        visible={workOrderModalVisible}
        workOrder={selectedWorkOrder}
        onClose={closeAllModals}
      />
      
      <AppointmentModal 
        visible={appointmentModalVisible}
        appointment={selectedAppointment}
        onClose={closeAllModals}
      />
      </ScrollView>
    </View>
  );
}