const User = require('../repositories/').User
const UserPlace = require('../repositories').UserPlace

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
}

module.exports = UserPlaceService