'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('statuses', [
      {
          status_name: 'Approve',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
        status_name: 'Decline',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
        status_name: 'Delivered',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          status_name: 'Transfer',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          status_name: 'Disposal',
          createdAt: new Date(),
          updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('statuses', null, {});
  }
};
