'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Occurrences', 'active'),
      queryInterface.addColumn('Occurrences', 'activeUntil', {
        allowNull: false,
        type: Sequelize.DATE
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Occurrences', 'activeUntil'),
      queryInterface.addColumn('Occurrences', 'active', {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      })
    ])
  }
}
