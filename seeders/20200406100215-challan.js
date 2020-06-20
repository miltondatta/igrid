'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('challans', [
            {
                "challan_no"          : "chal-001",
                "challan_date"        : "09-04-20",
                "challan_description" : null,
                "purchase_order_no"   : "po-001",
                "purchase_order_date" : "09-04-20",
                "vendor_id"           : 4,
                "is_closed"           : false,
                "received_by"         : "shuvo",
                "added_by"            : 6,
                "attachment"          : "1586417710253-ReferenceCard.pdf",
                "comments"            : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('challans', null, {});
    }
};
