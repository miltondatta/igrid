'use strict';
module.exports = (sequelize, DataTypes) => {
  const complaint_feedback = sequelize.define('complaint_feedback', {
    complaint_id: DataTypes.INTEGER,
    feedback: DataTypes.STRING,
    file_name: DataTypes.STRING,
    feedback_by: DataTypes.INTEGER
  }, {});
  complaint_feedback.associate = function(models) {
    // associations can be defined here
  };
  return complaint_feedback;
};