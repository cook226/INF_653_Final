// Load environment variables from `.env`.
require('dotenv').config();

// Required dependencies
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import custom modules
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConn');

// Initialize the Express application
const app = express();

// Set the application port. If hosted, use the `PORT` environment variable.
const PORT = process.env.PORT || 6000;

// Connect to the MongoDB database
connectDB();

// Middleware to log requests
app.use(logger);

// Apply CORS (Cross-Origin Resource Sharing) with specific options.
app.use(cors(corsOptions));

// Middleware to handle URL-encoded data (form data) with extended encoding.
app.use(express.urlencoded({ extended: false }));

// Middleware for handling JSON data
app.use(express.json());

// Middleware to serve static files from the `public` folder.
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes for the root and specific endpoints.
app.use('/', require('./routes/root'));
app.use('/states', require('./routes/statesRoutes'));

// Handle requests that don't match any specific route.
// - `app.all('*')`: This will respond to any HTTP method and acts as a fallback.
app.all('*', (req, res) => {
    // Set the status to 404 (Not Found).
    res.status(404);
    // Serve the `404.html` file if the request accepts HTML.
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    // If JSON is requested, send a JSON error response.
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    // Otherwise, return plain text.
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// Error handling middleware for catching errors.
app.use(errorHandler);

// Start the server after successfully connecting to MongoDB.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});
