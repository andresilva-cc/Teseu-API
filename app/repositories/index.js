// Reporitories
const CategoryRepository = require('./category_repository')
const UserRepository = require('./user_repository')
const UserSettingRepository = require('./user_setting_repository')

// Initializes and exports repositories
module.exports = {
  Category: new CategoryRepository(),
  User: new UserRepository(),
  UserSetting: new UserSettingRepository()
}