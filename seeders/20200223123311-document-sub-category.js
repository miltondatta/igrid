'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('document_sub_categories', [{
        category_id: 1,
        sub_category_name: 'System Documentation'
      },{
        category_id: 1,
        sub_category_name: 'User Documentation'
      },{
        category_id: 2,
        sub_category_name: 'Finance & Accounts'
      },{
        category_id: 2,
        sub_category_name: 'Financial Education & Client Protection'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('document_sub_categories', null, {});
  }
};
