const Sequelize = require('sequelize')

class UserPlace extends Sequelize.Model {

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
      location: {
        allowNull: false,
        type: DataTypes.GEOMETRY('POINT'),
        validate: {
          notNull: true
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
      }
    }, {
      updatedAt: false,
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })
    
    this.hasMany(models.UserPlaceCategory, {
      as: 'categories',
      foreignKey: 'userPlaceId'
    })
  }
}

module.exports = UserPlace
