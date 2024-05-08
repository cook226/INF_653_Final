const express = require('express');
const router = express.Router();
const {
  getAllStates,
  getState,
  getRandomFunFact,
  addFunFacts,
  updateFunFact,
  deleteFunFact,
} = require('../controllers/statesController');
const verifyState = require('../middleware/verifyState');

router.route('/').get(getAllStates);
router.route('/:state').get(verifyState, getState);
router.route('/:state/funfact').get(verifyState, getRandomFunFact).post(verifyState, addFunFacts).patch(verifyState, updateFunFact).delete(verifyState, deleteFunFact);

module.exports = router;
