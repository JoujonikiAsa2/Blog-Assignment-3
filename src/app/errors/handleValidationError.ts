import httpStatus from "http-status";
import mongoose from "mongoose";

const handleValidationError = (err: mongoose.Error.ValidationError) =>{
    const message = "Validation Error"
    const error = err
    const statusCode = httpStatus.BAD_REQUEST

    return {
        message,
        statusCode,
        error
    }
}

export default handleValidationError