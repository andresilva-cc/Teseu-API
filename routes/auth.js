const AuthController = require('../app/controllers/auth_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.post('/auth/register', AuthController.register)
  app.post('/auth/sms/send', AuthController.sendSMS)
  app.post('/auth/sms/check', AuthController.checkSMS)
  app.get('/auth/username/generate', AuthController.generateUsername)
  app.post('/auth/username/check', AuthController.usernameExists)
  app.post('/auth/phone/check', AuthController.phoneExists)
  app.get('/auth/viewOnly/token', AuthController.generateViewOnlyToken)
  app.post('/auth/api/token', AuthController.generateAPIToken)
}
