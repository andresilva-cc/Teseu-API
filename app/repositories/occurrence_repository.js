const BaseRepository = require('./base_repository')
const Occurrence = require('../models').Occurrence
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
   * @memberof BaseRepository
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
   * @memberof BaseRepository
   */
  async findById (id, removeIdentification) {
    try {
      let resource

      if (removeIdentification) {
        resource = await this.model.findByPk(id, {
          attributes: this.attributesWithoutIdentification
        })
      } else {
        resource = await this.model.findByPk(id)
      }

      if (resource)
        return resource

      throw new Error('ResourceNotFoundError')

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = OccurrenceRepository