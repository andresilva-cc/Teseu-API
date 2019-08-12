const AuthService = require('../services/auth_service')

/** Auth Controller */
class AuthController {

  /**
   * Generates an username
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof AuthController
   */
  static generateUsername (req, res, next) {
    try {
      const username = AuthService.generateUsername()
      return res.status(200).send(username)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Checks if username already exists
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @memberof AuthController
   */
  static async usernameExists (req, res, next) {
    try {
      const exists = await AuthService.checkUsername(req.body.username)
      return res.status(200).send(exists)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = AuthController