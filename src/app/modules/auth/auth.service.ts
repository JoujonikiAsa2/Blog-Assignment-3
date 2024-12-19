import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import config from '../../config'
import createToken from './auth.utils'

const registerUserIntoDB = async (payload: TLoginUser) => {
  const { email } = payload
  const userAlreadyExists = await User.isUserAlreadyExists(email)
  if (userAlreadyExists) {
    throw new ApiError('User already exists', httpStatus.BAD_REQUEST)
  }
  const createedUser = await User.create(payload)
  const result = await User.findById(createedUser._id).select('name email')
  return result
}

//
const loginUserFromDB = async (payload: TLoginUser) => {
  const { email, password } = payload

  //check user
  const isExists = await User.findOne({email: email})
  if (!isExists) {
    throw new ApiError('User not found', httpStatus.NOT_FOUND)
  }

  //check password
  const isPasswordMatch = await User.isPasswordMatch(
    isExists?.password as string,
    password,
  )
  if (!isPasswordMatch) {
    throw new ApiError('Invalid credentials', httpStatus.UNAUTHORIZED)
  }

  //check user is blocked
  if (isExists?.isBlocked) {
    throw new ApiError('The user is blocked', httpStatus.BAD_REQUEST)
  }

  const jwtpayload = {
    id: isExists?._id,
    role: isExists?.role,
  }

  //create token
  const accessToken = createToken(
    jwtpayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    token: accessToken
  }
}
export const authServices = {
  registerUserIntoDB,
  loginUserFromDB,
}
