'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('complaint_mappings', [{
        role_id: 8,
        cat_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        role_id: 9,
        cat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('complaint_mappings', null, {});
  }
};
