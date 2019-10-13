const User = require('../repositories').User

/** User Service */
class UserService {

  /**
   * Gets user level and points
   *
   * @static
   * @param {number} userId - User ID
   * @returns {Object} User level and points
   * @memberof UserService
   */
  static async level (userId) {
    try {
      return await User.level(userId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Updates FCM token
   *
   * @static
   * @param {number} userId - User ID
   * @param {string} token - FCM Token
   * @memberof UserService
   */
  static async updateFCMToken (userId, token) {
    try {
      return await User.update(userId, {
        FCMToken: token
      })

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = UserService