import { Model } from 'mongoose'

export type TUser = {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  isBlocked: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserModel extends Model<TUser> {
  isUserAlreadyExists(email: string): Promise<TUser | null>
}
