import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { BarChart3, Bell, Car, ClipboardList, Clock, DollarSign, FileText, LogOut, MapPin, Package, Plus, Settings } from 'lucide-react'
import React from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { images } from '../../constants/images'
import { useAuth } from '../../lib/auth'
import { useApp } from '../../lib/store'

export default function SuperAdmin() {
  const { totals, clients, employees, cars } = useApp()
  const { user, logout } = useAuth()
  const router = useRouter()
  const branchName = "Main Branch"

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout()
            router.replace('/login')
          }
        }
      ]
    )
  }
  const todayStats = {
    revenue: 25000,
    jobsCompleted: 12,
    pendingJobs: 5,
    expenses: 5000,
    staffAttendance: 8 // out of 10
  }
  // Mock data for inventory and expenses
  const lowStockItems = [
    { id: 'i1', name: 'Engine Oil', quantity: 3 },
    { id: 'i2', name: 'Brake Pads', quantity: 5 },
  ]

  const expiringItems = [
    { id: 'e1', name: 'Coolant', expiryDate: '2025-09-01' },
  ]

  const expenseBreakdown = [
    { category: 'Parts', value: 50000, color: '#DC2626' },
    { category: 'Salaries', value: 30000, color: '#2563EB' },
    { category: 'Utilities', value: 20000, color: '#FBBF24' },
  ]

  // Mock data for work orders and appointments
  const activeWorkOrders = cars.filter(car => car.working)
  const upcomingAppointments = [
    { id: 'a1', customer: 'John Doe', date: '2025-08-20', service: 'Oil Change' },
    { id: 'a2', customer: 'Jane Smith', date: '2025-08-22', service: 'Brake Inspection' },
  ]

  // Mock data for employee performance and payroll
  const payrollOverview = [
    { id: 'p1', employee: 'Mark Otieno', status: 'Paid' },
    { id: 'p2', employee: 'Linda Mwangi', status: 'Pending' },
  ]

  // Mock data for customer insights
  const topCustomers = clients.slice(0, 3)
  const newCustomersThisWeek = clients.filter(c => new Date(c.createdAt) > new Date('2025-08-10'))
  const outstandingBalances = clients.filter(c => c.pending)

  // Mock data for recent activity feed
  const recentActivities = [
    { id: 'r1', type: 'Payment', description: 'Payment received from John Doe', date: '2025-08-18' },
    { id: 'r2', type: 'Job', description: 'Brake replacement completed for Jane Smith', date: '2025-08-17' },
    { id: 'r3', type: 'Inventory', description: 'Low stock alert for Engine Oil', date: '2025-08-16' },
    { id: 'r4', type: 'Staff', description: 'Mark Otieno logged in', date: '2025-08-15' },
  ]

  const stats = [
    { id: 'rev', title: "Initial Bank Balance", value: `KES ${totals.revenue.toLocaleString()}`, Icon: DollarSign },
    { id: 'jobs', title: "Gross Bank Blance", value: '15000', Icon: ClipboardList },
    { id: 'cars', title: "Petty cash balance", value: totals.carsWorked.toString(), Icon: Car },
    { id: 'stock', title: "paybill balance", value: lowStockItems.length.toString(), Icon: Package },
    { id: 'pending', title: "Pending Payments", value: totals.pendingPayments.toString(), Icon: Clock },
  ]

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      {/* Header / Top Bar */}
      <View className="flex-row items-center justify-between px-6 mb-4">
        <View className="flex-row items-center space-x-4">
          <Image source={images.tristarlogo} style={{ width: 104, height: 44 }} />
          <Text className="text-white text-xl font-bold">Super Admin Dashboard</Text>
        </View>
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
          <TouchableOpacity onPress={handleLogout} className="flex-row items-center space-x-1 bg-red-600 rounded px-3 py-1">
            <LogOut size={16} color="white" />
            <Text className="text-white">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Key Metrics */}
        <View className="flex-row flex-wrap gap-4">
          {stats.map(({ id, title, value, Icon }) => (
            <BlurView key={id} intensity={50}  className="rounded-2xl bg-white/10 p-5 flex-row items-center justify-between w-[48%]">
              <View>
                <Text className="text-gray-300">{title}</Text>
                <Text className="text-2xl font-bold text-white">{value}</Text>
              </View>
              <Icon size={28} color="#DC2626" />
            </BlurView>
          ))}
        </View>

        {/* Financial Overview */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8 relative overflow-hidden">
          <View className="absolute -inset-2 bg-red-500 rounded-2xl blur-xl opacity-15" />
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-white">Financial Overview</Text>
            <BarChart3 size={24} color="#DC2626" />
          </View>
          {/* Placeholder for charts */}
          <View className="flex-row space-x-4">
            <View className="flex-1 h-40 bg-[#111827] rounded-lg" />
            <View className="flex-1 h-40 bg-[#111827] rounded-lg" />
          </View>
          <Text className="text-white mt-2">Cash Flow: KES 150,000</Text>
        </BlurView>

        {/* Garage Operations */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Garage Operations</Text>
          <Text className="text-white font-semibold mb-2">Active Work Orders</Text>
          {activeWorkOrders.map(order => (
            <View key={order.id} className="bg-white/10 rounded p-3 mb-2">
              <Text className="text-white">{order.model} - {order.work}</Text>
              <Text className="text-gray-300 text-sm">Status: {order.working ? 'In Progress' : 'Pending'}</Text>
            </View>
          ))}
          <Text className="text-white font-semibold mt-4 mb-2">Upcoming Appointments</Text>
          {upcomingAppointments.map(app => (
            <View key={app.id} className="bg-white/10 rounded p-3 mb-2">
              <Text className="text-white">{app.customer} - {app.service}</Text>
              <Text className="text-gray-300 text-sm">Date: {app.date}</Text>
            </View>
          ))}
          <TouchableOpacity className="bg-red-600 rounded p-3 mt-4 items-center">
            <Text className="text-white font-semibold">Add New Job</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Inventory Snapshot */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Inventory Snapshot</Text>
          <Text className="text-white font-semibold mb-2">Low Stock Alerts</Text>
          {lowStockItems.map(item => (
            <View key={item.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
              <Text className="text-white">{item.name}</Text>
              <Text className="text-red-500 font-bold">{item.quantity}</Text>
            </View>
          ))}
          <Text className="text-white font-semibold mt-4 mb-2">Expiring Items</Text>
          {expiringItems.map(item => (
            <View key={item.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
              <Text className="text-white">{item.name}</Text>
              <Text className="text-yellow-400 font-bold">{item.expiryDate}</Text>
            </View>
          ))}
          <TouchableOpacity className="bg-red-600 rounded p-3 mt-4 items-center">
            <Text className="text-white font-semibold">Manage Suppliers / Orders</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Employee Management */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Employee Management</Text>
          <Text className="text-white font-semibold mb-2">Attendance Summary</Text>
          {employees.map(emp => (
            <View key={emp.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
              <Text className="text-white">{emp.name}</Text>
              <Text className="text-green-400">{emp.attendance.present} Present, {emp.attendance.missed} Missed</Text>
            </View>
          ))}
          <Text className="text-white font-semibold mt-4 mb-2">Payroll Overview</Text>
          {payrollOverview.map(pay => (
            <View key={pay.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between">
              <Text className="text-white">{pay.employee}</Text>
              <Text className={`font-bold ${pay.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'}`}>{pay.status}</Text>
            </View>
          ))}
        </BlurView>

        {/* Customer Insights */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Customer Insights</Text>
          <Text className="text-white font-semibold mb-2">Top Customers</Text>
          {topCustomers.map(cust => (
            <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3">
              <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
              <Text className="text-white">{cust.name}</Text>
            </View>
          ))}
          <Text className="text-white font-semibold mt-4 mb-2">New Customers This Week</Text>
          {newCustomersThisWeek.map(cust => (
            <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3">
              <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
              <Text className="text-white">{cust.name}</Text>
            </View>
          ))}
          <Text className="text-white font-semibold mt-4 mb-2">Outstanding Balances</Text>
          {outstandingBalances.map(cust => (
            <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3 justify-between">
              <View className="flex-row items-center space-x-3">
                <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
                <Text className="text-white">{cust.name}</Text>
              </View>
              <Text className="text-red-500 font-bold">KES {cust.pendingAmount?.toLocaleString()}</Text>
            </View>
          ))}
        </BlurView>

        {/* Recent Activity Feed */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Recent Activity Feed</Text>
          {recentActivities.map(act => (
            <View key={act.id} className="bg-white/10 rounded p-3 mb-2">
              <Text className="text-white font-semibold">{act.type}</Text>
              <Text className="text-gray-300 text-sm">{act.description}</Text>
              <Text className="text-gray-400 text-xs">{act.date}</Text>
            </View>
          ))}
        </BlurView>
      </ScrollView>

      {/* Footer / Quick Actions */}
      <View className="h-16 bg-[#0A0F1E] flex-row justify-around items-center border-t border-gray-700">
        <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
          <Plus size={20} color="white" />
          <Text className="text-white font-semibold">Add Job</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
          <Plus size={20} color="white" />
          <Text className="text-white font-semibold">Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
          <Plus size={20} color="white" />
          <Text className="text-white font-semibold">Add Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center space-x-2 bg-red-600 rounded px-4 py-2">
          <FileText size={20} color="white" />
          <Text className="text-white font-semibold">Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
