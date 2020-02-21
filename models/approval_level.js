const db = require('../config/db');
const Sequelize = require('sequelize');
const UserRoles = require('./userroles')
const Location_hierarchies = require('./location_hierarchies')

const Approval_levels = db.define('approval_levels', {
  location_heirarchy_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Location_hierarchies,
      key: 'id'
    },
  },
  parent_id: {
    type: Sequelize.INTEGER
  },
  role_id: {
    type: Sequelize.INTEGER,
    references: {
      model: UserRoles,
      key: 'id'
    },
  }
});

module.exports = Approval_levels;