'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('asset_sub_categories', [
            {
                category_id       : 1,
                sub_category_name : 'Laptop',
                sub_category_code : 10111,
                description       : 'Laptop Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//1
            {
                category_id       : 1,
                sub_category_name : 'Desktop',
                sub_category_code : 10112,
                description       : 'Desktop Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//2
            {
                category_id       : 1,
                sub_category_name : 'Mobile',
                sub_category_code : 10113,
                description       : 'Mobile Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//3
            {
                category_id       : 2,
                sub_category_name : 'Storage',
                sub_category_code : 20111,
                description       : 'Storage Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//4
            {
                category_id       : 2,
                sub_category_name : 'Switch',
                sub_category_code : 20112,
                description       : 'Switch Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//5
            {
                category_id       : 2,
                sub_category_name : 'Server',
                sub_category_code : 20113,
                description       : 'Server Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//6
            {
                category_id       : 3,
                sub_category_name : 'Management Application',
                sub_category_code : 30111,
                description       : 'Management Application Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//7
            {
                category_id       : 3,
                sub_category_name : 'Security Application',
                sub_category_code : 30112,
                description       : 'Security Application Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//8
            {
                category_id       : 4,
                sub_category_name : 'Chair',
                sub_category_code : 40111,
                description       : 'Chair Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//9
            {
                category_id       : 4,
                sub_category_name : 'Table',
                sub_category_code : 40112,
                description       : 'Table Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            },//10
            {
                category_id       : 4,
                sub_category_name : 'AC',
                sub_category_code : 40113,
                description       : 'AC Description',
                createdAt         : new Date(),
                updatedAt         : new Date()
            }//11
        
        ], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('asset_sub_categories', null, {});
        
    }
};
