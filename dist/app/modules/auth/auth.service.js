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
exports.authServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = __importDefault(require("./auth.utils"));
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createedUser = yield user_model_1.User.create(payload);
    const { _id } = createedUser;
    const result = yield user_model_1.User.findById(_id).select('name email');
    return result;
});
//
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    //check user
    const isExists = yield user_model_1.User.findOne({ email: email });
    if (!isExists) {
        const error = new Error('Authentication Failed! Invalid Credentials');
        error.name = 'AuthenticationError';
        throw error;
    }
    //check password
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(isExists === null || isExists === void 0 ? void 0 : isExists.password, password);
    if (!isPasswordMatch) {
        const error = new Error('Authentication Failed! Invalid Credentials');
        error.name = 'AuthenticationError';
        throw error;
    }
    //check user is blocked
    if ((isExists === null || isExists === void 0 ? void 0 : isExists.isBlocked) === true) {
        const error = new Error('Authentication Failed! User is blocked');
        error.name = 'AuthenticationError';
    }
    const jwtpayload = {
        id: isExists === null || isExists === void 0 ? void 0 : isExists._id,
        role: isExists === null || isExists === void 0 ? void 0 : isExists.role,
    };
    //create token
    const accessToken = (0, auth_utils_1.default)(jwtpayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        token: accessToken
    };
});
exports.authServices = {
    registerUserIntoDB,
    loginUserFromDB,
};
