const db = require('../config/db')
const Sequelize = require('sequelize')
const UserRoles = require('./userroles')
const AssetCategory = require('./asset/assetCategory')
const AssetSubCategory = require('./asset/assetSubCategory')


const TransferRequest = db.define('transferRequests', {
  details: {
    type: Sequelize.STRING
  },
  request_from: {
    type: Sequelize.INTEGER,
    references: {
      model: UserRoles,
      key: 'id'
    }
  },
  request_to: {
    type: Sequelize.INTEGER,
    references: {
      model: UserRoles,
      key: 'id'
    }
  },
  category_id:{
    type: Sequelize.INTEGER,
    references: {
      model: AssetCategory,
      key: 'id'
    },
  },
  sub_category_id:{
    type: Sequelize.INTEGER,
    references: {
      model: AssetSubCategory,
      key: 'id'
    },
  },
})


module.exports = TransferRequest