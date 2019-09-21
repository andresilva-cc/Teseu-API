const OccurrenceReportService = require('../services/occurrence_report_service')
const OccurrenceReport = require('../repositories').OccurrenceReport

/** Occurrence Report Controller */
class OccurrenceReportController {

  /**
   * Returns all reports of an occurrence
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceReportController
   */
  static async all (req, res, next) {
    try {
      const reports = await OccurrenceReportService.all(req.params.occurrenceId)
      return res.status(200).send(reports)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Creates a new report
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceReportController
   */
  static async create (req, res, next) {
    try {
      const data = req.body

      data.userId = req.user.id
      data.occurrenceId = req.params.occurrenceId
      data.status = 0

      const report = await OccurrenceReportService.create(data)
      return res.status(201).send(report)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Updates a report
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof OccurrenceReportController
   */
  static async update (req, res, next) {
    try {
      const data = {
        description: req.body.description,
        status: req.body.status
      }

      const report = await OccurrenceReportService.update(req.params.occurrenceId, req.params.reportId, data)
      return res.status(200).send(report)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = OccurrenceReportController