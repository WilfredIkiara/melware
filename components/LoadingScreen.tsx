import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { images } from '../constants/images';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      // Glow pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
      // Scale animation
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      // Rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      // Heartbeat pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.9,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Auto transition after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const reverseRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  return (
    <View className="flex-1 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 items-center justify-center">
      {/* Animated Background Glow */}
      <Animated.View
        className="absolute w-80 h-80 rounded-full bg-red-500/20"
        style={{
          opacity: glowOpacity,
          transform: [
            { scale: scaleAnim },
            { rotate },
          ],
        }}
      />

      {/* Outer Glow Ring */}
      <Animated.View
        className="absolute w-72 h-72 rounded-full border-2 border-red-400/30"
        style={{
          opacity: glowOpacity,
          transform: [{ scale: scaleAnim }],
        }}
      />

      {/* Middle Glow Ring */}
      <Animated.View
        className="absolute w-64 h-64 rounded-full border border-red-300/40"
        style={{
          opacity: glowOpacity,
          transform: [
            { scale: scaleAnim },
            { rotate: reverseRotate },
          ],
        }}
      />

      {/* Car Icon Container */}
      <Animated.View
        className="items-center justify-center"
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <BlurView
          intensity={20}
          tint="dark"
          className="w-48 h-48 rounded-full items-center justify-center overflow-hidden"
        >
          <Animated.View
            style={{
              transform: [
                { scale: pulseAnim },
                { rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '5deg'],
                }) }
              ],
            }}
          >
            <Ionicons name="car" size={80} color="#ef4444" />
          </Animated.View>
        </BlurView>
      </Animated.View>

      {/* Loading Text */}
      <Animated.View
        className="mt-8 items-center"
        style={{
          opacity: scaleAnim,
          transform: [{ translateY: Animated.multiply(scaleAnim, -10) }],
        }}
      >
        <Text className="text-white text-2xl font-bold mb-2">Tristar Garage</Text>
        <Text className="text-red-300 text-sm">Starting your engine...</Text>
      </Animated.View>

      {/* Animated Dots */}
      <View className="flex-row mt-4">
        {[0, 1, 2].map((index) => (
          <Animated.View
            key={index}
            className="w-2 h-2 bg-red-400 rounded-full mx-1"
            style={{
              opacity: glowAnim.interpolate({
                inputRange: [0, 0.33, 0.66, 1],
                outputRange: index === 0 ? [1, 0.3, 0.3, 1] : index === 1 ? [0.3, 1, 0.3, 0.3] : [0.3, 0.3, 1, 0.3],
              }),
            }}
          />
        ))}
      </View>
    </View>
  );
}