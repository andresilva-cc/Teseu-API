const UserContactController = require('../app/controllers/user_contact_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/user/contacts', auth('app'), UserContactController.all)
  app.post('/user/contacts', auth('app'), UserContactController.create)
  app.delete('/user/contacts/:id', auth('app'), UserContactController.delete)
  app.get('/revoke/:token', UserContactController.revoke)
}
