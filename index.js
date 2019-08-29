require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const ErrorFormatter = require('./app/utils/error_formatter')

// Create Express instance
const app = express()

// Use Morgan to log requests to console
app.use(morgan('dev'))

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Index route
app.get('/', (req, res) => {
  res.send('Welcome to Teseu API, check https://web.teseu.app/api-docs for more information on how to use this API')
})

// Import routes
require('./routes')(app)

// Handle errors
app.use(ErrorFormatter.middleware.bind(ErrorFormatter))

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`)
})
