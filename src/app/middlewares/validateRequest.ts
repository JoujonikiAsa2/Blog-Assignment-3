import { AnyZodObject } from 'zod'
import asyncWrapper from '../utils/asyncWrapper'

const validateRequest = (schema: AnyZodObject) => {
  return asyncWrapper(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
    })
    next()
  })
}
export default validateRequest
