const db = require('../config/db')
const Sequelize = require('sequelize')
const Location_hierarchies = require('./location_hierarchies')


const Locations = db.define('Locations', {
  location_name: {
    type: Sequelize.STRING
  },
  location_code: {
    type: Sequelize.STRING
  },
  parent_id: {
    type: Sequelize.STRING
  },
  hierarchy: {
    type: Sequelize.INTEGER,
    references: {
      model: Location_hierarchies,
      key: 'id'
    }
  }
})


module.exports = Locations