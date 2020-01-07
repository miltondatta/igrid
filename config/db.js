const Sequelize = require('sequelize')
const conString = require('./config').development;
module.exports = db = new Sequelize(conString);