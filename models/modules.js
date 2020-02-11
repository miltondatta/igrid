const db = require('../config/db')
const Sequelize = require('sequelize')


const Modules = db.define('modules', {
  module_name: {
    type: Sequelize.STRING
  },
  image_name: {
    type: Sequelize.STRING
  },
  initial_link: {
    type: Sequelize.STRING
  },
  order_by: {
    type: Sequelize.INTEGER
  }
})


module.exports = Modules