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
const http_status_1 = __importDefault(require("http-status"));
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...userRole) => (0, asyncWrapper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //check token
    const token = req.headers.authorization;
    if (!token) {
        throw new ApiError_1.default('Forbidden access', http_status_1.default.UNAUTHORIZED);
    }
    //verify token
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { id, role } = decoded;
    //check user
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new ApiError_1.default('Forbidden access', http_status_1.default.UNAUTHORIZED);
    }
    //check user is blocked
    const blockedUser = yield user_model_1.User.findOne({ isBlocked: true });
    if (blockedUser) {
        throw new ApiError_1.default('Forbidden access', http_status_1.default.UNAUTHORIZED);
    }
    //check user role
    if (userRole && userRole.includes(role)) {
        //add user to request
        req.user = decoded;
    }
    else {
        throw new ApiError_1.default('Forbidden access', http_status_1.default.UNAUTHORIZED);
    }
    next();
}));
exports.default = auth;
