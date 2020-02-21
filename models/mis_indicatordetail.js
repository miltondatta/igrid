'use strict';
module.exports = (sequelize, DataTypes) => {
  const indicatordetail = sequelize.define('mis_indicatordetail', {
    item_no: DataTypes.STRING,
    indicator_name: DataTypes.STRING,
    indicatormaster_id: DataTypes.INTEGER,
    parent_location_id: DataTypes.INTEGER,
    order_by: DataTypes.INTEGER,
    is_default: DataTypes.BOOLEAN
  }, {});
  indicatordetail.associate = function(models) {
    // associations can be defined here
  };
  return indicatordetail;
};