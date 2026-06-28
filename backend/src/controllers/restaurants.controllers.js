// This file receives HTTP requests related to restaurants and delegates the handling of those requests to the appropriate functions in the restaurant controller
// It also sends back the appropriate HTTP responses to the client based on the results of the controller functions

const restaurantsService = require('../services/restaurants.service');
const { validateRestaurant } = require('../validators/restaurants.validator');

// We use async functions to handle async operations (database queries) and return the results to the client in a structured format (JSON) with appropriate HTTP status codes.

// Controller function to handle the retrieval of all restaurants
async function getAllRestaurants(req, res) {
  const restaurants = await restaurantsService.getAllRestaurants();
  res.status(200).json(restaurants);
}

// Controller function to handle the creation of a new restaurant
async function createRestaurant(req, res) {
  const validation = validateRestaurant(req.body);

  // If the validation fails, return a 400 Bad Request response with the validation errors
  if (!validation.valid) {
    return res.status(400).json({
      error: 'Validation error',
      details: validation.errors,
    });
  }

  const restaurant = await restaurantsService.createRestaurant(req.body);
  res.status(201).json(restaurant);
}

// Controller function to handle searching for restaurants based on a query parameter
async function searchRestaurants(req, res) {
  const { q = '' } = req.query;
  const restaurants = await restaurantsService.searchRestaurants(q);
  res.status(200).json(restaurants);
}

// Controller function to handle filtering restaurants based on a query parameter
async function filterRestaurants(req, res) {
  const { cuisine = '' } = req.query;
  const restaurants = await restaurantsService.filterRestaurants(cuisine);
  res.status(200).json(restaurants);
}

// Export the controller functions to be used in the routes file (restaurants.routes.js) for handling restaurant-related requests
module.exports = {
  getAllRestaurants,
  createRestaurant,
  searchRestaurants,
  filterRestaurants,
};