'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      challan_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Challans',
          key: 'id'
        },
      },
      project_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id'
        },
      },
      asset_category:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Asset_categories',
          key: 'id'
        },
      },
      asset_sub_category:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Asset_sub_categories',
          key: 'id'
        },
      },
      product_serial:{
        type: Sequelize.STRING
      },
      cost_of_purchase:{
        type: Sequelize.DOUBLE
      },
      installation_cost:{
        type: Sequelize.DOUBLE
      },
      carrying_cost:{
        type: Sequelize.DOUBLE
      },
      other_cost:{
        type: Sequelize.DOUBLE
      },
      asset_type:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Asset_types',
          key: 'id'
        },
      },
      depreciation_method:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Depreciation_methods',
          key: 'id'
        },
      },
      rate:{
        type: Sequelize.INTEGER
      },
      effective_date:{
        type: Sequelize.DATEONLY
      },
      book_value:{
        type: Sequelize.DOUBLE
      },
      salvage_value:{
        type: Sequelize.DOUBLE
      },
      useful_life:{
        type: Sequelize.DOUBLE
      },
      last_effective_date:{
        type: Sequelize.DATEONLY
      },
      warranty:{
        type: Sequelize.STRING
      },
      last_warranty_date:{
        type: Sequelize.DATEONLY
      },
      condition:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Conditions',
          key: 'id'
        },
      },
      comments:{
        type: Sequelize.TEXT
      },
      barcode:{
        type: Sequelize.BOOLEAN
      },
      assign_to:{
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Assets');
  }
};