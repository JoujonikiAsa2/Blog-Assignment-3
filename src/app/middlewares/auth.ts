import httpStatus from 'http-status'
import asyncWrapper from '../utils/asyncWrapper'
import ApiError from '../errors/ApiError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/user/user.model'
import { TUserRole } from '../modules/user/user.constant'

const auth = (...userRole: TUserRole[]) =>
  asyncWrapper(async (req, res, next) => {
    //check token
    const token = req.headers.authorization
    if (!token) {
      throw new ApiError('Forbidden access', httpStatus.UNAUTHORIZED)
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
      throw new ApiError('Forbidden access', httpStatus.UNAUTHORIZED)
    }

    //check user is blocked
    const blockedUser = await User.findOne({ isBlocked: true })
    if (blockedUser) {
      throw new ApiError('Forbidden access', httpStatus.UNAUTHORIZED)
    }

    //check user role
    if (userRole && userRole.includes(role)) {
      //add user to request
      req.user = decoded as JwtPayload
    } else {
      throw new ApiError('Forbidden access', httpStatus.UNAUTHORIZED)
    }
    next()
  })

export default auth
