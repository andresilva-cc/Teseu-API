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
}

module.exports = UserService