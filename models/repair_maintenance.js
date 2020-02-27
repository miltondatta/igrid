'use strict';
module.exports = (sequelize, DataTypes) => {
  const repair_maintenance = sequelize.define('repair_maintenance', {
    location_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    added_by: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER,
    estimated_cost: DataTypes.INTEGER,
    details: DataTypes.STRING,
    file_name: DataTypes.STRING
  }, {});
  repair_maintenance.associate = function(models) {
    // associations can be defined here
  };
  return repair_maintenance;
};