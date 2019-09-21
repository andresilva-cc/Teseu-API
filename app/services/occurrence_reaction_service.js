const OccurrenceReaction = require('../repositories/').OccurrenceReaction
const Occurrence = require('../repositories/').Occurrence
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
      // Check if opposite reaction exists
      if (data.reaction === 1 || data.reaction === 2) {
        if (await OccurrenceReaction.exists(data.occurrenceId, data.userId, data.reaction === 1? 2 : 1))
          throw new Error('BadRequestError')
      }

      // Create reaction
      const reaction = await OccurrenceReaction.create(data)

      // If reaction is "still happening", increment active time by 1 minute
      if (data.reaction === 1) {
        await Occurrence.incrementActiveTime(data.occurrenceId, 1, 'minutes')
      // Else, if reaction is "not happening anymore", decrement active time by 1 minute
      } else if (data.reaction === 2) {
        await Occurrence.decrementActiveTime(data.occurrenceId, 1, 'minutes')
      }
      
      return reaction
      
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
      // Delete reaction
      const result = await OccurrenceReaction.delete(occurrenceId, userId, reaction)

      // If reaction is "still happening", decrement active time by 1 minute
      if (reaction === 1) {
        await Occurrence.decrementActiveTime(occurrenceId, 1, 'minutes')
      // Else, if reaction is "not happening anymore", increment active time by 1 minute
      } else if (reaction === 2) {
        await Occurrence.incrementActiveTime(occurrenceId, 1, 'minutes')
      }

      return result

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceReactionService