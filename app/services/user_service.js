const User = require('../repositories').User
const Category = require('../repositories').Category
const FCMService = require('./fcm_service')

/** User Service */
class UserService {

  /**
   * Gets user level and points
   *
   * @static
   * @param {number} userId - User ID
   * @returns {Object} User level and points
   * @memberof UserService
   */
  static async level (userId) {
    try {
      return await User.level(userId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Updates user location
   *
   * @static
   * @param {number} userId - User ID
   * @param {number} location - location
   * @memberof UserService
   */
  static async location (userId, location) {
    try {
      return await User.update(userId, location)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Find and notify nearby users about an occurrence
   *
   * @static
   * @param {Object} occurrence - Occurrence data
   * @returns {Number[]} Users that have been notified
   * @memberof UserService
   */
  static async findNearby (occurrence) {
    try {
      // Get occurrence category name
      const category = await Category.findById(occurrence.categoryId)

      // Get all users nearby this occurrence
      const users = await User.nearby(occurrence)

      let notifiedUsers = []

      // For each user, send a notification
      users.forEach(user => {
        FCMService.send({
          title: 'Alerta',
          text: `Uma ocorrência de ${category.name} foi registrada próxima ao seu local atual`,
          sound: 'default'
        }, {}, user.FCMToken)

        notifiedUsers.push(user.id)
      })

      return notifiedUsers
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Updates FCM token
   *
   * @static
   * @param {number} userId - User ID
   * @param {string} token - FCM Token
   * @memberof UserService
   */
  static async updateFCMToken (userId, token) {
    try {
      return await User.update(userId, {
        FCMToken: token
      })

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = UserService