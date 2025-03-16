// Defining a reusable API response class
class ApiResponse {
    constructor(statusCode, data = null, message = 'success') {
        this.statusCode = statusCode; // HTTP status code (e.g., 200, 201, 400, 500)
        this.data = data; // The actual response data (default: null)
        this.message = message; // Response message (default: 'success')
        this.success = statusCode < 400; // Determines success based on the status code (<400 means success)
    }
}

// Exporting the ApiResponse class for use in other parts of the application
module.exports = ApiResponse;
