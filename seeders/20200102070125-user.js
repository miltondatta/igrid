'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Rakib',
      lastName: 'Uddin',
      email: '16103030@iubat.edu',
      phone_number: '01534618623',
      pin: '1234',
      address: 'Dhaka',
      image: '',
      is_verified: false,
      userType: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
