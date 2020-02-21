'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_associate_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      module_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'modules',
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
      role_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'user_roles',
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
    return queryInterface.dropTable('user_associate_roles ');
  }
};