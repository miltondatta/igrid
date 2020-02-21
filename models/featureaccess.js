const db = require('../config/db')
const Sequelize = require('sequelize')
const FeatureList = require('./featurelist')
const UserRoles = require('./userroles')


const FeatureAccess = db.define('feature_accesses', {
  feature_id: {
    type: Sequelize.INTEGER,
    references:{
      model: FeatureList,
      key: 'id'
    }
  },
  role_id: {
    type: Sequelize.INTEGER,
    references:{
      model: UserRoles,
      key: 'id'
    }
  },
})


module.exports = FeatureAccess