const BaseRepository = require('./base_repository')
const EmergencyMode = require('../models').EmergencyMode

/**
 * Emergency Mode repository
 *
 * @extends {BaseRepository}
 */
class EmergencyModeRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof EmergencyModeRepository
   */
  constructor () {
    super()
    this.model = EmergencyMode
  }

  async findMostRecentByUserId (userId) {
    try {
      return await this.model.findOne({
        where: {
          userId
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

    } catch (ex) {
      throw ex
    }

  }

  /**
   * Checks if emergency mode is enabled for an user
   *
   * @param {number} userId User ID
   * @returns {boolean} True if enabled, false if disabled
   * @memberof EmergencyModeRepository
   */
  async isEnabled (userId) {
    try {
      const resource = await this.findMostRecentByUserId(userId)

      if (resource)
        return resource.active
      else
        return false

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Disable emergency mode
   *
   * @param {number} userId User ID
   * @returns {boolean} True if the resource was updated successfully
   * @memberof EmergencyModeRepository
   */
  async disable (userId) {
    try {
      const resource = await this.findMostRecentByUserId(userId)

      if (resource) {
        await resource.update({ active: false })
        return true
      }

      throw new Error('ResourceNotFoundError')

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = EmergencyModeRepository