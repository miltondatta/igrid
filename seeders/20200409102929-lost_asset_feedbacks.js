'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('lost_asset_feedbacks', [
            {
                "lost_asset_id"    : 1,
                "feedback_by"      : 6,
                "feedback_details" : "Need to query",
                createdAt          : new Date(),
                updatedAt          : new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('lost_asset_feedbacks', null, {});
    }
};
