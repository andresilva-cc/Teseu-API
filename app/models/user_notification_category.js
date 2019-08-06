const Sequelize = require('sequelize')

class UserNotificationCategory extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
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

module.exports = UserNotificationCategory
