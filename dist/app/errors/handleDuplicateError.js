"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err) => {
    const error = err;
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        error
    };
};
exports.default = handleDuplicateError;
