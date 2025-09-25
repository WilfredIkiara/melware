// hooks/useStaffData.ts
import { useCallback, useState } from 'react';
import { apiService } from '../apiSevice';
import { useAuth } from '../auth';

interface Staff {
  staff_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  location: string;
}

export function useStaffData() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchStaff = useCallback(async () => {
    if (!isAuthenticated) {
      setError('User not authenticated.');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.get('/api/client/getStaff');
      setStaff(data.staff || []);
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Failed to fetch staff data.');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return {
    staff,
    loading,
    error,
    fetchStaff,
  };
}