const CategoryService = require('../services/category_service')

/** Category Controller */
class CategoryController {

  /**
   * Returns all categories
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof CategoryController
   */
  static async all (req, res, next) {
    try {
      const categories = await CategoryService.all()
      return res.status(200).send(categories)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Creates a new category
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof CategoryController
   */
  static async create (req, res, next) {
    try {
      const category = await CategoryService.create(req.body)
      return res.status(201).send(category)

    } catch (ex) {
      return next(ex)
    }
  }

  /**
   * Deletes a category
   *
   * @static
   * @param {Object} req - Requisition
   * @param {Object} res - Response
   * @param {function} next - Next function
   * @returns
   * @memberof CategoryController
   */
  static async delete (req, res, next) {
    try {
      const category = await CategoryService.delete(req.params.id)
      return res.status(200).send(category)

    } catch (ex) {
      return next(ex)
    }
  }
}

module.exports = CategoryController