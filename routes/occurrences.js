const OccurrencesController = require('../app/controllers/occurrence_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/occurrences', auth('api'), OccurrencesController.all)
  app.get('/occurrences/:id', auth(['api', 'app']), OccurrencesController.find)
  app.post('/occurrences', auth('app'), OccurrencesController.create)

  // TODO:
  // app.get('/occurrences/nearby', auth('app'), OccurrencesController.nearby)
}
