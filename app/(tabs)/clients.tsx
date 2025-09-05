import React, { useMemo, useState } from 'react'
import { View, Text, TextInput, FlatList, Image, Pressable, Modal, TouchableOpacity, Share } from 'react-native'
import { BlurView } from 'expo-blur'
import { User, Search, Calendar, Pencil, Phone, MessageSquare, BadgeCheck, AlertTriangle, Download, Users,CarIcon, Settings, MapPin,Bell } from 'lucide-react'
import { useApp } from '../../lib/store'
import { formatISODate, toCSV } from '../../lib/utils'
import * as Linking from 'expo-linking'

export default function ClientsPage() {

  const branchName = "Main Branch"
  const todayStats = {
    revenue: 25000,
    jobsCompleted: 12,
    pendingJobs: 5,
    expenses: 5000,
    staffAttendance: 8 // out of 10
  }
  const { clients, updateClient } = useApp()
  const [q, setQ] = useState('')
  const [dateFrom, setDateFrom] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const current = useMemo(() => clients.find(c => c.id === selected) || null, [clients, selected])

  const filtered = clients.filter(c => {
    const matchQ = `${c.name} ${c.phone} ${c.email}`.toLowerCase().includes(q.toLowerCase())
    const matchDate = !dateFrom || c.createdAt >= dateFrom
    return matchQ && matchDate
  })

  const onRemindWhatsApp = (phone: string, name: string, amount = 0) => {
    const msg = encodeURIComponent(`Hi ${name}, this is Tristar Garage. You have a pending balance of KES ${amount}. Kindly clear it. Thank you.`)
    const url = `whatsapp://send?phone=${phone}&text=${msg}`
    Linking.openURL(url).catch(() => {})
  }

  const onExport = async () => {
    const csv = toCSV(clients.map(c => ({ id: c.id, name: c.name, phone: c.phone, email: c.email, pending: c.pending ? 'YES' : 'NO', cars: c.cars.join('|'), createdAt: c.createdAt })))
    try { await Share.share({ message: csv }) } catch {}
  }

  return (
    <View className="flex-1 bg-[#0A0F1E] pt-14">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white text-2xl font-bold">Clients</Text>
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
        <User size={26} color="white" />
      </View>

      {/* Search + export */}
      <View className="px-4 gap-3 mb-2">
        <View className="flex-row items-center bg-white/10 rounded-xl px-3 py-2">
          <Search size={18} color="white" />
          <TextInput placeholder="Search by name/phone/email" placeholderTextColor="#9ca3af" value={q} onChangeText={setQ} className="flex-1 text-white ml-2" />
          <Calendar size={18} color="white" />
        </View>
        <TouchableOpacity onPress={onExport} className="self-start bg-white/10 px-3 py-2 rounded-xl flex-row items-center">
          <Download size={16} color="white" />
          <Text className="text-white ml-2">Export CSV</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <BlurView intensity={50} tint="dark" className="rounded-2xl overflow-hidden">
            <View className="flex-row items-center p-4 gap-3">
              <Image source={{ uri: item.avatar }} style={{ width: 56, height: 56, borderRadius: 9999 }} />
              <View className="flex-1">
                <Text className="text-white font-bold text-lg">{item.name}</Text>
                <Text className="text-gray-300 text-xs">{item.phone} • {item.email}</Text>
                <Text className="text-gray-400 text-xs">Cars: {item.cars.join(', ')}</Text>
                <View className="flex-row items-center mt-1">
                  {item.pending ? (
                    <AlertTriangle size={16} color="#f87171" />
                  ) : (
                    <BadgeCheck size={16} color="#34d399" />
                  )}
                  <Text className={`ml-1 text-xs ${item.pending ? 'text-red-400' : 'text-green-400'}`}>{item.pending ? 'Pending balance' : 'Cleared'}</Text>
                </View>
              </View>
              <View className="gap-3">
                <Pressable onPress={() => setSelected(item.id)} className="bg-white/10 px-3 py-2 rounded-xl">
                  <Pencil size={18} color="white" />
                </Pressable>
                <Pressable onPress={() => onRemindWhatsApp(item.phone, item.name, item.pendingAmount || 0)} className="bg-red-600 px-3 py-2 rounded-xl">
                  <MessageSquare size={18} color="white" />
                </Pressable>
              </View>
            </View>
          </BlurView>
        )}
      />

      {/* Edit Modal */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View className="flex-1 bg-black/70 justify-center items-center px-4">
          <BlurView intensity={70} tint="dark" className="w-full rounded-2xl p-5">
            <Text className="text-white text-xl font-bold mb-3">Edit Client</Text>
            <TextInput defaultValue={current?.name} placeholder="Name" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v)=>current && (current.name=v)} />
            <TextInput defaultValue={current?.phone} placeholder="Phone" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v)=>current && (current.phone=v)} />
            <TextInput defaultValue={current?.email} placeholder="Email" placeholderTextColor="#9ca3af" className="bg-white/10 text-white px-4 py-3 rounded-xl mb-2" onChangeText={(v)=>current && (current.email=v)} />
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity onPress={()=>{ if(current){ updateClient(current.id, current) }; setSelected(null)}} className="flex-1 bg-red-600 py-3 rounded-xl"><Text className="text-white text-center font-semibold">Save</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>setSelected(null)} className="flex-1 bg-white/10 py-3 rounded-xl"><Text className="text-white text-center">Cancel</Text></TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  )
}
