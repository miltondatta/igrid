const db = require('../config/db')
const Sequelize = require('sequelize')
const Users = require('./user')
const UserRoles = require('./userroles')
const Locations = require('./locations')

const Contacts = db.define('contacts', {
  name:{
    type: Sequelize.STRING
  },
  company:{
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  },
  subject:{
    type: Sequelize.STRING
  },
  message:{
    type: Sequelize.STRING
  },
  user_id:{
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      id: 'id'
    }
  },
  role_id:{
    type: Sequelize.INTEGER,
    references: {
      model: UserRoles,
      id: 'id'
    }
  },
  location_id:{
    type: Sequelize.INTEGER,
    references: {
      model: Locations,
      id: 'id'
    }
  }
})

module.exports = Contacts