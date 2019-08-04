class User extends Model { }

User.init({
  username: {
    allowNull: false,
    type: Sequelize.STRING,
    unique: true
  },
  phone: {
    allowNull: false,
    type: Sequelize.STRING(15),
    unique: true
  },
  points: {
    allowNull: false,
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  level: {
    allowNull: false,
    type: Sequelize.SMALLINT,
    defaultValue: 1
  }
}, { sequelize, modelName: 'user' })
