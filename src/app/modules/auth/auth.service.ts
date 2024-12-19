import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'

const registerUserIntoDB = async (payload: TLoginUser) => {
  const { email } = payload
  const userAlreadyExists = await User.isUserAlreadyExists(email)
  if (userAlreadyExists) {
    throw new ApiError('User already exists', httpStatus.BAD_REQUEST)
  }
  const result = await User.create(payload)
  return result
}

export const authService = {
  registerUserIntoDB,
}
