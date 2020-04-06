'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('depreciation_methods', {
            id                : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            method_name       : {
                type : Sequelize.STRING
            },
            depreciation_code : {
                type : Sequelize.STRING
            },
            description       : {
                type : Sequelize.STRING
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
        return queryInterface.dropTable('depreciation_methods');
    }
};