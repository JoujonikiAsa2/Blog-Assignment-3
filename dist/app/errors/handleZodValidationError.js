"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//zod error handler
const handleZodValidationError = (err) => {
    const error = err;
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        error,
    };
};
exports.default = handleZodValidationError;
