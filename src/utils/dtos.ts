// DTO stands for Data Transfer Object
// These are the frontend object types, which we need to know when sending data and sometimes when receiving data

import type { MenuItemType, OrderItemStatus, OrderStatus, UserRole } from '@prisma/client'

export interface UserDto {
  id: string
  netId: string // netId
  name: string
  collegeId: number // collegeId: number
  role: UserRole // role, enum
  email?: string // optional
  currentOrder?: unknown
}

export interface OrderItemDto {
  id: number
  price: number // price
  status: OrderItemStatus // status, enum
  menuItemId: number
  name: string
  userId: string // userId
}

export interface OrderDto {
  id: number
  collegeId: number // should be collegeId: number
  // inProgress: string // remove
  orderStatus: OrderStatus // create
  price: number
  userId: string
  paymentIntentId: string
  orderItems: OrderItemDto[] // orderItems
  createdAt: Date // createdAt
}

export interface MenuItemDto {
  id: number // mandatory
  name: string // name
  collegeId: number // should be collegeId: number
  price: number
  description: string // mandatory
  // limitedTime?: boolean // remove
  isActive: boolean
  foodType: MenuItemType // type, enum
}

export interface CollegeDto {
  id: number
  name: string // name
  isButteryIntegrated: boolean // isButteryIntegrated
  isOpen: boolean
  daysOpen: string[]
  openTime: string
  closeTime: string
}
