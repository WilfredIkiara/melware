import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleRegister = () => {
    // TODO: replace with real registration logic
    const { firstName, lastName, email, password, confirmPassword, phone } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Simulate successful registration
    alert("Registration successful! Please login.");
    router.replace("/login");
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

        {/* First Name Input */}
        <TextInput
          value={formData.firstName}
          onChangeText={(value) => updateFormData("firstName", value)}
          placeholder="First Name"
          placeholderTextColor="#aaa"
          className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-4"
        />

        {/* Last Name Input */}
        <TextInput
          value={formData.lastName}
          onChangeText={(value) => updateFormData("lastName", value)}
          placeholder="Last Name"
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

        {/* Phone Input */}
        <TextInput
          value={formData.phone}
          onChangeText={(value) => updateFormData("phone", value)}
          placeholder="Phone Number (Optional)"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
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
          className="w-full bg-red-600 py-3 rounded-2xl items-center shadow-md mb-4"
        >
          <Text className="text-white font-semibold text-lg">Create Account</Text>
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
