'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('asset_histories', [
            {
                "asset_id"    : 1,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 2,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 6,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 3,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 4,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 7,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 8,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 5,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 9,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 10,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 11,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 13,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 12,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 14,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 15,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 16,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 17,
                "assign_from" : null,
                "assign_to"   : 6,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 12,
                "assign_from" : 6,
                "assign_to"   : 7,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 11,
                "assign_from" : 6,
                "assign_to"   : 7,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 18,
                "assign_from" : 6,
                "assign_to"   : 7,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 1,
                "assign_from" : 6,
                "assign_to"   : 7,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 2,
                "assign_from" : 6,
                "assign_to"   : 7,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 3,
                "assign_from" : 6,
                "assign_to"   : 7,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "asset_id"    : 4,
                "assign_from" : 6,
                "assign_to"   : 7,
                "status"      : null,
                createdAt          : new Date(),
                updatedAt          : new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('asset_histories', null, {});
    }
};
