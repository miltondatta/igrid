'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('complaints', {
            id                     : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            complaint_no           : {
                type : Sequelize.STRING
            },
            created_by             : {
                type : Sequelize.INTEGER
            },
            location_id            : {
                type : Sequelize.INTEGER
            },
            role_id                : {
                type : Sequelize.INTEGER
            },
            complaint_category     : {
                type         : Sequelize.INTEGER,
                defaultValue : 0,
                references   : {
                    model : "comCategories",
                    key   : 'id'
                }
            },
            complaint_sub_category : {
                type         : Sequelize.INTEGER,
                defaultValue : 0,
                references   : {
                    model : "comSubCategories",
                    key   : 'id'
                }
            },
            problem_details        : {
                type : Sequelize.STRING
            },
            asset_id               : {
                type         : Sequelize.INTEGER,
                defaultValue : null,
                allowNull    : true
            },
            file_name              : {
                type         : Sequelize.STRING,
                defaultValue : null,
                allowNull    : true
            },
            assign_to              : {
                type         : Sequelize.INTEGER,
                defaultValue : null,
                allowNull    : true
            },
            status                 : {
                type : Sequelize.INTEGER
            },
            solution_details       : {
                type         : Sequelize.STRING,
                defaultValue : null,
                allowNull    : true
            },
            solved_by              : {
                type         : Sequelize.STRING,
                defaultValue : null,
                allowNull    : true
            },
            solved_at              : {
                defaultValue : null,
                allowNull    : true,
                type         : Sequelize.DATE
            },
            createdAt              : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt              : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('complaints');
    }
};