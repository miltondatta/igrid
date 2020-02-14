const db = require('../config/db');
const Sequelize = require('sequelize');
const document_category = require('./document_category');

const document_sub_category = db.define('document_sub_category', {
    category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: document_category,
            key: 'id'
        }
    },
    sub_category_name: Sequelize.STRING
});

document_sub_category.belongsTo(document_category,{foreignKey: 'category_id'});

module.exports = document_sub_category;