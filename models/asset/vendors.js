const db = require('../../config/db')
const Sequelize = require('sequelize')
const Challan = require('./challan')

const Vendors = db.define('vendors', {
    vendor_name:{
        type: Sequelize.STRING
    },
    enlisted:{
        type: Sequelize.BOOLEAN
    },
    description:{
        type: Sequelize.STRING
    },
    file_name:{
        type: Sequelize.STRING
    },
})

Vendors.belongsTo(Challan)

module.exports = Vendors