'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('comCategories', {
            id             : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            complaint_name : {
                type : Sequelize.STRING
            },
            status         : {
                type : Sequelize.BOOLEAN
            },
            createdAt      : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt      : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('comCategories');
    }
};