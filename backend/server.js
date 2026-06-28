// Entry point for the backend server application
// This file sets up the Express server, configures middleware, and defines routes for handling restaurant-related requests
// It also loads environment variables from a .env file and starts the server on the specified port
// Does not contain any business logic; it serves as the main configuration and initialization file for the backend server

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantsRoutes = require('./src/routes/restaurants.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());          // Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());  // Middleware to parse incoming JSON requests

// Health check endpoint to verify that the server is running
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Mount the restaurant-related routes under the /api/restaurants path
app.use('/api/restaurants', restaurantsRoutes);

// Catch-all route for handling 404 errors (route not found)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware to catch and respond to any unhandled errors in the application
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server and listen on the specified port, logging a message to indicate that the server is running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});