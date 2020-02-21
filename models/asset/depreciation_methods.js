const db = require('../../config/db')
const Sequelize = require('sequelize')

const DepreciationMethods = db.define('depreciation_methods', {
  method_name:{
    type: Sequelize.STRING
  },
  depreciation_code:{
    type: Sequelize.STRING
  },
  description:{
    type: Sequelize.STRING
  }
})

module.exports = DepreciationMethods