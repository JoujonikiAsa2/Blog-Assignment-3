"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
//auth validation
const authValidation = zod_1.z.object({
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
exports.default = authValidation;
