// DTO stands for Data Transfer Object
// These are the frontend object types, which we need to know when sending data and sometimes when receiving data

import type { MenuItemType, OrderItemStatus, OrderStatus, UserRole } from '@prisma/client'

export interface UserDto {
  id: string
  netId: string 
  name: string
  collegeId: number 
  role: UserRole 
  email?: string
  currentOrder?: unknown
}

export interface OrderItemDto {
  id: number
  price: number 
  status: OrderItemStatus
  menuItemId: number
  name: string
  userId: string 
}

export interface OrderDto {
  id: number
  collegeId: number
  status: OrderStatus
  price: number
  userId: string
  paymentIntentId: string
  orderItems: OrderItemDto[] 
  createdAt: Date 
}

export interface MenuItemDto {
  id: number 
  name: string 
  collegeId: number 
  price: number
  description: string 
  isActive: boolean
  foodType: MenuItemType 
}

export interface CollegeDto {
  id: number
  name: string 
  isButteryIntegrated: boolean
  isOpen: boolean
  daysOpen: string[]
  openTime: string
  closeTime: string
  isAcceptingOrders: boolean
}
