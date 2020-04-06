'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('vendors', {
            id          : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            vendor_name : {
                type : Sequelize.STRING
            },
            enlisted    : {
                type : Sequelize.BOOLEAN
            },
            description : {
                type : Sequelize.STRING
            },
            file_name   : {
                allowNull : true,
                type      : Sequelize.STRING
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
        return queryInterface.dropTable('vendors');
    }
};