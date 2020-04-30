'use strict';

module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('brands', {
            id        : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            brand     : {
                type : Sequelize.STRING
            },
            createdAt : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('brands');
    }
};