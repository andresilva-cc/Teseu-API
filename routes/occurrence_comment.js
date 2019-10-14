const OccurrenceCommentController = require('../app/controllers/occurrence_comment_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/occurrences/:occurrenceId/comments', auth(['app', 'viewOnly']), OccurrenceCommentController.all)
  app.post('/occurrences/:occurrenceId/comments', auth('app'), OccurrenceCommentController.create)
  app.delete('/occurrences/:occurrenceId/comments/:commentId', auth('app'), OccurrenceCommentController.delete)
}
