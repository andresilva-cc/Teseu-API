const User = require('../repositories/').User
const JWTFacade = require('../facades/jwt_facade')
const SMSFacade = require('../facades/sms_facade')
const usernames = require('../utils/username.json')
const util = require('util')

/** Auth Service */
class AuthService {

  /**
   * Registers a new user
   *
   * @static
   * @param {string} username Username of the user
   * @param {string} phone Phone of the user
   * @returns {Object} The newly created user
   * @memberof AuthService
   */
  static async register (username, phone) {
    try {
      return await User.create({ username, phone })

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Sends a SMS to verify user authentication
   *
   * @static
   * @param {string} phone Phone number
   * @returns
   * @memberof AuthService
   */
  static async sendSMS (phone) {
    try {
      return await SMSFacade.request(phone)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Checks a code supplied by the user
   *
   * @static
   * @param {*} request
   * @param {*} code
   * @returns
   * @memberof AuthService
   */
  static async checkSMS (phone, request, code) { 
    try {
      const result = await SMSFacade.check(request, code)

      let errorName

      // Switch result from SMS verification
      switch (result.status) {
        // If OK, generates user authorization
        case '0':
          return await this.authorize(phone)
        case '3':
          errorName = 'InvalidRequestCodeError'
          break
        case '6':
          errorName = 'InvalidRequestCodeError'
          break
        case '16':
          errorName = 'InvalidVerificationCodeError'
          break
        case '17':
          errorName = 'TooManyAttemptsError'
          break
        default:
          errorName = 'UnknownError'
          break
      }

      // Instanciates a new error
      const error = new Error(errorName)
      error.name = errorName

      throw error

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Authorizates an user, generating a JWT and returning its info
   *
   * @static
   * @param {string} phone Phone number of the user
   * @returns {Object} 
   * @memberof AuthService
   */
  static async authorize (phone) {
    try {
      const user = await User.findByPhone(phone)

      const userInfo = {
        id: user.id,
        username: user.username,
        phone: user.phone
      }

      const token = await JWTFacade.sign(userInfo, { audience: 'app' })

      return {
        token,
        user: {
          ...userInfo,
          points: user.points,
          level: user.level
        }
      }

    } catch (ex) {
      throw ex
    }
  }

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