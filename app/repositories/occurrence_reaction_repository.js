const BaseRepository = require('./base_repository')
const OccurrenceReaction = require('../models').OccurrenceReaction

/**
 * Occurrence Reaction repository
 *
 * @extends {BaseRepository}
 */
class OccurrenceReactionRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof OccurrenceReactionRepository
   */
  constructor () {
    super()
    this.model = OccurrenceReaction
  }

  /**
   * Retrieves all reactions of an occurrence
   *
   * @param {number} occurrenceId ID of the occurrence
   * @returns {Object[]} Resources
   * @memberof OccurrenceReactionRepository
   */
  async allByOccurrenceId (occurrenceId) {
    try {
      const reactions = []

      // Likes
      reactions.push(await this.model.count({
        where: {
          occurrenceId,
          reaction: 0
        }
      }))

      // Still happening
      reactions.push(await this.model.count({
        where: {
          occurrenceId,
          reaction: 1
        }
      }))

      // Not happening anymore
      reactions.push(await this.model.count({
        where: {
          occurrenceId,
          reaction: 2
        }
      }))

      return reactions

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Returns user reactions of an occurrence
   *
   * @static
   * @param {number} occurrenceId - Occurrence ID
   * @param {number} userId - User ID
   * @returns {Array} User reactions
   * @memberof OccurrenceReactionRepository
   */
  async myReactions (occurrenceId, userId) {
    const reactions = [
      false,
      false,
      false
    ]

    const result = await this.model.findAll({
      where: {
        occurrenceId,
        userId
      }
    })

    result.forEach(reaction => {
      reactions[reaction.reaction] = true
    })

    return reactions
  }

  /**
   * Checks if a reaction exists
   *
   * @override
   * @param {number} occurrenceId - Occurrence ID
   * @param {number} userId - User ID
   * @param {number} reaction - Reaction Code
   * @returns {boolean} True if the reaction exists, false if not
   * @memberof OccurrenceReactionRepository
   */
  async exists (occurrenceId, userId, reaction) {
    try {
      return !!await this.model.findOne({
        where: {
          occurrenceId,
          userId,
          reaction
        }
      })

      // return !!reaction

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Deletes a resource
   *
   * @override
   * @param {number} occurrenceId - Occurrence ID
   * @param {number} userId - User ID
   * @param {number} reaction - Reaction Code
   * @returns {number} Number of rows deleted
   * @memberof OccurrenceReactionRepository
   */
  async delete (occurrenceId, userId, reaction) {
    try {
      return await this.model.destroy({
        where: {
          occurrenceId,
          userId,
          reaction
        }
      })      
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceReactionRepository