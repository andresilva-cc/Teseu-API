const Sequelize = require('sequelize')

class UserSetting extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
      },
      enableNotifications: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
        validate: {
          notNull: true
        }
      },
      frequency: {
        allowNull: false,
        defaultValue: 5,
        type: DataTypes.SMALLINT,
        validate: {
          notNull: true,
          isInt: true,
          min: 1,
          max: 60
        }
      },
      radius: {
        allowNull: false,
        defaultValue: 1000,
        type: DataTypes.SMALLINT,
        validate: {
          notNull: true,
          isInt: true,
          min: 100,
          max: 5000
        }
      },
    }, {
      createdAt: false,
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.UserNotificationCategory, {
      as: 'categories',
      sourceKey: 'userId',
      foreignKey: 'userId'
    })
  }
}

module.exports = UserSetting
