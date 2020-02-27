'use strict';
module.exports = (sequelize, DataTypes) => {
  const lost_asset = sequelize.define('lost_asset', {
    location_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    added_by: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER, 
    incident_type: DataTypes.STRING,
    incident_date: DataTypes.DATEONLY,
    incident_time: DataTypes.TIME,
    police_station: DataTypes.STRING,
    gd_no: DataTypes.STRING,
    gd_date: DataTypes.DATEONLY,
    gd_other_file: DataTypes.STRING
  }, {});
  lost_asset.associate = function(models) {
    // associations can be defined here
  };
  return lost_asset;
};