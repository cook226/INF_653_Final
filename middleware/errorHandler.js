// Import the logging function
const { logEvents } = require('./logEvents');

// Middleware function to handle errors
const errorHandler = (err, req, res, next) => {
    // Log the error details to a specific file using the `logEvents` function
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');

    // Log the stack trace to the console for debugging
    console.error(err.stack);

    // Send a 500 Internal Server Error response to the client
    res.status(500).send(err.message);
};

// Export the error handler function
module.exports = errorHandler;
