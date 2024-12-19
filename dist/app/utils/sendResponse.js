"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, response) => {
    const { success, message, statusCode, data } = response;
    res.status(statusCode).json({
        success,
        message,
        statusCode,
        data
    });
};
exports.sendResponse = sendResponse;
