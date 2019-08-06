const Sequelize = require('sequelize')

class OccurrenceReport extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      occurrenceId: {
        allowNull: false,
        type: SequelDataTypesize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      status: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.SMALLINT
      },
    }, { sequelize })
  }
}

module.exports = OccurrenceReport
