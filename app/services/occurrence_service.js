const Occurrence = require('../repositories/').Occurrence
const User = require('../repositories/').User
const UserSetting = require('../repositories/').UserSetting
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

      // Create occurrence
      const occurrence = await Occurrence.create(data)
      
      // Give points to user
      await User.addPoints(data.userId, 5)

      return occurrence

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Gets nearby occurrences
   *
   * @static
   * @param {number} userId - User ID to retrieve user distance setting
   * @param {Object} location - Location to search
   * @memberof OccurrenceService
   */
  static async nearby (userId, location) {
    try {
      // Get user distance setting
      const userSettings = await UserSetting.findByUserId(userId)
  
      return await Occurrence.nearby(location, userSettings.radius)

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceService