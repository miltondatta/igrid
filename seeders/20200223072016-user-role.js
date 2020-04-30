'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('user_roles', [{
        role_name: 'Admin',
        role_desc: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        role_name: 'Program Manager',
        role_desc: 'Program Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        role_name: 'Divisional Manager',
        role_desc: 'Divisional Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        role_name: 'Regional Manager',
        role_desc: 'Regional Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        role_name: 'Area Manager',
        role_desc: 'Area Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        role_name: 'Branch Manager',
        role_desc: 'Branch Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        role_name: 'Stock Manager',
        role_desc: 'Stock Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'Engineer-Hardward',
        role_desc: 'Hardware Support',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'Engineer-Software',
        role_desc: 'Software Support',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('user_roles', null, {});
  }
};
