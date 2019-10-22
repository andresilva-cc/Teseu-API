const AuthService = require('../services/auth_service')

/** Auth Controller */
class AuthController {

  /**
   * Registers a new user
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof AuthController
   */
  static async register (req, res, next) {
    try {
      const user = await AuthService.register(req.body.username, req.body.phone)
      return res.status(201).send(user)

    } catch (ex) {
      console.log(ex)
      return next(ex)
    }
  }

  /**
   * Sends a SMS to verify user authentication
   *
   * @static
   * @param {Object} req - Requrisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof AuthController
   */
  static async sendSMS (req, res, next) {
    try {
      const request = await AuthService.sendSMS(req.body.phone)
      return res.status(200).send(request)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Checks a code supplied by the user
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof AuthController
   */
  static async checkSMS (req, res, next) {
    try {
      const result = await AuthService.checkSMS(req.body.phone, req.body.request, req.body.code)
      return res.status(200).send(result)

    } catch (ex) {
      return next(ex)
    }
  }

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

  /**
   * Generates a view only token
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @memberof AuthController
   */
  static async generateViewOnlyToken (req, res, next) {
    try {
      const token = await AuthService.generateViewOnlyToken()
      return res.status(200).send({ token })

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Generates an API token
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @memberof AuthController
   */
  static async generateAPIToken (req, res, next) {
    try {
      await AuthService.generateAPIToken(req.body.email)
      return res.sendStatus(200)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = AuthController