import mongoose from 'mongoose';

const handleCastError = (
  err: mongoose.Error.CastError,
)=> {
  const error = err;
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    error
  };
};

export default handleCastError;
