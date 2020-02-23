'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('brands', [{
        brand: 'Xiaomi',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        brand: 'Samsung',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        brand: 'Apple',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('brands', null, {});
  }
};
