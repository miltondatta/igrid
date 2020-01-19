const db = require('../../config/db')
const Sequelize = require('sequelize')

const AssetCategory = db.define('Asset_categories', {
    category_name:{
        type: Sequelize.STRING
    },
    category_code:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    }
})

module.exports = AssetCategory