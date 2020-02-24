'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
        {
          firstName: 'Super',
          lastName: 'Admin',
          email: 'sadmin@example.com',
          phone_number: '01234567891',
          password: bcrypt.hashSync('sadmin', 10),
          pin: '0000',
          address: 'Bangladesh',
          image: 'default.png',
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          phone_number: '01234567891',
          password: bcrypt.hashSync('123456', 10),
          pin: '1001',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'PM',
          lastName: 'User',
          email: 'pm@example.com',
          phone_number: '01234567891',
          password: bcrypt.hashSync('123456', 10),
          pin: '1002',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'DM',
          lastName: 'User',
          email: 'dm@example.com',
          phone_number: '01234567891',
          password: bcrypt.hashSync('123456', 10),
          pin: '1003',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'RM',
          lastName: 'User',
          email: 'rm@example.com',
          phone_number: '01234567891',
          password: bcrypt.hashSync('123456', 10),
          pin: '1004',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'AM',
          lastName: 'User',
          email: 'am@example.com',
          phone_number: '01234567891',
          password: bcrypt.hashSync('123456', 10),
          pin: '1005',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'BM',
          lastName: 'User',
          email: 'bm@example.com',
          phone_number: '01234567891',
          password: bcrypt.hashSync('123456', 10),
          pin: '1006',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Stock Manager',
          lastName: 'User',
          email: 'sm@example.com',
          phone_number: '01234567891',
          password: bcrypt.hashSync('123456', 10),
          pin: '1007',
          address: 'Dhaka',
          image: 'default.png',
          is_verified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
