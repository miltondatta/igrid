'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('lost_assets', {
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
                type : Sequelize.INTEGER
            },
            incident_type  : {
                type : Sequelize.STRING
            },
            incident_date  : {
                type : Sequelize.DATEONLY
            },
            incident_time  : {
                type : Sequelize.TIME
            },
            police_station : {
                type : Sequelize.STRING
            },
            gd_no          : {
                type : Sequelize.STRING
            },
            gd_date        : {
                type : Sequelize.DATEONLY
            },
            gd_other_file  : {
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
        return queryInterface.dropTable('lost_assets');
    }
};