const db = require('../config/db')
const Sequelize = require('sequelize')
const Modules = require('./modules')


const FeatureList = db.define('FeatureList', {
  feature_name: {
    type: Sequelize.INTEGER
  },
  module_id: {
    type: Sequelize.INTEGER,
    references:{
      model: Modules,
      key: 'id'
    }
  }
})


module.exports = FeatureList