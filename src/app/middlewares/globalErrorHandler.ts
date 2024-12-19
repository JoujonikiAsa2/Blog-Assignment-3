/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express'
import config from '../config'
import { ZodError } from 'zod'
import handleZodValidationError from '../errors/handleZodValidationError'
import handleValidationError from '../errors/handleValidationError'
import httpStatus from 'http-status'
import ApiError from '../errors/ApiError'
import handleDuplicateError from '../errors/handleDuplicateError'
import handleCastError from '../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message: string = 'Internal Server Error'
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR
  let error: any = err

  //zod error
  if (err instanceof ZodError) {
    const siplifiedErrorResponse = handleZodValidationError(err)
    message = siplifiedErrorResponse.message
    statusCode = siplifiedErrorResponse.statusCode
    error = siplifiedErrorResponse.error
  }

  //validation error
  else if (err.name === 'ValidationError') {
    const siplifiedErrorResponse = handleValidationError(err)
    message = siplifiedErrorResponse.message
    statusCode = siplifiedErrorResponse.statusCode
    error = siplifiedErrorResponse.error
  }

  // authentication error
  else if (err.name === 'AuthenticationError') {
    message = 'Unauthorized Access'
    statusCode = 401
    error = err
  }

  // authorization error
  else if (err.name === 'AuthorizationError') {
    message = 'Forbidden Access!'
    statusCode = 403
    error = err
  } 
  
  //cast error
  else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    error = simplifiedError.error
  }
  
  //duplicate error
  else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    error = simplifiedError.error
  } 
  
  //custom api error
  else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err.message
    error = err
  } 
  
  //error
  else if (err instanceof Error) {
    message = err.message
    error = err
  }

  //general response
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.node_env === 'development' ? err?.stack : null,
  })
  next()
}

export default globalErrorHandler
