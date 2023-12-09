// DTO stands for Data Transfer Object
// These are the frontend object types, which we need to know when sending data and sometimes when receiving data

export interface UserDto {
  id: string
  email: string
  netid: string
  name: string
  college: string
  permissions: string
  currentOrder?: unknown
}

export interface OrderItemDto {
  id: number
  itemCost: number
  orderStatus: string
  menuItemId: number
  name: string
  user: string
}

export interface OrderDto {
  id: number
  college: string
  inProgress: string
  price: number
  userId: string
  paymentIntentId: string
  transactionItems: OrderItemDto[]
  creationTime: Date
}

export interface MenuItemDto {
  id?: number
  item: string
  college: string
  price: number
  description?: string
  limitedTime?: boolean
  isActive: boolean
  foodType: 'FOOD' | 'DRINK' | 'DESSERT'
}

export interface CollegeDto {
  id: number
  college: string
  isButteryIntegrated: boolean
  isAcceptingOrders: boolean
  isOpen: boolean
  daysOpen: string[]
  openTime: string
  closeTime: string
}
