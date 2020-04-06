'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('comSubCategories', {
            id                 : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            sub_complaint_name : {
                type : Sequelize.STRING
            },
            complain_id        : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'comCategories',
                    key   : 'id'
                }
            },
            status             : {
                type : Sequelize.BOOLEAN
            },
            createdAt          : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt          : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('comSubCategories');
    }
};