'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('asset_sub_categories', [{
        category_id: 1,
        sub_category_name: 'Mobile Phone',
        sub_category_code: 1011,
        description: 'Mobile phone is sub category of electronics.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        category_id: 1,
        sub_category_name: 'Computer',
        sub_category_code: 1012,
        description: 'A computer is a machine that can be instructed to carry out sequences of arithmetic or logical operations automatically via computer programming.',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        category_id: 2,
        sub_category_name: 'Monitor',
        sub_category_code: 2011,
        description: 'A computer monitor is an output device that displays information in pictorial form.',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('asset_sub_categories', null, {});

  }
};
