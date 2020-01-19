'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Asset_categories',
          key: 'id'
        },
      },
      sub_category_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Asset_sub_categories',
          key: 'id'
        },
      },
      brand_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Brands',
          key: 'id'
        },
      },
      model_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Models',
          key: 'id'
        },
      },
      product_name:{
        type: Sequelize.STRING
      },
      product_code:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};