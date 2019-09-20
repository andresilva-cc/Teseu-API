const OccurrenceReport = require('../repositories/').OccurrenceReport

/** Occurrence Report Service */
class OccurrenceReportService {

  /**
   * Returns all reports of an occurrence
   *
   * @static
   * @returns {Array} List of reports
   * @memberof OccurrenceReportService
   */
  static async all (occurrenceId) {
    try {
      return await OccurrenceReport.allByOccurrenceId(occurrenceId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates a new report
   *
   * @static
   * @param {Object} data - Report data to create
   * @returns {Object} The newly created report
   * @memberof OccurrenceReportService
   */
  static async create (data) {
    try {
      return await OccurrenceReport.create(data)
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Updates a report
   *
   * @static
   * @param {number} id - Resource ID
   * @param {Object} data - Data to update
   * @returns
   * @memberof OccurrenceReportService
   */
  static async update (id, data) {
    try {
      return await OccurrenceReport.update(id, data)

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceReportService