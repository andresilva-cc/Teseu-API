const UserPlaceService = require('../services/user_place_service')
const UserPlace = require('../repositories').UserPlace
const Error = require('../utils/error')

/** User Place Controller */
class UserPlaceController {

  /**
   * Gets user places
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserPlaceController
   */
  static async all (req, res, next) {
    try {
      const userId = req.user.id
      const userPlaces = await UserPlaceService.all(userId)
      
      return res.status(200).send(userPlaces)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Creates an user place
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserPlaceController
   */
  static async create (req, res, next) {
    try {
      const userId = req.user.id
      const data = req.body

      data.userId = userId

      const userPlace = await UserPlaceService.create(data)

      return res.status(201).send(userPlace)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Deletes an user place
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof UserPlaceController
   */
  static async delete (req, res, next) {
    try {
      const userId = req.user.id
      const id = req.params.id

      // Check if user is allowed to delete this place
      const place = await UserPlace.findById(id)

      if (place.userId != userId)
        throw new Error('ForbiddenError')

      const userPlace = await UserPlaceService.delete(id)

      return res.status(200).send(userPlace)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = UserPlaceController