const OccurrenceComment = require('../repositories/').OccurrenceComment

/** Occurrence Comment Service */
class OccurrenceCommentService {

  /**
   * Returns all comments of an occurrence
   *
   * @static
   * @returns {Array} List of comments
   * @memberof OccurrenceCommentService
   */
  static async all (occurrenceId) {
    try {
      return await OccurrenceComment.allByOccurrenceId(occurrenceId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates a new comment
   *
   * @static
   * @param {Object} data - Comment data to create
   * @returns {Object} The newly created comment
   * @memberof OccurrenceCommentService
   */
  static async create (data) {
    try {
      return await OccurrenceComment.create(data)
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Deletes a comment
   *
   * @static
   * @param {number} id - Resource ID
   * @returns
   * @memberof UserPlaceService
   */
  static async delete (id) {
    try {
      return await OccurrenceComment.delete(id)

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceCommentService