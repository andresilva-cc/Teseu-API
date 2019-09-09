'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserContacts', ['userId', 'phone'], {
      type: 'unique',
      name: 'userId_phone_unique_constraint'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('UserContacts', 'userId_phone_unique_constraint')
  }
}
