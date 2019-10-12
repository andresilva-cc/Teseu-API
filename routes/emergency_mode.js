const EmergencyModeController = require('../app/controllers/emergency_mode_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/emergencyMode/check', auth('app'), EmergencyModeController.check)
  app.get('/emergencyMode/enable', auth('app'), EmergencyModeController.enable)
  app.get('/emergencyMode/disable', auth('app'), EmergencyModeController.disable)
}
