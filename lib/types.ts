// types/index.ts
export interface Car {
  id?: number;
  model: string;
  make: string;
  licence_plate: string;
  milage?: number;
  balance?: number;
  client_id?: string;
  client_email?: string;
  created_at?: string;
  updated_at?: string;
  status?: 'available' | 'in_service' | 'unavailable';
  last_service_date?: string;
  next_service_date?: string;
  is_paid?: boolean;
  is_working?: boolean;
  location?: string;
}
export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  address?: string;
  licence_plate?: string;
  registration_make?: string;
  vehicle_ids?: string[];
  created_at?: string;
  total_spent?: number;
}

export interface InventoryItem {
  id?: number;
  item_code: string;
  item_name: string;
  category?: string;
  description?: string;
  quantity_in?: number;
  quantity_out?: number;
  current_stock?: number;
  purchase_price?: number;
  selling_price?: number;
  supplier_name?: string;
  status?: string;
  mechanic_notes?: string;
  created_at?: string;
  updated_at?: string;
  expiry_date?: string;
  min_stock_level?: number;
  location?: string;
}


export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}