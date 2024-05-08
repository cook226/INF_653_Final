// controllers/statesController.js
const State = require('../models/State');
const statesData = require('../models/statesData.json');

// Helper function to find state details by its code
const getStateData = (stateCode) => statesData.find((state) => state.code === stateCode);

// Get all states (with optional contiguous filter)
const getAllStates = (req, res) => {
  let results = statesData;

  // Handle ?contig=true or ?contig=false query parameters
  const { contig } = req.query;
  if (contig === 'true') {
    results = statesData.filter((state) => !['AK', 'HI'].includes(state.code));
  } else if (contig === 'false') {
    results = statesData.filter((state) => ['AK', 'HI'].includes(state.code));
  }

  res.json(results);
};

// Get state by code
const getState = async (req, res) => {
  const { stateCode } = req;
  const state = getStateData(stateCode);

  if (!state) {
    return res.status(404).json({ message: 'State not found' });
  }

  // Retrieve additional fun facts from MongoDB
  const mongoState = await State.findOne({ stateCode });
  if (mongoState) state.funfacts = mongoState.funfacts;

  res.json(state);
};

// Get a random fun fact for a specific state
const getRandomFunFact = async (req, res) => {
  const { stateCode } = req;
  const mongoState = await State.findOne({ stateCode });

  if (!mongoState || !mongoState.funfacts || mongoState.funfacts.length === 0) {
    return res.status(404).json({ message: `No fun facts found for ${stateCode}` });
  }

  const randomFact = mongoState.funfacts[Math.floor(Math.random() * mongoState.funfacts.length)];
  res.json({ funfact: randomFact });
};

// Add new fun facts to a specific state
const addFunFacts = async (req, res) => {
  const { stateCode } = req;
  const { funfacts } = req.body;

  if (!Array.isArray(funfacts)) {
    return res.status(400).json({ message: 'funfacts field must be an array' });
  }

  let mongoState = await State.findOne({ stateCode });

  if (!mongoState) {
    // Create a new document if the state doesn't exist
    mongoState = new State({ stateCode, funfacts });
  } else {
    // Add the new fun facts to the existing list
    mongoState.funfacts = mongoState.funfacts.concat(funfacts);
  }

  const updatedState = await mongoState.save();
  res.status(201).json(updatedState);
};

// Update a fun fact at a specific index for a state
const updateFunFact = async (req, res) => {
  const { stateCode } = req;
  const { index, funfact } = req.body;

  if (!Number.isInteger(index) || index < 1) {
    return res.status(400).json({ message: 'Index must be an integer greater than or equal to 1' });
  }

  const mongoState = await State.findOne({ stateCode });

  if (!mongoState || !mongoState.funfacts || mongoState.funfacts.length < index) {
    return res.status(404).json({ message: `No fun fact found at index ${index} for ${stateCode}` });
  }

  // Update the specific fun fact
  mongoState.funfacts[index - 1] = funfact;
  const updatedState = await mongoState.save();

  res.json(updatedState);
};

// Delete a fun fact at a specific index for a state
const deleteFunFact = async (req, res) => {
  const { stateCode } = req;
  const { index } = req.body;

  if (!Number.isInteger(index) || index < 1) {
    return res.status(400).json({ message: 'Index must be an integer greater than or equal to 1' });
  }

  const mongoState = await State.findOne({ stateCode });

  if (!mongoState || !mongoState.funfacts || mongoState.funfacts.length < index) {
    return res.status(404).json({ message: `No fun fact found at index ${index} for ${stateCode}` });
  }

  // Remove the specific fun fact
  mongoState.funfacts.splice(index - 1, 1);
  const updatedState = await mongoState.save();

  res.json(updatedState);
};

module.exports = {
  getAllStates,
  getState,
  getRandomFunFact,
  addFunFacts,
  updateFunFact,
  deleteFunFact,
};
