const db = require('../config/db')
const Sequelize = require('sequelize')
const ComCategory = require('./comcategory')
const ComSubCategory = require('./comsubcategory')

const Complaints = db.define('complaints', {
  createdBy:{
    type: Sequelize.INTEGER
  },
  locationId:{
    type: Sequelize.INTEGER
  },
  roleID:{
    type: Sequelize.INTEGER
  },
  complaint_category:{
    type: Sequelize.INTEGER,
    references: {
      model: ComCategory,
      key: 'id'
    }
  },
  complaint_sub_category:{
    type: Sequelize.INTEGER,
    references: {
      model: ComSubCategory,
      key: 'id'
    }
  },
  assignTO:{
    type: Sequelize.INTEGER,
    defaultValue: null,
    allowNull: true
  },
  problemDetails:{
    type: Sequelize.STRING
  },
  status:{
    type: Sequelize.BOOLEAN
  },
  solutionDetails:{
    type: Sequelize.STRING,
    defaultValue: null,
    allowNull: true
  },
})

module.exports = Complaints