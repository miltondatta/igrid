const db          = require('../config/db');
const Sequelize   = require('sequelize');

const Menu = db.define('Menu', {
    name: Sequelize.STRING,
    icon: Sequelize.STRING,
    subCat: Sequelize.BOOLEAN,
    link: Sequelize.STRING,
    parent_id: Sequelize.INTEGER,
    module_id: Sequelize.INTEGER,
    visible: Sequelize.BOOLEAN,
    order_by: Sequelize.INTEGER
});

module.exports = Menu;
