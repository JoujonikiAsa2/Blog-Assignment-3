import { z } from 'zod'

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

export const userSchemaValidation = {
    createUserSchemaValidation
}