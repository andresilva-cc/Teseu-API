// Reporitories
const CategoryRepository = require('./category_repository')
const EmergencyModeRepository = require('./emergency_mode_repository')
const OccurrenceRepository = require('./occurrence_repository')
const OccurrenceCommentRepository = require('./occurrence_comment_repository')
const OccurrenceReactionRepository = require('./occurrence_reaction_repository')
const OccurrenceReportRepository = require('./occurrence_report_repository')
const UserRepository = require('./user_repository')
const UserContactRepository = require('./user_contact_repository')
const UserPlaceRepository = require('./user_place_repository')
const UserSettingRepository = require('./user_setting_repository')

// Initializes and exports repositories
module.exports = {
  Category: new CategoryRepository(),
  EmergencyMode: new EmergencyModeRepository(),
  Occurrence: new OccurrenceRepository(),
  OccurrenceComment: new OccurrenceCommentRepository(),
  OccurrenceReaction: new OccurrenceReactionRepository(),
  OccurrenceReport: new OccurrenceReportRepository(),
  User: new UserRepository(),
  UserContact: new UserContactRepository(),
  UserPlace: new UserPlaceRepository(),
  UserSetting: new UserSettingRepository()
}