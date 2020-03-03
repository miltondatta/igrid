const db = require('../config/db');
const Sequelize = require('sequelize');
const document_category = require('./document_category');
const document_sub_category = require('./document_sub_category');

const document_list = db.define('document_list', {
    category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: document_category,
            key: 'id'
        }
    },
    sub_category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: document_sub_category,
            key: 'id'
        }
    },
    content_type: Sequelize.INTEGER,
    title: Sequelize.STRING,
    circular_no: Sequelize.STRING,
    description: Sequelize.STRING,
    keyword: Sequelize.STRING,
    file_name: Sequelize.STRING,
    document_date: Sequelize.DATE,
    display_notice: Sequelize.BOOLEAN,
    status: Sequelize.BOOLEAN
});

document_list.belongsTo(document_category, {foreignKey: 'category_id'});
document_list.belongsTo(document_sub_category, {foreignKey: 'sub_category_id'});

module.exports = document_list;