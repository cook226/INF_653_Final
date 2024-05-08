// Import the `express` package to set up routing.
const express = require('express');
// Create an instance of an Express router to define routes for the application.
const router = express.Router();

// Import the necessary controllers for handling requests.
const statesController = require('../controllers/statesController');
const statesfunfactsController = require('../controllers/statesfunfactsController');

// Define the route for getting a list of all states.
// Method: GET, Path: `/`
router.route('/')
    .get(statesController.getAllStates); // Retrieves all states data, optionally filtering by non-contiguous status

// Define the route for getting details of a specific state.
// Method: GET, Path: `/:code`
router.route('/:code')
    .get(statesController.getState); // Retrieves details of a specific state by its code

// Define the route for getting the capital of a specific state.
// Method: GET, Path: `/:code/capital`
router.route('/:code/capital')
    .get(statesController.getCapital); // Retrieves the capital city of a state by its code

// Define the route for getting the nickname of a specific state.
// Method: GET, Path: `/:code/nickname`
router.route('/:code/nickname')
    .get(statesController.getNickname); // Retrieves the nickname of a state by its code

// Define the route for getting the population of a specific state.
// Method: GET, Path: `/:code/population`
router.route('/:code/population')
    .get(statesController.getPopulation); // Retrieves the population of a state by its code

// Define the route for getting the admission date of a specific state.
// Method: GET, Path: `/:code/admission`
router.route('/:code/admission')
    .get(statesController.getAdmission); // Retrieves the admission date of a state by its code

// Define routes for getting and manipulating fun facts of a specific state.
// Method: GET, POST, PATCH, DELETE, Path: `/:code/funfact`
router.route('/:code/funfact')
    .get(statesfunfactsController.getFunFact) // Retrieves a random fun fact of a state by its code
    .post(statesfunfactsController.createNewFunFact) // Adds new fun facts to a specific state
    .patch(statesfunfactsController.patchFunFact) // Updates a specific fun fact in the state's array
    .delete(statesfunfactsController.deleteFunFact); // Deletes a specific fun fact from the state's array

// Export the configured router to be used in the main application.
module.exports = router;
