const AuthController = require('../app/controllers/auth_controller')

module.exports = app => {
  app.get('/auth/username/generate', AuthController.generateUsername)
  app.post('/auth/username/check', AuthController.usernameExists)
}
