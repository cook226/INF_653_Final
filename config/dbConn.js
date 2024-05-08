// Import the mongoose library for managing MongoDB connections.
const mongoose = require('mongoose');

// Asynchronously connect to the MongoDB database using the provided connection string.
const connectDB = async () => {
    try {
        // Establish a connection to the MongoDB server.
        // The connection string is obtained from the environment variables.
        await mongoose.connect(process.env.DATABASE_URI, {
            // You can add additional options here for advanced configuration, such as:
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
    } catch (err) {
        // Log the error if there is a problem connecting to the database.
        console.error(err);
    }
}

// Export the `connectDB` function to allow other modules to establish the database connection.
module.exports = connectDB;
