'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location_name: {
        type: Sequelize.STRING
      },
      location_code: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      location_lat: {
        type: Sequelize.DOUBLE
      },
      location_long: {
        type: Sequelize.DOUBLE
      },
      parent_id: {
        type: Sequelize.STRING
      },
      hierarchy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Location_hierarchies',
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
    return queryInterface.dropTable('Locations');
  }
};