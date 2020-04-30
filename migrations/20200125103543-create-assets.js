'use strict';

module.exports = {
    up   : (queryInterface, Sequelize) => {
        return queryInterface.createTable('assets', {
            id                    : {
                allowNull     : false,
                autoIncrement : true,
                primaryKey    : true,
                type          : Sequelize.INTEGER
            },
            challan_id            : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'challans',
                    key   : 'id'
                },
            },
            project_id            : {
                allowNull    : true,
                defaultValue : null,
                type         : Sequelize.INTEGER,
                references   : {
                    model : 'projects',
                    key   : 'id'
                },
            },
            assign_to             : {
                type : Sequelize.INTEGER
            },
            product_id            : {
                type       : Sequelize.INTEGER,
                references : {
                    model : "products",
                    key   : 'id'
                },
            },
            asset_category        : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'asset_categories',
                    key   : 'id'
                },
            },
            asset_sub_category    : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'asset_sub_categories',
                    key   : 'id'
                },
            },
            product_serial        : {
                type : Sequelize.STRING
            },
            cost_of_purchase      : {
                type : Sequelize.DOUBLE
            },
            installation_cost     : {
                type : Sequelize.DOUBLE
            },
            carrying_cost         : {
                type : Sequelize.DOUBLE
            },
            other_cost            : {
                type : Sequelize.DOUBLE
            },
            asset_type            : {
                allowNull  : true,
                type       : Sequelize.INTEGER,
                references : {
                    model : 'asset_types',
                    key   : 'id'
                },
            },
            depreciation_method   : {
                allowNull  : true,
                type       : Sequelize.INTEGER,
                references : {
                    model : 'depreciation_methods',
                    key   : 'id'
                },
            },
            rate                  : {
                allowNull : true,
                type      : Sequelize.INTEGER
            },
            effective_date        : {
                allowNull : true,
                type      : Sequelize.DATEONLY
            },
            book_value            : {
                allowNull : true,
                type      : Sequelize.DOUBLE
            },
            salvage_value         : {
                allowNull : true,
                type      : Sequelize.DOUBLE
            },
            useful_life           : {
                allowNull : true,
                type      : Sequelize.DOUBLE
            },
            last_effective_date   : {
                allowNull : true,
                type      : Sequelize.DATEONLY
            },
            warranty              : {
                allowNull : true,
                type      : Sequelize.STRING
            },
            last_warranty_date    : {
                allowNull : true,
                type      : Sequelize.DATEONLY
            },
            condition             : {
                allowNull  : true,
                type       : Sequelize.INTEGER,
                references : {
                    model : 'conditions',
                    key   : 'id'
                },
            },
            comments              : {
                allowNull : true,
                type      : Sequelize.TEXT
            },
            barcode               : {
                allowNull : true,
                type      : Sequelize.BOOLEAN
            },
            is_disposal           : {
                type         : Sequelize.BOOLEAN,
                defaultValue : false
            },
            disposal_by_location  : {
                type         : Sequelize.INTEGER,
                defaultValue : 0
            },
            disposal_by_role_id   : {
                type         : Sequelize.INTEGER,
                defaultValue : 0
            },
            disposal_by           : {
                type         : Sequelize.INTEGER,
                defaultValue : 0
            },
            disposal_date         : {
                type      : Sequelize.DATE,
                allowNull : true
            },
            disposal_reason       : {
                type : Sequelize.STRING
            },
            is_amc                : {
                defaultValue : false,
                type         : Sequelize.BOOLEAN
            },
            amc_type              : {
                allowNull    : true,
                defaultValue : null,
                type         : Sequelize.STRING
            },
            amc_expire_date       : {
                allowNull    : true,
                defaultValue : null,
                type         : Sequelize.DATEONLY
            },
            amc_charge            : {
                allowNull    : true,
                defaultValue : null,
                type         : Sequelize.INTEGER
            },
            insurance_value       : {
                allowNull    : true,
                defaultValue : null,
                type         : Sequelize.INTEGER
            },
            insurance_premium     : {
                allowNull    : true,
                defaultValue : null,
                type         : Sequelize.INTEGER
            },
            insurance_company     : {
                allowNull    : true,
                defaultValue : null,
                type         : Sequelize.STRING
            },
            insurance_expire_date : {
                allowNull    : true,
                defaultValue : null,
                type         : Sequelize.DATEONLY
            },
            createdAt             : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            },
            updatedAt             : {
                allowNull    : true,
                type         : Sequelize.DATE,
                defaultValue : Sequelize.NOW
            }
        });
    },
    down : (queryInterface, Sequelize) => {
        return queryInterface.dropTable('assets');
    }
};