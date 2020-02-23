'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('models', [{
        model: 'Note 4'
      },{
        model: 'Note 10 plus'
      },{
        model: 'iPhone 11 XR'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('models', null, {});
  }
};
