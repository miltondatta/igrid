const db = require('../config/db')
const Sequelize = require('sequelize')
const Users = require('./user')
const Modules = require('./modules')
const Locations = require('./locations')
const UserRoles = require('./userroles')


const UserAssociateRoles = db.define('user_associate_roles', {
  user_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Users,
      key: 'id'
    }
  },
  location_id: {
    type: Sequelize.INTEGER,
    defaultValue: 0
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