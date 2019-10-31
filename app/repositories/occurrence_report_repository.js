const BaseRepository = require('./base_repository')
const OccurrenceReport = require('../models').OccurrenceReport

/**
 * Occurrence Report repository
 *
 * @extends {BaseRepository}
 */
class OccurrenceReportRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof OccurrenceReportRepository
   */
  constructor () {
    super()
    this.model = OccurrenceReport
  }

  /**
   * Retrieves all reports of an occurrence
   *
   * @param {number} occurrenceId ID of the occurrence
   * @returns {Object[]} Resources
   * @memberof OccurrenceReportRepository
   */
  async allByOccurrenceId (occurrenceId) {
    try {
      return await this.model.findAll({
        where: {
          occurrenceId
        }
      })

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Returns the report count of a specific occurrence
   *
   * @param {number} occurrenceId ID of the occurrence
   * @returns {Number} Report count
   * @memberof OccurrenceReportRepository
   */
  async getReportCount (occurrenceId) {
    try {
      return await this.model.count({
        where: {
          occurrenceId
        }
      })

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceReportRepository