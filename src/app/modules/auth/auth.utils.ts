import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';

//create token utility function
const createToken = (
  jwtPayload: { id: Types.ObjectId; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn })
}

export default createToken
