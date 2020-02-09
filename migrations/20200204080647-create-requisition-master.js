'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RequisitionMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requisition_no: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      location_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserAssociateRoles',
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
      request_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      request_date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      delivery_date: {
        type: Sequelize.DATEONLY,
        defaultValue: null
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    return queryInterface.dropTable('RequisitionMaster');
  }
};