// This file contains class-validator types for the request bodies of every endpiont that uses a body
// class-validator uses these type classes to automatically check that the body inputted is correct and deal with errors

import { MenuItemType, OrderItemStatus, OrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator'

// convert prisma enums into lists of strings for class-validator to use
const orderStatusValues = Object.values(OrderStatus) as string[]
const orderItemStatusValues = Object.values(OrderItemStatus) as string[]
const menuItemTypeValues = Object.values(MenuItemType) as string[]

export class UpdateCollegeBody {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
    daysOpen: string[]

  @IsOptional()
  @IsBoolean()
    isOpen: boolean

  @IsOptional()
  @IsString()
    openTime: string

  @IsOptional()
  @IsString()
    closeTime: string
}

export class CreateMenuItemBody {
  @IsString()
    name: string

  @IsInt()
    collegeId: number

  @IsInt()
  @Min(50)
  @Max(2000)
    price: number

  @IsOptional()
  @IsString()
    description: string

  @IsOptional()
  @IsBoolean()
    isActive: boolean

  @IsOptional()
  @IsIn(menuItemTypeValues)
    foodType: string
}

export class UpdateMenuItemBody {
  @IsOptional()
  @IsString()
    name: string

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(2000)
    price: number

  @IsOptional()
  @IsString()
    description: string

  @IsOptional()
  @IsBoolean()
    isActive: boolean

  @IsOptional()
  @IsIn(menuItemTypeValues)
    foodType: string
}

export class CreateOrderBody {
  @IsString()
    userId: string

  @IsInt()
    price: number

  @IsInt()
    collegeId: number

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemBody)
    orderItems: CreateOrderItemBody[]
}

export class CreateOrderItemBody {
  @IsInt()
  @Min(50)
  @Max(2000)
    price: number

  @IsInt()
    menuItemId: number
}

export class UpdateOrderItemBody {
  @IsIn(orderItemStatusValues)
    status: string
}

export class UpdateOrderBody {
  @IsOptional()
  @IsIn(orderStatusValues)
    status: string

  @IsOptional()
  @IsInt()
    price: number

  @IsOptional()
  @IsInt()
    stripeFee: number
}

export class CreateUserBody {
  @IsString()
    netId: string

  @IsInt()
    collegeId: number

  @IsOptional()
  @IsString()
    name: string

  @IsOptional()
  @IsString()
    email: string
}

export class UpdateUserBody {
  @IsOptional()
  @IsString()
    name: string

  @IsOptional()
  @IsString()
    email: string
}

export class VerifyStaffLoginBody {
  @IsString()
    username: string

  @IsString()
    password: string
}

// what the actual fuck why is the frontend written like this
export class CreatePaymentIntentItemItemBody {
  @IsInt()
  @Min(50)
  @Max(2000)
    price: number

  @IsInt()
    id: number
}

export class CreatePaymentIntentItemBody {
  @ValidateNested()
  @Type(() => CreatePaymentIntentItemItemBody)
    orderItem: CreatePaymentIntentItemItemBody
}

export class CreatePaymentIntentBody {
  @IsString()
    userId: string

  @IsInt()
    price: number

  @IsString()
    college: string

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentIntentItemBody)
    items: CreatePaymentIntentItemBody[]
}

export class SubscribePushNotificationsBody {
  @IsOptional()
  @IsString()
    pushToken: string

  @IsInt()
    orderId: number
}
