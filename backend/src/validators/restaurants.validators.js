// This file contains validation logic for restaurant-related data, ensuring that incoming requests meet the required criteria before being processed by the service layer
//  It defines validation rules for restaurant creation, update, and other operations, helping to maintain data integrity and prevent invalid data from being stored in the database.

const ALLOWED_CUISINES = [
  'Française',
  'Italienne',
  'Asiatique',
  'Américaine',
  'Méditerranéenne',
  'Autre',
];

// Function to validate restaurant data based on predefined rules
function validateRestaurant(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 3) {
    errors.push('name must contain at least 3 characters');
  }

  if (!data.address || data.address.trim().length < 10) {
    errors.push('address must contain at least 10 characters');
  }

  const latitude = Number(data.latitude);
  if (Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
    errors.push('latitude must be a decimal number between -90 and 90');
  }

  const longitude = Number(data.longitude);
  if (Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
    errors.push('longitude must be a decimal number between -180 and 180');
  }

  if (!ALLOWED_CUISINES.includes(data.cuisine_type)) {
    errors.push('cuisine_type is invalid');
  }

  if (
    data.phone_number &&
    typeof data.phone_number !== 'string'
  ) {
    errors.push('phone_number must be a string when provided');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Export the validation function and allowed cuisines to be used in the controller (restaurants.controllers.js) for validating restaurant-related requests
module.exports = {
  validateRestaurant,
  ALLOWED_CUISINES,
};