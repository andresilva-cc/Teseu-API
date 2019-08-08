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
}

module.exports = BaseRepository