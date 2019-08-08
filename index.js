require('dotenv').config()
const express = require('express')

// Create Express instance
const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to Teseu API, check https://web.teseu.app/api-docs for more information on how to use this API')
})

// Import routes
require('./routes')(app)

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`)
})