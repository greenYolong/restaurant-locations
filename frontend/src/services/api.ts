// This file defines the routes for handling restaurant-related requests in the backend server application
// It is the only file that communicates with the controller functions, linking URL paths to the appropriate controller methods for processing requests related to restaurants

import type { RestaurantPayload, Restaurant } from '../types/restaurant';

const API_URL = 'http://localhost:8080/api/restaurants';

// Function to create a new restaurant by sending a POST request to the backend API
export async function createRestaurant(restaurant: RestaurantPayload) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurant),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erreur lors de la création du restaurant');
  }

  return data as Restaurant;
}