import React, { useState, useMemo } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Share, Alert } from 'react-native'
import { useApp } from '@/lib/store'
import { BlurView } from 'expo-blur'
import { Download, Calendar, Clock, AlertTriangle, Users, DollarSign, FileText, ChevronDown, CarIcon, Settings, MapPin, Bell } from 'lucide-react'
import { toCSV } from '@/lib/utils'

type ReportType = 'unpaid-debts' | 'daily-expense' | 'customer-report' | 'garage-report' | 'sales-report'

export default function ReportsPage(){

    const branchName = "Main Branch"
  const todayStats = {
    revenue: 25000,
    jobsCompleted: 12,
    pendingJobs: 5,
    expenses: 5000,
    staffAttendance: 8 // out of 10
  }

  const { totals, clients, employees, cars } = useApp()
  const [filter, setFilter] = useState<'week' | 'month' | 'custom'>('week')
  const [selectedReport, setSelectedReport] = useState<ReportType>('unpaid-debts')
  const [showReportDropdown, setShowReportDropdown] = useState(false)

  const reportTypes = [
    { key: 'unpaid-debts', label: 'Unpaid Debts', icon: AlertTriangle },
    { key: 'daily-expense', label: 'Daily Expense', icon: DollarSign },
    { key: 'customer-report', label: 'Customer Report', icon: Users },
    { key: 'garage-report', label: 'Garage Report', icon: FileText },
    { key: 'sales-report', label: 'Sales Report', icon: DollarSign },
  ]

  // Filtered clients for unpaid debts report
  const unpaidClients = useMemo(() => clients.filter(c => c.pending), [clients])

  // Calculate days owed for unpaid clients
  const clientsWithDaysOwed = useMemo(() => {
    const now = new Date()
    return unpaidClients.map(c => {
      const created = new Date(c.createdAt)
      const diffTime = Math.abs(now.getTime() - created.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return { ...c, daysOwed: diffDays }
    })
  }, [unpaidClients])

  // Filter clients by filter period
  const filteredClients = useMemo(() => {
    if (filter === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return clientsWithDaysOwed.filter(c => new Date(c.createdAt) >= weekAgo)
    } else if (filter === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return clientsWithDaysOwed.filter(c => new Date(c.createdAt) >= monthAgo)
    }
    return clientsWithDaysOwed
  }, [filter, clientsWithDaysOwed])

  const onExportReport = async () => {
    let csv = ''
    let title = ''

    switch (selectedReport) {
      case 'unpaid-debts':
        csv = toCSV(filteredClients.map(c => ({
          name: c.name,
          phone: c.phone,
          debt: c.pendingAmount || 0,
          daysOwed: c.daysOwed
        })))
        title = 'Unpaid Debts Report'
        break
      case 'customer-report':
        csv = toCSV(clients.map(c => ({
          name: c.name,
          phone: c.phone,
          email: c.email,
          cars: c.cars.join('|'),
          pending: c.pending ? 'YES' : 'NO',
          createdAt: c.createdAt
        })))
        title = 'Customer Report'
        break
      case 'garage-report':
        csv = toCSV(cars.map(c => ({
          model: c.model,
          owner: c.owner,
          work: c.work,
          paid: c.paid ? 'YES' : 'NO',
          working: c.working ? 'YES' : 'NO'
        })))
        title = 'Garage Report'
        break
      default:
        csv = toCSV(clients.map(c => ({ name: c.name, phone: c.phone })))
        title = 'Report'
    }

    try {
      await Share.share({ message: csv, title })
    } catch (error) {
      Alert.alert('Error', 'Failed to share report')
    }
  }

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'unpaid-debts':
        return (
          <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text className="text-white text-lg font-semibold mb-4">Unpaid Debts Report ({filter})</Text>
            {filteredClients.map((c, i) => (
              <View key={i} className={`bg-white rounded-xl p-3 mb-3 shadow ${c.daysOwed > 30 ? 'border border-red-600' : ''}`}>
                <Text className="text-lg font-bold">{c.name}</Text>
                <Text className="text-gray-600">Debt: KES {c.pendingAmount || 0}</Text>
                {c.daysOwed > 0 && (
                  <Text className={`text-sm ${c.daysOwed > 30 ? 'text-red-600' : 'text-yellow-600'}`}>
                    Owing for {c.daysOwed} days
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )

      case 'daily-expense':
        return (
          <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text className="text-white text-lg font-semibold mb-4">Daily Expenses Report</Text>
            <View className="bg-white rounded-xl p-4">
              <Text className="text-lg font-bold mb-2">Today's Expenses</Text>
              <Text className="text-gray-600">No expense data available</Text>
            </View>
          </ScrollView>
        )

      case 'customer-report':
        return (
          <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text className="text-white text-lg font-semibold mb-4">Customer Report</Text>
            {clients.map((c, i) => (
              <View key={i} className="bg-white rounded-xl p-3 mb-3 shadow">
                <Text className="text-lg font-bold">{c.name}</Text>
                <Text className="text-gray-600">{c.phone} • {c.email}</Text>
                <Text className="text-gray-500 text-sm">Cars: {c.cars.join(', ')}</Text>
                <Text className={`text-sm ${c.pending ? 'text-red-600' : 'text-green-600'}`}>
                  {c.pending ? 'Has pending balance' : 'Cleared'}
                </Text>
              </View>
            ))}
          </ScrollView>
        )

      case 'garage-report':
        return (
          <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text className="text-white text-lg font-semibold mb-4">Garage Report</Text>
            <View className="bg-white rounded-xl p-4 mb-4">
              <Text className="text-lg font-bold mb-2">Summary</Text>
              <Text className="text-gray-600">Total Cars: {cars.length}</Text>
              <Text className="text-gray-600">Active Jobs: {cars.filter(c => c.working).length}</Text>
              <Text className="text-gray-600">Completed Jobs: {cars.filter(c => c.paid).length}</Text>
            </View>
            {cars.map((c, i) => (
              <View key={i} className="bg-white rounded-xl p-3 mb-3 shadow">
                <Text className="text-lg font-bold">{c.model}</Text>
                <Text className="text-gray-600">Owner: {c.owner}</Text>
                <Text className="text-gray-500 text-sm">Work: {c.work}</Text>
                <Text className={`text-sm ${c.paid ? 'text-green-600' : 'text-red-600'}`}>
                  {c.paid ? 'Paid' : 'Unpaid'}
                </Text>
              </View>
            ))}
          </ScrollView>
        )

      case 'sales-report':
        return (
          <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text className="text-white text-lg font-semibold mb-4">Sales Report</Text>
            <View className="bg-white rounded-xl p-4">
              <Text className="text-lg font-bold mb-2">Revenue Summary</Text>
              <Text className="text-gray-600">Total Revenue: KES {totals.revenue.toLocaleString()}</Text>
              <Text className="text-gray-600">Total Clients: {totals.clients}</Text>
              <Text className="text-gray-600">Completion Rate: {cars.length ? Math.round((cars.filter(c => c.paid).length / cars.length) * 100) : 0}%</Text>
            </View>
          </ScrollView>
        )

      default:
        return null
    }
  }

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white text-2xl font-bold">Reports</Text>
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

      {/* Report Type Dropdown */}
      <View className="px-4 mb-4">
        <TouchableOpacity
          onPress={() => setShowReportDropdown(!showReportDropdown)}
          className="bg-white/10 rounded-xl p-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center">
            {React.createElement(reportTypes.find(r => r.key === selectedReport)?.icon || FileText, { size: 20, color: 'white' })}
            <Text className="text-white ml-2">
              {reportTypes.find(r => r.key === selectedReport)?.label}
            </Text>
          </View>
          <ChevronDown size={20} color="white" />
        </TouchableOpacity>

        {showReportDropdown && (
          <View className="bg-white/10 rounded-xl mt-2">
            {reportTypes.map((report) => (
              <TouchableOpacity
                key={report.key}
                onPress={() => {
                  setSelectedReport(report.key as ReportType)
                  setShowReportDropdown(false)
                }}
                className="flex-row items-center p-3 border-b border-white/10 last:border-b-0"
              >
                {React.createElement(report.icon, { size: 18, color: 'white' })}
                <Text className="text-white ml-2">{report.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Time Period Filters */}
      <View className="flex-row justify-around mb-4 px-4">
        <TouchableOpacity onPress={() => setFilter('week')} className={`px-4 py-2 rounded-xl ${filter === 'week' ? 'bg-blue-600' : 'bg-gray-300'}`}>
          <Text className="text-white">This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('month')} className={`px-4 py-2 rounded-xl ${filter === 'month' ? 'bg-blue-600' : 'bg-gray-300'}`}>
          <Text className="text-white">This Month</Text>
        </TouchableOpacity>
      </View>

      {/* Report Content */}
      {renderReportContent()}

      {/* Download Button */}
      <View className="p-4">
        <TouchableOpacity onPress={onExportReport} className="bg-green-600 p-4 rounded-xl items-center">
          <Text className="text-white font-bold">Download Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
