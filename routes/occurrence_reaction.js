const OccurrenceReactionController = require('../app/controllers/occurrence_reaction_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/occurrences/:occurrenceId/reactions', auth('app'), OccurrenceReactionController.all)
  app.post('/occurrences/:occurrenceId/reactions', auth('app'), OccurrenceReactionController.create)
  app.delete('/occurrences/:occurrenceId/reactions/:reaction', auth('app'), OccurrenceReactionController.delete)
}
