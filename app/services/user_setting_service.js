const UserSetting = require('../repositories').UserSetting

/** User Setting Service */
class UserSettingService {

  /**
   * Gets user settings
   *
   * @static
   * @param {number} userId - User ID
   * @returns {Object} User settings
   * @memberof UserSettingService
   */
  static async get (userId) {
    try {
      return await UserSetting.findByUserId(userId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Updates user settings
   *
   * @static
   * @param {number} userId - User ID
   * @param {Object} data - Category data to create
   * @returns {Object} Updated user settings
   * @memberof UserSettingService
   */
  static async update (userId, data) {
    try {
      // Update settings
      await UserSetting.updateByUserId(userId, data)

      // If updating categories, delete them and add again
      if (data.categories) {
        await UserSetting.deleteCategories(userId)
        await UserSetting.addCategories(userId, data.categories)
      }

      // Return full settings
      return await UserSetting.findByUserId(userId)
      
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserSettingService