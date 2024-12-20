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
exports.blogControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncWrapper_1 = __importDefault(require("../../utils/asyncWrapper"));
const sendResponse_1 = require("../../utils/sendResponse");
const blog_service_1 = require("./blog.service");
//create blog
const createBlog = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    req.body.author = user.id;
    const result = yield blog_service_1.blogServices.createBlogIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Blog created successfully',
        statusCode: http_status_1.default.CREATED,
        data: result,
    });
}));
//find all blogs
const findAllBlogs = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query;
    const result = yield blog_service_1.blogServices.findAllBlogsFromDB(search);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Blogs fetched successfully',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
//update blog
const updateBlog = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blog = req.body;
    const { user } = req;
    const result = yield blog_service_1.blogServices.updateBlogIntoDB(id, user, blog);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Blog updated successfully',
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
//delete blog
const deleteBlog = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user } = req;
    yield blog_service_1.blogServices.deleteBlogFromDB(id, user);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: http_status_1.default.OK,
    });
}));
exports.blogControllers = {
    createBlog,
    updateBlog,
    deleteBlog,
    findAllBlogs
};
