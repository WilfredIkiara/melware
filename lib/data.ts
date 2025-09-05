import { AppState } from './types'

export const initialData: AppState = {
  clients: [
    { 
      id: 'c1', 
      name: 'John Doe', 
      phone: '+254700000000', 
      email: 'john@example.com', 
      avatar: 'https://i.pravatar.cc/150?img=1', 
      cars: ['Toyota Premio'], 
      pending: true, 
      pendingAmount: 2500, 
      createdAt: '2025-08-01' 
    },
    { 
      id: 'c2', 
      name: 'Jane Smith', 
      phone: '+254711111111', 
      email: 'jane@example.com', 
      avatar: 'https://i.pravatar.cc/150?img=2', 
      cars: ['Nissan X-Trail'], 
      pending: false, 
      createdAt: '2025-08-10' 
    },
    { 
      id: 'c3', 
      name: 'Mike Johnson', 
      phone: '+254722222222', 
      email: 'mike@example.com', 
      avatar: 'https://i.pravatar.cc/150?img=3', 
      cars: ['Honda Civic', 'Toyota Hilux'], 
      pending: true, 
      pendingAmount: 1500, 
      createdAt: '2025-08-15' 
    },
  ],
  employees: [
    { 
      id: 'e1', 
      name: 'Mark Otieno', 
      phone: '+254733333333', 
      revenue: 120000, 
      attendance: { present: 18, missed: 2 } 
    },
    { 
      id: 'e2', 
      name: 'Linda Mwangi', 
      phone: '+254744444444', 
      revenue: 85000, 
      attendance: { present: 15, missed: 5 } 
    },
    { 
      id: 'e3', 
      name: 'Peter Kamau', 
      phone: '+254755555555', 
      revenue: 95000, 
      attendance: { present: 17, missed: 3 } 
    },
  ],
  cars: [
    { 
      id: 'v1', 
      model: 'Toyota Premio', 
      owner: 'John Doe', 
      bookedAt: '2025-08-05', 
      work: 'Engine Repair', 
      paid: false, 
      working: true, 
      image: 'https://i.imgur.com/Q7N9QZT.png' 
    },
    { 
      id: 'v2', 
      model: 'Nissan X-Trail', 
      owner: 'Jane Smith', 
      bookedAt: '2025-08-08', 
      work: 'Brake Replacement', 
      paid: true, 
      working: false, 
      image: 'https://i.imgur.com/YZ9Wz0M.png' 
    },
    { 
      id: 'v3', 
      model: 'Honda Civic', 
      owner: 'Mike Johnson', 
      bookedAt: '2025-08-12', 
      work: 'Oil Change', 
      paid: false, 
      working: true, 
      image: 'https://i.imgur.com/ABC123.png' 
    },
    { 
      id: 'v4', 
      model: 'Toyota Hilux', 
      owner: 'Mike Johnson', 
      bookedAt: '2025-08-14', 
      work: 'Suspension Repair', 
      paid: true, 
      working: true, 
      image: 'https://i.imgur.com/DEF456.png' 
    },
  ],
}
