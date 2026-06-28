// Utility functions to standardize API responses

// Function to send a successful response with the provided data and status code (default is 200 OK)
function success(res, data, status = 200) {
  return res.status(status).json(data);
}

// Function to send a failure response with the provided error message, status code, and optional details (default is 400 Bad Request)
function failure(res, status, message, details = []) {
  return res.status(status).json({
    error: message,
    details,
  });
}

// Export the response utility functions to be used in controllers for sending standardized API responses
module.exports = {
  success,
  failure,
};