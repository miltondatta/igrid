const db          = require('../config/db');
const Sequelize   = require('sequelize');

const Menu_assign = db.define('menu_assigns', {
    role_id: Sequelize.INTEGER,
    menu_id: Sequelize.INTEGER
}, {});

module.exports = Menu_assign;
  