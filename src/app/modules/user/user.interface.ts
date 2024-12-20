import { Model } from 'mongoose'

//user interface
export type TUser = {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  isBlocked: boolean
  createdAt: Date
  updatedAt: Date
}


//static method interface
export interface UserModel extends Model<TUser> {
  isUserAlreadyExists(email: string): Promise<TUser | null>,
  isPasswordMatch(password: string, userPassword: string): Promise<boolean>
}
