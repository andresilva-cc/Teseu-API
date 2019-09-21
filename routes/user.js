const UserController = require('../app/controllers/user_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/user/level', auth('app'), UserController.level)
}
