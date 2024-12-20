/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import config from '../../config'
import createToken from './auth.utils'

const registerUserIntoDB = async (payload: TLoginUser) => {
  const createedUser = await User.create(payload)
  const {_id} = createedUser
  const result = await User.findById(_id).select('name email')
  return result
}

//
const loginUserFromDB = async (payload: TLoginUser) => {
  const { email, password } = payload

  //check user
  const isExists = await User.findOne({email: email})
  if (!isExists) {
    const error = new Error('Authentication Failed! Invalid Credentials') as any;
    error.name = 'AuthenticationError';
    throw error;
  }

  //check password
  const isPasswordMatch = await User.isPasswordMatch(
    isExists?.password as string,
    password,
  )
  if (!isPasswordMatch) {
    const error = new Error('Authentication Failed! Invalid Credentials') as any;
    error.name = 'AuthenticationError';
    throw error;
  }

  //check user is blocked
  if (isExists?.isBlocked === true) {
    const error = new Error('Authentication Failed! User is blocked') as any;
    error.name = 'AuthenticationError';
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
