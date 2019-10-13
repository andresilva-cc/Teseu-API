const Category = require('../repositories').Category
const User = require('../repositories/').User
const UserPlace = require('../repositories').UserPlace
const FCMService = require('./fcm_service')

/** User Place Service */
class UserPlaceService {

  /**
   * Gets user places
   *
   * @static
   * @param {number} userId - User ID
   * @returns {Object} User Places
   * @memberof UserPlaceService
   */
  static async all (userId) {
    try {
      return await UserPlace.findByUserId(userId)

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates an user place
   *
   * @static
   * @param {Object} data - User place data to create
   * @returns {Object} The newly created user place
   * @memberof UserPlaceService
   */
  static async create (data) {
    try {
      // Create user place
      const userPlace = await UserPlace.create(data)

      // Give points to user
      await User.addPoints(data.userId, 2)

      return userPlace

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Deletes an user place
   *
   * @static
   * @param {number} id - Resource ID
   * @returns
   * @memberof UserPlaceService
   */
  static async delete (id) {
    try {
      return await UserPlace.delete(id)

    } catch (ex) {
      throw ex
    }
  }

  static async findNearby (occurrence) {
    try {
      // Get occurrence category name
      const category = await Category.findById(occurrence.categoryId)

      // Get all places nearby this occurrence
      const places = await UserPlace.nearby(occurrence)

      // For each place, send a notification
      places.forEach(place => {
        FCMService.send({
          title: 'Alerta',
          text: `Uma ocorrência de ${category.name} foi registrada próxima ao seu local ${place.name}`,
          sound: 'default'
        }, {}, place.user.FCMToken)
      })

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserPlaceService