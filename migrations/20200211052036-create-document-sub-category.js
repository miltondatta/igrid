'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('document_sub_categories', {
            id                : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            category_id       : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'document_categories',
                    key   : 'id'
                }
            },
            sub_category_name : {
                type : Sequelize.STRING(127)
            },
            createdAt         : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt         : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('document_sub_categories');
    }
};