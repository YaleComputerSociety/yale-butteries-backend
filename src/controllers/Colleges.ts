import type { Request, Response } from 'express'

import prisma from '@src/config/prismaClient'
import { formatCollege } from '@utils/dtoConverters'
import HTTPError from '@src/utils/httpError'
import { getCollegeFromId } from '@utils/prismaUtils'
import type { UpdateCollegeBody } from '@utils/bodyTypes'

export async function getAllColleges (_: Request, res: Response): Promise<void> {
  const colleges = await prisma.college.findMany()
  const formattedColleges = colleges.map((college) => formatCollege(college))
  res.json(formattedColleges)
}

export async function getCollege (req: Request, res: Response): Promise<void> {
  const college = await getCollegeFromId(parseInt(req.params.collegeId))
  const formattedCollege = formatCollege(college)
  res.json(formattedCollege)
}

export async function updateCollege (req: Request, res: Response): Promise<void> {
  const requestBody = req.body as UpdateCollegeBody

  const college = await prisma.college.update({
    where: {
      id: parseInt(req.params.collegeId)
    },
    data: {
      isAcceptingOrders: requestBody.isAcceptingOrders,
      daysOpen: requestBody.daysOpen,
      isOpen: requestBody.isOpen,
      openTime: requestBody.openTime,
      closeTime: requestBody.closeTime
    }
  })
  if (college === null) throw new HTTPError(`No college found with ID ${req.params.collegeId}`, 404)

  const formattedCollege = formatCollege(college)
  res.json(formattedCollege)
}
