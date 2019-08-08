const User = require('../repositories/').User
const usernames = require('../utils/username.json')

/** Auth Service */
class AuthService {

  /**
   * Generates an username
   *
   * @static
   * @memberof AuthService
   */
  static generateUsername () {
    const figure = usernames.figures[Math.floor(Math.random() * usernames.figures.length)]
    const number = Math.floor(Math.random() * 99)

    return figure + number
  }

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