
// import { useCallback, useState } from 'react';

// const BACKEND_URL = 'http://localhost:3001';

// interface Client {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   total_spent: number;
//   address?: string;
// }

// interface Vehicle {
//   id: string;
//   client_id: string;
//   make: string;
//   licence_plate: string;
//   engine_type?: string;
//   notes?: string;
//   mileage?: number;
//   color?: string;
// }

// interface Service {
//   id: string;
//   client_id: string;
//   service_type: string;
//   service_cost?: number;
//   paid_status?: boolean;
//   notes?: string;
//   service_expenses?: number;
//   created_at: string;
// }

// interface ClientDetailsData {
//   customer: Client;
//   vehicles: Vehicle[];
//   service_records: Service[];
// }
// export function useClientData() {
//   const [clients, setClients] = useState<Client[] | null>(null);
//   const [clientDetails, setClientDetails] = useState<ClientDetailsData | null>(null);
//   const [clientVehicles, setClientVehicles] = useState<Vehicle[] | null>(null);
//   const [clientServices, setClientServices] = useState<Service[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   // const { user } = useAuth(); // If you have an auth hook

//   const getHeaders = () => {
//     return {
//       'Content-Type': 'application/json',
//       // Authorization: user?.token ? `Bearer ${user.token}` : '',
//     };
//   };

//   const fetchClients = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients`, {
//         headers: getHeaders(),
//       });
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
//       const data = await res.json();
//       setClients(data.clients);
//     } catch (err) {
//       console.error('Error fetching clients:', err);
//       setError('Failed to fetch clients.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // const fetchClientDetails = useCallback(async (clientId: string) => {
//   //   setLoading(true);
//   //   setError(null);
//   //   try {
//   //     const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}`, {
//   //       headers: getHeaders(),
//   //     });
//   //     if (!res.ok) {
//   //       throw new Error(`API error: ${res.status}`);
//   //     }
//   //     const data = await res.json();
//   //     setClientDetails(data);
//   //   } catch (err) {
//   //     console.error('Error fetching client details:', err);
//   //     setError('Failed to fetch client details.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }, []);
// // In your useClientData hook, add logging:
// const fetchClientDetails = useCallback(async (clientId: string) => {
//   setLoading(true);
//   setError(null);
//   try {
//     console.log('Fetching client details for ID:', clientId);
//     const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}`, {
//       headers: getHeaders(),
//     });
    
//     console.log('Response status:', res.status);
    
//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error('API error response:', errorText);
//       throw new Error(`API error: ${res.status} - ${errorText}`);
//     }
    
//     const data = await res.json();
//     console.log('API response data:', data); // This will show what's actually returned
    
//     if (data.client) {
//       setClientDetails(data.client);
//     } else if (data.customer) {
//       setClientDetails(data);
//     } else {
//       setClientDetails(data);
//     }
//   } catch (err) {
//     console.error('Error fetching client details:', err);
//     setError('Failed to fetch client details.');
//   } finally {
//     setLoading(false);
//   }
// }, []);
//   const fetchClientVehicles = useCallback(async (clientId: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}/vehicles`, {
//         headers: getHeaders(),
//       });
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
//       const data = await res.json();
//       setClientVehicles(data.vehicles);
//     } catch (err) {
//       console.error('Error fetching client vehicles:', err);
//       setError('Failed to fetch client vehicles.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchClientServices = useCallback(async (clientId: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}/services`, {
//         headers: getHeaders(),
//       });
//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
//       const data = await res.json();
//       setClientServices(data.services);
//     } catch (err) {
//       console.error('Error fetching client services:', err);
//       setError('Failed to fetch client services.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateClientDetails = useCallback(async (clientId: string, updatedData: any) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}`, {
//         method: 'PUT',
//         headers: getHeaders(),
//         body: JSON.stringify(updatedData),
//       });

//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const data = await res.json();
//       setClientDetails(data.client);
//     } catch (err) {
//       console.error('Error updating client:', err);
//       setError('Failed to update client details.');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);
  
//   const updateClientVehicle = useCallback(async (vehicleId: string, updatedData: any) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/client-vehicles/${vehicleId}`, {
//         method: 'PUT',
//         headers: getHeaders(),
//         body: JSON.stringify(updatedData),
//       });

//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       // Update local state
//       if (clientVehicles) {
//         setClientVehicles(clientVehicles.map(vehicle => 
//           vehicle.id === vehicleId 
//             ? { ...vehicle, ...updatedData }
//             : vehicle
//         ));
//       }
//     } catch (err) {
//       console.error('Error updating client vehicle:', err);
//       setError('Failed to update client vehicle.');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [clientVehicles]);

//   const addClientVehicle = useCallback(async (clientId: string, vehicleData: any) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}/vehicles`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(vehicleData),
//       });

//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const newVehicle = await res.json();
      
//       // Update local state to include the new vehicle
//       if (clientVehicles) {
//         setClientVehicles([...clientVehicles, newVehicle.vehicle]);
//       } else {
//         setClientVehicles([newVehicle.vehicle]);
//       }
//       return newVehicle.vehicle;
//     } catch (err) {
//       console.error('Error adding client vehicle:', err);
//       setError('Failed to add client vehicle.');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [clientVehicles]);

//   const addClientService = useCallback(async (clientId: string, serviceData: any) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/clients/${clientId}/services`, {
//         method: 'POST',
//         headers: getHeaders(),
//         body: JSON.stringify(serviceData),
//       });

//       if (!res.ok) {
//         throw new Error(`API error: ${res.status}`);
//       }
      
//       const newService = await res.json();
      
