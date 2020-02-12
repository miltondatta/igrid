'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('modules', [{
        module_name: 'Asset Requisition & Tracking',
        image_name: '',
        initial_link: '',
        order_by: 1,
        createdAt: new Date()
      },
      {
        module_name: 'MIS Report',
        image_name: '',
        initial_link: '',
        order_by: 2,
        createdAt: new Date()
      },
      {
        module_name: 'Document & Notice',
        image_name: '',
        initial_link: '',
        order_by: 3,
        createdAt: new Date()
      },
      {
        module_name: 'Location Finder',
        image_name: '',
        initial_link: '',
        order_by: 4,
        createdAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('modules', null, {});
  }
};
