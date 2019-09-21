const User = require('../repositories/').User
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
      // Current settings
      const settings = await UserSetting.findByUserId(userId)
      
      // Update settings
      await UserSetting.updateByUserId(userId, data)
      
      // If updating categories, delete them and add again
      if (data.categories) {
        await UserSetting.deleteCategories(userId)
        await UserSetting.addCategories(userId, data.categories)
      }

      // GAMIFICATION: If updating "enableNotifications"
      if (typeof data.enableNotifications !== 'undefined') {

        // If "enableNotifications" changed
        if (data.enableNotifications !== settings.enableNotifications) {

          // If changing to enabled, give points to user
          if (data.enableNotifications === true) {
            await User.addPoints(userId, 10)

          // If changing to disabled, remove points from user
          } else {
            await User.removePoints(userId, 10)
          }
        }
      }

      // Return full settings
      return await UserSetting.findByUserId(userId)
      
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserSettingService