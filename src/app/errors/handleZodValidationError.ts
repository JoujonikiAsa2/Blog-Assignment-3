import { ZodError } from "zod";

  //zod error handler
const handleZodValidationError = (err: ZodError)  => {
    const error = err;
    const statusCode = 400;
    return {
      statusCode,
      message: 'Validation Error',
      error,
    };
  };

  export default handleZodValidationError