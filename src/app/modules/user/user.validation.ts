import { z } from 'zod'

//register user validation
const createUserSchemaValidation = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Full name is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }).email('Invalid email'),
        password: z.string({
            required_error: 'Password is required'
        }),
    })
})


//login user validation
const loginUserSchemaValidation = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required'
        }).email('Invalid email'),
        password: z.string({
            required_error: 'Password is required'
        }),
    })
})

export const userSchemaValidation = {
    createUserSchemaValidation,
    loginUserSchemaValidation
}