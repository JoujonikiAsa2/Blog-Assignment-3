import jwt from 'jsonwebtoken'

const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, 
    { expiresIn: expiresIn },
)
}

export default createToken
