// Import the required models
const State = require('../model/State');
const Statesfunfact = require('../model/statesfunfact');

/**
 * Fetch and return all states, optionally filtering based on the 'contig' query parameter.
 * Fun facts are added to the states if available.
 */
const getAllStates = async (req, res) => {
    // Retrieve all states and fun facts from the database
    let states = await State.find().lean();
    const funStates = await Statesfunfact.find();
    if (!states) return res.status(404).json({ "message": "No states found." });

    // Attach the fun facts to the appropriate state
    for (const state in states) {
        for (const funState in funStates) {
            if (states[state].code === funStates[funState].code) {
                states[state]["funfacts"] = funStates[funState].funfacts;
            }
        }
    }

    // Handle contiguous and non-contiguous states based on query parameter
    const nonContigStates = ["AK", "HI"];
    let filteredStates = [];

    // Filter based on 'contig' query parameter
    if (req.query.contig === "true") {
        // Return only contiguous states
        filteredStates = states.filter(state => !nonContigStates.includes(state.code));
        return res.json(filteredStates);
    } else if (req.query.contig === "false") {
        // Return only non-contiguous states (AK, HI)
        filteredStates = states.filter(state => nonContigStates.includes(state.code));
        return res.json(filteredStates);
    } else {
        // Return all states if no filtering is specified
        return res.json(states);
    }
};

/**
 * Fetch and return a specific state based on its code (abbreviation), including fun facts if available.
 */
const getState = async (req, res) => {
    const funStates = await Statesfunfact.find();
    // Find the state using the provided code (abbreviation)
    let state = await State.findOne({ code: req.params.code.toUpperCase() }).lean().exec();
    if (!state) return res.status(400).json({ "message": "Invalid state abbreviation parameter" });

    // Remove the internal MongoDB `_id` field for better API response
    delete state._id;

    // Attach the fun facts if available
    for (const funState in funStates) {
        if (state.code === funStates[funState].code) {
            state["funfacts"] = funStates[funState].funfacts;
        }
    }

    // Return the specific state data
    res.json(state);
};

/**
 * Fetch and return the capital city of a specific state.
 */
const getCapital = async (req, res) => {
    // Find the state using the provided code (abbreviation)
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) return res.status(400).json({ "message": "Invalid state abbreviation parameter" });

    // Return the state name and its capital city
    res.json({ "state": state.state, "capital": state.capital_city });
};

/**
 * Fetch and return the nickname of a specific state.
 */
const getNickname = async (req, res) => {
    // Find the state using the provided code (abbreviation)
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) return res.status(400).json({ "message": "Invalid state abbreviation parameter" });

    // Return the state name and its nickname
    res.json({ "state": state.state, "nickname": state.nickname });
};

/**
 * Fetch and return the population of a specific state, formatted with commas for readability.
 */
const getPopulation = async (req, res) => {
    // Find the state using the provided code (abbreviation)
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) return res.status(400).json({ "message": "Invalid state abbreviation parameter" });

    // Return the state name and its population
    res.json({ "state": state.state, "population": state.population.toLocaleString("en-US") });
};

/**
 * Fetch and return the admission date of a specific state.
 */
const getAdmission = async (req, res) => {
    // Find the state using the provided code (abbreviation)
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) return res.status(400).json({ "message": "Invalid state abbreviation parameter" });

    // Return the state name and its admission date
    res.json({ "state": state.state, "admitted": state.admission_date });
};

/**
 * (Potentially Incorrect Endpoint)
 * Fetch and return the admission date of a specific state (incorrectly labeled as "fun fact").
 */
const getFunfact = async (req, res) => {
    // Find the state using the provided code (abbreviation)
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) return res.status(400).json({ "message": "Invalid state abbreviation parameter" });

    // Return the state name and its admission date (likely a misnamed function)
    res.json({ "state": state.state, "admitted": state.admission_date });
};

// Export the controller functions to be used in other parts of the application
module.exports = {
    getAllStates,
    getState,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    getFunfact
};
