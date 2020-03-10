const db = require('../config/db');
const Sequelize = require('sequelize');

const mis_imported_data = db.define('mis_imported_datas', {
  location_id: Sequelize.INTEGER,
  indicatordetails_id: Sequelize.INTEGER,
  data_date: Sequelize.DATEONLY,
  year: {
    defaultValue: 0,
    type: Sequelize.STRING
  },
  month: {
    defaultValue: 0,
    type: Sequelize.STRING
  },
  day: {
    defaultValue: 0,
    type: Sequelize.STRING
  },
  data_value: Sequelize.DOUBLE
});

module.exports = mis_imported_data;