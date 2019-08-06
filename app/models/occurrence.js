const Sequelize = require('sequelize')

class Occurrence extends Model {

  static init(sequelize, DataTypes) {
    return super.init({
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
      }
    }, { sequelize })
  }
}

module.exports = Occurrence
