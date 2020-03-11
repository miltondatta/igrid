'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('menus', [{
        name: 'System Config',
        icon: 'icofont-ui-settings',
        subCat: true,
        link: '',
        parent_id: 0,
        module_id: 0,
        visible: true,
        order_by: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Modules',
        icon: '',
        subCat: false,
        link: '/admin/modules',
        parent_id: 1,
        module_id: 0,
        visible: true,
        order_by: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Requisition',
        icon: 'fas fa-history',
        subCat: true,
        link: '',
        parent_id: 0,
        module_id: 1,
        visible: true,
        order_by: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'New Requisition',
        icon: '',
        subCat: false,
        link: '/requisition',
        parent_id: 3,
        module_id: 1,
        visible: true,
        order_by: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
     ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('menus', null, {});
  }
};
