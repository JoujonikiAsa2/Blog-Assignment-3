"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (//duplicate error handler
err) => {
    const error = err;
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        error
    };
};
exports.default = handleDuplicateError;
