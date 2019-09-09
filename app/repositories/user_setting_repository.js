const BaseRepository = require('./base_repository')
const UserSetting = require('../models').UserSetting
const UserNotificationCategory = require('../models').UserNotificationCategory
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
   * @memberof UserSettingRepository
   */
  async findByUserId (userId) {
    try {
      const userSettings = await this.model.findOne({
        where: {
          userId
        },
        include: [
          {
            model: UserNotificationCategory,
            as: 'categories'
          }
        ]
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

  /**
   * Adds categories to user settings
   *
   * @param {number} userId - User ID
   * @param {array} categories - Categories to add
   * @returns {Object} The updated settings
   * @memberof UserSettingRepository
   */
  async addCategories (userId, categories) {
    try {
      await Promise.all(categories.map(async category =>
        UserNotificationCategory.create({
          userId,
          categoryId: category.id
        })
      ))

      return true

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Deletes all categories of user settings
   * This method is used before settings updates
   *
   * @param {number} userId - User ID
   * @memberof UserSettingRepository
   */
  async deleteCategories (userId) {
    try {
      return await UserNotificationCategory.destroy({
        where: {
          userId
        }
      })

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserSettingRepository
