const OccurrenceController = require('../app/controllers/occurrence_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/occurrences', auth('api'), OccurrenceController.all)
  app.get('/occurrences/:id', auth(['api', 'app']), OccurrenceController.find)
  app.post('/occurrences', auth('app'), OccurrenceController.create)

  // TODO:
  // app.get('/occurrences/nearby', auth('app'), OccurrenceController.nearby)
}
