const db = require('../config/db')
const Status = require('./status')
const Sequelize = require('sequelize')
const UserRoles = require('./userroles')
const AssetCategory = require('./asset/assetCategory')
const AssetSubCategory = require('./asset/assetSubCategory')


const TransferRequest = db.define('transfer_requests', {
  details: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  request_from: {
    type: Sequelize.INTEGER,
    references: {
      model: UserRoles,
      key: 'id'
    }
  },
  status: {
    allowNull: false,
    defaultValue: 6,
    type: Sequelize.INTEGER,
    references: {
      model: Status,
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