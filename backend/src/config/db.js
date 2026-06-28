// This file is responsible for setting up the connection to the PostgreSQL database using the 'pg' library
// It reads the database configuration from environment variables and creates a connection pool that can be used throughout the application to execute queries.


const { Pool } = require('pg');
require('dotenv').config();

// Create a new connection pool using the database configuration from environment variables
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

// Export the connection pool to be used in other parts of the application for executing database queries
module.exports = pool;