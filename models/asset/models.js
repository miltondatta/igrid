const db = require('../../config/db')
const Sequelize = require('sequelize')

const Models = db.define('Models', {
    model:{
        type: Sequelize.STRING
    }
})

module.exports = Models