'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transferRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      details: {
        type: Sequelize.STRING
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