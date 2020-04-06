'use strict';

module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('asset_categories', {
            id            : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            category_name : {
                type : Sequelize.STRING
            },
            description   : {
                type : Sequelize.STRING
            },
            category_code : {
                type : Sequelize.STRING
            },
            createdAt     : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt     : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('asset_categories');
    }
};