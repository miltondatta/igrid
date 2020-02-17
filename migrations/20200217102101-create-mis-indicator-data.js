'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mis_indicator_datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data_date: {
        type: Sequelize.DATEONLY
      },
      location_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'locations',
          key: 'id'
        }
      },
      data_value: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('mis_indicator_datas');
  }
};