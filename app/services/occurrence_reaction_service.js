const OccurrenceReaction = require('../repositories/').OccurrenceReaction
const Error = require('../utils/error')

/** Occurrence Reaction Service */
class OccurrenceReactionService {

  /**
   * Returns all reactions of an occurrence
   *
   * @static
   * @returns {Array} Total of reactions
   * @memberof OccurrenceReactionService
   */
  static async all (occurrenceId) {
    try {
      return await OccurrenceReaction.allByOccurrenceId(occurrenceId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates a new reaction
   *
   * @static
   * @param {Object} data - Reaction data to create
   * @returns {Object} The newly created reaction
   * @memberof OccurrenceReactionService
   */
  static async create (data) {
    try {
      if (data.reaction === 1 || data.reaction === 2) {
        const exists = await OccurrenceReaction.exists(data.occurrenceId, data.userId, data.reaction === 1? 2 : 1)
        if (exists)
          throw new Error('BadRequestError')
      }

      return await OccurrenceReaction.create(data)
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Deletes a reaction
   *
   * @static
   * @param {number} occurrenceId - Occurrence ID
   * @param {number} userId - User ID
   * @param {number} reaction - Reaction Code
   * @returns
   * @memberof OccurrenceReactionService
   */
  static async delete (occurrenceId, userId, reaction) {
    try {
      return await OccurrenceReaction.delete(occurrenceId, userId, reaction)

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceReactionService