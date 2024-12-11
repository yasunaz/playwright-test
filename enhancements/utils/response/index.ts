export function isValidRes(response) {
    if(!response) return;
    const status = response.status();
    const statusText = response.statusText();
  
    // Define messages for client and server errors
    const errorMessages: { [key: number]: string } = {
      400: 'Bad Request! The server could not understand the request due to invalid syntax.',
      401: 'Unauthorized! Authentication is required and has failed or has not yet been provided.',
      403: 'Forbidden! You do not have permission to access this resource.',
      404: 'Not Found! The requested resource could not be found on the server.',
      408: 'Request Timeout! The server timed out waiting for the request.',
      429: 'Too Many Requests! You have sent too many requests in a given amount of time.',
      500: 'Internal Server Error! The server encountered an unexpected condition.',
      502: 'Bad Gateway! The server received an invalid response from the upstream server.',
      503: 'Service Unavailable! The server is currently unavailable.',
      504: 'Gateway Timeout! The server did not receive a timely response from the upstream server.',
    };
  
    // Check if the status code is an error
    if (status >= 400 && status < 600) {
      const message = errorMessages[status] || 'An unexpected error occurred.';
      throw new Error(`HTTP ${status} ${statusText}: ${message}`);
      // return `HTTP ${status} ${statusText}: ${message}`;
    }
  
    // For successful responses, return undefined
    return undefined;
  }