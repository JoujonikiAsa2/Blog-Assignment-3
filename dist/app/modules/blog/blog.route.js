"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post('/create-blog', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.blogControllers.createBlog);
router.get('/', blog_controller_1.blogControllers.findAllBlogs);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.blogControllers.updateBlog);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.blogControllers.deleteBlog);
exports.blogRoutes = router;
