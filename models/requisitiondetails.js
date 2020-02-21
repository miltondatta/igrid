const db = require('../config/db')
const Sequelize = require('sequelize')
const AssetCategory = require('./asset/assetCategory')
const RequisitionMaster = require('./requisitionmaster')
const AssetSubCategory = require('./asset/assetSubCategory')


const RequisitionDetails = db.define('requisition_details', {
  requisition_id: {
    type: Sequelize.INTEGER,
    references:{
      model: RequisitionMaster,
      key: 'id'
    }
  },
  asset_category: {
    type: Sequelize.INTEGER,
    references: {
      model: AssetCategory,
      key: 'id'
    }
  },
  asset_sub_category: {
    type: Sequelize.INTEGER,
    references:{
      model: AssetSubCategory,
      key: 'id'
    }
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: true
  },
  model: {
    type: Sequelize.STRING,
    allowNull: true
  },
  reason: {
    type: Sequelize.STRING,
    allowNull: true
  },
  details: {
    type: Sequelize.STRING,
    allowNull: true
  },
  expected_date: {
    type: Sequelize.STRING,
    allowNull: true
  },
  file: {
    type: Sequelize.STRING,
    allowNull: true
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})


module.exports = RequisitionDetails