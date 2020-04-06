'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('mis_imported_datas', {
            id                  : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            data_date           : {
                type : Sequelize.DATEONLY
            },
            year                : {
                defaultValue : 0,
                type         : Sequelize.STRING
            },
            month               : {
                defaultValue : 0,
                type         : Sequelize.STRING
            },
            day                 : {
                defaultValue : 0,
                type         : Sequelize.STRING
            },
            location_id         : {
                type : Sequelize.INTEGER
            },
            indicatordetails_id : {
                type : Sequelize.INTEGER
            },
            data_value          : {
                type : Sequelize.DOUBLE
            },
            createdAt           : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt           : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('mis_imported_datas');
    }
};