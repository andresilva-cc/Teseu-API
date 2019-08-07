const Sequelize = require('sequelize')

class UserPlaceCategory extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      userPlaceId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      }
    }, {
      timestamps: false,
      sequelize
    })
  }
}

module.exports = UserPlaceCategory
