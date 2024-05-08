// Import necessary modules and functions
const { format } = require('date-fns'); // For formatting the date and time
const { v4: uuid } = require('uuid'); // Import UUID with the alias `v4` for generating unique IDs

const fs = require('fs'); // File system module
const fsPromises = require('fs').promises; // Promises-based file system operations
const path = require('path'); // For working with file and directory paths

/**
 * Asynchronously logs events to a specified log file.
 * @param {string} message - The message to be logged.
 * @param {string} logName - The name of the log file.
 */
async function logEvents(message, logName) {
    // Format the current date and time
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    // Create a log entry with a unique identifier (UUID)
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        // Check if the logs directory exists, if not, create it
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        // Append the log entry to the specified log file
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.error(err); // Log any errors to the console
    }
}

/**
 * Middleware that logs HTTP request details to the log file.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function to be executed.
 */
const logger = (req, res, next) => {
    // Log the HTTP method, request origin, and request URL
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    // Output the request method and path to the console
    console.log(`${req.method} ${req.path}`);
    // Proceed to the next middleware function
    next();
};

// Export the logger and logEvents functions
module.exports = { logger, logEvents };
