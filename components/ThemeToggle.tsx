import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme';

export function ThemeToggle(props: any) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      onPress={toggleTheme}
      className="flex-1 items-center justify-center"
    >
      {isDark ? (
        <Sun size={24} color="#ef4444" />
      ) : (
        <Moon size={24} color="#ef4444" />
      )}
    </TouchableOpacity>
  );
}
