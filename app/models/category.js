class Category extends Model { }

Category.init({
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  }
}, { sequelize, modelName: 'category' })
