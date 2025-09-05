import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-2xl mb-4">Tristar App</Text>
      <TouchableOpacity
        onPress={() => router.push("/login")}
        className="bg-white px-6 py-3 rounded-2xl"
      >
        <Text className="text-blue-500 font-bold">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/dashboard")}
        className="bg-white px-6 py-3 rounded-2xl mt-4"
      >
        <Text className="text-blue-500 font-bold">Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}