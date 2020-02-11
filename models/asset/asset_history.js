const db = require('../../config/db')
const Sequelize = require('sequelize')

const AssetHistory = db.define('asset_histories', {
  asset_id:{
    type: Sequelize.STRING
  },
  assign_to:{
    type: Sequelize.STRING
  }
})

module.exports = AssetHistory