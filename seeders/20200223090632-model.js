'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('models', [
            {
                model     : '-',
                createdAt : new Date(),
                updatedAt : new Date()
            },//1
            {
                model     : '5405U',
                createdAt : new Date(),
                updatedAt : new Date()
            },//2
            {
                model     : '7400i7',
                createdAt : new Date(),
                updatedAt : new Date()
            },//3
            {
                model     : '3060MT',
                createdAt : new Date(),
                updatedAt : new Date()
            },//4
            {
                model     : 'G4 MT',
                createdAt : new Date(),
                updatedAt : new Date()
            },//5
            {
                model     : 'iPhone 11 Pro 64 GB',
                createdAt : new Date(),
                updatedAt : new Date()
            },//6
            {
                model     : 'Note 10 plus',
                createdAt : new Date(),
                updatedAt : new Date()
            },//7
            {
                model     : 'ME4024',
                createdAt : new Date(),
                updatedAt : new Date()
            },//8
            {
                model     : 'SG350-28P ',
                createdAt : new Date(),
                updatedAt : new Date()
            },//9
            {
                model     : 'WS-C2960-24TC-L 2960',
                createdAt : new Date(),
                updatedAt : new Date()
            },//10
            {
                model     : 'UCS-C220-M5SX',
                createdAt : new Date(),
                updatedAt : new Date()
            },//11
            {
                model     : 'T140',
                createdAt : new Date(),
                updatedAt : new Date()
            },//12
            {
                model     : 'R740',
                createdAt : new Date(),
                updatedAt : new Date()
            },//13
            {
                model     : 'S410U',
                createdAt : new Date(),
                updatedAt : new Date()
            },//14
            {
                model     : 'OCSW-P015-FR',
                createdAt : new Date(),
                updatedAt : new Date()
            },//15
            {
                model     : 'GE-027 ',
                createdAt : new Date(),
                updatedAt : new Date()
            },//16
            {
                model     : 'RX4024',
                createdAt : new Date(),
                updatedAt : new Date()
            },//17
            {
                model     : 'HSEO-105-3-45 ',
                createdAt : new Date(),
                updatedAt : new Date()
            },//18
            {
                model     : 'HSEO-104-3-45',
                createdAt : new Date(),
                updatedAt : new Date()
            },//19
            {
                model     : 'GS-18CT ',
                createdAt : new Date(),
                updatedAt : new Date()
            },//20
            {
                model     : 'GS-24CT ',
                createdAt : new Date(),
                updatedAt : new Date()
            },//21
            {
                model     : 'GS-04CT',
                createdAt : new Date(),
                updatedAt : new Date()
            },//22
        
        ], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('models', null, {});
    }
};
