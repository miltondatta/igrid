'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('vendors', [{
        vendor_name: 'Penta Global Ltd.',
        description: 'A 20+ years experienced pool of think tank catering different vertical industries with innovation, commitment & reliance.',
        enlisted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        vendor_name: 'Gadget & Gear.',
        description: 'G&G is the only multi branded retail chain outlets of Smartphones, Premium Accessories and also Apple Authorized Re-seller having 15 outlets in Dhaka City.',
        enlisted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        vendor_name: 'Star Tech.',
        description: 'Leading Retail Computer Shop in Bangladesh',
        enlisted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('vendors', null, {});
  }
};
