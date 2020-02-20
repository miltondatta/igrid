const Assets = require('./assets')
const Vendors = require('./vendors')
const db = require('../../config/db')
const Sequelize = require('sequelize')

const Challan = db.define('challans', {
    challan_no:{
        type: Sequelize.STRING
    },
    challan_date:{
        type: Sequelize.DATEONLY
    },
    challan_description:{
        type: Sequelize.STRING
    },
    purchase_order_no:{
        type: Sequelize.STRING
    },
    purchase_order_date:{
        type: Sequelize.DATEONLY
    },
    vendor_id:{
        type: Sequelize.INTEGER,
        references: {
            model: Vendors,
            key: 'id'
        },
    },
    received_by: {
        type: Sequelize.STRING,
    },
    added_by: {
        type: Sequelize.STRING,
    },
    attachment: {
        type: Sequelize.STRING,
    },
    comments: {
        type: Sequelize.TEXT,
    },
})

Challan.hasMany(Assets)

module.exports = Challan