const db = require('../config/db');
const Sequelize = require('sequelize');

const document_sub_category = db.define('document_sub_category', {
    category_id: Sequelize.INTEGER,
    sub_category_name: Sequelize.STRING
});

module.exports = document_sub_category;