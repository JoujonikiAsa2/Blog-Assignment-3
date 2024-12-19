/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express'
import config from '../config'
import { ZodError } from 'zod'
import handleZodValidationError from '../errors/handleZodValidationError'
import handleValidationError from '../errors/handleValidationError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message: string = "Something went wrong"
  let statusCode: number = 500
  let error: any = err

  if (err instanceof ZodError) {
    const siplifiedErrorResponse = handleZodValidationError(err)
    message = siplifiedErrorResponse.message
    statusCode = siplifiedErrorResponse.statusCode
    error = siplifiedErrorResponse.error
  }
  if (err.name === 'ValidationError') {
    const siplifiedErrorResponse = handleValidationError(err)
    message = siplifiedErrorResponse.message
    statusCode = siplifiedErrorResponse.statusCode
    error = siplifiedErrorResponse.error
  }
  res.status(500).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.node_env === 'development' ? err?.stack : null,
  })
  next()
}

export default globalErrorHandler
