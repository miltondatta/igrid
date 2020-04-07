'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('comCategories', [{
        complaint_name: 'Hardware Problem',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        complaint_name: 'Software Problem',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('comCategories', null, {});
  }
};
