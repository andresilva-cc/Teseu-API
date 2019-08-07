const Sequelize = require('sequelize')

class UserConnectionHistory extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      address: {
        allowNull: false,
        type: Sequelize.INET,
        validate: {
          notNull: true,
          isIP: true
        }
      }
    }, {
      createdAt: 'accessOn',
      updatedAt: false,
      tableName: 'UserConnectionHistory',
      sequelize
    })
  }
}

module.exports = UserConnectionHistory



