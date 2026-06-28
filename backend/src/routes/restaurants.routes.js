// This file only contains the import statements for the necessary modules and the router for restaurant-related routes
// It links URL to the appropriate function of the restaurant controller, allowing the server to handle requests related to restaurants

const express = require('express');
const router = express.Router();

const restaurantsController = require('../controllers/restaurants.controllers.js');

router.get('/', restaurantsController.getAllRestaurants);
router.post('/', restaurantsController.createRestaurant);
router.get('/search', restaurantsController.searchRestaurants);
router.get('/filter', restaurantsController.filterRestaurants);

// Export the router to be used in the main server file (server.js) for handling restaurant-related routes
module.exports = router;