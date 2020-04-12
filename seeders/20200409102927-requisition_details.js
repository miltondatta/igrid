'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('requisition_details', [
            {
                "requisition_id"     : 1,
                "asset_category"     : 4,
                "brand"              : null,
                "model"              : null,
                "reason"             : "new room",
                "details"            : "Needed",
                "expected_date"      : "09-04-10",
                "file"               : null,
                "asset_sub_category" : 10,
                "quantity"           : 3
            },
            {
                "requisition_id"     : 1,
                "asset_category"     : 4,
                "brand"              : null,
                "model"              : null,
                "reason"             : "New room",
                "details"            : "needed",
                "expected_date"      : "09-04-10",
                "file"               : null,
                "asset_sub_category" : 9,
                "quantity"           : 6
            },
            {
                "requisition_id"     : 1,
                "asset_category"     : 4,
                "brand"              : null,
                "model"              : null,
                "reason"             : "new room",
                "details"            : "needed",
                "expected_date"      : "09-04-10",
                "file"               : null,
                "asset_sub_category" : 11,
                "quantity"           : 1
            }
        ], {});
    },
    
    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('requisition_details', null, {});
    }
};
