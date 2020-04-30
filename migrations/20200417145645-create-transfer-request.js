'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transfer_requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      details: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        defaultValue: 6,
        type: Sequelize.INTEGER,
        references: {
          model: 'statuses',
          key: 'id'
        }
      },
      request_to     : {
        type       : Sequelize.INTEGER,
        references : {
          model : 'users',
          key   : 'id'
        }
      },
      request_from     : {
        type       : Sequelize.INTEGER,
        references : {
          model : 'users',
          key   : 'id'
        }
      },
      location_to: {
        type: Sequelize.INTEGER,
        references: {
          model: 'locations',
          key: 'id'
        }
      },
      location_from: {
        type: Sequelize.INTEGER,
        references: {
          model: 'locations',
          key: 'id'
        }
      },
      category_id     : {
        type       : Sequelize.INTEGER,
        references : {
          model : 'asset_categories',
          key   : 'id'
        },
      },
      sub_category_id : {
        type       : Sequelize.INTEGER,
        references : {
          model : 'asset_sub_categories',
          key   : 'id'
        },
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
    return queryInterface.dropTable('transferRequests');
  }
};