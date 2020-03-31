const db          = require('../config/db');
const Sequelize   = require('sequelize');

const menu = db.define('menu', {
    name: Sequelize.STRING,
    icon: Sequelize.STRING,
    sub_menu: Sequelize.BOOLEAN,
    link: Sequelize.STRING,
    parent_id: Sequelize.INTEGER,
    module_id: Sequelize.INTEGER,
    visible: Sequelize.BOOLEAN,
    order_by: Sequelize.INTEGER
});

module.exports = menu;
