'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserPlaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.GEOMETRY('POINT')
      },
      radius: {
        allowNull: false,
        defaultValue: 1000,
        type: Sequelize.SMALLINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserPlaces')
  }
}