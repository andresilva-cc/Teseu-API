const Sequelize = require('sequelize')

class UserContact extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
          max: 255
        }
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(15),
        validate: {
          notNull: true,
          notEmpty: true,
          len: [10, 15]
        }
      }
    }, {
      updatedAt: false,
      sequelize
    })
  }
}

module.exports = UserContact
