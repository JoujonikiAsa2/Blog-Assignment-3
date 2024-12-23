"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const notFoundError_1 = __importDefault(require("./app/middlewares/notFoundError"));
const http_status_1 = __importDefault(require("http-status"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.status(http_status_1.default.OK).json({
        status: http_status_1.default.OK,
        message: 'Server is running successfully'
    });
});
app.use('/api', routes_1.default);
app.use(globalErrorHandler_1.default);
app.use(notFoundError_1.default);
exports.default = app;
