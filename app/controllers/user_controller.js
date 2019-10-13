const UserService = require('../services/user_service')

/** User Controller */
class UserController {

  /**
   * Gets user level and points
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserController
   */
  static async level (req, res, next) {
    try {
      const userId = req.user.id
      const level = await UserService.level(userId)
      
      return res.status(200).send(level)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Updates FCM token
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserController
   */
  static async updateFCMToken (req, res, next) {
    try {
      const userId = req.user.id
      await UserService.updateFCMToken(userId, req.body.token)
      
      return res.sendStatus(200)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = UserController