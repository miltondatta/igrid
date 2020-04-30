'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('locations', {
            id               : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            location_name    : {
                type : Sequelize.STRING
            },
            location_code    : {
                type : Sequelize.STRING
            },
            address          : {
                type : Sequelize.STRING
            },
            location_lat     : {
                type : Sequelize.DOUBLE
            },
            location_long    : {
                type : Sequelize.DOUBLE
            },
            location_image   : {
                defaultValue : 'default_place.png',
                type         : Sequelize.STRING
            },
            location_address : {
                allowNull : true,
                type      : Sequelize.STRING
            },
            parent_id        : {
                type : Sequelize.INTEGER
            },
            hierarchy        : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'location_hierarchies',
                    key   : 'id'
                }
            },
            createdAt        : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt        : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('locations');
    }
};