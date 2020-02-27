'use strict';
module.exports = (sequelize, DataTypes) => {
  const lost_asset_feedback = sequelize.define('lost_asset_feedback', {
    lost_asset_id: DataTypes.INTEGER,
    feedback_by: DataTypes.INTEGER,
    feedback_details: DataTypes.STRING
  }, {});
  lost_asset_feedback.associate = function(models) {
    // associations can be defined here
  };
  return lost_asset_feedback;
};