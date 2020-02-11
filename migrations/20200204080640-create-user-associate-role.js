'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserAssociateRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      module_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Modules',
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
      role_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'UserRoles',
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
    return queryInterface.dropTable('UserAssociateRole');
  }
};