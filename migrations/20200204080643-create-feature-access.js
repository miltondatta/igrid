'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('feature_accesses', {
            id         : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            feature_id : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'feature_list',
                    key   : 'id'
                }
            },
            role_id    : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'user_roles',
                    key   : 'id'
                }
            },
            createdAt  : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt  : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('feature_accesses');
    }
};