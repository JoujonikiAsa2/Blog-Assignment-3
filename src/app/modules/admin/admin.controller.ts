import httpStatus from 'http-status'
import asyncWrapper from '../../utils/asyncWrapper'
import { adminServices } from './admin.service'

const blockUser = asyncWrapper(async (req, res) => {
  const { userId } = req.params
  adminServices.blockUser(userId)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
  })
})

export const adminControllers = {
  blockUser,
}
