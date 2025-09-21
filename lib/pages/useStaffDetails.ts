import { useEffect, useState } from 'react';
import { useAuth } from '../auth';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

export interface StaffDetails {
  staff: {
    staff_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    location?: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  appointments: Array<{
    id: number;
    service_type: string;
    scheduled_time: string;
    status: string;
    notes?: string;
    clients: { first_name: string; last_name: string; phone_number?: string };
    client_vehicles: { make: string; licence_plate: string };
  }>;
  services: Array<{
    id: string;
    service_type: string;
    service_cost: number;
    paid_status: boolean;
    notes?: string;
    created_at: string;
    clients: { first_name: string; last_name: string };
    client_vehicles: { make: string; licence_plate: string };
  }>;
  monthlyStats: {
    totalServices: number;
    totalRevenue: number;
    completedAppointments: number;
    pendingAppointments: number;
  };
}

interface StaffDetailsData {
  data: StaffDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useStaffDetails(staffId: string): StaffDetailsData {
  const [data, setData] = useState<StaffDetailsData>({
    data: null,
    loading: true,
    error: null,
    refetch: () => {}
  });

  const { user } = useAuth();

  const fetchData = async () => {
    if (!user?.token || !staffId) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'User not authenticated or staff ID missing',
      }));
      return;
    }

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (user.token) {
        headers.Authorization = `Bearer ${user.token}`;
      }

      const res = await fetch(`${backendUrl}/api/staff/${staffId}/details`, { headers });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }
      
      const responseData = await res.json();
      
      setData({
        data: responseData,
        loading: false,
        error: null,
        refetch: fetchData
      });
    } catch (error) {
      console.error('Error fetching staff details:', error);
      setData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
        refetch: fetchData
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [staffId, user]);

  return data;
}