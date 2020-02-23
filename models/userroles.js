const db = require('../config/db')
const Modules = require('./modules')
const Sequelize = require('sequelize')


const UserRoles = db.define('user_roles', {
  role_name: {
    type: Sequelize.STRING
  },
  role_desc: {
    type: Sequelize.STRING
  },
  module_id: {
    defaultValue: 0,
    type: Sequelize.INTEGER
  }
})


module.exports = UserRoles