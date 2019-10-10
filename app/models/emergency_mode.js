const Sequelize = require('sequelize')

class EmergencyMode extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      active: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      tableName: 'EmergencyMode',
      sequelize
    })
  }
}

module.exports = EmergencyMode
