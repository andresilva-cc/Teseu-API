class User extends Model { }

User.init({
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[a-zA-Z0-9._]+$/,
      notNull: true,
      notEmpty: true
    }
  },
  phone: {
    type: Sequelize.STRING(15),
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  level: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    defaultValue: 1
  }
}, { sequelize, modelName: 'user' })
