'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('requisition_approves', [
            {
                "requisition_id"         : 1,
                "requisition_details_id" : 1,
                "role_id"                : 5,
                "location_id"            : 4,
                "delivery_to"            : null,
                "status"                 : 1,
                "comment"                : null,
                "update_quantity"        : 2,
                "update_by"              : 6,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "requisition_id"         : 1,
                "requisition_details_id" : 2,
                "role_id"                : 5,
                "location_id"            : 4,
                "delivery_to"            : null,
                "status"                 : 1,
                "comment"                : null,
                "update_quantity"        : 4,
                "update_by"              : 6,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "requisition_id"         : 1,
                "requisition_details_id" : 2,
                "role_id"                : 5,
                "location_id"            : 4,
                "delivery_to"            : null,
                "status"                 : 1,
                "comment"                : null,
                "update_quantity"        : 1,
                "update_by"              : 6,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "requisition_id"         : 1,
                "requisition_details_id" : 1,
                "role_id"                : 5,
                "location_id"            : 4,
                "delivery_to"            : 7,
                "status"                 : 3,
                "comment"                : null,
                "update_quantity"        : 2,
                "update_by"              : 6,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "requisition_id"         : 1,
                "requisition_details_id" : 2,
                "role_id"                : 5,
                "location_id"            : 4,
                "delivery_to"            : 7,
                "status"                 : 3,
                "comment"                : null,
                "update_quantity"        : 4,
                "update_by"              : 6,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "requisition_id"         : 1,
                "requisition_details_id" : 2,
                "role_id"                : 5,
                "location_id"            : 4,
                "delivery_to"            : 7,
                "status"                 : 3,
                "comment"                : null,
                "update_quantity"        : 1,
                "update_by"              : 6,
                createdAt          : new Date(),
                updatedAt          : new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('requisition_approves', null, {});
    }
};
