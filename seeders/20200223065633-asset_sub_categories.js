'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('asset_sub_categories', [{
        category_id: 1,
        sub_category_name: 'Mobile Phone',
        sub_category_code: 1011,
        description: 'Mobile phone is sub category of electronics.'
      },{
        category_id: 1,
        sub_category_name: 'Computer',
        sub_category_code: 1012,
        description: 'A computer is a machine that can be instructed to carry out sequences of arithmetic or logical operations automatically via computer programming.'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('asset_sub_categories', null, {});

  }
};
