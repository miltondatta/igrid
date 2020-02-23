'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('approval_levels', [{
        location_heirarchy_id: 1,
        parent_id: 0,
        role_id: 7
      },{
        location_heirarchy_id: 2,
        parent_id: 1,
        role_id: 3
      },{
        location_heirarchy_id: 3,
        parent_id: 2,
        role_id: 4
      },{
        location_heirarchy_id: 4,
        parent_id: 3,
        role_id: 5
      },{
        location_heirarchy_id: 5,
        parent_id: 4,
        role_id: 6
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('approval_levels', null, {});
  }
};
