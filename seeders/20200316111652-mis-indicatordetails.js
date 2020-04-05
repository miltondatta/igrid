'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mis_indicatordetails', [{
      item_no: '1',
      indicator_name: 'Current Borrowers',
      indicatormaster_id: 1,
      parent_location_id: 1,
      order_by: 1,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      item_no: '2',
      indicator_name: 'Total Borrowers',
      indicatormaster_id: 1,
      parent_location_id: 1,
      order_by: 2,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '3',
      indicator_name: 'Total Loan [Excl. NL2]',
      indicatormaster_id: 2,
      parent_location_id: 1,
      order_by: 3,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '4',
      indicator_name: 'No of Loans Disbursed (Month)',
      indicatormaster_id: 2,
      parent_location_id: 1,
      order_by: 4,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '5',
      indicator_name: 'Amount Disbursed (Month) Tk.',
      indicatormaster_id: 2,
      parent_location_id: 1,
      order_by: 5,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '6',
      indicator_name: 'Amount Disbursed (This Year) Tk.',
      indicatormaster_id: 2,
      parent_location_id: 1,
      order_by: 6,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '7',
      indicator_name: 'Total OS [Excl.NL2] Tk.',
      indicatormaster_id: 3,
      parent_location_id: 1,
      order_by: 7,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '8',
      indicator_name: 'Total Current OS Tk.',
      indicatormaster_id: 3,
      parent_location_id: 1,
      order_by: 8,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '9',
      indicator_name: 'Total Savings [General + Special] Tk.',
      indicatormaster_id: 4,
      parent_location_id: 1,
      order_by: 9,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '10',
      indicator_name: 'General Savings (Month) Tk.',
      indicatormaster_id: 4,
      parent_location_id: 1,
      order_by: 10,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '11',
      indicator_name: 'General Savings (Cumulative) Tk',
      indicatormaster_id: 4,
      parent_location_id: 1,
      order_by: 11,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '12',
      indicator_name: 'No of (loans) Adjusted Savings',
      indicatormaster_id: 5,
      parent_location_id: 1,
      order_by: 12,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '13',
      indicator_name: 'Adjusted Savings Tk.',
      indicatormaster_id: 5,
      parent_location_id: 1,
      order_by: 13,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '14',
      indicator_name: 'Late Loan Realisation by Cash Tk.',
      indicatormaster_id: 6,
      parent_location_id: 1,
      order_by: 14,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '15',
      indicator_name: 'NIBL Realisation Tk. [Excl.NL2]',
      indicatormaster_id: 6,
      parent_location_id: 1,
      order_by: 15,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '16',
      indicator_name: 'OD/OS % [Excl.NL2]',
      indicatormaster_id: 7,
      parent_location_id: 1,
      order_by: 16,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '17',
      indicator_name: 'No of Past Due Total % [Excl.NL2]',
      indicatormaster_id: 7,
      parent_location_id: 1,
      order_by: 17,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '18',
      indicator_name: 'No of Current to Late loans',
      indicatormaster_id: 7,
      parent_location_id: 1,
      order_by: 18,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '19',
      indicator_name: 'Current to Late Loans Tk.',
      indicatormaster_id: 7,
      parent_location_id: 1,
      order_by: 19,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '20',
      indicator_name: 'Category 1',
      indicatormaster_id: 8,
      parent_location_id: 1,
      order_by: 20,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '21',
      indicator_name: 'Category 2',
      indicatormaster_id: 8,
      parent_location_id: 1,
      order_by: 21,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '22',
      indicator_name: 'Category 3',
      indicatormaster_id: 8,
      parent_location_id: 1,
      order_by: 22,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '23',
      indicator_name: 'New Loan',
      indicatormaster_id: 9,
      parent_location_id: 1,
      order_by: 23,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      item_no: '24',
      indicator_name: 'Repeat Loan',
      indicatormaster_id: 9,
      parent_location_id: 1,
      order_by: 24,
      is_default: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('mis_indicatordetails', null, {});
  }
};
