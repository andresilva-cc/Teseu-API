const EmergencyMode = require('../repositories/').EmergencyMode
const UserContact = require('../repositories/').UserContact
const SMSFacade = require('../facades/sms_facade')
const Error = require('../utils/error')

/** Emergency Mode Service */
class EmergencyModeService {
  
  /**
   * Checks if emergency mode is enabled
   *
   * @static
   * @param {number} userId - User ID 
   * @memberof EmergencyModeService
   */
  static async check (userId) {
    try {
      return await EmergencyMode.isEnabled(userId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Enable emergency mode
   *
   * @static
   * @param {Object} user - User 
   * @memberof EmergencyModeService
   */
  static async enable (user) {
    try {
      // Check if emergency mode is already enabled
      const isEnabled = await EmergencyMode.isEnabled(user.id)

      // If already enabled, throw error
      if (isEnabled) {
        throw new Error('EmergencyModeAlreadyEnabledError')
      }

      // If not, enable it
      await EmergencyMode.create({ userId: user.id })

      // Notify user contacts
      this.notifyContacts(user, true)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Disable emergency mode
   *
   * @static
   * @param {Object} user - User 
   * @memberof EmergencyModeService
   */
  static async disable (user) {
    try {
      // Check if emergency mode is enabled
      const isEnabled = await EmergencyMode.isEnabled(user.id)

      // If not enabled, throw error
      if (!isEnabled) {
        throw new Error('EmergencyModeNotEnabledError')
      }

      // If enabled, disable it
      await EmergencyMode.disable(user.id)

      // Notify user contacts
      this.notifyContacts(user, false)

    } catch (ex) {
      throw ex
    }
  }

    /**
   * Notify user contacts about the emergency
   *
   * @static
   * @param {Object} user - User info
   * @param {boolean} enabling - If enabling emergency mode
   * @memberof EmergencyModeService
   */
  static async notifyContacts (user, enabling) {
    try {
      // Get user contacts
      const contacts = await UserContact.findByUserId(user.id)
  
      // Build message
      let message = `Teseu: ${user.username} `

      if (enabling)
        message += 'esta em uma emergencia'
      else
        message += 'esta seguro agora'
      
      for (let i = 0; i < contacts.length; i++) {
        SMSFacade.sendSMS(contacts[i].phone, message)
      }

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = EmergencyModeService