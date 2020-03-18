const db = require('../config/db')
const Sequelize = require('sequelize')


const Modules = db.define('modules', {
  module_name: {
    type: Sequelize.STRING
  },
  image_name: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  initial_link: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  order_by: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null
  }
})


module.exports = Modules