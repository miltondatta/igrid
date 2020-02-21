'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mis_indicatordetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_no: {
        type: Sequelize.STRING
      },
      indicator_name: {
        type: Sequelize.STRING
      },
      indicatormaster_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'mis_indicatormasters',
          key: 'id'
        }
      },
      parent_location_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'locations',
          key: 'id'
        }
      },
      order_by: {
        type: Sequelize.INTEGER
      },
      is_default: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('mis_indicatordetails');
  }
};