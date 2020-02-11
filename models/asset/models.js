const db = require('../../config/db')
const Sequelize = require('sequelize')

const Models = db.define('models', {
    model:{
        type: Sequelize.STRING
    }
})

module.exports = Models