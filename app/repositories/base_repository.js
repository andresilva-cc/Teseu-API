const Error = require('../utils/error')

/** Base repository to be extended by other repositories */
class BaseRepository {

  /**
   * Returns all resources
   *
   * @returns {Object[]} Resources
   * @memberof BaseRepository
   */
  async all () {
    try {
      return await this.model.findAll()
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Retrieves a resource by its ID
   *
   * @param {number} id ID of the resource
   * @returns {Object|null} The resource if found, null if not
   * @memberof BaseRepository
   */
  async findById (id) {
    try {
      const resource = await this.model.findByPk(id)

      if (resource)
        return resource

      throw new Error('ResourceNotFoundError')

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates a new resource
   *
   * @param {Object} data Data of the new resource
   * @returns {Object} The newly created resource
   * @memberof BaseRepository
   */
  async create (data) {
    try {
      return await this.model.create(data)
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Updates a resource
   *
   * @param {number} id ID of the resource
   * @param {Object} data Data to update
   * @returns {Object} The updated resource
   * @memberof BaseRepository
   */
  async update (id, data) {
    try {
      const resource = await this.findById(id)

      if (resource) {
        await resource.update(data)
        return true
      }

      throw new Error('ResourceNotFoundError')

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Deletes a resource
   *
   * @param {number} id ID of the resource
   * @returns {number} Number of rows deleted
   * @memberof BaseRepository
   */
  async delete (id) {
    try {
      const resource = await this.findById(id)

      if (resource) {
        await resource.destroy()
        return true
      }

      throw new Error('ResourceNotFoundError')
      
    } catch (ex) {
      throw ex
    }
  }
}

module.exports = BaseRepository