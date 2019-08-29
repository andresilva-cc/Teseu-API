const CategoryController = require('../app/controllers/category_controller')
const auth = require('../middlewares/auth')

module.exports = app => {
  app.get('/category', CategoryController.all)
  app.post('/category', auth('admin'), CategoryController.create)
  app.delete('/category/:id', auth('admin'), CategoryController.delete)
}
