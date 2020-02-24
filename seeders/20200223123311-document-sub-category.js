'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('document_sub_categories', [{
        category_id: 1,
        sub_category_name: 'System Documentation',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        category_id: 1,
        sub_category_name: 'User Documentation',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        category_id: 2,
        sub_category_name: 'Finance & Accounts',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        category_id: 2,
        sub_category_name: 'Financial Education & Client Protection',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('document_sub_categories', null, {});
  }
};
