'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('user_associate_roles', [
        {
          user_id: 1,
          location_id: 0,
          role_id: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          user_id: 2,
          location_id: 1,
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
        user_id: 3,
        location_id: 1,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 4,
        location_id: 2,
        role_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 5,
        location_id: 3,
        role_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 6,
        location_id: 4,
        role_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 7,
        location_id: 5,
        role_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        user_id: 8,
        location_id: 0,
        role_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('user_associate_roles', null, {});
  }
};
