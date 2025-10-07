// import { useEffect, useState } from 'react';
// import { useAuth } from '../auth';
// const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// interface DashboardStats {
//   financials?: { total_revenue: number; transaction_count: number };
//   inventory?: { total_items: number; total_stock: number; low_stock_count: number };
//   clients?: { total_clients: number };
//   cars?: { total_cars: number; total_balance: number };
//   expenses?: { total_expenses: number };
// }

// interface Activity {
//   id: string;
//   user_id: string;
//   activity_type: string;
//   description: string;
//   created_at: string;
// }

// interface WorkOrder {
//   id: string;
//   client_id: string;
//   vehicle_id: string;
//   services: any[];
//   assigned_staff: string;
//   estimated_cost: number;
//   status: string;
//   created_at: string;
//   clients?: { first_name: string; last_name: string; email: string };
//   client_vehicles?: { make: string; model: string; licence_plate: string };
//   staff?: { first_name: string; last_name: string };
// }

// interface Appointment {
//   id: string;
//   client_id: string;
//   vehicle_id: string;
//   service_type: string;
//   scheduled_time: string;
//   notes: string;
//   status: string;
//   clients?: { first_name: string; last_name: string; phone_number: string };
//   client_vehicles?: { make: string; model: string; licence_plate: string };
// }

// interface SuperAdminData {
//   stats: DashboardStats | null;
//   activities: Activity[] | null;
//   workOrders: WorkOrder[] | null;
//   appointments: Appointment[] | null;
//   loading: boolean;
//   error: string | null;
// }

// export function useSuperAdminData(): SuperAdminData {
//   const [data, setData] = useState<SuperAdminData>({
//     stats: null,
//     activities: null,
//     workOrders: null,
//     appointments: null,
//     loading: true,
//     error: null,
//   });

//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?.token) {
//         setData(prev => ({
//           ...prev,
//           loading: false,
//           error: 'User not authenticated',
//         }));
//         return;
//       }

//       try {
//         const headers = { Authorization: `Bearer ${user.token}` };

//         // Fetch all data in parallel
//         const [statsRes, activitiesRes, workOrdersRes, appointmentsRes] = await Promise.all([
//         fetch(`${backendUrl}/api/dashboard/stats`, { headers }),
//         fetch(`${backendUrl}/api/dashboard/activities`, { headers }),
//         fetch(`${backendUrl}/api/dashboard/work-orders`, { headers }),
//         fetch(`${backendUrl}/api/dashboard/appointments`, { headers }),
//         ]);

//         if (!statsRes.ok) throw new Error(`Stats API error: ${statsRes.status}`);
//         if (!activitiesRes.ok) throw new Error(`Activities API error: ${activitiesRes.status}`);
//         if (!workOrdersRes.ok) throw new Error(`Work Orders API error: ${workOrdersRes.status}`);
//         if (!appointmentsRes.ok) throw new Error(`Appointments API error: ${appointmentsRes.status}`);

//         const [stats, activities, workOrders, appointments] = await Promise.all([
//           statsRes.json(),
//           activitiesRes.json(),
//           workOrdersRes.json(),
//           appointmentsRes.json(),
//         ]);

//         setData({ stats, activities, workOrders, appointments, loading: false, error: null });
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         setData(prev => ({
//           ...prev,
//           error: error instanceof Error ? error.message : 'Unknown error',
//           loading: false,
//         }));
//       }
//     };

//     fetchData();
//   }, [user]);

//   return data;
// }
import { useEffect, useState } from 'react';
import { useAuth } from '../auth';
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

interface DashboardStats {
  financials?: { total_revenue: number; transaction_count: number };
  inventory?: { total_items: number; total_stock: number; low_stock_count: number };
  clients?: { total_clients: number };
  cars?: { total_cars: number; total_balance: number };
  expenses?: { total_expenses: number };
}

interface Activity {
  id: string;
  profile_id: string;
  profiles?: { first_name: string }; 
  activity_type: string;
  description: string;
  timestamp: string;
  route?: string; 
}
interface WorkOrder {
  id: string;
  client_id: string;
  vehicle_id: string;
  services: any[];
  assigned_staff: string;
  estimated_cost: number;
  status: string;
  created_at: string;
  clients?: { first_name: string; last_name: string; email: string };
  client_vehicles?: { make: string; model: string; licence_plate: string };
  staff?: { first_name: string; last_name: string };
}

interface Appointment {
  id: string;
  client_id: string;
  vehicle_id: string;
  service_type: string;
  scheduled_time: string;
  notes: string;
  status: string;
  clients?: { first_name: string; last_name: string; phone_number: string };
  client_vehicles?: { make: string; model: string; licence_plate: string };
}

interface InventoryItem {
  id: number;
  item_name: string;
  quantity: number;
  expiry_date?: string;
}

interface ExpenseBreakdown {
  category: string;
  total_cost: number;
}

interface PayrollEntry {
  id: string;
  staff: { first_name: string; last_name: string };
  payment_status: string;
}

interface CustomerData {
  client_id: any;
  id: any;
  first_name: string;
  last_name: string;
  total_spent?: number;
  created_at?: string;
  balance?: number;
}

interface SuperAdminData {
  stats: DashboardStats | null;
  financials: {
    total_revenue?: number; // Add this
    total_expenses?: number; // Add this
    expenseBreakdown: ExpenseBreakdown[] | null;
  }
  inventory: {
    lowStockItems: InventoryItem[] | null;
    expiringItems: InventoryItem[] | null;
  }
  customers: {
    topCustomers: CustomerData[] | null;
    newCustomersThisWeek: CustomerData[] | null;
    outstandingBalances: CustomerData[] | null;
  }
  staff: {
    payrollOverview: PayrollEntry[] | null;
  }
  activities: Activity[] | null;
  workOrders: WorkOrder[] | null;
  appointments: Appointment[] | null;
  loading: boolean;
  error: string | null;
}

export function useSuperAdminData(): SuperAdminData {
  const [data, setData] = useState<SuperAdminData>({
    stats: null,
    financials: { expenseBreakdown: null },
    inventory: { lowStockItems: null, expiringItems: null },
    customers: { topCustomers: null, newCustomersThisWeek: null, outstandingBalances: null },
    staff: { payrollOverview: null },
    activities: null,
    workOrders: null,
    appointments: null,
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
        const headers = { Authorization: `Bearer ${user.token}` };

        // Fetch all data in a single, consolidated API call
        const res = await fetch(`${backendUrl}/api/dashboard/super-admin-data`, { headers });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error: ${res.status} - ${errorText}`);
        }
        const superAdminData = await res.json();

        // Update state with fetched data
        setData({
          stats: superAdminData.stats,
          financials: superAdminData.financials,
          inventory: superAdminData.inventory,
          customers: superAdminData.customers,
          staff: superAdminData.staff,
          activities: superAdminData.activities,
          workOrders: superAdminData.workOrders,
          appointments: superAdminData.appointments,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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