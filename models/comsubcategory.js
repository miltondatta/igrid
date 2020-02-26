const db = require('../config/db')
const Sequelize = require('sequelize')
const ComCategory = require('./comcategory')

const ComSubCategory = db.define('comSubCategories', {
  sub_complaint_name:{
    type: Sequelize.STRING
  },
  complain_id: {
    type: Sequelize.INTEGER,
    references: {
      model: ComCategory,
      key: 'id'
    }
  },
  status:{
    type: Sequelize.BOOLEAN
  }
})

module.exports = ComSubCategory