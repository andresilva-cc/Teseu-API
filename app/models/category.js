const Sequelize = require('sequelize')

class Category extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    }, { sequelize })
  }
}

module.exports = Category
