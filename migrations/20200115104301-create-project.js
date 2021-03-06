'use strict';

module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('projects', {
            id           : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            project_name : {
                type : Sequelize.STRING
            },
            project_code : {
                type : Sequelize.STRING
            },
            description  : {
                type : Sequelize.STRING
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
        return queryInterface.dropTable('projects');
    }
};