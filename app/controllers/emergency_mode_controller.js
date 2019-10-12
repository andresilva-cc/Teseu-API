const EmergencyModeService = require('../services/emergency_mode_service')

/** Emergency Mode Controller */
class EmergencyModeController {

  /**
   * Checks if emergency mode is enabled
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof EmergencyModeController
   */
  static async check (req, res, next) {
    try {
      const enabled = await EmergencyModeService.check(req.user.id)
      return res.status(200).send(enabled)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Enable emergency mode
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof EmergencyModeController
   */
  static async enable (req, res, next) {
    try {
      await EmergencyModeService.enable(req.user)
      return res.sendStatus(200)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Disable emergency mode
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof EmergencyModeController
   */
  static async disable (req, res, next) {
    try {
      await EmergencyModeService.disable(req.user)
      return res.sendStatus(200)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = EmergencyModeController