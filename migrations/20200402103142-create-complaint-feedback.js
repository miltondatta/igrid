'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('complaint_feedbacks', {
            id           : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            complaint_id : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'complaints',
                    key   : 'id'
                }
            },
            feedback     : {
                type : Sequelize.STRING(1000)
            },
            file_name    : {
                type : Sequelize.STRING
            },
            feedback_by  : {
                type : Sequelize.INTEGER
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
        return queryInterface.dropTable('complaint_feedbacks');
    }
};