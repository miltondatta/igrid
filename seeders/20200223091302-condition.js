'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('conditions', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('conditions', null, {});
  }
};
