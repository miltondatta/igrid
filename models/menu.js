const db          = require('../config/db');
const Sequelize   = require('sequelize');

const Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    subCat: DataTypes.BOOLEAN,
    link: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    module_id: DataTypes.INTEGER,
    visible: DataTypes.BOOLEAN,
    order_by: DataTypes.INTEGER
});

module.exports = Menu;
