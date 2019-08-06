'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Occurrences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      victim: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      when: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId'
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      notifyContacts: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      location: {
        allowNull: false,
        type: Sequelize.GEOMETRY('POINT')
      },
      attachment: {
        type: Sequelize.STRING
      },
      active: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Occurrences')
  }
}