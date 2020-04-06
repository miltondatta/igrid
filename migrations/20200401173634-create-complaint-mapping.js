'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('complaint_mappings', {
            id        : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            role_id   : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'user_roles',
                    key   : 'id'
                }
            },
            cat_id    : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'comCategories',
                    key   : 'id'
                }
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
        return queryInterface.dropTable('complaint_mappings');
    }
};