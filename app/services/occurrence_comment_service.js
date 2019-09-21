const OccurrenceComment = require('../repositories/').OccurrenceComment
const User = require('../repositories/').User

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
      const comment = await OccurrenceComment.create(data)
      
      // Give points to user
      await User.addPoints(data.userId, 1)

      return comment

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
   * @memberof OccurrenceCommentService
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