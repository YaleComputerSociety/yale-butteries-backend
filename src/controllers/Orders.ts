import type { Request, Response } from 'express'

import prisma from '@src/config/prismaClient'
import type { OrderStatus } from '@prisma/client'
import { OrderItemStatus } from '@prisma/client'
import { formatOrder, formatOrderItem, formatOrders } from '@utils/dtoConverters'
import { getCollegeFromId, getOrderFromId, getOrderItemFromId, getUserFromId } from '@utils/prismaUtils'
import HTTPError from '@src/utils/httpError'
import { MILLISECONDS_UNTIL_ORDER_IS_EXPIRED } from '@utils/constants'
import type { CreateOrderBody, UpdateOrderBody, UpdateOrderItemBody } from '@utils/bodyTypes'

export async function getOrder (req: Request, res: Response): Promise<void> {
  const order = await getOrderFromId(parseInt(req.params.orderId))
  const formattedOrder = await formatOrder(order)
  res.json(formattedOrder)
}

export async function getAllOrdersFromCollege (req: Request, res: Response): Promise<void> {
  // Check the college exists
  const college = await getCollegeFromId(parseInt(req.params.collegeId))

  const orders = await prisma.order.findMany({
    where: {
      collegeId: parseInt(req.params.collegeId)
    },
    include: {
      orderItems: true
    }
  })

  const formattedOrders = await formatOrders(orders, college)
  res.json(formattedOrders)
}

export async function getRecentOrdersFromCollege (req: Request, res: Response): Promise<void> {
  // Check the college exists
  const college = await getCollegeFromId(parseInt(req.params.collegeId))

  const orderExpirationTime = new Date(Date.now() - MILLISECONDS_UNTIL_ORDER_IS_EXPIRED)

  const orders = await prisma.order.findMany({
    where: {
      collegeId: parseInt(req.params.collegeId),
      createdAt: {
        gte: orderExpirationTime
      }
    },
    include: {
      orderItems: true
    }
  })

  const formattedOrders = await formatOrders(orders, college)
  res.json(formattedOrders)
}

export async function createOrder (req: Request, res: Response): Promise<void> {
  interface NewOrderItem {
    price: number
    status: OrderItemStatus
    menuItemId: number
    userId: string
  }

  const requestBody = req.body as CreateOrderBody

  const college = await getCollegeFromId(requestBody.collegeId)

  // test is user exists
  // TODO test if user is the actual user sending the request
  await getUserFromId(requestBody.userId)

  // Get sanitized orderItems list
  const orderItems: NewOrderItem[] = []
  for (const item of requestBody.orderItems) {
    orderItems.push({
      price: item.price,
      status: OrderItemStatus.QUEUED,
      menuItemId: item.menuItemId,
      userId: requestBody.userId
    })
  }

  const order = await prisma.order.create({
    data: {
      status: 'QUEUED',
      price: requestBody.price,
      college: {
        connect: {
          id: college.id
        }
      },
      user: {
        connect: {
          id: requestBody.userId
        }
      },
      orderItems: {
        createMany: {
          data: orderItems
        }
      }
    },
    include: {
      orderItems: true
    }
  })

  const formattedOrder = await formatOrder(order)
  res.json(formattedOrder)
}

export async function updateOrderItem (req: Request, res: Response): Promise<void> {
  const requestBody = req.body as UpdateOrderItemBody

  // check that order item exists
  await getOrderItemFromId(parseInt(req.params.orderItemId))

  const orderItem = await prisma.orderItem.update({
    where: {
      id: parseInt(req.params.orderItemId)
    },
    data: {
      status: requestBody.status as OrderItemStatus
    }
  })

  if (orderItem === null) throw new HTTPError(`No order item found with ID ${req.params.orderItemId}`, 404)

  const formattedOrderItem = await formatOrderItem(orderItem)
  res.json(formattedOrderItem)
}

// This function is currently unused
export async function updateOrder (req: Request, res: Response): Promise<void> {
  const requestBody = req.body as UpdateOrderBody

  // check that the order exists
  await getOrderFromId(parseInt(req.params.orderId))

  const order = await prisma.order.update({
    where: {
      id: parseInt(req.params.orderId)
    },
    data: {
      status: requestBody.status as OrderStatus ?? undefined,
      price: requestBody.price ?? undefined
    },
    include: {
      orderItems: true
    }
  })
  const formattedOrder = await formatOrder(order)
  res.json(formattedOrder)
}
