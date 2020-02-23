const db = require('../../config/db')
const Sequelize = require('sequelize')

const Conditions = db.define('conditions', {
  condition_type:{
    type: Sequelize.STRING
  }, 
  description: {
    type: Sequelize.STRING
  }
})

module.exports = Conditions