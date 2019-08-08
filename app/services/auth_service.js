const User = require('../repositories/').User

/** Auth Service */
class AuthService {

  /**
   * Checks if the username already exists
   *
   * @static
   * @param {string} username The username to check
   * @returns {boolean}
   * @memberof AuthService
   */
  static async checkUsername (username) {
    return await User.usernameExists(username)
  }
}

module.exports = AuthService