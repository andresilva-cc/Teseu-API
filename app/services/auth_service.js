const Category = require('../repositories').Category
const User = require('../repositories/').User
const UserSetting = require('../repositories').UserSetting

const EmailService = require('./email_service')

const JWTFacade = require('../facades/jwt_facade')
const SMSFacade = require('../facades/sms_facade')

const usernames = require('../utils/username.json')

const Error = require('../utils/error')
 
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
      // Create user
      const user = await User.create({ username, phone })

      // Create settings
      await UserSetting.create({ userId: user.id })

      // Create default settings categories
      const categories = await Category.all()
      await UserSetting.addCategories(user.id, categories)

      return user

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
      const user = await User.findByPhone(phone)

      if (user === null)
        throw new Error('UserNotFoundError')

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
    try {
      return await User.usernameExists(username)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Generates a view only token
   *
   * @static
   * @returns {string} Generated token
   * @memberof AuthService
   */
  static async generateViewOnlyToken () {
    try {
      return await JWTFacade.sign({ viewOnly: true }, { audience: 'viewOnly' })

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Generates a view only token
   *
   * @static
   * @param {string} email - E-mail
   * @memberof AuthService
   */
  static async generateAPIToken (email) {
    try {
      const token = await JWTFacade.sign({ email }, { audience: 'api' })
      console.log('token: ' + token)
      await EmailService.sendToken(email, token)

      return true

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = AuthService