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
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const blog_model_1 = require("./blog.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const blog_constant_1 = require("./blog.constant");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBlog = yield blog_model_1.Blog.create(payload);
    const { _id } = createdBlog;
    const result = yield blog_model_1.Blog.findById(_id)
        .populate('author')
        .select('title content author');
    return result;
});
//ger all blogs
const findAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new queryBuilder_1.default(blog_model_1.Blog.find().populate('author').select('title content author'), query).search(blog_constant_1.searchableFieldsForBlog);
    const result = blogQuery.modelQuery;
    return result;
});
//update blog
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check if blog exists
    const isBlogExists = yield blog_model_1.Blog.findById(id);
    if (!isBlogExists) {
        throw new ApiError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
    }
    //update blog
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, { new: true })
        .populate('author')
        .select('title content author');
    return result;
});
//delete blog
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.findById(id);
    if (!isBlogExists) {
        throw new ApiError_1.default('Blog not found', http_status_1.default.NOT_FOUND);
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
