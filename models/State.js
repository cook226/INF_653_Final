// Import necessary components from the `mongoose` package.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the State model, outlining the expected data structure and types.
const stateSchema = new Schema({
    state: {
        type: String, // Name of the state
        required: true // Required field
    },
    slug: {
        type: String, // Unique identifier (slug) for URLs
        required: true
    },
    code: {
        type: String, // Two-letter state code
        required: true
    },
    nickname: {
        type: String, // State's nickname
        required: true
    },
    website: {
        type: String, // Official state website URL
        required: true
    },
    admission_date: {
        type: String, // Date the state was admitted to the Union
        required: true
    },
    admission_number: {
        type: Number, // Admission order number (e.g., 1st, 50th state)
        required: true
    },
    capital_city: {
        type: String, // Capital city of the state
        required: true
    },
    capital_url: {
        type: String, // URL of the capital city's website
        required: true
    },
    population: {
        type: Number, // State's population count
        required: true
    },
    population_rank: {
        type: Number, // State's population rank
        required: true
    },
    constitution_url: {
        type: String, // URL to the state constitution
        required: true
    },
    state_flag_url: {
        type: String, // URL to the state's flag image
        required: true
    },
    state_seal_url: {
        type: String, // URL to the state's seal image
        required: true
    },
    map_image_url: {
        type: String, // URL to the state's map image
        required: true
    },
    landscape_background_url: {
        type: String, // URL to a landscape background representing the state
        required: true
    },
    skyline_background_url: {
        type: String, // URL to a skyline background representing the state
        required: true
    },
    twitter_url: {
        type: String, // State's official Twitter profile URL
        required: true
    },
    facebook_url: {
        type: String, // State's official Facebook profile URL
        required: true
    }
});

// Export the State model to be used in other parts of the application.
// The model name `State` will be converted to the collection name `states` in the MongoDB database.
module.exports = mongoose.model('State', stateSchema);
