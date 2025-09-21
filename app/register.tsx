import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from '@/lib/auth';

export default function Register() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "", // Changed from firstName/lastName to match backend
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await register(name, email, password);
      
      if (result.success) {
        Alert.alert("Success", "Registration successful! You can now login.");
        router.replace("/login");
      } else {
        Alert.alert("Registration Failed", result.message || "Failed to create account");
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView className="flex-1 bg-blue-950">
      <View className="items-center justify-center px-6 py-10">
        {/* App Title */}
        <Text className="text-white text-3xl font-bold mb-8">Create Account</Text>
        <Text className="text-gray-300 text-center mb-8">
          Join Tristar App to manage your automotive business
        </Text>

        {/* Name Input (replaces firstName/lastName) */}
        <TextInput
          value={formData.name}
          onChangeText={(value) => updateFormData("name", value)}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-4"
        />

        {/* Email Input */}
        <TextInput
          value={formData.email}
          onChangeText={(value) => updateFormData("email", value)}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-4"
        />

        {/* Password Input */}
        <TextInput
          value={formData.password}
          onChangeText={(value) => updateFormData("password", value)}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-4"
        />

        {/* Confirm Password Input */}
        <TextInput
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData("confirmPassword", value)}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-6"
        />

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
          className={`w-full py-3 rounded-2xl items-center shadow-md ${
            isLoading ? 'bg-gray-600' : 'bg-red-600'
          }`}
        >
          <Text className="text-white font-semibold text-lg">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="mt-2"
        >
          <Text className="text-white text-sm">
            Already have an account?{" "}
            <Text className="text-red-400 font-semibold">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}