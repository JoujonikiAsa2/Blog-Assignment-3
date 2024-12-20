/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = ( //duplicate error handler
  err: any
) => {

  const error = err
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    error
  };
};

export default handleDuplicateError;