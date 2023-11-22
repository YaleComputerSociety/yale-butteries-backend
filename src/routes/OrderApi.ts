/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import asyncHandler from '@src/middlewares/asyncHandler'
import { createParamValidator, isInteger, isNonEmptyString } from '@src/middlewares/validateParamHandler'
import { createOrder, getAllOrdersFromCollege, getRecentOrdersFromCollege, getOrder, updateOrder, updateOrderItem } from '@controllers/Orders'

const router = express.Router()

const validateCollegeName = createParamValidator('collegeName', isNonEmptyString, 'College Name must be non-empty')
const validateOrderId = createParamValidator('orderId', isInteger, 'Order ID must be an integer')
const validateOrderItemId = createParamValidator('orderItemId', isInteger, 'Order item ID must be an integer')

router.get('/:orderId', validateOrderId, asyncHandler(getOrder))
router.get('/college/:collegeName', validateCollegeName, asyncHandler(getAllOrdersFromCollege))
router.get('/college/recent/:collegeName', validateCollegeName, asyncHandler(getRecentOrdersFromCollege))
router.post('/', asyncHandler(createOrder))
router.put('/item/:orderItemId', validateOrderItemId, asyncHandler(updateOrderItem))

router.put('/:orderId', validateOrderId, asyncHandler(updateOrder)) // unused & untested

export default router
