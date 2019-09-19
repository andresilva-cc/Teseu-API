const BaseRepository = require('./base_repository')
const OccurrenceComment = require('../models').OccurrenceComment

/**
 * Occurrence Comment repository
 *
 * @extends {BaseRepository}
 */
class OccurrenceCommentRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof OccurrenceCommentRepository
   */
  constructor () {
    super()
    this.model = OccurrenceComment
  }

  /**
   * Retrieves all comments of an occurrence
   *
   * @param {number} occurrenceId ID of the occurrence
   * @returns {Object[]} Resources
   * @memberof OccurrenceCommentRepository
   */
  async allByOccurrenceId (occurrenceId) {
    try {
      return await this.model.findAll({
        where: {
          occurrenceId
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceCommentRepository