'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('locations', [
        {
          location_name: 'P1',
          location_code: '01',
          address: 'Dhaka Head Office',
          location_lat: 23.7938951,
          location_long: 90.4118633,
          parent_id: 0,
          hierarchy: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          location_name: 'Dhaka',
          location_code: '02',
          address: 'Dhaka Divisional Office',
          location_lat: 23.7938951,
          location_long: 90.4118633,
          parent_id: 1,
          hierarchy: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          location_name: 'Tangail',
          location_code: '03',
          address: 'Regional Office',
          location_lat: 24.2647858,
          location_long: 89.8173298,
          parent_id: 2,
          hierarchy: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          location_name: 'Mirzapur',
          location_code: '04',
          address: 'Area Office',
          location_lat: 24.1013182,
          location_long: 90.1022672,
          parent_id: 3,
          hierarchy: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          location_name: 'Mohera',
          location_code: '05',
          address: 'Branch Office',
          location_lat: 24.1617107,
          location_long: 90.0400171,
          parent_id: 4,
          hierarchy: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('locations', null, {});
  }
};
