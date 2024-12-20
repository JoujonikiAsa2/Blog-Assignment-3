"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaValidation = void 0;
const zod_1 = require("zod");
//register user validation
const createUserSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Full name is required'
        }),
        email: zod_1.z.string({
            required_error: 'Email is required'
        }).email('Invalid email'),
        password: zod_1.z.string({
            required_error: 'Password is required'
        }),
    })
});
//login user validation
const loginUserSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required'
        }).email('Invalid email'),
        password: zod_1.z.string({
            required_error: 'Password is required'
        }),
    })
});
exports.userSchemaValidation = {
    createUserSchemaValidation,
    loginUserSchemaValidation
};
