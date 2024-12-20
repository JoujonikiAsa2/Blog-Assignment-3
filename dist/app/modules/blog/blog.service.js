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
exports.blogServices = void 0;
const blog_model_1 = require("./blog.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const blog_constant_1 = require("./blog.constant");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
//create blog
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBlog = yield blog_model_1.Blog.create(payload);
    const { _id } = createdBlog;
    const result = yield blog_model_1.Blog.findById(_id)
        .populate('author', '-password')
        .select(blog_constant_1.selectedFileld);
    return result;
});
//find all blogs
const findAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new queryBuilder_1.default(blog_model_1.Blog.find().populate('author', '-password').select('title content'), query)
        .search(blog_constant_1.searchableFieldsForBlog)
        .filter()
        .sort();
    const result = yield blogQuery.modelQuery;
    return result;
});
exports.default = findAllBlogsFromDB;
//update blog
const updateBlogIntoDB = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.findById(id);
    if (isBlogExists === null || isBlogExists === undefined) {
        throw new ApiError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
    }
    //check the blog and author who try to update blog
    const isValidBlogAuthor = yield blog_model_1.Blog.findOne({ _id: id, author: user === null || user === void 0 ? void 0 : user.id });
    if (!isValidBlogAuthor) {
        const error = new Error();
        error.name = 'AuthorizationError';
        throw error;
    }
    //update blog
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, { new: true })
        .populate('author', '-password')
        .select(blog_constant_1.selectedFileld);
    return result;
});
//delete blog
const deleteBlogFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.findById(id);
    if (isBlogExists === null || isBlogExists === undefined) {
        throw new ApiError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
    }
    ////check the blog and author who try to delete blog
    const isValidBlogAuthor = yield blog_model_1.Blog.findOne({ _id: id, author: user === null || user === void 0 ? void 0 : user.id });
    if (!isValidBlogAuthor) {
        const error = new Error();
        error.name = 'AuthorizationError';
        throw error;
    }
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
exports.blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
    findAllBlogsFromDB,
};
