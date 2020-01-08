'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Rakib',
      lastName: 'Uddin',
      email: '16103030@iubat.edu',
      phone_number: '01534618623',
      password: bcrypt.hashSync('123456', 10),
      pin: '1234',
      address: 'Dhaka',
      image: 'default.png',
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
