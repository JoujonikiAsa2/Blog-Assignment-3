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
exports.adminServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const blog_model_1 = require("../blog/blog.model");
//block user
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findById(userId);
    if (!isUserExists) {
        throw new ApiError_1.default("User not found", http_status_1.default.BAD_REQUEST);
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    return result;
});
//Delete Blog
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.findById(id);
    if (!isBlogExists) {
        throw new ApiError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
exports.adminServices = {
    blockUser,
    deleteBlog
};
