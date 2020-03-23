'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING
      },
      company:{
        type: Sequelize.STRING
      },
      email:{
        type: Sequelize.STRING
      },
      subject:{
        type: Sequelize.STRING
      },
      message:{
        type: Sequelize.STRING
      },
      user_id:{
        type: Sequelize.INTEGER
      },
      role_id:{
        type: Sequelize.INTEGER
      },
      location_id:{
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('contacts');
  }
};