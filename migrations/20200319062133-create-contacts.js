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
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          id: 'id'
        }
      },
      role_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'user_roles',
          id: 'id'
        }
      },
      location_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'locations',
          id: 'id'
        }
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