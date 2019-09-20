const Sequelize = require('sequelize')

class Occurrence extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
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
      activeUntil: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { sequelize })
  }
}

module.exports = Occurrence
