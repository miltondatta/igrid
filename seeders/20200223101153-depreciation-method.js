'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('depreciation_methods', [{
        method_name: 'Straight-line',
        depreciation_code: '01',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        method_name: 'Double declining balance',
        depreciation_code: '02',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        method_name: 'Units of production',
        depreciation_code: '03',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        method_name: 'Sum of years digits',
        depreciation_code: '04',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('depreciation_methods', null, {});
  }
};
