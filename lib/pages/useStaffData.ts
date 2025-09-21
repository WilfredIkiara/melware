import { useEffect, useState } from 'react';
import { useAuth } from '../auth';
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

export interface StaffMember {
  staff_id: string; // Corrected to match database schema
  first_name: string; // Corrected to match database schema
  last_name: string; // Corrected to match database schema
  email: string;
  password?: string;
  phone?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

interface StaffData {
  staff: StaffMember[] | null;
  loading: boolean;
  error: string | null;
}

export function useStaffData(): StaffData {
  const [data, setData] = useState<StaffData>({
    staff: null,
    loading: true,
    error: null,
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'User not authenticated',
        }));
        return;
      }

      try {
        const headers = { 
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        };

        const res = await fetch(`${backendUrl}/api/staff`, { headers });
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`API error: ${res.status} - ${errorText}`);
        }
        
        const responseData = await res.json();
        
        setData({
          staff: responseData.staff || [],
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching staff:', error);
        setData(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Unknown error',
          loading: false,
        }));
      }
    };

    fetchData();
  }, [user]);

  return data;
}
