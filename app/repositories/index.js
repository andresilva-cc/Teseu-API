// Reporitories
const CategoryRepository = require('./category_repository')
const OccurrenceRepository = require('./occurrence_repository')
const OccurrenceCommentRepository = require('./occurrence_comment_repository')
const UserRepository = require('./user_repository')
const UserContactRepository = require('./user_contact_repository')
const UserPlaceRepository = require('./user_place_repository')
const UserSettingRepository = require('./user_setting_repository')

// Initializes and exports repositories
module.exports = {
  Category: new CategoryRepository(),
  Occurrence: new OccurrenceRepository(),
  OccurrenceComment: new OccurrenceCommentRepository(),
  User: new UserRepository(),
  UserContact: new UserContactRepository(),
  UserPlace: new UserPlaceRepository(),
  UserSetting: new UserSettingRepository()
}