//       // Update local state to include the new service
//       if (clientServices) {
//         setClientServices([...clientServices, newService.service]);
//       } else {
//         setClientServices([newService.service]);
//       }
//       return newService.service;
//     } catch (err) {
//       console.error('Error adding client service:', err);
//       setError('Failed to add client service.');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [clientServices]);


//   return {
//     clients,
//     clientDetails,
//     clientVehicles,
//     clientServices,
//     loading,
//     error,
//     fetchClients,
//     fetchClientDetails,
//     fetchClientVehicles,
//     fetchClientServices,
//     updateClientDetails,
//     updateClientVehicle,
//     addClientVehicle,
//     addClientService
//   };
// }
import { useCallback, useState } from 'react';
import { apiService } from '../apiSevice';
import { useAuth } from '../auth';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  total_spent: number;
  address?: string;
  licence_plate: string;
  registration_make: string;
}

interface Vehicle {
  id: string;
  client_id: string;
  make: string;
  licence_plate: string;
  engine_type?: string;
  notes?: string;
  mileage?: number;
  color?: string;
}

interface Service {
  id: string;
  client_id: string;
  service_type: string;
  service_cost?: number;
  paid_status?: boolean;
  notes?: string;
  service_expenses?: number;
  created_at: string;
}

interface ClientDetailsData {
  customer: Customer;
  vehicles: Vehicle[];
  service_records: Service[];
}

export function useClientData() {
  const [clients, setClients] = useState<Customer[] | null>(null);
  const [clientDetails, setClientDetails] = useState<ClientDetailsData | null>(null);
  const [clientVehicles, setClientVehicles] = useState<Vehicle[] | null>(null);
  const [clientServices, setClientServices] = useState<Service[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  // Helper function to handle fetch calls with auth
  const handleApiCall = useCallback(async (
    apiFunction: () => Promise<any>,
    setter: (data: any) => void,
    errorMessage: string
  ) => {
    if (!isAuthenticated) {
      setError('User not authenticated.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiFunction();
      setter(data);
    } catch (err) {
      console.error(errorMessage, err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchClients = useCallback(async () => {
    const apiCall = () => apiService.get('/api/clients');
    const setter = (data: any) => setClients(data.clients);
    await handleApiCall(apiCall, setter, 'Failed to fetch clients.');
  }, [handleApiCall]);

  // const fetchClientDetails = useCallback(async (clientId: string) => {
  //   const apiCall = () => apiService.get(`/api/clients/${clientId}`);
  //   const setter = (data: any) => setClientDetails(data.client);
  //   await handleApiCall(apiCall, setter, 'Failed to fetch client details.');
  // }, [handleApiCall]);
const fetchClientDetails = useCallback(async (clientId: string) => {
  const apiCall = () => apiService.get(`/api/clients/${clientId}`);
  const setter = (data: any) => {
    setClientDetails(data.client);
    setClientVehicles(data.client.vehicles || []);
    setClientServices(data.client.service_records || []);
  };
  await handleApiCall(apiCall, setter, 'Failed to fetch client details.');
}, [handleApiCall]);

  const fetchClientVehicles = useCallback(async (clientId: string) => {
    const apiCall = () => apiService.get(`/api/clients/${clientId}/vehicles`);
    const setter = (data: any) => setClientVehicles(data.vehicles);
    await handleApiCall(apiCall, setter, 'Failed to fetch client vehicles.');
  }, [handleApiCall]);

  const fetchClientServices = useCallback(async (clientId: string) => {
    const apiCall = () => apiService.get(`/api/clients/${clientId}/services`);
    const setter = (data: any) => setClientServices(data.services);
    await handleApiCall(apiCall, setter, 'Failed to fetch client services.');
  }, [handleApiCall]);

  const updateClientDetails = useCallback(async (clientId: string, updateData: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.put(`/api/clients/${clientId}`, updateData);
      setClientDetails(prevDetails => {
        if (!prevDetails) return null;
        return { ...prevDetails, customer: data.client[0] };
      });
      return data.client[0];
    } catch (err) {
      console.error('Error updating client:', err);
      setError('Failed to update client details.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateClientVehicle = useCallback(async (vehicleId: string, updateData: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.put(`/api/clients/vehicles/${vehicleId}`, updateData);
      setClientVehicles(prevVehicles => {
        if (!prevVehicles) return null;
        return prevVehicles.map(v => v.id === vehicleId ? data.vehicle[0] : v);
      });
      return data.vehicle[0];
    } catch (err) {
      console.error('Error updating client vehicle:', err);
      setError('Failed to update client vehicle.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addClientVehicle = useCallback(async (clientId: string, vehicleData: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.post(`/api/clients/${clientId}/vehicles`, vehicleData);
      setClientVehicles(prevVehicles => [...(prevVehicles || []), data.vehicle]);
      return data.vehicle;
    } catch (err) {
      console.error('Error adding client vehicle:', err);
      setError('Failed to add client vehicle.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clientVehicles]);

  const addClientService = useCallback(async (clientId: string, serviceData: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.post(`/api/clients/${clientId}/services`, serviceData);
      setClientServices(prevServices => [...(prevServices || []), data.service]);
      return data.service;
    } catch (err) {
      console.error('Error adding client service:', err);
      setError('Failed to add client service.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clientServices]);

  return {
    clients,
    clientDetails,
    clientVehicles,
    clientServices,
    loading,
    error,
    fetchClients,
    fetchClientDetails,
    fetchClientVehicles,
    fetchClientServices,
    updateClientDetails,
    updateClientVehicle,
    addClientVehicle,
    addClientService,
  };
}