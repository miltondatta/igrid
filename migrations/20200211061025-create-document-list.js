'use strict';
module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('document_lists', {
            id              : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            category_id     : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'document_categories',
                    key   : 'id'
                }
            },
            sub_category_id : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'document_sub_categories',
                    key   : 'id'
                }
            },
            content_type    : {
                type : Sequelize.INTEGER
            },
            title           : {
                type : Sequelize.STRING(127)
            },
            circular_no     : {
                type : Sequelize.STRING(127)
            },
            description     : {
                type : Sequelize.STRING(3000)
            },
            keyword         : {
                type : Sequelize.STRING(3000)
            },
            file_name       : {
                type : Sequelize.STRING(127)
            },
            document_date   : {
                type : Sequelize.DATE
            },
            display_notice  : {
                type         : Sequelize.BOOLEAN,
                defaultValue : false
            },
            status          : {
                type         : Sequelize.BOOLEAN,
                defaultValue : true
            },
            createdAt       : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt       : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('document_lists');
    }
};