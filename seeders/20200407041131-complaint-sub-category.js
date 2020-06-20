'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('comSubCategories', [{
            sub_complaint_name : 'Problem in Monitor',
            complain_id        : 1,
            status             : true,
            createdAt          : new Date(),
            updatedAt          : new Date()
        },
        {
          sub_complaint_name : 'Problem in Keyboard',
          complain_id        : 1,
          status             : true,
          createdAt          : new Date(),
          updatedAt          : new Date()
        },
        {
            sub_complaint_name : 'Problem in Windows Update',
            complain_id        : 2,
            status             : true,
            createdAt          : new Date(),
            updatedAt          : new Date()
        },
          {
              sub_complaint_name : 'Problem in Antivirus Setup',
              complain_id        : 2,
              status             : true,
              createdAt          : new Date(),
              updatedAt          : new Date()
          },
          {
              sub_complaint_name : 'Problem in AC',
              complain_id        : 2,
              status             : true,
              createdAt          : new Date(),
              updatedAt          : new Date()
          },
          {
              sub_complaint_name : 'Problem in Chair',
              complain_id        : 3,
              status             : true,
              createdAt          : new Date(),
              updatedAt          : new Date()
          },
          {
              sub_complaint_name : 'Problem in Table',
              complain_id        : 3,
              status             : true,
              createdAt          : new Date(),
              updatedAt          : new Date()
          }], {});
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('comSubCategories', null, {});
    }
};
