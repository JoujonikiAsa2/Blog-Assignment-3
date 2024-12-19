import httpStatus from 'http-status'
import asyncWrapper from '../../utils/asyncWrapper'
import { authService } from './auth.service'
import { sendResponse } from '../../utils/sendResponse'

const registerUser = asyncWrapper(async (req, res) => {
  const result = await authService.registerUserIntoDB(req.body)
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  })
})
export const authController = {
  registerUser,
}
