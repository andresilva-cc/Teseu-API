const UserContact = require('../repositories').UserContact
const JWTFacade = require('../facades/jwt_facade')
const SMSFacade = require('../facades/sms_facade')
const URLShortenerFacade = require('../facades/url_shortener_facade')

/** User Contact Service */
class UserContactService {

  /**
   * Gets user contacts
   *
   * @static
   * @param {number} userId - User ID
   * @returns {Object} User Contacts
   * @memberof UserContactService
   */
  static async all (userId) {
    try {
      return await UserContact.findByUserId(userId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates an user contact
   *
   * @static
   * @param {Object} data - User contact data to create
   * @returns {Object} The newly created user contact
   * @memberof UserContactService
   */
  static async create (data, user) {
    try {
      const userContact = await UserContact.create(data)

      await this.notifyContact(userContact.id, userContact.phone, user.username)

      return userContact

    } catch (ex) {
      throw ex
    }
  }

  static async notifyContact (userContactId, number, username) {
    try {
      // Generate revoke token
      const token = await JWTFacade.sign({ id: userContactId }, {})
  
      // Generate revoke URL
      const URL = `${process.env.APP_URL}/revoke/${token}`
  
      // Shorten URL
      const shortenedURL = await URLShortenerFacade.shorten(URL)
  
      // Build message
      const message = `Teseu: ${username} te adicionou como contato de emergencia. P/ revogar, acesse: ${shortenedURL}`
  
      return await SMSFacade.sendSMS(number, message)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Deletes an user contact
   *
   * @static
   * @param {number} id - Resource ID
   * @returns
   * @memberof UserContactService
   */
  static async delete (id) {
    try {
      return await UserContact.delete(id)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Revokes an user contact
   *
   * @static
   * @param {string} token
   * @returns
   * @memberof UserContactService
   */
  static async revoke (token) {
    try {
      const decode = JWTFacade.verify(token, null)
      return await this.delete(decode.id)

      // TODO: Notify user about revoke action

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserContactService