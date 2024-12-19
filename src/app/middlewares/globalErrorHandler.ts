import { ErrorRequestHandler } from "express";

const globalErrorHandler:ErrorRequestHandler = (err, req, res, next) => {
    res.status(err?.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err?.statusCode,
        error: err,
        stack: err.stack
    })
    next()
}

export default globalErrorHandler