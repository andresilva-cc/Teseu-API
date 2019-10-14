const OccurrenceReactionController = require('../app/controllers/occurrence_reaction_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/occurrences/:occurrenceId/reactions', auth(['app', 'viewOnly']), OccurrenceReactionController.all)
  app.get('/occurrences/:occurrenceId/myReactions', auth('app'), OccurrenceReactionController.myReactions)
  app.post('/occurrences/:occurrenceId/reactions', auth('app'), OccurrenceReactionController.create)
  app.delete('/occurrences/:occurrenceId/reactions/:reaction', auth('app'), OccurrenceReactionController.delete)
}
