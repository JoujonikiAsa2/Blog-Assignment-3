"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const handleZodValidationError_1 = __importDefault(require("../errors/handleZodValidationError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    let message = "Something went wrong";
    let statusCode = 500;
    let error = err;
    if (err instanceof zod_1.ZodError) {
        const siplifiedErrorResponse = (0, handleZodValidationError_1.default)(err);
        message = siplifiedErrorResponse.message;
        statusCode = siplifiedErrorResponse.statusCode;
        error = siplifiedErrorResponse.error;
    }
    if (err.name === 'ValidationError') {
        const siplifiedErrorResponse = (0, handleValidationError_1.default)(err);
        message = siplifiedErrorResponse.message;
        statusCode = siplifiedErrorResponse.statusCode;
        error = siplifiedErrorResponse.error;
    }
    res.status(500).json({
        success: false,
        message,
        statusCode,
        error,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
    next();
};
exports.default = globalErrorHandler;
