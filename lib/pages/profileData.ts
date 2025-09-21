import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Adjust if your backend URL is different

// Type for the user data received from the backend
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// Type for user update payload
export interface UserUpdatePayload {
  email: string;
  name?: string;
  role?: string;
  currentPassword?: string;
  newPassword?: string;
}

// Fetches the current user's profile
export const fetchCurrentUserProfile = async (email: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    throw error;
  }
};

// Fetches all users (for superadmin/admin)
export const fetchAllUsers = async (token: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Updates a user's profile
export const updateUserProfile = async (payload: UserUpdatePayload, token: string) => {
  try {
    const response = await axios.put(`${API_URL}/update`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Deletes a user
export const deleteUser = async (email: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
