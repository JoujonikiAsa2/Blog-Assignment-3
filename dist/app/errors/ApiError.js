"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//custom error response handler
class ApiError extends Error {
    constructor(message, statusCode, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
