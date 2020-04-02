'use strict';
module.exports = (sequelize, DataTypes) => {
  const complaint_mapping = sequelize.define('complaint_mapping', {
    role_id: DataTypes.INTEGER,
    cat_id: DataTypes.INTEGER
  }, {});
  complaint_mapping.associate = function(models) {
    // associations can be defined here
  };
  return complaint_mapping;
};