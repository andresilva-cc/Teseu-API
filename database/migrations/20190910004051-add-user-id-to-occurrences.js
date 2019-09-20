'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Occurrences', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Occurrences', 'userId')
  }
}
