import { images } from '@/constants/images';
import { useAuth } from '@/lib/auth';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Dimensions, Image, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function Login() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log('Login button pressed');
    console.log('Username:', username);
    console.log('Password:', password);

    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      console.log('Calling login function...');
      const result = await login(username, password);
      console.log('Login result:', result);

      if (result.success) {
        console.log('Login successful, navigation should happen automatically');
        // Navigation will be handled by the auth context and app layout
        // The user will be redirected based on their role
      } else {
        Alert.alert("Login Failed", result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-blue-950 items-center justify-center px-6">
      {/* App Title */}
      <Image source={images.tristarlogo} style={{ width: Dimensions.get('window').width * 0.8, height: 144, resizeMode: 'contain' }} />
      <Text className="text-red-400 text-3xl font-bold mb-10"> App</Text>

      {/* Username Input */}
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-4"
      />

      {/* Password Input */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-6"
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={isLoading}
        className={`w-full py-3 rounded-2xl items-center shadow-md ${
          isLoading ? 'bg-gray-600' : 'bg-red-600'
        }`}
      >
        <Text className="text-white font-semibold text-lg">
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity
        onPress={() => router.push("/register")}
        className="mt-6"
      >
        <Text className="text-white text-sm">
          Don’t have an account?{" "}
          <Text className="text-red-400 font-semibold">shorry</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
