const db = require('../config/db');
const Sequelize = require('sequelize');

const document_list = db.define('document_list', {
    category_id: Sequelize.INTEGER,
    sub_category_id: Sequelize.INTEGER,
    title: Sequelize.STRING,
    circular_no: Sequelize.STRING,
    description: Sequelize.STRING,
    file_name: Sequelize.STRING,
    document_date: Sequelize.DATE,
    display_notice: Sequelize.BOOLEAN,
    status: Sequelize.BOOLEAN
});

module.exports = document_list;