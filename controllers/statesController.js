// Import models
const State = require('../model/State');
const Statesfunfact = require('../model/Statesfunfact');

// Retrieve all states, optionally filtering by contiguous or non-contiguous states
const getAllStates = async (req, res) => {
    // Fetch all states and associated fun facts
    let states = await State.find().lean();
    const funStates = await Statesfunfact.find();

    if (!states) return res.status(404).json({ "message": "No states found." });

    // Attach fun facts to each state
    for (let state in states) {
        for (let funState in funStates) {
            if (states[state].code === funStates[funState].code) {
                states[state]["funfacts"] = funStates[funState].funfacts;
            }
        }
    }

    // Set of non-contiguous states (Alaska and Hawaii)
    const nonContigStates = ["AK", "HI"];
    let newStates = [];

    // Filter based on the 'contig' query parameter
    if (req.query.contig === "true") {
        // Return contiguous states (excluding Alaska and Hawaii)
        for (let state in states) {
            if (!nonContigStates.includes(states[state].code)) {
                newStates.push(states[state]);
            }
        }
        return res.json(newStates);
    } else if (req.query.contig === "false") {
        // Return non-contiguous states (only Alaska and Hawaii)
        for (let state in states) {
            if (nonContigStates.includes(states[state].code)) {
                newStates.push(states[state]);
            }
        }
        return res.json(newStates);
    } else {
        // Return all states if no 'contig' query parameter is specified
        return res.json(states);
    }
};

// Retrieve a single state by its code
const getState = async (req, res) => {
    // Fetch the requested state and its fun facts
    const funStates = await Statesfunfact.find();
    let state = await State.findOne({ code: req.params.code.toUpperCase() }).lean().exec();

    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    delete state._id;

    // Attach fun facts to the state if available
    for (let funState in funStates) {
        if (state.code === funStates[funState].code) {
            state["funfacts"] = funStates[funState].funfacts;
        }
    }

    res.json(state);
};

// Retrieve the capital of a specific state
const getCapital = async (req, res) => {
    // Fetch the requested state
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();

    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": state.state, "capital": state.capital_city });
};

// Retrieve the nickname of a specific state
const getNickname = async (req, res) => {
    // Fetch the requested state
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();

    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": state.state, "nickname": state.nickname });
};

// Retrieve the population of a specific state
const getPopulation = async (req, res) => {
    // Fetch the requested state
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();

    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": state.state, "population": state.population.toLocaleString("en-US") });
};

// Retrieve the admission date of a specific state
const getAdmission = async (req, res) => {
    // Fetch the requested state
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();

    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": state.state, "admitted": state.admission_date });
};

// Retrieve a random fun fact about a specific state
const getFunfact = async (req, res) => {
    // Fetch the requested state
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();

    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    res.json({ "state": state.state, "admitted": state.admission_date });
};

// Export all route handler functions
module.exports = {
    getAllStates,
    getState,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission,
    getFunfact
};
