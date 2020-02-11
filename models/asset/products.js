const db = require('../../config/db')
const Sequelize = require('sequelize')
const Models = require('./models')
const AssetCategory = require('./assetCategory')
const AssetSubCategory = require('./assetSubCategory')
const Brands = require('./brands')

const Products = db.define('products', {
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
    brand_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Brands,
            key: 'id'
        },
    },
    model_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Models,
            key: 'id'
        },
    },
    product_name:{
        type: Sequelize.STRING
    },
    product_code:{
        type: Sequelize.STRING
    },
})

module.exports = Products