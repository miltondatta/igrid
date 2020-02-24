const db = require('../config/db');
const Sequelize = require('sequelize');


const Users = db.define('users', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    pin: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING
    },
    image: {
        defaultValue: 'default.png',
        type: Sequelize.STRING
    },
    phone_number: {
        type: Sequelize.INTEGER
    },
    is_verified: {
      type: Sequelize.BOOLEAN
    }
  });


  module.exports = Users;