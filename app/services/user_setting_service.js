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
      return await UserSetting.updateByUserId(userId, data)
      
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserSettingService