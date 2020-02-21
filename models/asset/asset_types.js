const db = require('../../config/db')
const Sequelize = require('sequelize')

const AssetType = db.define('asset_types', {
  type_name:{
    type: Sequelize.STRING
  },
  asset_code:{
    type: Sequelize.STRING
  },
  description:{
    type: Sequelize.STRING
  },
})

module.exports = AssetType