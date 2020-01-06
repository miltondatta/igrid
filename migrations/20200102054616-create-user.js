'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      userType: {
        type: Sequelize.INTEGER
      },
      userStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      image: {
        defaultValue: 'default.png',
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.INTEGER
      },
      is_verified: {
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
    return queryInterface.dropTable('Users');
  }
};