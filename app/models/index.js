const Sequelize = require('sequelize')

const env = process.env.ENVIRONMENT || 'development'
const config = require(__dirname + '/../../config/sequelize.js')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

// Models
const CategoryModel = require('./category')
const OccurrenceCommentModel = require('./occurrence_comment')
const OccurrenceReactionModel = require('./occurrence_reaction')
const OccurrenceReportModel = require('./occurrence_report')
const OccurrenceModel = require('./occurrence')
const UserModel = require('./user')
const UserContactModel = require('./user_contact')
const UserNotificationCategoryModel = require('./user_notification_category')
const UserPlaceModel = require('./user_place')
const UserPlaceCategoryModel = require('./user_place_category')
const UserSettingModel = require('./user_setting')

// Init Models
const models = {
  Category: CategoryModel.init(sequelize, Sequelize),
  OccurrenceComment: OccurrenceCommentModel.init(sequelize, Sequelize),
  OccurrenceReaction: OccurrenceReactionModel.init(sequelize, Sequelize),
  OccurrenceReport: OccurrenceReportModel.init(sequelize, Sequelize),
  Occurrence: OccurrenceModel.init(sequelize, Sequelize),
  User: UserModel.init(sequelize, Sequelize),
  UserContact: UserContactModel.init(sequelize, Sequelize),
  UserNotificationCategory: UserNotificationCategoryModel.init(sequelize, Sequelize),
  UserPlace: UserPlaceModel.init(sequelize, Sequelize),
  UserPlaceCategory: this.UserPlaceCategory.init(sequelize, Sequelize),
  UserSetting: UserSettingModel.init(sequelize, Sequelize)
}

// Run associations if it exists
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize
}

module.exports = db
