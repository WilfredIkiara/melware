export type Client = {
  id: string
  name: string
  phone: string
  email: string
  avatar: string
  whatsapp?: string
  cars: string[]
  pending: boolean
  pendingAmount?: number
  createdAt: string // ISO date
}

export type Employee = {
  id: string
  name: string
  phone: string
  revenue: number
  attendance: { present: number; missed: number }
}

export type Car = {
  id: string
  model: string
  owner: string
  bookedAt: string
  work: string
  paid: boolean
  working: boolean
  image: string
}

export type AppState = {
  clients: Client[]
  employees: Employee[]
  cars: Car[]
}

export type OperatorInput = {
  moneyIn: number
  moneyOut: number
  customers: number
  date: string
}
