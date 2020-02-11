'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RequisitionApproves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requisition_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'RequisitionMasters',
          key: 'id'
        }
      },
      requisition_details_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'RequisitionDetails',
          key: 'id'
        }
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserRoles',
          key: 'id'
        }
      },
      location_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Locations',
          key: 'id'
        }
      },
      delivery_to: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Status',
          key: 'id'
        }
      },
      update_quantity: {
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
    return queryInterface.dropTable('RequisitionApprove');
  }
};