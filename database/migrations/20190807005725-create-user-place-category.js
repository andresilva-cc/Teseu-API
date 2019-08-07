'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserPlaceCategories', {
      userPlaceId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'UserPlaces',
          key: 'id',
          as: 'userPlaceId'
        }
      },
      categoryId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId'
        }
      }
    })
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserPlaceCategories')
  }
}