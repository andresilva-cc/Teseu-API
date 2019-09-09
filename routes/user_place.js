const UserPlaceController = require('../app/controllers/user_place_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/user/places', auth('app'), UserPlaceController.all)
  app.post('/user/places', auth('app'), UserPlaceController.create)
  app.delete('/user/places/:id', auth('app'), UserPlaceController.delete)
}
