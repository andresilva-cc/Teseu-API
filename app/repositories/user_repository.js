const Sequelize = require('sequelize')
const BaseRepository = require('./base_repository')
const User = require('../models').User
const UserSetting = require('../models').UserSetting
const UserNotificationCategory = require('../models').UserNotificationCategory

/**
 * User repository
 *
 * @extends {BaseRepository}
 */
class UserRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof UserRepository
   */
  constructor () {
    super()
    this.model = User
    this.levels = {
      0: 0,
      2: 25,
      3: 50,
      4: 100,
      5: 200,
      6: 400,
      7: 800,
      8: 1600,
      9: 3200,
      10: 6400
    }
  }

  /**
   * Retrieves a user by its phone number
   *
   * @param {string} phone Phone number
   * @returns {Object|null} The user if found, null if not
   * @memberof UserRepository
   */
  async findByPhone (phone) {
    try {
      const user = await this.model.findOne({
        where: {
          phone
        }
      })
  
      return user

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Checks if the username already exists
   *
   * @param {string} username The username to check
   * @returns {boolean}
   * @memberof UserRepository
   */
  async usernameExists (username) {
    const user = await this.model.findOne({
      where: {
        username
      }
    })

    return user !== null
  }

  /**
   * Gets user level and points
   *
   * @param {number} userId - User ID
   * @returns {Object} User level and points
   * @memberof UserRepository
   */
  async level (userId) {
    try {
      return await this.model.findByPk(userId, {
        attributes: ['level', 'points']
      })

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Add points to an user
   *
   * @param {number} userId - User ID
   * @param {number} points - Amount of points to add
   * @returns {boolean} True if updated successfully
   * @memberof UserRepository
   */
  async addPoints (userId, points) {
    try {
      // Find user
      const user = await this.findById(userId)
  
      // Calculate points
      const newPoints = user.points + points

      // New level
      let newLevel = 0
  
      // Check if user has leveled up
      Object.keys(this.levels).forEach(level => {
        if (newPoints >= this.levels[level])
          newLevel = level
      })
  
      await user.update({
        points: newPoints,
        level: newLevel < user.level? user.level : newLevel
      })
      
      return true

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Remove points from an user
   *
   * @param {number} userId - User ID
   * @param {number} points - Amount of points to remove
   * @returns {boolean} True if updated successfully
   * @memberof UserRepository
   */
  async removePoints (userId, points) {
    try {
      // Find user
      const user = await this.findById(userId)
  
      // Calculate points
      const newPoints = user.points - points

      await user.update({
        points: newPoints
      })
      
      return true

    } catch (ex) {
      throw ex
    }
  }


  /**
   * Retrieves users that are nearby to an occurrence
   *
   * @param {Object} location - Location to search
   * @returns {Object[]} Users
   * @memberof OccurrenceRepository
   */
  async nearby (occurrence) {
    try {
      return await this.model.findAll({
        where: Sequelize.and(
          Sequelize.where(
            Sequelize.fn(
              'ST_DWithin',
              Sequelize.cast(Sequelize.col('User.location'), 'geography'),
              Sequelize.cast(Sequelize.fn('ST_MakePoint', occurrence.location.coordinates[0], occurrence.location.coordinates[1]), 'geography'),
              Sequelize.col('settings.radius')
            ),
            true
          ),
          Sequelize.where(
            Sequelize.col('settings.categories.categoryId'),
            '=',
            occurrence.categoryId
          )
        ),
        include: [
          {
            model: UserSetting,
            as: 'settings',
            include: [
              {
                model: UserNotificationCategory,
                as: 'categories'
              }
            ]
          }
        ] 
      })

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserRepository