const Category = require('../repositories/').Category
const Occurrence = require('../repositories/').Occurrence
const User = require('../repositories/').User
const UserContact = require('../repositories/').UserContact
const UserSetting = require('../repositories/').UserSetting
const UserPlaceService = require('../services/user_place_service')
const SMSFacade = require('../facades/sms_facade')
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
   * @param {Object} user - User info
   * @returns {Object} The newly created occurrence
   * @memberof OccurrenceService
   */
  static async create (data, user) {
    try {
      const whenCode = data.when

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
      
      // If user is victim and notify contacts if enabled
      if (data.notifyContacts && data.victim)
        this.notifyContacts({ ...data, whenCode }, user)

      // Give points to user
      await User.addPoints(data.userId, 5)

      // Check and notify places nearby this occurrence
      if (whenCode !== 2)
        UserPlaceService.findNearby(data)

      return occurrence

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Notify user contacts about the occurrence
   *
   * @static
   * @param {Object} data - Occurrence data to create
   * @param {Object} user - User info
   * @returns {Object} The newly created occurrence
   * @memberof OccurrenceService
   */
  static async notifyContacts (data, user) {
    try {
      // Get user contacts
      const contacts = await UserContact.findByUserId(data.userId)
  
      // Get occurrence category name
      const category = await Category.findById(data.categoryId)
  
      // Remove special characters and convert to lower case
      const categoryName = category.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  
      let msg = ''
  
      switch (data.whenCode) {
        case 0:
          msg = `acabou de ver vitima de ${categoryName}`
          break
        case 1:
          msg = `foi vitima de ${categoryName} ha 30m`
          break
        case 2:
          msg = `foi vitima de ${categoryName} ha + de 1h`
          break
      }
  
      // Build message
      const message = `Teseu: ${user.username} ${msg}`
  
      for (let i = 0; i < contacts.length; i++) {
        await SMSFacade.sendSMS(contacts[i].phone, message)
      }

      return true

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
      let radius = 1000
      if (userId > 0) {
        const userSettings = await UserSetting.findByUserId(userId)
        radius = userSettings.radius
      }
  
      return await Occurrence.nearby(location, radius)

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceService