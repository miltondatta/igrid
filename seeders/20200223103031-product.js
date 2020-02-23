'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('products', [{
        product_name: 'Xiaomi Note 4x',
        category_id: 1,
        sub_category_id: 1,
        brand_id: 1,
        model_id: 1,
        product_code: 01,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        product_name: '27" CF398 Curved LED Monitor',
        category_id: 2,
        sub_category_id: 3,
        brand_id: 2,
        model_id: 4,
        product_code: 02,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('products', null, {});
  }
};
