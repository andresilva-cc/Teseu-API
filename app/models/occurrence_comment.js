const Sequelize = require('sequelize')

class OccurrenceComment extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      occurrenceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comment: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true,
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
  }
}

module.exports = OccurrenceComment
