import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

//check if page not found 
const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'No route found',
    statusCode: 404
  })
  next()
}

export default notFoundError
