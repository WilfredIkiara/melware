// lib/useTransactionData.ts
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth';

const API_URL = 'http://localhost:3001/api';

// Updated Transaction interface to match database schema
export interface Transaction {
  id: string;
  transaction_id: string;
  amount: number;
  account_number: string;
  sender_name: string;
  payment_date: string;
  created_at: string;
  updated_at: string;
  status: 'SUCCESS';
  CheckoutRequestID: string;
}

// Updated Expense interface to match database schema
export interface Expense {
  id: string;
  expense_code: string;
  item_name: string;
  category: string;
  description: string;
  supplier_name: string;
  quantity: number;
  unit_price: number;
  total_cost: number;
  payment_method: string;
  expense_date: string;
  status: 'Paid' | 'Pending';
  notes: string;
  created_at: string;
  updated_at: string;
  staff_id: string;
}

export interface MonthlyData {
  month: string;
  totalTransactions: number;
  totalExpenses: number;
  items: (Transaction | Expense)[];
}

// Custom hook to fetch and format financial data
export const useFinancialData = () => {
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const token = user?.token;
        if (!token) {
          throw new Error('No token found');
        }

        const [transactionsRes, expensesRes] = await Promise.all([
          axios.get(`${API_URL}/transactions/paybill_payments`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/expenses`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Handle the response structure correctly
        const transactions: Transaction[] = transactionsRes.data.payments || transactionsRes.data.transactions || transactionsRes.data;
        const expenses: Expense[] = expensesRes.data.expenses || expensesRes.data;

        // Combine and group data by month
        const allItems = [...transactions, ...expenses].sort((a, b) => 
          new Date('payment_date' in b ? b.payment_date : b.expense_date).getTime() - 
          new Date('payment_date' in a ? a.payment_date : a.expense_date).getTime()
        );

        const groupedData = allItems.reduce((acc, item) => {
          const date = new Date('payment_date' in item ? item.payment_date : item.expense_date);
          const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

          if (!acc[monthYear]) {
            acc[monthYear] = {
              month: monthYear,
              totalTransactions: 0,
              totalExpenses: 0,
              items: [],
            };
          }

          if ('transaction_id' in item) {
            acc[monthYear].totalTransactions += item.amount;
          } else {
            acc[monthYear].totalExpenses += item.total_cost || 0;
          }

          acc[monthYear].items.push(item);
          return acc;
        }, {} as Record<string, MonthlyData>);

        setData(Object.values(groupedData));
      } catch (err) {
        setError('Failed to fetch financial data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  return { data, loading, error };
};

// Updated function to add a new expense
export const addExpense = async (expense: Omit<Expense, 'id' | 'expense_code' | 'created_at' | 'updated_at' | 'total_cost'>, token: string) => {
  const payload = {
    item_name: expense.item_name,
    category: expense.category,
    description: expense.description,
    supplier_name: expense.supplier_name,
    quantity: expense.quantity,
    unit_price: expense.unit_price,
    payment_method: expense.payment_method,
    expense_date: expense.expense_date,
    status: expense.status,
    notes: expense.notes,
    staff_id: expense.staff_id
  };
  
  try {
    const response = await axios.post(`${API_URL}/expenses`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};