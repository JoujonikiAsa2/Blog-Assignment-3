"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const handleZodValidationError_1 = __importDefault(require("../errors/handleZodValidationError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
//global error handler
const globalErrorHandler = (err, req, res, next) => {
    let message = 'Internal server error';
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let error = err;
    //zod error
    if (err instanceof zod_1.ZodError) {
        const siplifiedErrorResponse = (0, handleZodValidationError_1.default)(err);
        message = siplifiedErrorResponse.message;
        statusCode = siplifiedErrorResponse.statusCode;
        error = siplifiedErrorResponse.error;
    }
    //validation error
    else if (err.name === 'ValidationError') {
        const siplifiedErrorResponse = (0, handleValidationError_1.default)(err);
        message = siplifiedErrorResponse.message;
        statusCode = siplifiedErrorResponse.statusCode;
        error = siplifiedErrorResponse.error;
    }
    // authentication error
    else if (err.name === 'AuthenticationError') {
        message = 'Invalid credentials';
        statusCode = 401;
        error = err;
    }
    // authorization error
    else if (err.name === 'AuthorizationError') {
        message = 'Forbidden access';
        statusCode = 403;
        error = err;
    }
    //cast error
    else if (err.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        error = simplifiedError.error;
    }
    //duplicate error
    else if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        error = simplifiedError.error;
    }
    //custom api error
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        error = err;
    }
    //error
    else if (err instanceof Error) {
        message = err.message;
        error = err;
    }
    //general response
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
    next();
};
exports.default = globalErrorHandler;
