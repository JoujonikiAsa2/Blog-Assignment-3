"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    res.status(err === null || err === void 0 ? void 0 : err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err === null || err === void 0 ? void 0 : err.statusCode,
        error: err,
        stack: err.stack
    });
    next();
};
exports.default = globalErrorHandler;
