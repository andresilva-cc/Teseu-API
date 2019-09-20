const Occurrence = require('../repositories/').Occurrence
const moment = require('moment')

/** Occurrence Service */
class OccurrenceService {

  /**
   * Returns all occurrences
   *
   * @static
   * @returns {Array} List of categories
   * @memberof OccurrenceService
   */
  static async all () {
    try {
      return await Occurrence.all()

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Finds an occurrence by its ID
   *
   * @static
   * @param {number} id - ID of the occurrence to delete
   * @param {boolean} removeIdentification - Whether to remove user identification from the resource
   * @returns
   * @memberof OccurrenceService
   */
  static async find (id, removeIdentification) {
    try {
      return await Occurrence.findById(id, removeIdentification)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates a new occurrence
   *
   * @static
   * @param {Object} data - Occurrence data to create
   * @returns {Object} The newly created occurrence
   * @memberof OccurrenceService
   */
  static async create (data) {
    try {
      /**
       * When 
       * 0 = now
       * 1 = 30 minutes ago
       * 2 = More than a hour ago
       */    
      switch (data.when) {
        case 0:
          data.when = moment()
          data.activeUntil = moment().add(1, 'hour')
          break
        case 1:
          data.when = moment().subtract(30, 'minutes')
          data.activeUntil = moment().add(30, 'minutes')
          break
        case 2:
          data.when = moment().subtract(1, 'hour')
          data.activeUntil = moment()
          break
      }

      return await Occurrence.create(data)
      
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceService