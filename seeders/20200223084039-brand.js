'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('brands', [{
        brand: 'Xiaomi'
      }, {
        brand: 'Samsung'
      },{
        brand: 'Apple'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('brands', null, {});
  }
};
