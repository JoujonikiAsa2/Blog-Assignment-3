import httpStatus from 'http-status'
import asyncWrapper from '../../utils/asyncWrapper'
import { adminServices } from './admin.service'

//block user
const blockUser = asyncWrapper(async (req, res) => {
  const { userId } = req.params
  await adminServices.blockUser(userId)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
  })
})

//delete blog
const deleteBlog = asyncWrapper(async (req, res) => {
  const { id } = req.params
 await adminServices.deleteBlog(id)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  })
})

export const adminControllers = {
  blockUser,
  deleteBlog,
}
