require('dotenv').config()
const JWTFacade = require('../facades/jwt_facade')
const User = require('../repositories').User

// Args
const args = process.argv.slice(2)
const id = args[0]

// Retrieve user
User.findById(id).then(user => {
  
  const userInfo = {
    id: user.id,
    username: user.username,
    phone: user.phone
  }

  // Generate token
  JWTFacade.sign(userInfo, { audience: 'app' })
    .then(token => {
      console.log(`Generated user token for ${user.username}: ${token}`)
    })
})

