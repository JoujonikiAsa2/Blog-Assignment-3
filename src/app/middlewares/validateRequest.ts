import { NextFunction } from "express";
import { AnyZodObject } from "zod"

const validateRequest = (schema: AnyZodObject) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(
            await schema.safeParseAsync({
                body: req.body,
            })
        ).catch((error) => next(error));
      };
}
export default validateRequest