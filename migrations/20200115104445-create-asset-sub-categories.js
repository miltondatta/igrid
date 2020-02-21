'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('asset_sub_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sub_category_name:{
        type: Sequelize.STRING
      },
      category_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'asset_categories',
          key: 'id'
        },
      },
      sub_category_code:{
        type: Sequelize.STRING
      },
      description:{
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
    return queryInterface.dropTable('asset_sub_categories');
  }
};