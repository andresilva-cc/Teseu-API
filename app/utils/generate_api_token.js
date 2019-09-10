require('dotenv').config()
const JWTFacade = require('../facades/jwt_facade')

// Args
const args = process.argv.slice(2)
const email = args[0]

// Generate token
JWTFacade.sign({ email }, { audience: 'api' })
  .then(token => {
    console.log(`Generated API token for e-mail ${email}: ${token}`)
  })
