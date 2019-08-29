const UserSettingService = require('../services/user_setting_service')

/** User Setting Controller */
class UserSettingController {

  /**
   * Gets user settings
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserSettingController
   */
  static async get (req, res, next) {
    try {
      const userId = req.user.id
      const userSettings = await UserSettingService.get(userId)
      
      return res.status(200).send(userSettings)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Updates user settings
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserSettingController
   */
  static async update (req, res, next) {
    try {
      const userId = req.user.id
      const data = req.body

      // Removes any value that should not be updated
      delete data.id
      delete data.userId
      delete data.updatedAt

      const userSettings = await UserSettingService.update(userId, data)

      return res.status(200).send(userSettings)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = UserSettingController