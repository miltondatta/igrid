'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('complaints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        createdBy:{
            type: Sequelize.INTEGER
        },
        locationId:{
            type: Sequelize.INTEGER
        },
        roleID:{
            type: Sequelize.INTEGER
        },
        complaint_category:{
            type: Sequelize.INTEGER,
            references: {
                model: "comCategories",
                key: 'id'
            }
        },
        complaint_sub_category:{
            type: Sequelize.INTEGER,
            references: {
                model: "comSubCategories",
                key: 'id'
            }
        },
        assignTO:{
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        problemDetails:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.BOOLEAN
        },
        solutionDetails:{
            type: Sequelize.STRING,
            defaultValue: null,
            allowNull: true
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
    return queryInterface.dropTable('complaints');
  }
};