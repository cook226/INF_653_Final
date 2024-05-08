// Import necessary components from the `mongoose` package.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the StatesFunFact model, outlining the expected data structure and types.
const statesfunfactSchema = new Schema({
    code: {
        type: String, // Two-letter state code
        required: true // Required field
    },
    funfacts: [String] // Array to hold fun facts as strings
});

// Export the StatesFunFact model to be used in other parts of the application.
// The model name `Statesfunfact` will be converted to the collection name `statesfunfacts` in the MongoDB database.
module.exports = mongoose.models.Statesfunfact || mongoose.model('Statesfunfact', statesfunfactSchema);
