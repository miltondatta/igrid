'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('models', [{
        model: 'Note 4',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        model: 'Note 10 plus',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        model: 'iPhone 11 XR',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('models', null, {});
  }
};
