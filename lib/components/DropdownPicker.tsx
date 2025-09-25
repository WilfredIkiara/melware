// components/DropdownPicker.tsx
import { ChevronDown, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface DropdownOption {
  label: string;
  value: string;
  [key: string]: any;
}

interface DropdownPickerProps {
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
}

export function DropdownPicker({
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
  searchable = false,
  className = ""
}: DropdownPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedOption = options.find(opt => opt.value === selectedValue);
  const filteredOptions = searchable 
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  return (
    <View className={className}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex-row items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600"
      >
        <Text className={`text-white ${selectedValue ? '' : 'text-gray-400'}`}>
          {selectedOption?.label || placeholder}
        </Text>
        <ChevronDown size={20} color="#9CA3AF" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className="bg-gray-800 rounded-2xl w-full max-w-md max-h-96">
            <View className="p-4 border-b border-gray-700">
              <Text className="text-white text-lg font-bold text-center">
                {placeholder}
              </Text>
            </View>

            {searchable && (
              <View className="p-3 border-b border-gray-700">
                <View className="flex-row items-center bg-gray-700 rounded-lg px-3">
                  <Search size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white p-3"
                    placeholder="Search..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              </View>
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              className="max-h-64"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                    setSearchQuery('');
                  }}
                  className={`p-4 border-b border-gray-700 ${
                    selectedValue === item.value ? 'bg-blue-600/20' : ''
                  }`}
                >
                  <Text className={`${
                    selectedValue === item.value ? 'text-blue-400' : 'text-white'
                  }`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className="p-4">
                  <Text className="text-gray-400 text-center">No options found</Text>
                </View>
              }
            />

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="p-4 border-t border-gray-700"
            >
              <Text className="text-red-400 text-center font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}