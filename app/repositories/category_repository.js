const BaseRepository = require('./base_repository')
const Category = require('../models').Category

/**
 * Category repository
 *
 * @extends {BaseRepository}
 */
class CategoryRepository extends BaseRepository {
  
  /**
   * Creates an instance of the repository.
   * @memberof CategoryRepository
   */
  constructor () {
    super()
    this.model = Category
  }
}

module.exports = CategoryRepository