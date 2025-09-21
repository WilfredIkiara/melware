
export const BACKEND_URL = 'http://localhost:3001';

interface ApiResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: any;
}

// A simple utility class to handle authenticated API calls
class ApiService {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  getHeaders() {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async login(credentials: any): Promise<ApiResponse> {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });
    return res.json();
  }

  async register(data: any): Promise<ApiResponse> {
    const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async logout(): Promise<void> {
    // Implement your logout API call if needed, otherwise this is a no-op
    // const res = await fetch(`${BACKEND_URL}/api/auth/logout`, {
    //   method: 'POST',
    //   headers: this.getHeaders(),
    // });
  }

  async get(endpoint: string): Promise<any> {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }

  async post(endpoint: string, body: any): Promise<any> {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }

  async put(endpoint: string, body: any): Promise<any> {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }
}

export const apiService = new ApiService();