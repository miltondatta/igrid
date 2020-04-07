const db = require('../config/db');
const Sequelize = require('sequelize');

const complaint_forward = db.define('complaint_forward', {
    complaint_id: Sequelize.INTEGER,
    fw_by: Sequelize.INTEGER,
    fw_to: Sequelize.INTEGER
});

module.exports = complaint_forward;