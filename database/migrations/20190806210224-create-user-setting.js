'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      enableNotifications: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      frequency: {
        allowNull: false,
        defaultValue: 5,
        type: Sequelize.SMALLINT
      },
      radius: {
        allowNull: false,
        defaultValue: 1000,
        type: Sequelize.SMALLINT
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserSettings')
  }
}