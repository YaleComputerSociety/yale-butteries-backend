import type { Request, Response } from 'express'

import type { User, UserRole } from '@prisma/client'
import prisma from '@src/prismaClient'
import { findUserByNetId, getCollegeFromName, isUserRole } from '@utils/prismaUtils'
import { formatOrderItem, formatUser, formatUsers } from '@utils/dtoConverters'
import HTTPError from '@src/utils/httpError'
import { MILLISECONDS_UNTIL_ORDER_IS_EXPIRED } from '@src/utils/constants'

export async function getAllUsers (_req: Request, res: Response): Promise<void> {
  const users = await prisma.user.findMany({ include: { college: true } })
  const formattedUsers = await formatUsers(users)
  res.json(formattedUsers)
}

export async function getUser (req: Request, res: Response): Promise<void> {
  const orderExpirationTime = new Date(Date.now() - MILLISECONDS_UNTIL_ORDER_IS_EXPIRED)

  const user = await prisma.user.findUnique({
    include: {
      college: true,
      orders: {
        where: {
          createdAt: {
            gte: orderExpirationTime
          }
        },
        include: {
          orderItems: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
    where: {
      id: req.params.userId
    }
  })
  console.log(user)

  if (user === null) throw new HTTPError(`No user found with ID ${req.params.userId}`, 404)

  const formattedUser = await formatUser(user)

  // get most recent valid order
  // TODO: change frontend behavior to make more sense, remove this part and put it somewhere else
  if (user.orders.length > 0) {
    const recentOrder = user.orders[0]
    const recentOrderItem = recentOrder.orderItems[0]
    formattedUser.currentOrder = await formatOrderItem(recentOrderItem)
  }

  res.json(formattedUser)
}

interface CreateUserRequestBody {
  netid: string
  college: string
  name?: string
  permissions?: string
  email?: string
  token?: string
}

interface NewUserData {
  netId: string
  name: string
  college: {
    connect: {
      id: number
    }
  }
  role?: UserRole
  token?: string
  email?: string
}

async function createUserRecord (data: CreateUserRequestBody): Promise<User> {
  const collegeData = await getCollegeFromName(data.college)

  const userData: NewUserData = {
    netId: data.netid,
    name: data.name === null ? data.name : data.netid,
    college: {
      connect: {
        id: collegeData.id
      }
    }
  }

  if (data.permissions === null && isUserRole(data.permissions)) userData.role = data.permissions
  if (data.email === null) userData.email = data.email
  if (data.token === null) userData.token = data.token

  return await prisma.user.create({ data: userData })
}

export async function createUser (req: Request, res: Response): Promise<void> {
  try {
    const { netid } = req.body

    if (netid === undefined) {
      res.status(400).send('Required fields are missing')
      return
    }

    // In case the user already exists
    const existingUser = await findUserByNetId(netid)
    if (existingUser !== null) {
      res.send(JSON.stringify(await formatUser(existingUser)))
      return
    }

    const newUser = await createUserRecord(req.body)

    // await stripe.customers.create({
    //   email: req.body.email,
    //   name: req.body.name,
    //   metadata: { userId: newUser.id },
    // })

    res.send(JSON.stringify(await formatUser(newUser)))
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
}

export async function updateUser (req: Request, res: Response): Promise<void> {
  try {
    interface userUpdateData {
      name?: string
      email?: string
    }

    const userData: userUpdateData = {}
    if (req.body.name !== undefined) userData.name = req.body.name
    if (req.body.email !== undefined) userData.email = req.body.email

    const user = await prisma.user.update({
      where: {
        id: req.params.userId
      },
      data: userData
    })
    res.send(JSON.stringify(user))
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function verifyStaffLogin (req: Request, res: Response): Promise<void> {
  try {
    // this needs to be fixed but we also wont use this in the future
    const user = await prisma.user.findUnique({
      where: {
        id: '89839659-e7b1-4e3d-ad6e-fd30fca49a75'
      }
    })
    if (user === null) throw new Error('could not find staff credentials')
    let ret = false
    if (user.name === req.body.username && user.token === req.body.password) {
      ret = true
    }
    res.send(ret)
  } catch (e) {
    res.status(400).send(e)
  }
}
