'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('contacts', {
            id          : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            name        : {
                type : Sequelize.STRING
            },
            company     : {
                type : Sequelize.STRING
            },
            email       : {
                type : Sequelize.STRING
            },
            subject     : {
                type : Sequelize.STRING
            },
            message     : {
                type : Sequelize.STRING
            },
            user_id     : {
                type : Sequelize.INTEGER
            },
            role_id     : {
                type : Sequelize.INTEGER
            },
            location_id : {
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
        return queryInterface.dropTable('contacts');
    }
};