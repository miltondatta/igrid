'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('repair_maintenances', [
            {
                "location_id"    : 5,
                "role_id"        : 6,
                "added_by"       : 7,
                "asset_id"       : 1,
                "estimated_cost" : 200,
                "details"        : "need to repair leg and handle.",
                "file_name"      : "1586422762672-ReferenceCard.pdf",
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "location_id"    : 5,
                "role_id"        : 6,
                "added_by"       : 7,
                "asset_id"       : 11,
                "estimated_cost" : 300,
                "details"        : "Need to color",
                "file_name"      : "1586422762673-ReferenceCard.pdf",
                createdAt          : new Date(),
                updatedAt          : new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('repair_maintenances', null, {});
    }
};
