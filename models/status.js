const db = require('../config/db')
const Sequelize = require('sequelize')


const Status = db.define('statuses', {
  status_name: {
    type: Sequelize.STRING
  }
})


module.exports = Status