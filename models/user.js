const db = require('../config/db');
const Sequelize = require('sequelize');


const Users = db.define('Users', {
    firstName: {
      type: Sequelize.STRING
    },
    userType: {
      type: Sequelize.INTEGER
    },
    lastName: {
      type: Sequelize.STRING
    },
    userStatus: {
      type: Sequelize.BOOLEAN
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