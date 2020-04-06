'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('feature_list', {
            id           : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            feature_name : {
                type : Sequelize.INTEGER
            },
            module_id    : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'modules',
                    key   : 'id'
                }
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
        return queryInterface.dropTable('feature_list');
    }
};