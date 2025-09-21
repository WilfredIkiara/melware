import { useEffect, useState } from 'react';
import { useAuth } from '../auth';

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3001';

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address?: string;
  licence_plate?: string;
  registration_make?: string;
  created_at: string;
  client_vehicles?: Array<{
    make: string;
    licence_plate: string;
  }>;
}

interface WorkOrder {
  id: string;
  client_id: string;
  vehicle_id: string;
  services: any[];
  status: string;
  assigned_staff?: string;
  total_cost?: number;
  created_at: string;
  clients?: {
    first_name: string;
    last_name: string;
  };
  client_vehicles?: {
    make: string;
    licence_plate: string;
  };
}

interface Appointment {
  id: string;
  client_id: string;
  vehicle_id: string;
  service_type: string;
  scheduled_time: string;
  status: string;
  notes?: string;
  clients?: {
    first_name: string;
    last_name: string;
    phone_number: string;
  };
  client_vehicles?: {
    make: string;
    licence_plate: string;
  };
}

interface InventoryItem {
  item_name: string;
  current_stock: number;
  quantity_in: number;
  quantity_out: number;
}

interface DashboardStats {
  totalClients: number;
  totalVehicles: number;
  activeJobs: number;
  jobsCompleted: number;
  revenue: number;
  expenses: number;
  netProfit: number;
}

interface OperatorData {
  stats: DashboardStats | null;
  activeJobs: WorkOrder[];
  appointments: Appointment[];
  lowInventory: InventoryItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// export function useOperatorData(): OperatorData {
//   const [data, setData] = useState<Omit<OperatorData, 'refetch'>>({
//     stats: null,
//     activeJobs: [],
//     appointments: [],
//     lowInventory: [],
//     loading: true,
//     error: null,
//   });

//   const { user } = useAuth();

//   const fetchData = async () => {
//     if (!user?.token) {
//       setData(prev => ({
//         ...prev,
//         loading: false,
//         error: 'User not authenticated',
//       }));
//       return;
//     }

//     try {
//       const headers = {
//         Authorization: `Bearer ${user.token}`,
//         'Content-Type': 'application/json',
//       };

//       const response = await fetch(`${backendUrl}/api/operator/dashboard-data`, { headers });
      
//       if (!response.ok) {
//         throw new Error(`API error: ${response.status}`);
//       }

//       const dashboardData = await response.json();

//       setData({
//         stats: dashboardData.stats,
//         activeJobs: dashboardData.activeJobs || [],
//         appointments: dashboardData.appointments || [],
//         lowInventory: dashboardData.lowInventory || [],
//         loading: false,
//         error: null,
//       });
//     } catch (error) {
//       console.error('Error fetching operator data:', error);
//       setData(prev => ({
//         ...prev,
//         error: error instanceof Error ? error.message : 'Unknown error',
//         loading: false,
//       }));
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [user]);

//   return { ...data, refetch: fetchData };
// }

// // Additional hooks for specific operations
// export function useCustomers(searchQuery?: string) {
//   const [customers, setCustomers] = useState<Client[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

//   const fetchCustomers = async (query?: string) => {
//     if (!user?.token) return;

//     try {
//       setLoading(true);
//       const headers = {
//         Authorization: `Bearer ${user.token}`,
//       };

//       let url = `${backendUrl}/api/operator/customers`;
//       if (query) {
//         url += `?search=${encodeURIComponent(query)}`;
//       }

//       const response = await fetch(url, { headers });
      
//       if (!response.ok) throw new Error(`API error: ${response.status}`);
      
//       const data = await response.json();
//       setCustomers(data);
//       setError(null);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Unknown error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers(searchQuery);
//   }, [searchQuery, user]);

//   return { customers, loading, error, refetch: fetchCustomers };
// }
export function useOperatorData(): OperatorData {
  const [data, setData] = useState<Omit<OperatorData, 'refetch'>>({
    stats: null,
    activeJobs: [],
    appointments: [],
    lowInventory: [],
    loading: true,
    error: null,
  });

  const { user } = useAuth();

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
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${backendUrl}/api/operator/dashboard-data`, { headers });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch data');
      }

      setData({
        stats: result.stats,
        activeJobs: result.activeJobs || [],
        appointments: result.appointments || [],
        lowInventory: result.lowInventory || [],
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching operator data:', error);
      setData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return { ...data, refetch: fetchData };
}

// Update the useCustomers hook as well
export function useCustomers(searchQuery?: string) {
  const [customers, setCustomers] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCustomers = async (query?: string) => {
    if (!user?.token) return;

    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };

      let url = `${backendUrl}/api/operator/customers`;
      if (query) {
        url += `?search=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url, { headers });
      
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch customers');
      }

      setCustomers(result.customers || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(searchQuery);
  }, [searchQuery, user]);

  return { customers, loading, error, refetch: fetchCustomers };
}