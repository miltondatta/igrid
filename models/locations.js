const db = require('../config/db')
const Sequelize = require('sequelize')
const Location_hierarchies = require('./location_hierarchies')


const Locations = db.define('locations', {
  location_name: {
    type: Sequelize.STRING
  },
  location_code: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  location_lat: {
    type: Sequelize.DOUBLE
  },
  location_long: {
    type: Sequelize.DOUBLE
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


Locations.belongsTo(Location_hierarchies, {foreignKey: 'hierarchy'})


module.exports = Locations