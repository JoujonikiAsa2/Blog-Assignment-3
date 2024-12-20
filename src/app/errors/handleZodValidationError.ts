import { ZodError } from "zod";

  //zod error handler
const handleZodValidationError = (err: ZodError)  => {
    const error = err;
    const statusCode = 400;
    const message = "Validation error"
    return {
      statusCode,
      message,
      error,
    };
  };

  export default handleZodValidationError