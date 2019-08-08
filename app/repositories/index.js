// Reporitories
const CategoryRepository = require('./category_repository')

// Initializes and exports repositories
module.exports = {
  Category: new CategoryRepository()
}