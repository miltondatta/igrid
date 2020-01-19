const db = require('../../config/db')
const Sequelize = require('sequelize')

const Brands = db.define('Brands', {
    brand:{
        type: Sequelize.STRING
    }
})

module.exports = Brands