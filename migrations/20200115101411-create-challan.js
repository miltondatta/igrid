module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('challans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      challan_no:{
        type: Sequelize.STRING
      },
      challan_date:{
        type: Sequelize.DATEONLY
      },
      challan_description:{
        type: Sequelize.STRING
      },
      purchase_order_no:{
        type: Sequelize.STRING
      },
      purchase_order_date:{
        type: Sequelize.DATEONLY
      },
      vendor_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'vendors',
          key: 'id'
        },
      },
      received_by: {
        type: Sequelize.STRING,
      },
      added_by: {
        type: Sequelize.STRING,
      },
      attachment: {
        type: Sequelize.STRING,
      },
      comments: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('challans');
  }
};