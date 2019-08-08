const ExceptionFormatter = require('../utils/exception_formatter')
const AuthService = require('../services/auth_service')

/** Auth Controller */
class AuthController {

  /**
   * Generates an username
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @returns
   * @memberof AuthController
   */
  static generateUsername (req, res) {
    try {
      const username = AuthService.generateUsername()
      return res.status(200).send(username)

    } catch (ex) {
      const exception = ExceptionFormatter.format(ex)
      return res.status(exception.code).send(exception.error)
    }
  }

  /**
   * Checks if username already exists
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @memberof AuthController
   */
  static async usernameExists (req, res) {
    try {
      const exists = await AuthService.checkUsername(req.body.username)
      return res.status(200).send(exists)

    } catch (ex) {
      const exception = ExceptionFormatter.format(ex)
      return res.status(exception.code).send(exception.error)
    }
  }
}

module.exports = AuthController