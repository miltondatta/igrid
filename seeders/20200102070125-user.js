'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
        {
          firstName: 'Rakib',
          lastName: 'Uddin',
          email: 'rakib@uddin.com',
          phone_number: '01534618623',
          password: bcrypt.hashSync('123456', 10),
          pin: '1234',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          userType: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@admin.com',
          phone_number: '01534618623',
          password: bcrypt.hashSync('123456', 10),
          pin: '1234',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          userType: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
