const db = require('../../config/db')
const Sequelize = require('sequelize')
const Challan = require('./challan')
const Project = require('./project')
const Products = require('./products')
const Conditions = require('./conditions')
const AssetType = require('./asset_types')
const AssetCategory = require('./assetCategory')
const AssetSubCategory = require('./assetSubCategory')
const DepreciationMethods = require('./depreciation_methods')

const Assets = db.define('assets', {
    challan_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Challan,
            key: 'id'
        },
    },
    project_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Project,
            key: 'id'
        },
    },
    product_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Products,
            key: 'id'
        },
    },
    asset_category: {
        type: Sequelize.INTEGER,
        references: {
            model: AssetCategory,
            key: 'id'
        },
    },
    asset_sub_category: {
        type: Sequelize.INTEGER,
        references: {
            model: AssetSubCategory,
            key: 'id'
        },
    },
    product_serial: {
        type: Sequelize.STRING
    },
    cost_of_purchase: {
        type: Sequelize.DOUBLE
    },
    installation_cost: {
        type: Sequelize.DOUBLE
    },
    carrying_cost: {
        type: Sequelize.DOUBLE
    },
    other_cost: {
        type: Sequelize.DOUBLE
    },
    asset_type: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
            model: AssetType,
            key: 'id'
        },
    },
    depreciation_method: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
            model: DepreciationMethods,
            key: 'id'
        },
    },
    rate: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    effective_date: {
        allowNull: true,
        type: Sequelize.DATEONLY
    },
    book_value: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    salvage_value: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    useful_life: {
        allowNull: true,
        type: Sequelize.DOUBLE
    },
    last_effective_date: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY
    },
    warranty: {
        allowNull: true,
        type: Sequelize.STRING
    },
    last_warranty_date: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY
    },
    condition: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
            model: Conditions,
            key: 'id'
        },
    },
    comments: {
        allowNull: true,
        type: Sequelize.TEXT
    },
    barcode: {
        allowNull: true,
        type: Sequelize.BOOLEAN
    },
    assign_to: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    is_disposal: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    disposal_by_location: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    disposal_by_role_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    disposal_by: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    disposal_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    disposal_reason: {
        type: Sequelize.STRING
    },
    is_amc: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
    },
    amc_type: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING
    },
    amc_expire_date: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY
    },
    amc_charge: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.INTEGER
    },
    insurance_value: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.INTEGER
    },
    insurance_premium: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.INTEGER
    },
    insurance_company: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.STRING
    },
    insurance_expire_date: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DATEONLY
    }
})

module.exports = Assets