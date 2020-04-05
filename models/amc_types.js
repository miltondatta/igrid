const db = require('../config/db');
const Sequelize = require('sequelize');

const Amc_Types = db.define('amc_types', {
  type_name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  file_name: {
    type: Sequelize.STRING,
    defaultValue: null,
    allowNull: true
  }
});

module.exports = Amc_Types;