const Sequelize = require('sequelize')
const BaseRepository = require('./base_repository')
const Occurrence = require('../models').Occurrence
const Category = require('../models').Category
const User = require('../models').User
const moment = require('moment')
const Error = require('../utils/error')

/**
 * Occurrence repository
 *
 * @extends {BaseRepository}
 */
class OccurrenceRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof OccurrenceRepository
   */
  constructor () {
    super()
    this.model = Occurrence
    this.attributesWithoutIdentification = [
      'id',
      'victim',
      'when',
      'categoryId',
      'description',
      'location',
      'attachment',
      'activeUntil',
      'createdAt',
      'updatedAt'
    ]
  }

  /**
   * Returns all resources
   *
   * @override
   * @returns {Object[]} Resources
   * @memberof OccurrenceRepository
   */
  async all () {
    try {
      return await this.model.findAll({
        attributes: this.attributesWithoutIdentification
      })
      
    } catch (ex) {
      throw ex
    }
  }
  
  /**
   * Retrieves a resource by its ID
   *
   * @override
   * @param {number} id ID of the resource
   * @param {boolean} removeIdentification - Whether to remove user identification from the resource
   * @returns {Object|null} The resource if found, null if not
   * @memberof OccurrenceRepository
   */
  async findById (id, removeIdentification) {
    try {
      let resource

      if (removeIdentification) {
        resource = await this.model.findByPk(id, {
          attributes: this.attributesWithoutIdentification,
          include: [
            {
              model: Category,
              as: 'category'
            }
          ]
        })
      } else {
        resource = await this.model.findByPk(id, {
          include: [
            {
              model: Category,
              as: 'category'
            },
            {
              model: User,
              as: 'user',
              attributes: [
                'username',
                'level'
              ]
            }
          ]
        })
      }

      if (resource)
        return resource

      throw new Error('ResourceNotFoundError')

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Gets nearby occurrences
   *
   * @param {Object} location - Location to search
   * @param {number} distance - Distance to search
   * @returns {Object[]} Nearby occurrences
   * @memberof OccurrenceRepository
   */
  async nearby (location, distance) {
    const now = moment().format()

    return await this.model.findAll({
      where: Sequelize.and(
        Sequelize.where(
          Sequelize.fn(
            'ST_DWithin',
            Sequelize.cast(Sequelize.col('location'), 'geography'),
            Sequelize.cast(Sequelize.fn('ST_MakePoint', location.coordinates[0], location.coordinates[1]), 'geography'),
            distance
          ),
          true
        ),
        Sequelize.where(
          Sequelize.col('activeUntil'),
          '>=',
          now
        )
      ),
      include: [
        {
          model: Category,
          as: 'category'
        },
        {
          model: User,
          as: 'user',
          attributes: [
            'username',
            'level'
          ]
        }
      ] 
    })
  }

  /**
   * Increments the occurrence active time
   *
   * @param {number} occurrenceId - Occurrence ID
   * @param {number} amount - Amount to add
   * @param {string} unit - Unit of time
   * @returns {boolean} True if updated successfully
   * @memberof OccurrenceRepository
   */
  async incrementActiveTime (occurrenceId, amount, unit) {
    try {
      const occurrence = await this.findById(occurrenceId)
  
      const activeUntil = moment(occurrence.activeUntil)
        .add(amount, unit)
        
      await occurrence.update({
        activeUntil
      })

      return true

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Decrements the occurrence active time
   *
   * @param {number} occurrenceId - Occurrence ID
   * @param {number} amount - Amount to sub
   * @param {string} unit - Unit of time
   * @returns {boolean} True if updated successfully
   * @memberof OccurrenceRepository
   */
  async decrementActiveTime (occurrenceId, amount, unit) {
    try {
      const occurrence = await this.findById(occurrenceId)
  
      const activeUntil = moment(occurrence.activeUntil)
        .subtract(amount, unit)
        
      await occurrence.update({
        activeUntil
      })

      return true

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceRepository