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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = __importDefault(require("./auth.utils"));
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const userAlreadyExists = yield user_model_1.User.isUserAlreadyExists(email);
    if (userAlreadyExists) {
        throw new ApiError_1.default('User already exists', http_status_1.default.BAD_REQUEST);
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
//
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    //check user
    const isExists = yield user_model_1.User.isUserAlreadyExists(email);
    if (!isExists) {
        throw new ApiError_1.default('User not found', http_status_1.default.NOT_FOUND);
    }
    //check password
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(isExists === null || isExists === void 0 ? void 0 : isExists.password, password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default('Invalid credentials', http_status_1.default.UNAUTHORIZED);
    }
    //check user is blocked
    if (isExists === null || isExists === void 0 ? void 0 : isExists.isBlocked) {
        throw new ApiError_1.default('The user is blocked', http_status_1.default.BAD_REQUEST);
    }
    const jwtpayload = {
        email: isExists === null || isExists === void 0 ? void 0 : isExists.email,
        role: isExists === null || isExists === void 0 ? void 0 : isExists.role,
    };
    //create token
    const accessToken = (0, auth_utils_1.default)(jwtpayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        token: accessToken
    };
});
exports.authService = {
    registerUserIntoDB,
    loginUserFromDB,
};
