
// import { images } from '@/constants/images';
// import { useAuth } from '@/lib/auth';
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Alert, Dimensions, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

// export default function Login() {
//   const router = useRouter();
//   const { login, isLoading, user } = useAuth();  // get user from auth context
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Navigate on successful login
//   useEffect(() => {
//     if (user) {
//       // Navigate based on user role
//       if (user.role === 'super-admin') {
//         router.replace('/(tabs)/superadmin');  // path to your super admin dashboard
//       } else {
//         // Add other role-based navigation if needed
//         router.replace('/dashboard');
//       }
//     }
//   }, [user]);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please enter both username and password");
//       return;
//     }

//     try {
//       const result = await login(email, password);
//       if (!result.success) {
//         Alert.alert("Login Failed", result.message || "Invalid credentials");
//       }
//       // No navigation here; handled by useEffect watching `user`
//     } catch (error) {
//       Alert.alert("Error", "Network error. Please try again.");
//     }
//   };

//   return (
//     <View className="flex-1 bg-blue-950 items-center justify-center px-6">
//       <Image source={images.tristarlogo} style={{ width: Dimensions.get('window').width * 0.8, height: 144, resizeMode: 'contain' }} />
//       <Text className="text-red-400 text-3xl font-bold mb-10">Tristar App</Text>

//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Username"
//         placeholderTextColor="#aaa"
//         autoCapitalize="none"
//         className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-4"
//       />

//       <TextInput
//         value={password}
//         onChangeText={setPassword}
//         placeholder="Password"
//         placeholderTextColor="#aaa"
//         secureTextEntry
//         className="w-full bg-white/10 text-white px-4 py-3 rounded-2xl mb-6"
//       />

//       <TouchableOpacity
//         onPress={handleLogin}
//         disabled={isLoading}
//         className={`w-full py-3 rounded-2xl items-center shadow-md ${
//           isLoading ? 'bg-gray-600' : 'bg-red-600'
//         }`}
//       >
//         <Text className="text-white font-semibold text-lg">
//           {isLoading ? 'Logging in...' : 'Login'}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push("/register")} className="mt-6">
//         <Text className="text-white text-sm">
//           Don't have an account? <Text className="text-red-400 font-semibold">Register</Text>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
import { images } from '@/constants/images';
import { useAuth } from '@/lib/auth';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Login() {
  const router = useRouter();
  const { login, isLoading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { width, height } = Dimensions.get('window');
  const isSmallDevice = width < 375;
  const isLargeDevice = width > 768;

  // Navigate on successful login
  useEffect(() => {
    if (user) {
      if (user.role === 'super-admin') {
        router.replace('/(tabs)/superadmin');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      const result = await login(email, password);
      if (!result.success) {
        Alert.alert("Login Failed", result.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-blue-950"
    >
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-6 py-8">
          {/* Logo Section */}
          <View className={`items-center justify-center mb-8 ${keyboardVisible ? 'mt-4' : 'mt-8'}`}>
            <Image 
              source={images.tristarlogo} 
              style={{ 
                width: isSmallDevice ? width * 0.7 : width * 0.8,
                height: isSmallDevice ? 100 : 144,
                resizeMode: 'contain',
                marginBottom: isSmallDevice ? 12 : 16
              }} 
            />
            <Text className="text-red-400 font-bold" style={{
              fontSize: isSmallDevice ? 28 : 32,
              marginBottom: keyboardVisible ? 8 : 20
            }}>
              Tristar App
            </Text>
          </View>

          {/* Login Form */}
          <View className="w-full max-w-md" style={{
            transform: [{ scale: keyboardVisible && isSmallDevice ? 0.95 : 1 }]
          }}>
            <View className="bg-white/5 rounded-3xl p-6 mb-6 shadow-2xl shadow-black/30">
              <Text className="text-white text-xl font-bold mb-6 text-center">
                Welcome Back
              </Text>
              
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Username"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                keyboardType="email-address"
                className="w-full bg-white/10 text-white px-5 py-4 rounded-2xl mb-4 border border-white/20"
                style={{
                  fontSize: isSmallDevice ? 14 : 16,
                  height: isSmallDevice ? 50 : 56
                }}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                className="w-full bg-white/10 text-white px-5 py-4 rounded-2xl mb-2 border border-white/20"
                style={{
                  fontSize: isSmallDevice ? 14 : 16,
                  height: isSmallDevice ? 50 : 56
                }}
              />

              {/* Forgot Password */}
              <TouchableOpacity className="self-end mb-6">
                <Text className="text-red-400 text-sm font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl items-center shadow-lg ${
                  isLoading ? 'bg-gray-600' : 'bg-red-600'
                }`}
                style={{
                  shadowColor: '#dc2626',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8
                }}
              >
                <Text className="text-white font-semibold" style={{
                  fontSize: isSmallDevice ? 16 : 18
                }}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View className="items-center">
              <TouchableOpacity 
                onPress={() => router.push("/register")} 
                className="flex-row items-center"
              >
                <Text className="text-white text-sm mr-1">
                  Don't have an account?
                </Text>
                <Text className="text-red-400 font-semibold text-sm">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Spacer */}
          <View style={{ height: keyboardVisible ? 20 : 40 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}