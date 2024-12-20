"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
//module routes
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.blogRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.adminRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
