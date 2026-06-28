// This file contains the business logic as well as the access to the database

// Minimal in-memory database to store restaurant data for demonstration purposes
// Later on, this would be replaced with a proper data access logic
// By doing this way, we would be able to easily switch to a real database without changing the controller logic
const restaurants = [];

async function getAllRestaurants() {
  return restaurants;
}

// Function to create a new restaurant and add it to the in-memory database
async function createRestaurant(data) {
  const restaurant = {
    id: restaurants.length + 1,
    ...data,
    created_at: new Date().toISOString(),
  };

  restaurants.push(restaurant);
  return restaurant;
}

// Function to search for restaurants based on a query string (case-insensitive)
async function searchRestaurants(query) {
  const term = query.toLowerCase();
  return restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      r.address.toLowerCase().includes(term)
  );
}

// Function to filter restaurants based on cuisine type (case-insensitive)
async function filterRestaurants(cuisine) {
  if (!cuisine) return restaurants;
  return restaurants.filter(
    (r) => r.cuisine_type.toLowerCase() === cuisine.toLowerCase()
  );
}

// Export the service functions to be used in the controller (restaurants.controllers.js) for handling restaurant-related requests
module.exports = {
  getAllRestaurants,
  createRestaurant,
  searchRestaurants,
  filterRestaurants,
};