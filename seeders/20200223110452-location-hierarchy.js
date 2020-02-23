'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('location_hierarchies', [{
        hierarchy_name: 'Program',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        hierarchy_name: 'Division',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        hierarchy_name: 'Region',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        hierarchy_name: 'Area',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        hierarchy_name: 'Branch',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('location_hierarchies', null, {});
  }
};
