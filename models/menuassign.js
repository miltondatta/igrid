const db          = require('../config/db');
const Sequelize   = require('sequelize');

const MenuAssign = db.define('MenuAssign', {
    role_id: Sequelize.INTEGER,
    menu_id: Sequelize.INTEGER
}, {});

module.exports = MenuAssign;
  