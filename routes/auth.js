const AuthController = require('../app/controllers/auth_controller')

module.exports = app => {
  app.post('/auth/username/check', AuthController.usernameExists)
}
