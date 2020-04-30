'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('menus', {
            id        : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            name      : {
                type : Sequelize.STRING
            },
            icon      : {
                type : Sequelize.STRING
            },
            sub_menu  : {
                type : Sequelize.BOOLEAN
            },
            link      : {
                type : Sequelize.STRING
            },
            parent_id : {
                type : Sequelize.INTEGER
            },
            module_id : {
                type : Sequelize.INTEGER
            },
            visible   : {
                type : Sequelize.BOOLEAN
            },
            order_by  : {
                type : Sequelize.INTEGER
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
        return queryInterface.dropTable('menus');
    }
};