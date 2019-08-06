const Sequelize = require('sequelize')

class OccurrenceComment extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      occurrenceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT,
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
}

module.exports = OccurrenceComment
