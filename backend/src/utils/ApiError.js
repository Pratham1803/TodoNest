// Defining a custom error class that extends the built-in JavaScript Error class
class ApiError extends Error {
  constructor(
    statusCode, // HTTP status code (e.g., 400, 404, 500)
    message = 'Something went wrong', // Default error message
    errors = [], // Additional error details (optional)
    stack = '' // Stack trace (optional)
  ) {
    super(message); // Calling the parent Error class constructor with the message

    this.statusCode = statusCode; // Assigning the HTTP status code
    this.data = null; // Placeholder for additional data (if needed)
    this.message = message; // Assigning the error message
    this.success = false; // Indicating that the operation failed
    this.errors = errors; // Storing any additional error details

    // Setting the stack trace for debugging
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Exporting the ApiError class for use in other parts of the application
export { ApiError };
