const db          = require('../config/db');
const Sequelize   = require('sequelize');

const menu_assign = db.define('menu_assign', {
    role_id: Sequelize.INTEGER,
    menu_id: Sequelize.INTEGER
}, {});

module.exports = menu_assign;
  