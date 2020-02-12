'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('statuses', [{
        status_name: 'Pending',
        createdAt: new Date()
      }, {
        status_name: 'Approve',
        createdAt: new Date()
      },
      {
        status_name: 'Decline',
        createdAt: new Date()
      },
       {
        status_name: 'Deliver',
        createdAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('statuses', null, {});
  }
};
