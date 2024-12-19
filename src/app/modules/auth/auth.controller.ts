import httpStatus from 'http-status'
import asyncWrapper from '../../utils/asyncWrapper'
import { authServices } from './auth.service'
import { sendResponse } from '../../utils/sendResponse'

const registerUser = asyncWrapper(async (req, res) => {
  const result = await authServices.registerUserIntoDB(req.body)
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  })
})

//login user
const loginUser = asyncWrapper(async (req, res) => {
  const result = await authServices.loginUserFromDB(req.body)
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: httpStatus.OK,
    data: result,
  })
})
export const authController = {
  registerUser,
  loginUser
}
