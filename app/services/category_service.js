const Category = require('../repositories/').Category

/** Category Service */
class CategoryService {

  /**
   * Registers a new user
   *
   * @static
   * @returns {Array} List of categories
   * @memberof CategoryService
   */
  static async all () {
    try {
      return await Category.all()

    } catch (ex) {
      throw ex
    }
  }

  /**
   * Creates a new category
   *
   * @static
   * @param {Object} data - Category data to create
   * @returns {Object} The newly created category
   * @memberof CategoryService
   */
  static async create (data) {
    try {
      return await Category.create(data)
      
    } catch (ex) {
      throw ex
    }
  }

  /**
   * Deletes a category
   *
   * @static
   * @param {number} id - ID of the category to delete
   * @returns
   * @memberof CategoryService
   */
  static async delete (id) {
    try {
      return await Category.delete(id)

    } catch (ex) {
      throw ex
    }
  }
}

module.exports = CategoryService