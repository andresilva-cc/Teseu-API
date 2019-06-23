// Imports
require('dotenv').config();
const express = require('express');

// Create Express instance
const app = express();

// Import routes
const routes = require('./routes');
app.use('/', routes);

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});