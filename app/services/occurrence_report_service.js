const User = require('../repositories/').User
const Occurrence = require('../repositories/').Occurrence
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
      // Create report
      const report = await OccurrenceReport.create(data)

      // Get report count
      const count = await OccurrenceReport.getReportCount(data.occurrenceId)

      // If occurrence has 5 reports or more
      if (count >= 5)
        Occurrence.disableOccurrence(data.occurrenceId)

      return report
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Retrieves an user report
   *
   * @static
   * @param {number} userId - User ID
   * @param {number} occurrenceId - Occurrence ID
   * @returns {Object|null} The report if found, or null if not
   * @memberof OccurrenceReportService
   */
  static async findUserReport (userId, occurrenceId) {
    try {
      const report = await OccurrenceReport.findUserReport(userId, occurrenceId)

      return report
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Updates a report
   *
   * @static
   * @param {number} occurrenceId - Occurrence ID
   * @param {number} reportId - Report ID
   * @param {Object} data - Data to update
   * @returns
   * @memberof OccurrenceReportService
   */
  static async update (occurrenceId, reportId, data) {
    try {
      // Update occurrence report
      const report = await OccurrenceReport.update(reportId, data)

      // GAMIFICATION: If updating status
      if (typeof data.status !== 'undefined') {
        // If report has been accepted (occurrence removed)
        if (data.status === 2) {
          // Get userId through occurrence
          const { userId } = await Occurrence.findById(occurrenceId)

          // Remove points from user
          await User.removePoints(userId, 25)
        }
      }

      return report

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceReportService