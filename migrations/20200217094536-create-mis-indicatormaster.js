'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('mis_indicatormasters', {
            id                   : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            indicatormaster_code : {
                type : Sequelize.STRING
            },
            indicatormaster_name : {
                type : Sequelize.STRING
            },
            description          : {
                type : Sequelize.STRING
            },
            is_default           : {
                type : Sequelize.BOOLEAN
            },
            createdAt            : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt            : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('mis_indicatormasters');
    }
};