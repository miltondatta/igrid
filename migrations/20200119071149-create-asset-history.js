'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('asset_histories', {
            id          : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            asset_id    : {
                type : Sequelize.STRING
            },
            assign_from : {
                type : Sequelize.STRING
            },
            assign_to   : {
                type : Sequelize.STRING
            },
            status      : {
                type : Sequelize.INTEGER
            },
            createdAt   : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt   : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('asset_histories');
    }
};