'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('approval_levels', {
            id                    : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            location_heirarchy_id : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'location_hierarchies',
                    key   : 'id'
                },
            },
            parent_id             : {
                type : Sequelize.INTEGER
            },
            role_id               : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'user_roles',
                    key   : 'id'
                },
            },
            createdAt             : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt             : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('approval_levels');
    }
};