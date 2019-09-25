require('dotenv').config()
const https = require('https')
const fs = require('fs')
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

// Create HTTPS server if set in env
if (process.env.APP_USE_HTTPS) {
  const options = {
    key: fs.readFileSync(process.env.APP_HTTPS_KEY),
    cert: fs.readFileSync(process.env.APP_HTTPS_CERT)
  }
  
  https.createServer(options, app).listen(APP_HTTPS_PORT, () => {
    console.log(`HTTPS: Listening on port ${process.env.APP_HTTPS_PORT}`)
  })

// Else, create HTTP server
} else {
  app.listen(process.env.APP_HTTP_PORT, () => {
    console.log(`HTTP: Listening on port ${process.env.APP_HTTP_PORT}`)
  })
}
