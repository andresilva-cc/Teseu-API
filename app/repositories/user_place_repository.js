const Sequelize = require('sequelize')
const BaseRepository = require('./base_repository')
const User = require('../models').User
const UserPlace = require('../models').UserPlace
const UserPlaceCategory = require('../models').UserPlaceCategory

/**
 * User Place repository
 *
 * @extends {BaseRepository}
 */
class UserPlaceRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof UserPlaceRepository
   */
  constructor () {
    super()
    this.model = UserPlace
  }

  /**
   * Creates a new resource
   *
   * @override
   * @param {Object} data Data of the new resource
   * @returns {Object} The newly created resource
   * @memberof OccurrenceReactionRepository
   */
  async create (data) {
    try {
      return await this.model.create(
        data,
        {
          include: [
            {
              model: UserPlaceCategory,
              as: 'categories'
            }
          ]
        }
      )
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Retrieves all user places by its ID
   *
   * @param {number} userId - User ID
   * @returns {Array} The user places
   * @memberof UserPlaceRepository
   */
  async findByUserId (userId) {
    try {
      const userPlaces = await this.model.findAll({
        where: {
          userId
        },
        include: [
          {
            model: UserPlaceCategory,
            as: 'categories'
          }
        ]
      })
  
      return userPlaces


    } catch (ex) {
      throw ex
    }
  }

  /**
   * Retrieves places that are nearby to an occurrence
   *
   * @param {Object} location - Location to search
   * @returns {Object[]} Nearby occurrences
   * @memberof OccurrenceRepository
   */
  async nearby (occurrence) {
    try {
      return await this.model.findAll({
        where: Sequelize.and(
          Sequelize.where(
            Sequelize.fn(
              'ST_DWithin',
              Sequelize.cast(Sequelize.col('UserPlace.location'), 'geography'),
              Sequelize.cast(Sequelize.fn('ST_MakePoint', occurrence.location.coordinates[0], occurrence.location.coordinates[1]), 'geography'),
              Sequelize.col('radius')
            ),
            true
          ),
          Sequelize.where(
            Sequelize.col('categories.categoryId'),
            '=',
            occurrence.categoryId
          )
        ),
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['FCMToken']
          },
          {
            model: UserPlaceCategory,
            as: 'categories'
          }
        ] 
      })

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = UserPlaceRepository