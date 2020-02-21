'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requisition_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requisition_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'requisition_masters',
          key: 'id'
        }
      },
      asset_category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'asset_categories',
          key: 'id'
        }
      },
      asset_sub_category: {
        type: Sequelize.INTEGER,
        references:{
          model: 'asset_sub_categories',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('requisition_details');
  }
};