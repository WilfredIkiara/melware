// utils/api.ts
import axios, { AxiosResponse } from 'axios';
import { ApiResponse, Car, Client, InventoryItem } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Cars API calls
export const fetchAllCars = async (): Promise<ApiResponse<Car[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Car[]>> = await api.get('/cars');
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const fetchCarByLicencePlate = async (licence_plate: string): Promise<ApiResponse<Car>> => {
  try {
    const response: AxiosResponse<ApiResponse<Car>> = await api.get(`/cars/${licence_plate}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

export const updateCar = async (licence_plate: string, data: Partial<Car>): Promise<ApiResponse<Car>> => {
  try {
    const response: AxiosResponse<ApiResponse<Car>> = await api.put(`/cars/${licence_plate}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

export const deleteCar = async (licence_plate: string): Promise<ApiResponse<void>> => {
  try {
    const response: AxiosResponse<ApiResponse<void>> = await api.delete(`/cars/${licence_plate}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

// Client API calls
export const fetchClientById = async (client_id: string): Promise<ApiResponse<Client>> => {
  try {
    const response: AxiosResponse<ApiResponse<Client>> = await api.get(`/clients/${client_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client:', error);
    throw error;
  }
};

// Garage Inventory API calls
export const fetchAllGarageInventory = async (): Promise<ApiResponse<InventoryItem[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<InventoryItem[]>> = await api.get('/garage');
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const fetchInventoryItemByCode = async (item_code: string): Promise<ApiResponse<InventoryItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<InventoryItem>> = await api.get(`/garage/${item_code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    throw error;
  }
};

export const updateInventoryItem = async (item_code: string, data: Partial<InventoryItem>): Promise<ApiResponse<InventoryItem>> => {
  try {
    const response: AxiosResponse<ApiResponse<InventoryItem>> = await api.put(`/garage/${item_code}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating inventory item:', error);
    throw error;
  }
};

export const deleteInventoryItem = async (item_code: string): Promise<ApiResponse<void>> => {
  try {
    const response: AxiosResponse<ApiResponse<void>> = await api.delete(`/garage/${item_code}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    throw error;
  }
};

export default api;