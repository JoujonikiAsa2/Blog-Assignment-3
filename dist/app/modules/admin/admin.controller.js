"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncWrapper_1 = __importDefault(require("../../utils/asyncWrapper"));
const admin_service_1 = require("./admin.service");
const blockUser = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    admin_service_1.adminServices.blockUser(userId);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'User blocked successfully',
        statusCode: http_status_1.default.OK,
    });
}));
//delete blog
const deleteBlog = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    admin_service_1.adminServices.deleteBlog(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: http_status_1.default.OK,
    });
}));
exports.adminControllers = {
    blockUser,
    deleteBlog,
};
