const db = require('../config/db')
const Sequelize = require('sequelize')


const Status = db.define('status', {
  status_name: {
    type: Sequelize.STRING
  }
})


module.exports = Status