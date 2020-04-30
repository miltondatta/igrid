'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_associate_roles', {
            id          : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            user_id     : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'users',
                    key   : 'id'
                }
            },
            location_id : {
                type         : Sequelize.INTEGER,
                defaultValue : 0,
            },
            role_id     : {
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
        return queryInterface.dropTable('user_associate_roles');
    }
};