const UserSettingController = require('../app/controllers/user_setting_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/user/settings', auth('app'), UserSettingController.get)
  app.patch('/user/settings', auth('app'), UserSettingController.update)
}
