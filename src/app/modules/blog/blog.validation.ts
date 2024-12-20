import { z } from "zod";

//blog validation
const blogSchemaValidation = z.object({
    body: z.object({
        title: z.string(),
        content: z.string()
    })
})

export const blogValidation = {
    blogSchemaValidation
}