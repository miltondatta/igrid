'use strict';
module.exports = (sequelize, DataTypes) => {
  const complaint_forward = sequelize.define('complaint_forward', {
    complaint_id: DataTypes.INTEGER,
    fw_by: DataTypes.INTEGER,
    fw_to: DataTypes.INTEGER
  }, {});
  complaint_forward.associate = function(models) {
    // associations can be defined here
  };
  return complaint_forward;
};