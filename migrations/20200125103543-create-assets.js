'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      challan_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'challans',
          key: 'id'
        },
      },
      project_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id'
        },
      },
      assign_to:{
        type: Sequelize.INTEGER
      },
      product_id:{
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: 'id'
        },
      },
      asset_category:{
        type: Sequelize.INTEGER,
        references: {
          model: 'asset_categories',
          key: 'id'
        },
      },
      asset_sub_category:{
        type: Sequelize.INTEGER,
        references: {
          model: 'asset_sub_categories',
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
          model: 'asset_types',
          key: 'id'
        },
      },
      depreciation_method:{
        type: Sequelize.INTEGER,
        references: {
          model: 'depreciation_methods',
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
          model: 'conditions',
          key: 'id'
        },
      },
      comments:{
        type: Sequelize.TEXT
      },
      barcode:{
        type: Sequelize.BOOLEAN
      },
      is_disposal:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      disposal_by_location:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      disposal_by_role_id:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      disposal_by:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      disposal_date:{
        type: Sequelize.DATE,
        allowNull: true
      },
      disposal_reason:{
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
    return queryInterface.dropTable('assets');
  }
};