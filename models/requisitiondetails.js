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
  quantity: {
    type: Sequelize.INTEGER
  }
})


module.exports = RequisitionDetails