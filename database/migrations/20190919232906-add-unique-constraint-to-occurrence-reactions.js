'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('OccurrenceReactions', ['occurrenceId', 'userId', 'reaction'], {
      type: 'unique',
      name: 'occurrenceId_userId_reaction_unique_constraint'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('OccurrenceReactions', 'occurrenceId_userId_reaction_unique_constraint')
  }
}
