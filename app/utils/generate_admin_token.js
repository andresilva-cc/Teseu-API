require('dotenv').config()
const JWTFacade = require('../facades/jwt_facade')

// Args
const args = process.argv.slice(2)
const name = args[0]

// Generate token
JWTFacade.sign({ name }, { audience: 'admin' })
  .then(token => {
    console.log(`Generated admin token for ${name}: ${token}`)
  })
