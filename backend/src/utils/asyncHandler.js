// A higher-order function to handle asynchronous route handlers
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    // Ensures that any errors in the async function are caught and passed to the Express error handler
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// Exporting asyncHandler for use in other parts of the application
export { asyncHandler };
