'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('asset_types', [{
        type_name: 'Tangible Assets',
        asset_code: '01',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type_name: 'Intangible Assets',
        asset_code: '02',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        type_name: 'Financial Asset',
        asset_code: '03',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        type_name: 'Fixed Assets',
        asset_code: '04',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        type_name: 'Current Assets',
        asset_code: '05',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('asset_types', null, {});
  }
};
