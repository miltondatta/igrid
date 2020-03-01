const db = require('../config/db')
const Sequelize = require('sequelize')
const LostAsset = require('./lost_asset')
const Users = require('./user')

  const LostAssetFeedback = db.define('lost_asset_feedbacks', {
    lost_asset_id: {
      type: Sequelize.INTEGER,
      references: {
        model: LostAsset,
        key: 'id'
      }
    },
    feedback_by: {
      type: Sequelize.INTEGER,
      references: {
        model: Users,
        key: 'id'
      }
    },
    feedback_details: Sequelize.STRING
  }, {});

  module.exports = LostAssetFeedback