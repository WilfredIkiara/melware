import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { AppState, Client, Employee, Car, OperatorInput } from './types'
import { initialData } from './data'

// Simple reducer-based store (no external libs)

type Action =
  | { type: 'UPDATE_CLIENT'; id: string; patch: Partial<Client> }
  | { type: 'UPDATE_EMPLOYEE'; id: string; patch: Partial<Employee> }
  | { type: 'UPDATE_CAR'; id: string; patch: Partial<Car> }
  | { type: 'TOGGLE_CAR_PAID'; id: string }
  | { type: 'TOGGLE_CAR_WORKING'; id: string }
  | { type: 'ADD_CLIENT'; client: Client }
  | { type: 'ADD_EMPLOYEE'; employee: Employee }
  | { type: 'ADD_CAR'; car: Car }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_CLIENT':
      return { ...state, clients: state.clients.map(c => (c.id === action.id ? { ...c, ...action.patch } : c)) }
    case 'UPDATE_EMPLOYEE':
      return { ...state, employees: state.employees.map(e => (e.id === action.id ? { ...e, ...action.patch } : e)) }
    case 'UPDATE_CAR':
      return { ...state, cars: state.cars.map(v => (v.id === action.id ? { ...v, ...action.patch } : v)) }
    case 'TOGGLE_CAR_PAID':
      return { ...state, cars: state.cars.map(v => (v.id === action.id ? { ...v, paid: !v.paid } : v)) }
    case 'TOGGLE_CAR_WORKING':
      return { ...state, cars: state.cars.map(v => (v.id === action.id ? { ...v, working: !v.working } : v)) }
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.client] }
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.employee] }
    case 'ADD_CAR':
      return { ...state, cars: [...state.cars, action.car] }
    default:
      return state
  }
}

const Ctx = createContext<{
  clients: Client[]
  employees: Employee[]
  cars: Car[]
  updateClient: (id: string, patch: Partial<Client>) => void
  updateEmployee: (id: string, patch: Partial<Employee>) => void
  updateCar: (id: string, patch: Partial<Car>) => void
  toggleCarPaid: (id: string) => void
  toggleCarWorking: (id: string) => void
  addClient: (client: Client) => void
  addEmployee: (employee: Employee) => void
  addCar: (car: Car) => void
  totals: { revenue: number; clients: number; carsWorked: number; pendingPayments: number }
} | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialData)

  const value = useMemo(() => {
    const totals = {
      revenue: state.employees.reduce((s, e) => s + (e.revenue || 0), 0),
      clients: state.clients.length,
      carsWorked: state.cars.filter(c => c.working || c.paid).length,
      pendingPayments: state.clients.filter(c => c.pending).length,
    }
    return {
      clients: state.clients,
      employees: state.employees,
      cars: state.cars,
      updateClient: (id: string, patch: Partial<Client>) => dispatch({ type: 'UPDATE_CLIENT', id, patch }),
      updateEmployee: (id: string, patch: Partial<Employee>) => dispatch({ type: 'UPDATE_EMPLOYEE', id, patch }),
      updateCar: (id: string, patch: Partial<Car>) => dispatch({ type: 'UPDATE_CAR', id, patch }),
      toggleCarPaid: (id: string) => dispatch({ type: 'TOGGLE_CAR_PAID', id }),
      toggleCarWorking: (id: string) => dispatch({ type: 'TOGGLE_CAR_WORKING', id }),
      addClient: (client: Client) => dispatch({ type: 'ADD_CLIENT', client }),
      addEmployee: (employee: Employee) => dispatch({ type: 'ADD_EMPLOYEE', employee }),
      addCar: (car: Car) => dispatch({ type: 'ADD_CAR', car }),
      totals,
    }
  }, [state])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
