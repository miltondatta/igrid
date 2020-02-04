const db = require('../config/db')
const Sequelize = require('sequelize')


const Location_hierarchies = db.define('Location_hierarchies', {
  hierarchy_name: {
    type: Sequelize.STRING
  }
})


module.exports = Location_hierarchies