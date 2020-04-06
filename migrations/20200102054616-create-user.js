'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id           : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            firstName    : {
                type : Sequelize.STRING
            },
            lastName     : {
                type : Sequelize.STRING
            },
            email        : {
                type : Sequelize.STRING
            },
            password     : {
                type : Sequelize.STRING
            },
            pin          : {
                type : Sequelize.INTEGER
            },
            address      : {
                type : Sequelize.STRING
            },
            image        : {
                defaultValue : 'default.png',
                type         : Sequelize.STRING
            },
            phone_number : {
                type : Sequelize.INTEGER
            },
            is_verified  : {
                type : Sequelize.BOOLEAN
            },
            createdAt    : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt    : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};