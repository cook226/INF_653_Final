// Import the array of allowed origins for CORS requests.
const allowedOrigins = require('./allowedOrigins');

// Set up the CORS options object to handle incoming requests.
const corsOptions = {
    origin: (origin, callback) => {
        // Check if the request origin is in the list of allowed origins.
        // If it's allowed or the origin is undefined (like with local requests), grant access.
        // Otherwise, deny the request.
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow access
        } else {
            // In case you want to restrict access, you can pass an error message to the callback.
            // Currently set to always allow due to the wildcard '*' in allowedOrigins.
            callback(new Error('Not allowed by CORS'));
        }
    },
    // The status to use when responding to successful preflight requests.
    optionsSuccessStatus: 200
};

// Export the configured CORS options for use in other parts of the application.
module.exports = corsOptions;
