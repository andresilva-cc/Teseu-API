const OccurrenceCommentService = require('../services/occurrence_comment_service')
const OccurrenceComment = require('../repositories').OccurrenceComment

/** Occurrence Comment Controller */
class OccurrenceCommentController {

  /**
   * Returns all comments of an occurrence
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceCommentController
   */
  static async all (req, res, next) {
    try {
      const comments = await OccurrenceCommentService.all(req.params.occurrenceId)
      return res.status(200).send(comments)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Creates a new comment
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceCommentController
   */
  static async create (req, res, next) {
    try {
      const data = req.body

      data.userId = req.user.id
      data.occurrenceId = req.params.occurrenceId

      const comment = await OccurrenceCommentService.create(data)
      return res.status(201).send(comment)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Deletes a comment
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceCommentController
   */
  static async delete (req, res, next) {
    try {
      const userId = req.user.id
      const commentId = req.params.commentId

      // Check if user is allowed to delete this comment
      const comment = await OccurrenceComment.findById(commentId)

      if (comment.userId != userId)
        throw new Error('ForbiddenError')

      await OccurrenceCommentService.delete(commentId)
      return res.sendStatus(200)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = OccurrenceCommentController