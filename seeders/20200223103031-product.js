'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('products', [
            {
                product_name    : 'Asus VivoBook S14',
                category_id     : 1,
                sub_category_id : 1,
                brand_id        : 1,
                model_id        : 14,
                product_code    : '10111001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Dell Inspiron 14-3480',
                category_id     : 1,
                sub_category_id : 1,
                brand_id        : 2,
                model_id        : 2,
                product_code    : '10111002',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Dell Latitude 7400',
                category_id     : 1,
                sub_category_id : 1,
                brand_id        : 2,
                model_id        : 3,
                product_code    : '10111003',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Dell Optiplex',
                category_id     : 1,
                sub_category_id : 2,
                brand_id        : 2,
                model_id        : 4,
                product_code    : '10112001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'HP ProDesk 400',
                category_id     : 1,
                sub_category_id : 2,
                brand_id        : 3,
                model_id        : 5,
                product_code    : '10112002',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'iPhone 11Pro ',
                category_id     : 1,
                sub_category_id : 3,
                brand_id        : 6,
                model_id        : 6,
                product_code    : '10113001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            }, {
                product_name    : 'Xiaomi',
                category_id     : 1,
                sub_category_id : 3,
                brand_id        : 4,
                model_id        : 7,
                product_code    : '10113002',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Dell EMC Storage Array',
                category_id     : 2,
                sub_category_id : 4,
                brand_id        : 2,
                model_id        : 8,
                product_code    : '20111001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Cisco 28-Port Gigabit PoE',
                category_id     : 2,
                sub_category_id : 5,
                brand_id        : 8,
                model_id        : 9,
                product_code    : '20112001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Cisco 24 10/100 Catalyst ',
                category_id     : 2,
                sub_category_id : 5,
                brand_id        : 8,
                model_id        : 10,
                product_code    : '20112002',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Cisco 1RU rack server',
                category_id     : 2,
                sub_category_id : 6,
                brand_id        : 8,
                model_id        : 11,
                product_code    : '20113001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Dell EMC PowerEdge 16GB Tower Server',
                category_id     : 2,
                sub_category_id : 6,
                brand_id        : 2,
                model_id        : 12,
                product_code    : '20113002',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Dell EMC PowerEdge 2 x Intel Xeon Silver 4210',
                category_id     : 2,
                sub_category_id : 6,
                brand_id        : 2,
                model_id        : 13,
                product_code    : '20113003',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'HRM',
                category_id     : 3,
                sub_category_id : 7,
                brand_id        : 9,
                model_id        : 1,
                product_code    : '30111001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Application Firewall',
                category_id     : 3,
                sub_category_id : 8,
                brand_id        : 14,
                model_id        : 1,
                product_code    : '30112001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'NFL Swivel Chair-Pe',
                category_id     : 4,
                sub_category_id : 9,
                brand_id        : 10,
                model_id        : 15,
                product_code    : '40111001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Low-Back Executive',
                category_id     : 4,
                sub_category_id : 9,
                brand_id        : 10,
                model_id        : 16,
                product_code    : '40111002',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Low-Back Visitor Rexin',
                category_id     : 4,
                sub_category_id : 9,
                brand_id        : 11,
                model_id        : 17,
                product_code    : '40111003',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Laminated Board Sr. Executive Table',
                category_id     : 4,
                sub_category_id : 10,
                brand_id        : 11,
                model_id        : 18,
                product_code    : '40112001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : 'Laminated Board Executive Table',
                category_id     : 4,
                sub_category_id : 10,
                brand_id        : 10,
                model_id        : 19,
                product_code    : '40112002',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : '1.5 Ton 18000 BTU Hi-Speed Wall Mount Split AC',
                category_id     : 4,
                sub_category_id : 11,
                brand_id        : 13,
                model_id        : 20,
                product_code    : '40113001',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : '2 Ton 24000 BTU Hi-Speed Wall Mount Split AC',
                category_id     : 4,
                sub_category_id : 11,
                brand_id        : 12,
                model_id        : 21,
                product_code    : '40113002',
                createdAt       : new Date(),
                updatedAt       : new Date()
            },
            {
                product_name    : '1 Ton 12000 BTU Wall Mount Split AC',
                category_id     : 4,
                sub_category_id : 11,
                brand_id        : 12,
                model_id        : 22,
                product_code    : '40113003',
                createdAt       : new Date(),
                updatedAt       : new Date()
            }
        ], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {});
    }
};
