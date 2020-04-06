'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_login_logs', {
            id        : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            user_id   : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'users',
                    key   : 'id'
                }
            },
            user_ip   : {
                type : Sequelize.STRING
            },
            date      : {
                type : Sequelize.DATEONLY
            },
            time      : {
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
        return queryInterface.dropTable('user_login_logs');
    }
};