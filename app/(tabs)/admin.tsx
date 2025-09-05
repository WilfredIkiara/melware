import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useApp } from '@/lib/store'
import { BlurView } from 'expo-blur'
import { DollarSign, Car, Clock, Users, BarChart3, Bell, Settings, User, MapPin, Package, ClipboardList, Calendar, Plus, FileText, Activity, CheckCircle, AlertTriangle } from 'lucide-react'
import { Link } from 'expo-router'
import { images } from '@/constants/images'

export default function Admin() {
  const { totals, clients, employees, cars } = useApp()

  // Mock branch-specific data
  const branchName = "Main Branch"
  const todayStats = {
    revenue: 25000,
    jobsCompleted: 12,
    pendingJobs: 5,
    expenses: 5000,
    staffAttendance: 8 // out of 10
  }

  const stats = [
    { id: 'daily-rev', title: "Daily Revenue (KES)", value: `KES ${todayStats.revenue.toLocaleString()}`, Icon: DollarSign },
    { id: 'jobs-completed', title: "Jobs Completed Today", value: todayStats.jobsCompleted.toString(), Icon: ClipboardList },
    { id: 'pending-jobs', title: "Pending Jobs", value: todayStats.pendingJobs.toString(), Icon: Clock },
    { id: 'expenses', title: "Expenses Today", value: `KES ${todayStats.expenses.toLocaleString()}`, Icon: BarChart3 },
    { id: 'attendance', title: "Staff Attendance", value: `${todayStats.staffAttendance}/10`, Icon: Users },
  ]

  // Mock data for active jobs with mechanics
  const activeJobs = cars.filter(car => car.working).map(car => ({
    ...car,
    mechanic: employees[Math.floor(Math.random() * employees.length)].name
  }))

  // Mock data for job approvals
  const pendingApprovals = [
    { id: 'a1', customer: 'John Doe', service: 'Engine Repair', estimatedCost: 15000, status: 'pending' },
    { id: 'a2', customer: 'Jane Smith', service: 'Brake Replacement', estimatedCost: 8000, status: 'pending' },
  ]

  // Mock inventory data
  const inventoryItems = [
    { id: 'i1', name: 'Engine Oil', currentStock: 15, minStock: 20, status: 'low' },
    { id: 'i2', name: 'Brake Pads', currentStock: 25, minStock: 10, status: 'ok' },
    { id: 'i3', name: 'Filters', currentStock: 8, minStock: 15, status: 'low' },
  ]

  // Mock employee schedules and performance
  const employeeSchedules = employees.map(emp => ({
    ...emp,
    todaySchedule: ['9:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'],
    jobsToday: Math.floor(Math.random() * 5) + 1
  }))

  // Mock payroll requests
  const payrollRequests = [
    { id: 'p1', employee: 'Mark Otieno', amount: 25000, status: 'pending' },
    { id: 'p2', employee: 'Linda Mwangi', amount: 22000, status: 'approved' },
  ]

  // Mock branch customers
  const branchCustomers = clients.slice(0, 3).map(cust => ({
    ...cust,
    branchBalance: cust.pendingAmount || 0
  }))

  // Mock recent activity for this branch
  const branchActivities = [
    { id: 'b1', action: 'Job Started', details: 'Engine repair for Toyota Premio', time: '2 hours ago', staff: 'Mark Otieno' },
    { id: 'b2', action: 'Payment Received', details: 'KES 5,000 from Jane Smith', time: '1 hour ago', staff: 'Linda Mwangi' },
    { id: 'b3', action: 'Inventory Request', details: 'Requested 10 units of Engine Oil', time: '30 minutes ago', staff: 'Peter Kamau' },
    { id: 'b4', action: 'Job Completed', details: 'Oil change for Honda Civic', time: '15 minutes ago', staff: 'Mark Otieno' },
  ]

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      {/* Header / Top Bar */}
      <View className="flex-row items-center justify-between px-6 mb-4">
        <View className="flex-row items-center space-x-4">
          <Image source={images.tristarlogo} style={{ width: 104, height: 44 }} />
          <Text className="text-white text-xl font-bold">Admin Dashboard</Text>
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
          
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Key Stats (Branch Only) */}
        <View className="flex-row flex-wrap gap-4">
          {stats.map(({ id, title, value, Icon }) => (
            <BlurView key={id} intensity={50} tint="dark" className="rounded-2xl p-5 flex-row items-center justify-between w-[48%]">
              <View>
                <Text className="text-gray-300">{title}</Text>
                <Text className="text-2xl font-bold text-white">{value}</Text>
              </View>
              <Icon size={28} color="#DC2626" />
            </BlurView>
          ))}
        </View>

        {/* Branch Financial Overview */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8 relative overflow-hidden">
          <View className="absolute -inset-2 bg-red-500 rounded-2xl blur-xl opacity-15" />
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-white">Branch Financial Overview</Text>
            <BarChart3 size={24} color="#DC2626" />
          </View>
          {/* Placeholder for income vs expenses chart */}
          <View className="flex-row space-x-4">
            <View className="flex-1 h-40 bg-[#111827] rounded-lg" />
          </View>
          <Text className="text-white mt-2">Salary Payouts Pending: KES 47,000</Text>
        </BlurView>

        {/* Operations */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Operations</Text>
          <Text className="text-white font-semibold mb-2">Active Jobs</Text>
          {activeJobs.map(job => (
            <View key={job.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between items-center">
              <View>
                <Text className="text-white">{job.model} - {job.work}</Text>
                <Text className="text-gray-300 text-sm">Mechanic: {job.mechanic}</Text>
              </View>
              <Text className="text-green-400 font-bold">Active</Text>
            </View>
          ))}
          <Text className="text-white font-semibold mt-4 mb-2">Job Approvals</Text>
          {pendingApprovals.map(approval => (
            <View key={approval.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white">{approval.customer} - {approval.service}</Text>
                <Text className="text-yellow-400 font-bold">{approval.status}</Text>
              </View>
              <Text className="text-gray-300 text-sm">Estimated Cost: KES {approval.estimatedCost.toLocaleString()}</Text>
              <View className="flex-row space-x-2 mt-2">
                <TouchableOpacity className="bg-green-600 rounded px-3 py-1">
                  <Text className="text-white text-sm">Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-600 rounded px-3 py-1">
                  <Text className="text-white text-sm">Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </BlurView>

        {/* Inventory */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Inventory</Text>
          {inventoryItems.map(item => (
            <View key={item.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between items-center">
              <View>
                <Text className="text-white">{item.name}</Text>
                <Text className="text-gray-300 text-sm">Current: {item.currentStock} | Min: {item.minStock}</Text>
              </View>
              <View className="flex-row items-center space-x-2">
                {item.status === 'low' && <AlertTriangle size={16} color="#DC2626" />}
                <TouchableOpacity className="bg-red-600 rounded px-3 py-1">
                  <Text className="text-white text-sm">Request Restock</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </BlurView>

        {/* Employees */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Employees</Text>
          <Text className="text-white font-semibold mb-2">Mechanic Schedules & Performance</Text>
          {employeeSchedules.map(emp => (
            <View key={emp.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-white">{emp.name}</Text>
                <Text className="text-green-400 font-bold">{emp.jobsToday} jobs today</Text>
              </View>
              <Text className="text-gray-300 text-sm">Schedule: {emp.todaySchedule.join(', ')}</Text>
              <TouchableOpacity className="bg-blue-600 rounded px-3 py-1 mt-2 self-start">
                <Text className="text-white text-sm">Manage Schedule</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text className="text-white font-semibold mt-4 mb-2">Payroll Requests</Text>
          {payrollRequests.map(request => (
            <View key={request.id} className="bg-white/10 rounded p-3 mb-2 flex-row justify-between items-center">
              <View>
                <Text className="text-white">{request.employee}</Text>
                <Text className="text-gray-300 text-sm">KES {request.amount.toLocaleString()}</Text>
              </View>
              <Text className={`font-bold ${request.status === 'approved' ? 'text-green-400' : 'text-yellow-400'}`}>{request.status}</Text>
            </View>
          ))}
        </BlurView>

        {/* Customers */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Customers (This Branch)</Text>
          {branchCustomers.map(cust => (
            <View key={cust.id} className="bg-white/10 rounded p-3 mb-2 flex-row items-center space-x-3 justify-between">
              <View className="flex-row items-center space-x-3">
                <Image source={{ uri: cust.avatar }} style={{ width: 32, height: 32, borderRadius: 16 }} />
                <View>
                  <Text className="text-white">{cust.name}</Text>
                  <Text className="text-gray-300 text-sm">{cust.cars.join(', ')}</Text>
                </View>
              </View>
              <Text className="text-red-500 font-bold">KES {cust.branchBalance.toLocaleString()}</Text>
            </View>
          ))}
        </BlurView>

        {/* Recent Activity */}
        <BlurView intensity={50} tint="dark" className="rounded-2xl p-6 mb-8">
          <Text className="text-xl font-bold text-white mb-4">Recent Activity (This Branch)</Text>
          {branchActivities.map(act => (
            <View key={act.id} className="bg-white/10 rounded p-3 mb-2">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-white font-semibold">{act.action}</Text>
                <Text className="text-gray-400 text-xs">{act.time}</Text>
              </View>
              <Text className="text-gray-300 text-sm">{act.details}</Text>
              <Text className="text-gray-400 text-xs">Staff: {act.staff}</Text>
            </View>
          ))}
        </BlurView>
      </ScrollView>

      {/* Footer Quick Actions */}
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
          <CheckCircle size={20} color="white" />
          <Text className="text-white font-semibold">Approve Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
