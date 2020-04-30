'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('complaints', [
            {
                complaint_no           : "c-1001",
                createdBy             : 7,
                location_id            : 5,
                role_id                : 6,
                complaint_category     : 1,
                complaint_sub_category : 2,
                problem_details        : "Our two-ton ac is not working.",
                file_name              : "1586425498140-ReferenceCard.pdf",
                assign_to              : 9,
                status                 : 8,
                solution_details       : "solved.",
                solved_by              : "Hardware Manager",
                solved_at              : "2010-04-09 17:42:01.461000 +00:00",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                complaint_no           : "c-1002",
                createdBy             : 7,
                location_id            : 5,
                role_id                : 6,
                complaint_category     : 1,
                complaint_sub_category : 1,
                problem_details        : "Need to color",
                file_name              : "1586427872884-ReferenceCard.pdf",
                assign_to              : 10,
                status                 : 7,
                solution_details       : null,
                solved_by              : null,
                solved_at              : null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('challans', null, {});
    }
};
