const db = require('../../config/db')
const Sequelize = require('sequelize')

const Project = db.define('Project', {
    project_name:{
        type: Sequelize.STRING
    },
    project_code:{
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    }
})

module.exports = Project