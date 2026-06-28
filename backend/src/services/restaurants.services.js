// This file contains the business logic as well as the access to the database

// Minimal in-memory database to store restaurant data for demonstration purposes

const db = require('../config/db');
const { get } = require('../routes/restaurants.routes');

async function getAllRestaurants() {
  const result = await db.query(
    'SELECT * FROM restaurants ORDER BY created_at DESC'
  );
  return result.rows;
}

// Function to create a new restaurant and add it to the in-memory database
async function createRestaurant(data) {
  const result = await db.query(
    `INSERT INTO restaurants
      (name, address, latitude, longitude, cuisine_type, phone_number)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.name,
      data.address,
      data.latitude,
      data.longitude,
      data.cuisine_type,
      data.phone_number || null,
    ]
  );

  return result.rows[0];
}

// Function to search for restaurants based on a query string (case-insensitive with ILIKE pattern matching)
async function searchRestaurants(query) {
  const result = await db.query(
    `SELECT * FROM restaurants
     WHERE name ILIKE $1 OR address ILIKE $1
     ORDER BY created_at DESC`,
    [`%${query}%`]
  );

  return result.rows;
}

// Function to filter restaurants based on cuisine type (case-insensitive)
async function filterRestaurants(cuisine) {
  if (!cuisine) { 
    return getAllRestaurants();
  }

  const result = await db.query(
    `SELECT * FROM restaurants
     WHERE cuisine_type = $1
     ORDER BY created_at DESC`,
    [cuisine]
  );

  return result.rows;
}

// Export the service functions to be used in the controller (restaurants.controllers.js) for handling restaurant-related requests
module.exports = {
  getAllRestaurants,
  createRestaurant,
  searchRestaurants,
  filterRestaurants,
};