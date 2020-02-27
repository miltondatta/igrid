'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requisition_approves', {
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
      requisition_details_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'requisition_details',
          key: 'id'
        }
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_roles',
          key: 'id'
        }
      },
      location_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'locations',
          key: 'id'
        }
      },
      delivery_to: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.INTEGER,
        references:{
          model: 'statuses',
          key: 'id'
        }
      },
      comment: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      },
      update_quantity: {
        type: Sequelize.INTEGER
      },
      update_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
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
    return queryInterface.dropTable('requisition_approves');
  }
};