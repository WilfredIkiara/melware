import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, Pressable, Modal, TouchableOpacity } from 'react-native'
import { useApp } from '../../lib/store'
import { BlurView } from 'expo-blur'
import { Users,  Plus, User, Search, Calendar, Pencil, Phone, MessageSquare, BadgeCheck, AlertTriangle, Download, CarIcon, Settings, MapPin, Bell } from 'lucide-react'

export default function EmployeesPage() {

  const branchName = "Main Branch"
  const todayStats = {
    revenue: 25000,
    jobsCompleted: 12,
    pendingJobs: 5,
    expenses: 5000,
    staffAttendance: 8 // out of 10
  }

  const { employees, updateEmployee, addEmployee } = useApp()
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newEmployee, setNewEmployee] = useState({ name: '', phone: '', revenue: 0, })
  
  const filtered = employees.filter(e => e.name.toLowerCase().includes(q.toLowerCase()))
  const current = employees.find(e => e.id === selected)

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.phone) {
      addEmployee({
        id: `e${Date.now()}`,
        name: newEmployee.name,
        phone: newEmployee.phone,
        revenue: newEmployee.revenue,
        attendance: { present: 0, missed: 0 }
      })
      setNewEmployee({ name: '', phone: '', revenue: 0,  })
      setShowAddModal(false)
    }
  }

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white text-2xl font-bold">Employees</Text>
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
        <TouchableOpacity onPress={() => setShowAddModal(true)} className="bg-red-600 p-2 rounded-full">
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="px-4 mb-3 flex-row items-center bg-white/10 rounded-xl px-3 py-2">
        <Search size={18} color="white" />
        <TextInput value={q} onChangeText={setQ} placeholder="Search employees" placeholderTextColor="#9ca3af" className="flex-1 text-white ml-2" />
        <Calendar size={18} color="white" />
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={filtered}
        keyExtractor={(i)=>i.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <BlurView intensity={50} tint="dark" className="rounded-2xl p-4">
            <View className="flex-row justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-white font-bold text-lg">{item.name}</Text>
                <Text className="text-gray-400 text-xs">{item.phone}</Text>
                <Text className="text-green-400 text-xs mt-1">Revenue collected: KES {item.revenue.toLocaleString()}</Text>
                <Text className="text-gray-300 text-xs mt-1">Attendance: {item.attendance.present} present • {item.attendance.missed} missed</Text>
              </View>
              <Pressable onPress={() => setSelected(item.id)} className="bg-white/10 h-10 w-10 rounded-xl items-center justify-center">
                <Pencil size={18} color="white" />
              </Pressable>
            </View>
          </BlurView>
        )}
      />

      {/* Edit Modal */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View className="flex-1 bg-black/70 justify-center items-center px-4">
          <BlurView intensity={70} tint="dark" className="w-full rounded-2xl p-5">
            <Text className="text-white text-xl font-bold mb-3">Edit Employee</Text>
            {current && (
              <>
                <TextInput defaultValue={current.name} placeholder="Name" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateEmployee(current.id, { name: v })} />
                <TextInput defaultValue={current.phone} placeholder="Phone" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateEmployee(current.id, { phone: v })} />
                <TextInput defaultValue={current.revenue.toString()} placeholder="Revenue" placeholderTextColor="#9ca3af" keyboardType="numeric" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v) => updateEmployee(current.id, { revenue: parseInt(v) || 0 })} />
                <View className="flex-row gap-3 mt-2">
                  <TouchableOpacity onPress={() => setSelected(null)} className="flex-1 bg-red-600 py-3 rounded-xl"><Text className="text-white text-center font-semibold">Save</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelected(null)} className="flex-1 bg-white/10 py-3 rounded-xl"><Text className="text-white text-center">Cancel</Text></TouchableOpacity>
                </View>
              </>
            )}
          </BlurView>
        </View>
      </Modal>

      {/* Add Employee Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent onRequestClose={() => setShowAddModal(false)}>
        <View className="flex-1 bg-black/70 justify-center items-center px-4">
          <BlurView intensity={70} tint="dark" className="w-full rounded-2xl p-5">
            <Text className="text-white text-xl font-bold mb-3">Add Employee</Text>
            <TextInput placeholder="Name" placeholderTextColor="#9ca3af" value={newEmployee.name} onChangeText={(v) => setNewEmployee({...newEmployee, name: v})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
            <TextInput placeholder="Phone" placeholderTextColor="#9ca3af" value={newEmployee.phone} onChangeText={(v) => setNewEmployee({...newEmployee, phone: v})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
            <TextInput placeholder="Revenue" placeholderTextColor="#9ca3af" keyboardType="numeric" value={newEmployee.revenue.toString()} onChangeText={(v) => setNewEmployee({...newEmployee, revenue: parseInt(v) || 0})} className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" />
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity onPress={handleAddEmployee} className="flex-1 bg-red-600 py-3 rounded-xl"><Text className="text-white text-center font-semibold">Add</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setShowAddModal(false)} className="flex-1 bg-white/10 py-3 rounded-xl"><Text className="text-white text-center">Cancel</Text></TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  )
}
