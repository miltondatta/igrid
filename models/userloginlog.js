const Users = require('./user')
const db = require('../config/db')
const Sequelize = require('sequelize')


const UserLoginLogs = db.define('user_login_logs', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id'
    }
  },
  user_ip: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.BOOLEAN
  }
})


module.exports = UserLoginLogs