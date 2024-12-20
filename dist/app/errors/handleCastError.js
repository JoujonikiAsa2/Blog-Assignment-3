"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//cast error hanlder
const handleCastError = (err) => {
    const error = err;
    const statusCode = 400;
    const message = "Validation error";
    return {
        statusCode,
        message,
        error
    };
};
exports.default = handleCastError;
