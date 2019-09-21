const OccurrenceReactionService = require('../services/occurrence_reaction_service')
const OccurrenceReaction = require('../repositories').OccurrenceReaction

/** Occurrence Reaction Controller */
class OccurrenceReactionController {

  /**
   * Returns all reactions of an occurrence
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceReactionController
   */
  static async all (req, res, next) {
    try {
      const reactions = await OccurrenceReactionService.all(req.params.occurrenceId)
      return res.status(200).send(reactions)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Creates a new reaction
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceReactionController
   */
  static async create (req, res, next) {
    try {
      const data = req.body

      data.userId = req.user.id
      data.occurrenceId = req.params.occurrenceId

      const reaction = await OccurrenceReactionService.create(data)
      return res.status(201).send(reaction)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Deletes a reaction
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceReactionController
   */
  static async delete (req, res, next) {
    try {
      const occurrenceId = Number(req.params.occurrenceId)
      const userId = req.user.id
      const reaction = Number(req.params.reaction)

      await OccurrenceReactionService.delete(occurrenceId, userId, reaction)
      return res.sendStatus(200)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = OccurrenceReactionController