const db = require('../config/db')
const Sequelize = require('sequelize')

const ComCategory = db.define('comCategories', {
  complaint_name:{
    type: Sequelize.STRING
  },
  status:{
    type: Sequelize.BOOLEAN
  }
})

module.exports = ComCategory