'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('OccurrenceReports', 'description'),
      queryInterface.addColumn('OccurrenceReports', 'description', {
        allowNull: false,
        type: Sequelize.TEXT,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('OccurrenceReports', 'description'),
      queryInterface.addColumn('OccurrenceReports', 'description', {
        allowNull: false,
        type: Sequelize.INTEGER
      })
    ])
  }
}
