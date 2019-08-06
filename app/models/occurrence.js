const Sequelize = require('sequelize')

class Occurrence extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      victim: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        validate: {
          notNull: true
        }
      },
      when: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
        validate: {
          notNull: true
        }
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true
        }
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      notifyContacts: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        validate: {
          notNull: true
        }
      },
      location: {
        allowNull: false,
        type: DataTypes.GEOMETRY('POINT'),
        validate: {
          notNull: true
        }
      },
      attachment: {
        type: DataTypes.STRING
      },
      active: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    }, { sequelize })
  }
}

module.exports = Occurrence
