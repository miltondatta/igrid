'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('userroles', [{
        role_name: 'Admin',
        role_desc: 'Admin',
      },{
        role_name: 'Program Manager',
        role_desc: 'Program Manager',
      }{
        role_name: 'Divisional Manager',
        role_desc: 'Divisional Manager',
      }{
        role_name: 'Regional Manager',
        role_desc: 'Regional Manager',
      }{
        role_name: 'Area Manager',
        role_desc: 'Area Manager',
      }{
        role_name: 'Branch Manager',
        role_desc: 'Branch Manager',
      }{
        role_name: 'Stock Manager',
        role_desc: 'Stock Manager',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('userroles', null, {});
  }
};
