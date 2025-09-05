import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { DollarSign, Car, Clock, Users, BarChart3, Bell, Settings, User, MapPin, Package, ClipboardList,  FileText, Activity, CheckCircle, AlertTriangle,  } from 'lucide-react'
import { Link } from 'expo-router'
import { images } from '@/constants/images'

export default function SMSPage() {
const branchName = "Adams Branch"
  const todayStats = {
    revenue: 25000,
    jobsCompleted: 12,
    pendingJobs: 5,
    expenses: 5000,
    staffAttendance: 8 // out of 10
  }

  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", phone: "+254700123456", debt: 5000, car: "Toyota Axio" },
    { id: 2, name: "Mary Ann", phone: "+254711654321", debt: 0, car: "Nissan Note" },
    { id: 3, name: "Peter Mwangi", phone: "+254722987654", debt: 2500, car: "Subaru Forester" },
  ]);

  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [customMessage, setCustomMessage] = useState(
    "Hello {name}, your outstanding balance is KSh {debt} for your {car}. Please clear soon."
  );
  const [loading, setLoading] = useState(false);

  // Toggle client selection
  const toggleSelect = (id: number) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter((clientId) => clientId !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  // Function to replace placeholders with actual client data
  const personalizeMessage = (template: string, client: any) => {
    return template
      .replace(/{name}/g, client.name)
      .replace(/{debt}/g, client.debt.toString())
      .replace(/{car}/g, client.car);
  };

  // Send SMS to selected clients
  const sendSMS = async () => {
    if (selectedClients.length === 0) {
      alert("⚠️ Please select at least one client.");
      return;
    }
    if (!customMessage.trim()) {
      alert("⚠️ Please type a message.");
      return;
    }

    setLoading(true);

    try {
      for (let clientId of selectedClients) {
        const client = clients.find((c) => c.id === clientId);
        if (client) {
          const personalized = personalizeMessage(customMessage, client);

          await fetch("https://api.africastalking.com/version1/messaging", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              apikey: "YOUR_API_KEY", // replace with Africa’s Talking API key
            },
            body: `username=YOUR_USERNAME&to=${client.phone}&message=${encodeURIComponent(personalized)}`,
          });
        }
      }

      alert("✅ Personalized SMS sent successfully!");
      setSelectedClients([]);
    } catch (error) {
      console.error("SMS Error:", error);
      alert("❌ Failed to send SMS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0B1A39]">
      {/* Header */}
      <View className="flex-row items-center justify-between bg-[#0B1A39] p-4 border-b border-red-500">
        <Text className="text-red-400 text-2xl font-bold">📩 Tristar SMS Reminders</Text>
        
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

      {/* Message Typing Box */}
      <View className="p-4">
        <Text className="text-white font-semibold mb-2">✍️ Message Template</Text>
        <TextInput
          value={customMessage}
          onChangeText={setCustomMessage}
          placeholder="Type message with {name}, {debt}, {car} placeholders"
          placeholderTextColor="#ccc"
          multiline
          className="bg-white rounded-xl p-3 h-28 text-black"
        />
        <Text className="text-gray-400 mt-2 text-sm">
          Available placeholders: {"{name}, {debt}, {car}"}
        </Text>
      </View>

      {/* Client List */}
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`flex-row items-center px-4 py-3 border-b border-gray-700 ${
              selectedClients.includes(item.id) ? "bg-red-500" : "bg-[#0B1A39]"
            }`}
            onPress={() => toggleSelect(item.id)}
          >
            <View className="flex-1">
              <Text className="text-white font-bold">{item.name}</Text>
              <Text className="text-gray-300">{item.car} • {item.phone}</Text>
              {item.debt > 0 && (
                <Text className="text-red-300">Unpaid: KSh {item.debt}</Text>
              )}
            </View>
            <Text className="text-white font-bold">
              {selectedClients.includes(item.id) ? "✓ Selected" : "Tap to Select"}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Send Button */}
      <View className="p-4">
        <TouchableOpacity
          onPress={sendSMS}
          disabled={loading}
          className="bg-red-600 py-4 rounded-2xl items-center shadow-lg"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">🚀 Send Personalized SMS</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
