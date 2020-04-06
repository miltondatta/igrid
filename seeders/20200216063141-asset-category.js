'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('asset_categories', [
            {
                category_name : 'Electronics',
                description   : 'Electronic Description',
                category_code : 101,
                createdAt     : new Date(),
                updatedAt     : new Date()
            },
            {
                category_name : 'Hardware',
                description   : 'Hardware Description',
                category_code : 201,
                createdAt     : new Date(),
                updatedAt     : new Date()
            },
            {
                category_name : 'Software',
                description   : 'Software Description',
                category_code : 301,
                createdAt     : new Date(),
                updatedAt     : new Date()
            },
            {
                category_name : 'Office Equipment',
                description   : 'Office Equipment Description',
                category_code : 401,
                createdAt     : new Date(),
                updatedAt     : new Date()
            },
        ], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('asset_categories', null, {});
    }
};
