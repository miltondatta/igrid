const db = require('../config/db');
const Sequelize = require('sequelize');

const document_category = db.define('document_category', {
    category_name: Sequelize.STRING
});

module.exports = document_category;