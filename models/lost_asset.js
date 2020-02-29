const db = require('../config/db')
const Sequelize = require('sequelize')

const LostAsset = db.define('lost_assets', {
  location_id: Sequelize.INTEGER,
  role_id: Sequelize.INTEGER,
  added_by: Sequelize.INTEGER,
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