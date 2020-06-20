'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('requisition_masters', [
            {
                "requisition_no" : "Req-1",
                "mobile"         : 1234567891,
                "email"          : "bm@example.com",
                "location_id"    : 5,
                "role_id"        : 6,
                "request_by"     : 7,
                "request_date"   : "09-04-20",
                "delivery_date"  : null,
                "status"         : 0,
                createdAt          : new Date(),
                updatedAt          : new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('requisition_masters', null, {});
    }
};
