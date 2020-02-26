const db = require('../config/db');
const Sequelize = require('sequelize');

const mis_indicatormaster = db.define('mis_indicatormaster', {
    indicatormaster_code: Sequelize.STRING,
    indicatormaster_name: Sequelize.STRING,
    description: Sequelize.STRING,
    is_default: Sequelize.BOOLEAN
});

module.exports = mis_indicatormaster;