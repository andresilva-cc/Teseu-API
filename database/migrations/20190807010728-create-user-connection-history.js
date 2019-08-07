'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserConnectionHistory', {
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
      address: {
        allowNull: false,
        type: Sequelize.INET
      },
      accessOn: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserConnectionHistory')
  }
}