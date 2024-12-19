"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (err, req, res, next) => {
    res.json({
        success: false,
        message: err.message,
        statusCode: http_status_1.default.BAD_REQUEST,
        error: err,
        stack: err.stack
    });
    next();
};
exports.default = globalErrorHandler;
