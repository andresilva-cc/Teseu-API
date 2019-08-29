const BaseRepository = require('./base_repository')
const UserSetting = require('../models').UserSetting
const Error = require('../utils/error')

/**
 * User Setting repository
 *
 * @extends {BaseRepository}
 */
class UserSettingRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof UserSettingRepository
   */
  constructor () {
    super()
    this.model = UserSetting
  }

  /**
   * Retrieves an user settings by its ID
   *
   * @param {number} userId - User ID
   * @returns {Object|null} The user settings if found, null if not
   * @memberof UserRepository
   */
  async findByUserId (userId) {
    try {
      const userSettings = await this.model.findOne({
        where: {
          userId
        }
      })
  
      if (userSettings)
        return userSettings

      throw new Error('ResourceNotFoundError')

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Updates an user settings by its ID
   *
   * @param {number} userId - User ID
   * @param {Object} data - Data to update
   * @returns {Object} The updated settings
   * @memberof UserSettingRepository
   */
  async updateByUserId (userId, data) {
    try {
      const userSettings = await this.findByUserId(userId)
      return await userSettings.update(data)
      
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserSettingRepository