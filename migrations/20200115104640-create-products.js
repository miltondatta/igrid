'use strict';

module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('products', {
            id              : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            product_name    : {
                type : Sequelize.STRING
            },
            category_id     : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'asset_categories',
                    key   : 'id'
                },
            },
            sub_category_id : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'asset_sub_categories',
                    key   : 'id'
                },
            },
            brand_id        : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'brands',
                    key   : 'id'
                },
            },
            model_id        : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'models',
                    key   : 'id'
                },
            },
            product_code    : {
                type : Sequelize.STRING
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
        return queryInterface.dropTable('products');
    }
};