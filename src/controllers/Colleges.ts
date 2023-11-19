import { type Request, type Response } from 'express'

import prisma from '../prismaClient'
import { formatCollege } from '@utils/dtoConverters'

export interface TypedRequest<Params, Body> extends Express.Request {
  params: Params
  body: Body
}

export async function getAllColleges (_: Request, res: Response): Promise<void> {
  try {
    const colleges = await prisma.college.findMany(includeProperty)
    const frontendColleges = colleges.map((college) => formatCollege(college))
    res.json(frontendColleges)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function getCollege (req: Request<{ collegeId: string }, null>, res: Response): Promise<void> {
  try {
    const college = await prisma.college.findUnique({
      ...includeProperty,
      where: {
        id: parseInt(req.params.collegeId)
      }
    })
    res.json(college)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

export async function updateCollege (req: Request, res: Response): Promise<void> {
  try {
    console.log(req.body)
    const result = await prisma.college.update({
      where: {
        id: parseInt(req.params.collegeId)
      },
      data: {
        daysOpen: req.body.daysOpen,
        isOpen: req.body.isOpen,
        openTime: req.body.openTime,
        closeTime: req.body.closeTime
      }
    })
    console.log(result)
    res.send(JSON.stringify(result))
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

const includeProperty = {
  include: {
    menuItems: true
  }
}
