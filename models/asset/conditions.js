const db = require('../../config/db')
const Sequelize = require('sequelize')

const Conditions = db.define('Conditions', {
  condition_type:{
    type: Sequelize.STRING
  }
})

module.exports = Conditions