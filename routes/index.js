// Imports
const express = require('express');
const router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.send('Welcome to Teseu API, check https://web.teseu.app/api-docs for more information on how to use this API');
});

// Export Router
module.exports = router;