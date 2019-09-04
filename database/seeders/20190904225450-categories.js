'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Furto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Roubo a pessoa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Roubo de veículo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Roubo de casa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Roubo de comércio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Homicídio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sequestro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Agressão física',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Crime sexual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vandalismo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Venda e uso de drogas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
}
