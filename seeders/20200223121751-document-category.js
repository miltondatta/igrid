'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('document_categories', [{
        category_name: 'Product Documentation',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        category_name: 'Unit',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('document_categories', null, {});
  }
};
