'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('amc_types', [
            {
                type_name   : 'Monthly',
                description : 'Paid Monthly',
                file_name   : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                type_name   : 'Quarterly',
                description : 'Paid Quarterly',
                file_name   : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                type_name   : 'Half Yearly',
                description : 'Paid Half Yearly',
                file_name   : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                type_name   : 'Yearly',
                description : 'Paid Yearly',
                file_name   : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('amc_types', null, {});
    }
};
