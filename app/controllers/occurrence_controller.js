const OccurrenceService = require('../services/occurrence_service')

/** Occurrence Controller */
class OccurrenceController {

  /**
   * Returns all occurrences
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceController
   */
  static async all (req, res, next) {
    try {
      const occurrences = await OccurrenceService.all()
      return res.status(200).send(occurrences)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Finds a occurrence by its ID
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceController
   */
  static async find (req, res, next) {
    try {
      // If it's an API user
      const removeIdentification = req.user.email? true : false

      const occurrence = await OccurrenceService.find(req.params.id, removeIdentification)
      return res.status(200).send(occurrence)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Creates a new occurrence
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceController
   */
  static async create (req, res, next) {
    try {
      const userId = req.user.id
      const data = req.body

      data.userId = userId

      if (!data.location.type)
        data.location.type = 'Point'

      const occurrence = await OccurrenceService.create(data, req.user)
      return res.status(201).send(occurrence)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Gets nearby occurrences
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceController
   */
  static async nearby (req, res, next) {
    try {
      const userId = req.user.id
      const location = req.body

      if (!location.type)
        location.type = 'Point'

      const occurrences = await OccurrenceService.nearby(userId, location)
      return res.status(200).send(occurrences)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = OccurrenceController