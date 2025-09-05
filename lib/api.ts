const API_BASE_URL = 'http://localhost:3001/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    name: string;
    role: string;
  };
  message?: string;
}

export interface AuthUser {
  id: number;
  name: string;
  role: 'superadmin' | 'admin' | 'operator';
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success && data.token) {
        this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getHeaders(),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearToken();
    }
  }

  // Garage API methods
  async getGarageEntries() {
    try {
      const response = await fetch(`${API_BASE_URL}/garage`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch garage entries');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching garage entries:', error);
      throw error;
    }
  }

  async createGarageEntry(entry: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/garage`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to create garage entry');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating garage entry:', error);
      throw error;
    }
  }

  async updateGarageEntry(id: number, entry: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/garage/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to update garage entry');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating garage entry:', error);
      throw error;
    }
  }

  async updateGarageStatus(id: number, status: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/garage/${id}/status`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update garage status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating garage status:', error);
      throw error;
    }
  }

  // Cars API methods
  async getCars() {
    try {
      const response = await fetch(`${API_BASE_URL}/cars`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }

  // Clients API methods
  async getClients() {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  }

  // Employees API methods
  async getEmployees() {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();