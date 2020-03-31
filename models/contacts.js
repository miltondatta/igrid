const db = require('../config/db')
const Sequelize = require('sequelize')

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
    type: Sequelize.INTEGER
  },
  role_id:{
    type: Sequelize.INTEGER
  },
  location_id:{
    type: Sequelize.INTEGER
  }
})

module.exports = Contacts