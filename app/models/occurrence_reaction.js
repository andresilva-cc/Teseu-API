const Sequelize = require('sequelize')

class OccurrenceReaction extends Sequelize.Model {

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
      reaction: {
        allowNull: false,
        type: DataTypes.SMALLINT
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['occurrenceId', 'userId', 'reaction']
        }
      ],
      updatedAt: false,
      sequelize 
    })
  }
}

module.exports = OccurrenceReaction
