const Sequelize = require('sequelize')

class Occurrence extends Model {

  static init(sequelize, DataTypes) {
    return super.init({
      victim: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        validate: {
          notNull: true
        }
      },
      when: {
        allowNull: false,
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
        validate: {
          notNull: true
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: true
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      notifyContacts: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        validate: {
          notNull: true
        }
      },
      location: {
        allowNull: false,
        type: Sequelize.GEOMETRY('POINT'),
        validate: {
          notNull: true
        }
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
