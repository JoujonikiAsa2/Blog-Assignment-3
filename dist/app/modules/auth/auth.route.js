"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const router = (0, express_1.Router)();
//authentication routes
router.post('/register', (0, validateRequest_1.default)(user_validation_1.userSchemaValidation.createUserSchemaValidation), auth_controller_1.authController.registerUser);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.userSchemaValidation.loginUserSchemaValidation), auth_controller_1.authController.loginUser);
exports.authRoutes = router;
