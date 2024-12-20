import asyncWrapper from '../utils/asyncWrapper'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/user/user.model'
import { TUserRole } from '../modules/user/user.constant'

const auth = (...userRole: TUserRole[]) =>
  asyncWrapper(async (req, res, next) => {
    //check token
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      const error = new Error('Authorization Failed!')
      error.name = 'AuthorizationError'
      throw error
    }

    //verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload
    const { id, role } = decoded

    //check user
    const user = await User.findById(id)
    if (!user) {
      const error = new Error('Authorization Failed!')
      error.name = 'AuthorizationError'
      throw error
    }

    //check user is blocked
    const blockedUser = await User.findOne({ _id: id, isBlocked: true })
    if (blockedUser) {
      const error = new Error('Authorization Failed!')
      error.name = 'AuthorizationError'
      throw error
    }

    //check user role
    if (userRole && userRole.includes(role)) {
      //add user to request
      req.user = decoded as JwtPayload
    } else {
      const error = new Error('Authorization Failed!')
      error.name = 'AuthorizationError'
      throw error
    }
    next()
  })

export default auth
