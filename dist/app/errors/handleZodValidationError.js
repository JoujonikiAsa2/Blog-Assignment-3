"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//zod error handler
const handleZodValidationError = (err) => {
    const error = err;
    const statusCode = 400;
    const message = "Validation error";
    return {
        statusCode,
        message,
        error,
    };
};
exports.default = handleZodValidationError;
