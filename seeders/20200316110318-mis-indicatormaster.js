'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('mis_indicatormasters', [{
        indicatormaster_code: 'A',
        indicatormaster_name: 'Member & Organization',
        description: 'Member & Organization',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        indicatormaster_code: 'B',
        indicatormaster_name: 'Disbursement',
        description: 'Disbursement',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        indicatormaster_code: 'C',
        indicatormaster_name: 'Outstanding (OS)',
        description: 'Outstanding (OS)',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        indicatormaster_code: 'D',
        indicatormaster_name: 'Savings',
        description: 'Savings',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        indicatormaster_code: 'E',
        indicatormaster_name: 'Adjustment',
        description: 'Adjustment',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        indicatormaster_code: 'F',
        indicatormaster_name: 'Realization',
        description: 'Realization',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        indicatormaster_code: 'G',
        indicatormaster_name: 'Loan Portfolio / Performance',
        description: 'Loan Portfolio / Performance',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        indicatormaster_code: 'H',
        indicatormaster_name: 'Branch Category',
        description: 'Branch Category',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        indicatormaster_code: 'I',
        indicatormaster_name: 'Average Loan Size',
        description: 'Average Loan Size',
        is_default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('mis_indicatormasters', null, {});
  }
};
