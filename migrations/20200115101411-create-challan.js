module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Challans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      challan_no:{
        type: Sequelize.STRING
      },
      challan_name:{
        type: Sequelize.STRING
      },
      challan_description:{
        type: Sequelize.STRING
      },
      purchase_order_no:{
        type: Sequelize.STRING
      },
      purchase_order_date:{
        type: Sequelize.DATE
      },
      vendor_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Vendors',
          key: 'id'
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
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