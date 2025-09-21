import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { Colors } from '../constants/colors';

interface GradientCardProps extends ViewProps {
  colors?: string[];
  children: React.ReactNode;
}

export function GradientCard({ colors = Colors.gradient.blueToPurple, children, style, ...props }: GradientCardProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-2xl overflow-hidden"
      style={style}
    >
      <View className="p-6" {...props}>
        {children}
      </View>
    </LinearGradient>
  );
}