'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('repair_maintenances', {
            id             : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            location_id    : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'locations',
                    key   : 'id'
                }
            },
            role_id        : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'user_roles',
                    key   : 'id'
                }
            },
            added_by       : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'users',
                    key   : 'id'
                }
            },
            asset_id       : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'assets',
                    key   : 'id'
                }
            },
            estimated_cost : {
                type : Sequelize.DOUBLE
            },
            details        : {
                type : Sequelize.STRING
            },
            file_name      : {
                type : Sequelize.STRING
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
        return queryInterface.dropTable('repair_maintenances');
    }
};