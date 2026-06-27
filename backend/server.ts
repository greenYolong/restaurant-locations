// Entry point for the backend server application
// This file sets up the Express server, configures middleware, and defines routes for handling restaurant-related requests
// It also loads environment variables from a .env file and starts the server on the specified port
// Does not contain any business logic; it serves as the main configuration and initialization file for the backend server

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as restaurantRouter } from './routes/restaurants.routes.ts';