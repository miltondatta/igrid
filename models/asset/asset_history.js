const db = require('../../config/db')
const Sequelize = require('sequelize')

const AssetHistory = db.define('asset_histories', {
  asset_id:{
    type: Sequelize.INTEGER
  },
  assign_from:{
    type: Sequelize.INTEGER
  },
  assign_to:{
    type: Sequelize.INTEGER
  },
  status:{
    type: Sequelize.INTEGER
  }
})

module.exports = AssetHistory