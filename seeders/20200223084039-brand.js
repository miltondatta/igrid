'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('brands', [
            {
                brand     : 'Asus',
                createdAt : new Date(),
                updatedAt : new Date()
            },//1
            {
                brand     : 'Dell',
                createdAt : new Date(),
                updatedAt : new Date()
            },//2
            {
                brand     : 'HP',
                createdAt : new Date(),
                updatedAt : new Date()
            },//3
            {
                brand     : 'Xiaomi',
                createdAt : new Date(),
                updatedAt : new Date()
            },//4
            {
                brand     : 'Samsung',
                createdAt : new Date(),
                updatedAt : new Date()
            },//5
            {
                brand     : 'Apple',
                createdAt : new Date(),
                updatedAt : new Date()
            },//6
            {
                brand     : 'IBM',
                createdAt : new Date(),
                updatedAt : new Date()
            },//7
            {
                brand     : 'Cisco',
                createdAt : new Date(),
                updatedAt : new Date()
            },//8
            {
                brand     : 'Penta Global',
                createdAt : new Date(),
                updatedAt : new Date()
            },//9
            {
                brand     : 'Hatil',
                createdAt : new Date(),
                updatedAt : new Date()
            }, //10
            {
                brand     : 'Regal',
                createdAt : new Date(),
                updatedAt : new Date()
            }, //11
            {
                brand     : 'Sharp',
                createdAt : new Date(),
                updatedAt : new Date()
            },//12
            {
                brand     : 'Walton',
                createdAt : new Date(),
                updatedAt : new Date()
            },//13
            {
                brand     : 'Imperva',
                createdAt : new Date(),
                updatedAt : new Date()
            },//14
        ], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('brands', null, {});
    }
};
