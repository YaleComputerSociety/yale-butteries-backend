import type { Request, Response } from 'express'

import { MenuItemType } from '@prisma/client'
import prisma from '@src/config/prismaClient'
import { getCollegeFromId, getMenuItemFromId } from '@utils/prismaUtils'
import { formatMenuItem } from '@utils/dtoConverters'
import type { CreateMenuItemBody, UpdateMenuItemBody } from '@utils/bodyTypes'

export async function getAllMenuItems (_: Request, res: Response): Promise<void> {
  const menuItems = await prisma.menuItem.findMany({
    include: {
      college: true
    }
  })
  const formattedMenuItems = menuItems.map((item) => formatMenuItem(item))
  res.json(formattedMenuItems)
}

export async function getMenuItem (req: Request, res: Response): Promise<void> {
  const menuItem = await getMenuItemFromId(parseInt(req.params.menuItemId))
  const formattedMenuItem = formatMenuItem(menuItem)
  res.json(formattedMenuItem)
}

export async function createMenuItem (req: Request, res: Response): Promise<void> {
  const requestBody = req.body as CreateMenuItemBody

  const collegeData = await getCollegeFromId(requestBody.collegeId)

  const menuItemData = {
    name: requestBody.name,
    price: requestBody.price,
    college: {
      connect: {
        id: collegeData.id
      }
    },
    type: requestBody.foodType as MenuItemType ?? MenuItemType.FOOD,
    isActive: requestBody.isActive,
    description: requestBody.description ?? 'No description provided'
  }

  const newMenuItem = await prisma.menuItem.create({ data: menuItemData })
  // TODO: change this in frontend so it can send the full object
  res.json(newMenuItem.id)
}

export async function updateMenuItem (req: Request, res: Response): Promise<void> {
  const requestBody = req.body as UpdateMenuItemBody

  // check that the menu Item exists
  await getMenuItemFromId(parseInt(req.params.menuItemId))

  const menuItemData = {
    name: requestBody.name ?? undefined,
    price: requestBody.price ?? undefined,
    isActive: requestBody.isActive ?? undefined,
    description: requestBody.description ?? undefined,
    type: requestBody.foodType as MenuItemType ?? undefined
  }

  const updatedMenuItem = await prisma.menuItem.update({
    where: {
      id: parseInt(req.params.menuItemId)
    },
    data: menuItemData,
    include: {
      college: true
    }
  })

  const formattedMenuItem = formatMenuItem(updatedMenuItem)
  res.json(formattedMenuItem)
}
