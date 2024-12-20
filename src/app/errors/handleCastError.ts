import mongoose from 'mongoose';

//cast error hanlder
const handleCastError = (
  err: mongoose.Error.CastError,
)=> {
  const error = err;
  const statusCode = 400;
  const message = "Validation error"

  return {
    statusCode,
    message,
    error
  };
};

export default handleCastError;
