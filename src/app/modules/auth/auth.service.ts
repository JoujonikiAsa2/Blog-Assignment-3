import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'

const registerUserIntoDB = async (payload: TLoginUser) => {
  const { email } = payload
  const userAlreadyExists = await User.isUserAlreadyExists(email)
  if (userAlreadyExists) {
    throw new Error('User already exists')
  }
  const result = await User.create(payload)
  return result
}

export const authService = {
  registerUserIntoDB,
}
