// This file defines the routes for handling restaurant-related requests in the backend server application
// It is the only file that communicates with the controller functions, linking URL paths to the appropriate controller methods for processing requests related to restaurants

import type { RestaurantPayload, Restaurant } from '../types/restaurant';

const API_URL = 'http://localhost:8080/api/restaurants';

// Function to create a new restaurant by sending a POST request to the backend API
export async function createRestaurant(restaurant: RestaurantPayload): Promise<Restaurant> {
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


// Function to fetch all restaurants by sending a GET request to the backend API
export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erreur lors de la récupération des restaurants');
  }

  return data as Restaurant[];
}

// Function to search for restaurants by sending a GET request to the backend API with a query parameter
export async function searchRestaurants(query: string): Promise<Restaurant[]> {
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erreur lors de la recherche');
  }

  return data as Restaurant[];
}

// Function to filter restaurants by cuisine type by sending a GET request to the backend API
export async function filterRestaurants(cuisine: string): Promise<Restaurant[]> {
  const response = await fetch(`${API_URL}/filter?cuisine=${encodeURIComponent(cuisine)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erreur lors du filtrage');
  }

  return data as Restaurant[];
}