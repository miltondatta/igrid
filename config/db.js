const Sequelize = require('sequelize')

module.exports = db = new Sequelize('postgres://iGrid:123456@localhost:5432/iGrid');