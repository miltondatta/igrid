const db = require('../../config/db')
const Sequelize = require('sequelize')
const Challan = require('./challan')
const Project = require('./project')
const Conditions = require('./conditions')
const AssetType = require('./asset_types')
const AssetCategory = require('./assetCategory')
const AssetSubCategory = require('./assetSubCategory')
const DepreciationMethods = require('./depreciation_methods')

const Assets = db.define('Assets', {
    challan_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Challan,
            key: 'id'
        },
    },
    project_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Project,
            key: 'id'
        },
    },
    asset_category:{
        type: Sequelize.INTEGER,
        references: {
            model: AssetCategory,
            key: 'id'
        },
    },
    asset_sub_category:{
        type: Sequelize.INTEGER,
        references: {
            model: AssetSubCategory,
            key: 'id'
        },
    },
    product_serial:{
        type: Sequelize.STRING
    },
    cost_of_purchase:{
        type: Sequelize.DOUBLE
    },
    installation_cost:{
        type: Sequelize.DOUBLE
    },
    carrying_cost:{
        type: Sequelize.DOUBLE
    },
    other_cost:{
        type: Sequelize.DOUBLE
    },
    asset_type:{
        type: Sequelize.INTEGER,
        references: {
            model: AssetType,
            key: 'id'
        },
    },
    depreciation_method:{
        type: Sequelize.INTEGER,
        references: {
            model: DepreciationMethods,
            key: 'id'
        },
    },
    rate:{
        type: Sequelize.INTEGER
    },
    effective_date:{
        type: Sequelize.DATE
    },
    book_value:{
        type: Sequelize.DOUBLE
    },
    salvage_value:{
        type: Sequelize.DOUBLE
    },
    useful_life:{
        type: Sequelize.DOUBLE
    },
    last_effective_date:{
        type: Sequelize.DATE
    },
    warranty:{
        type: Sequelize.STRING
    },
    last_warranty_date:{
        type: Sequelize.DATE
    },
    condition:{
        type: Sequelize.INTEGER,
        references: {
            model: Conditions,
            key: 'id'
        },
    },
    comments:{
        type: Sequelize.TEXT
    },
    barcode:{
        type: Sequelize.BOOLEAN
    },
    assign_to:{
        type: Sequelize.STRING
    },
})

module.exports = Assets