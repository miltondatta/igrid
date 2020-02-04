const db = require('../config/db')
const Modules = require('./modules')
const Sequelize = require('sequelize')


const Modules = db.define('User_Roles', {
  role_name: {
    type: Sequelize.STRING
  },
  role_desc: {
    type: Sequelize.STRING
  },
  module_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Modules,
      key: 'id'
    }
  }
})


module.exports = Modules