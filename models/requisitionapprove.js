const db = require('../config/db')
const Sequelize = require('sequelize')
const RequisitionMaster = require('./requisitionmaster')
const RequisitionDetails = require('./requisitiondetails')
const Locations = require('./locations')
const UserRoles = require('./userroles')
const Users = require('./user')
const Status = require('./status')


const RequisitionApproves = db.define('requisition_approves', {
  requisition_id: {
    type: Sequelize.INTEGER,
    references:{
      model: RequisitionMaster,
      key: 'id'
    }
  },
  requisition_details_id: {
    type: Sequelize.INTEGER,
    references:{
      model: RequisitionDetails,
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
  location_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Locations,
      key: 'id'
    }
  },
  delivery_to: {
    type: Sequelize.INTEGER,
    references:{
      model: Users,
      key: 'id'
    }
  },
  status: {
    type: Sequelize.INTEGER,
    references:{
      model: Status,
      key: 'id'
    }
  },
  update_quantity: {
    type: Sequelize.INTEGER
  }
})


module.exports = RequisitionApproves