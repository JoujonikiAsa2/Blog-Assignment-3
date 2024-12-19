import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";

const globalErrorHandler:ErrorRequestHandler = (err, req, res, next) => {
    res.json({
        success: false,
        message: err.message,
        statusCode: httpStatus.BAD_REQUEST,
        error: err,
        stack: err.stack
    })
    next()
}

export default globalErrorHandler