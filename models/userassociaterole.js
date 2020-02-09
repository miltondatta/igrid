const db = require('../config/db')
const Sequelize = require('sequelize')
const Users = require('./user')
const Modules = require('./modules')
const Locations = require('./locations')
const UserRoles = require('./userroles')


const UserAssociateRoles = db.define('UserAssociateRoles', {
  user_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Users,
      key: 'id'
    }
  },
  module_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Modules,
      key: 'id'
    }
  },
  location_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Locations,
      key: 'id'
    }
  },
  role_id: {
    type: Sequelize.INTEGER,
    references:{
      model: UserRoles,
      key: 'id'
    }
  },
})


module.exports = UserAssociateRoles