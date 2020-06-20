const Users = require('./user')
const db = require('../config/db')
const Sequelize = require('sequelize')
const UserRoles = require('./userroles')
const Locations = require('./locations')
const UserAssociateRole = require('./userassociaterole')


const RequisitionMaster = db.define('requisition_masters', {
  requisition_no: {
    type: Sequelize.STRING
  },
  mobile: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  location_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Locations,
      key: 'id'
    }
  },
  role_id: {
    type: Sequelize.INTEGER,
    references: {
      model: UserRoles,
      key: 'id'
    }
  },
  request_by: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id'
    }
  },
  request_date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  delivery_date: {
    type: Sequelize.DATEONLY,
    defaultValue: null
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
})


module.exports = RequisitionMaster
