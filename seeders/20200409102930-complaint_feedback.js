'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('complaint_feedbacks', [
            {
                "complaint_id" : 1,
                "feedback"     : "Ok. We will send a team to resolve the problem.",
                "file_name"    : "1586425679957-ReferenceCard.pdf",
                "feedback_by"  : 9,
                createdAt          : new Date(),
                updatedAt          : new Date()
            },
            {
                "complaint_id" : 1,
                "feedback"     : "Resolved the problem...",
                "file_name"    : "1586425762139-ReferenceCard.pdf",
                "feedback_by"  : 9,
                createdAt          : new Date(),
                updatedAt          : new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('challans', null, {});
    }
};
