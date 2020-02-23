'use strict';
module.exports = (sequelize, DataTypes) => {
  const mis_indicator_datas = sequelize.define('mis_imported_data', {
    location_id: DataTypes.INTEGER,
    indicatordetails_id: DataTypes.INTEGER,
    data_date: DataTypes.DATEONLY,
    data_value: DataTypes.DOUBLE
  }, {});
  mis_indicator_datas.associate = function(models) {
    // associations can be defined here
  };
  return mis_indicator_datas;
};