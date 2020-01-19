const db = require('../../config/db')
const Sequelize = require('sequelize')
const AssetCategory = require('./assetCategory')

const AssetSubCategory = db.define('Asset_sub_categories', {
    category_id:{
        type: Sequelize.INTEGER,
        references: {
            model: AssetCategory,
            key: 'id'
        },
    },
    sub_category_name:{
        type: Sequelize.STRING
    },
    sub_category_code:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    },
})

module.exports = AssetSubCategory