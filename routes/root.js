// Import the `express` package to set up routing.
const express = require('express');
// Create an instance of an Express router to define routes for the application.
const router = express.Router();
// Import `path` to handle and transform file paths.
const path = require('path');

// Handle GET requests to the home page (`/` or `/index.html`).
// - `^/$`: Matches the root URL.
// - `index(.html)?`: Matches "index" or "index.html" optionally.
// - Express will automatically set the content type and status code.
// - The routes are processed like a waterfall, so more specific routes should come before general ones.
router.get('^/$|index(.html)?', (req, res) => {
    // Serve the `index.html` file located in the `views` directory, one level up from this file's directory.
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// Export the router to make it available to the main application.
module.exports = router;
