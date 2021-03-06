'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('lost_asset_feedbacks', {
            id               : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            lost_asset_id    : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'lost_assets',
                    key   : 'id'
                }
            },
            feedback_by      : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'users',
                    key   : 'id'
                }
            },
            feedback_details : {
                type : Sequelize.STRING
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
        return queryInterface.dropTable('lost_asset_feedbacks');
    }
};