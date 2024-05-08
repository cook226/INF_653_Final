// Import models
const Statesfunfact = require('../model/Statesfunfact');
const State = require('../model/State');

// Create new fun facts for a state
const createNewFunFact = async (req, res) => {
    // Ensure 'funfacts' is provided and is an array
    if (!req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State fun facts value required' });
    }
    if (!Array.isArray(req.body.funfacts)) {
        return res.status(400).json({ "message": "State fun facts value must be an array" });
    }

    // Find the state by its code
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    // Find existing fun facts for the state
    const funStates = await Statesfunfact.find();

    // Add new fun facts if the state already has some
    if (req.body?.funfacts) {
        for (let item in funStates) {
            if (state.code === funStates[item].code) {
                for (let funFact in req.body.funfacts) {
                    funStates[item].funfacts.push(req.body.funfacts[funFact]);
                }
                const result = await funStates[item].save();
                return res.json(result);
            }
        }

        // If the state has no fun facts yet, create new fun facts
        try {
            const result = await Statesfunfact.create({
                code: state.code,
                funfacts: req.body.funfacts
            });

            return res.status(201).json(result);
        } catch (err) {
            console.error(err);
        }
    }
};

// Update a specific fun fact for a state
const patchFunFact = async (req, res) => {
    // Ensure required parameters are provided
    if (!req?.body?.index) {
        return res.status(400).json({ 'message': 'State fun fact index value required' });
    }
    if (!req?.body?.funfact || typeof req.body.funfact !== "string" || req.body.funfact === "") {
        return res.status(400).json({ "message": "State fun fact value required" });
    }

    // Find the state by its code
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    // Find existing fun facts for the state
    const funState = await Statesfunfact.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!funState) {
        return res.status(404).json({ "message": `No Fun Facts found for ${state.state}` });
    }

    // Check if the specified index is valid
    if (funState.funfacts.length < req.body.index) {
        return res.status(400).json({ 'message': `No Fun Fact found at that index for ${state.state}` });
    }

    // Update the fun fact at the specified index
    funState.funfacts[req.body.index - 1] = req.body.funfact;
    const result = await funState.save();
    res.json(result);
};

// Delete a specific fun fact by index
const deleteFunFact = async (req, res) => {
    // Ensure the 'index' parameter is provided
    if (!req?.body?.index) {
        return res.status(400).json({ 'message': 'State fun fact index value required' });
    }

    // Find the state by its code
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    // Find existing fun facts for the state
    const funState = await Statesfunfact.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!funState) {
        return res.status(404).json({ "message": `No Fun Facts found for ${state.state}` });
    }

    // Check if the specified index is valid
    if (funState.funfacts.length < req.body.index) {
        return res.status(400).json({ 'message': `No Fun Fact found at that index for ${state.state}` });
    }

    // Remove the fun fact at the specified index
    funState.funfacts.splice([req.body.index - 1], 1);
    const result = await funState.save();
    res.json(result);
};

// Retrieve a random fun fact for a specific state
const getFunFact = async (req, res) => {
    // Find the state by its code
    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!state) {
        return res.status(400).json({ "message": "Invalid state abbreviation parameter" });
    }

    // Find existing fun facts for the state
    const stateWithFunFacts = await Statesfunfact.findOne({ code: req.params.code.toUpperCase() }).exec();
    if (!stateWithFunFacts) {
        return res.status(404).json({ "message": `No Fun Facts found for ${state.state}` });
    }

    // Return a random fun fact from the state's collection
    res.json({ "funfact": stateWithFunFacts.funfacts[Math.floor(Math.random() * stateWithFunFacts.funfacts.length)] });
};

// Export all route handler functions
module.exports = {
    getFunFact,
    createNewFunFact,
    patchFunFact,
    deleteFunFact
};
