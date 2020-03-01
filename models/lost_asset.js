const db = require('../config/db')
const Sequelize = require('sequelize')
const UserRoles = require('./userroles')
const Locations = require('./locations')
const Users = require('./user')

const LostAsset = db.define('lost_assets', {
  location_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Locations,
      key: 'id'
    }
  },
  role_id: {
    type: Sequelize.INTEGER,
    references: {
      model: UserRoles,
      key: 'id'
    }
  },
  added_by: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id'
    }
  },
  asset_id: Sequelize.INTEGER,
  incident_type: Sequelize.STRING,
  incident_date: Sequelize.DATEONLY,
  incident_time: Sequelize.TIME,
  police_station: Sequelize.STRING,
  gd_no: Sequelize.STRING,
  gd_date: Sequelize.DATEONLY,
  gd_other_file: Sequelize.STRING
}, {});

module.exports = LostAsset