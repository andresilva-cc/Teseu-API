const Sequelize = require("sequelize")

const env = process.env.ENVIRONMENT || 'development'
const config = require(__dirname + '/../../config/sequelize.js')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

// Models
const CategoryModel = require("./category")

// Init Models
const models = {
  Category: CategoryModel.init(sequelize, Sequelize)
}

// Run associations if it exists
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models))

const db = {
  ...models,
  sequelize
}

module.exports = db
