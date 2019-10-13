const Sequelize = require('sequelize')

class User extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          is: /^[a-zA-Z0-9._]+$/
        }
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          len: [10, 15]
        }
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      level: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
      FCMToken: {
        type: DataTypes.STRING
      }
    }, { sequelize })
  }
}

module.exports = User
