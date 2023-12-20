/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import asyncHandler from '@src/middlewares/asyncHandler'
import { createParamValidator, isInteger, isNonEmptyString } from '@src/middlewares/validateParamHandler'
import { createOrder, getAllOrdersFromCollege, getRecentOrdersFromCollege, getOrder, updateOrder, updateOrderItem } from '@controllers/Orders'
import { validateBody } from '@src/middlewares/validateBodyHandler'
import { CreateOrderBody, UpdateOrderItemBody, UpdateOrderBody } from '@src/utils/bodyTypes'

const router = express.Router()

const validateCollegeId = createParamValidator('collegeId', isNonEmptyString, 'College ID must be an integer')
const validateOrderId = createParamValidator('orderId', isInteger, 'Order ID must be an integer')
const validateOrderItemId = createParamValidator('orderItemId', isInteger, 'Order item ID must be an integer')

router.get('/:orderId', validateOrderId, asyncHandler(getOrder))
router.get('/college/:collegeId', validateCollegeId, asyncHandler(getAllOrdersFromCollege))
router.get('/college/recent/:collegeId', validateCollegeId, asyncHandler(getRecentOrdersFromCollege))
router.post('/', validateBody(CreateOrderBody), asyncHandler(createOrder))
router.put('/item/:orderItemId', validateBody(UpdateOrderItemBody), validateOrderItemId, asyncHandler(updateOrderItem))

router.put('/:orderId', validateBody(UpdateOrderBody), validateOrderId, asyncHandler(updateOrder)) // unused & untested

export default router
