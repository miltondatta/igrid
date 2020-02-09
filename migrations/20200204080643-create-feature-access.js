'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FeatureAccesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      feature_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'FeatureList',
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
    return queryInterface.dropTable('FeatureAccesses');
  }
};