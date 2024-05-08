// middleware/verifyState.js
const statesData = require('../models/statesData.json');

const verifyState = (req, res, next) => {
  const stateCode = req.params.state.toUpperCase();
  const state = statesData.find((state) => state.code === stateCode);

  if (!state) {
    return res.status(400).json({ message: 'Invalid state abbreviation parameter' });
  }

  req.stateCode = stateCode;
  req.state = state;
  next();
};

module.exports = verifyState;
