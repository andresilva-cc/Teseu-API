const OccurrenceReportController = require('../app/controllers/occurrence_report_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/occurrences/:occurrenceId/reports', auth('admin'), OccurrenceReportController.all)
  app.post('/occurrences/:occurrenceId/reports', auth('app'), OccurrenceReportController.create)
  app.get('/occurrences/:occurrenceId/myReport', auth('app'), OccurrenceReportController.findUserReport)
  app.patch('/occurrences/:occurrenceId/reports/:reportId', auth('admin'), OccurrenceReportController.update)
}
