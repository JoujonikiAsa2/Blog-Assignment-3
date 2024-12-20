import { Response } from "express";
type TResponse<T> = {
    success: boolean
    message: string,
    statusCode: number,
    data: T
}

//send response utility function
export const sendResponse = <T> (res: Response, response: TResponse<T>) => {
    const { success, message, statusCode, data } = response
    res.status(statusCode).json({
        success,
        message,
        statusCode,
        data
    })
}