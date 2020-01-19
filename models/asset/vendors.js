const db = require('../../config/db')
const Sequelize = require('sequelize')

const Vendors = db.define('Vendors', {
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

module.exports = Vendors