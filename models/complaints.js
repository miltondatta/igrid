const db = require('../config/db')
const Sequelize = require('sequelize')
const ComCategory = require('./comcategory')
const ComSubCategory = require('./comsubcategory')

const Complaints = db.define('complaints', {
  complaint_no: {
    type: Sequelize.STRING
  },
  createdBy: {
    type: Sequelize.INTEGER
  },
  location_id: {
    type: Sequelize.INTEGER
  },
  role_id: {
    type: Sequelize.INTEGER
  },
  complaint_category: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    references: {
      model: "comCategories",
      key: 'id'
    }
  },
  complaint_sub_category: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    references: {
      model: "comSubCategories",
      key: 'id'
    }
  },
  problem_details: {
    type: Sequelize.STRING
  },
  file_name: {
    type: Sequelize.STRING,
    defaultValue: null,
    allowNull: true
  },
  assign_to: {
    type: Sequelize.INTEGER,
    defaultValue: null,
    allowNull: true
  },
  status: {
    type: Sequelize.INTEGER
  },
  solutionDetails: {
    type: Sequelize.STRING,
    defaultValue: null,
    allowNull: true
  },
  solved_by: {
    type: Sequelize.STRING,
    defaultValue: null,
    allowNull: true
  },
  solved_at: {
    defaultValue: null,
    allowNull: true,
    type: Sequelize.DATE
  }
})

module.exports = Complaints