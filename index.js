// Imports
require('dotenv').config();
const express = require('express');

// Create Express instance
const app = express();

// Import routes
const routes = require('./routes');
app.use('/', routes);

// Start server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});