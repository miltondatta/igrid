'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('complaint_forwards', [
            {
                "complaint_id" : 2,
                "fw_by"        : 9,
                "fw_to"        : 10
            }
        ], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('challans', null, {});
    }
};
