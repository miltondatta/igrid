'use strict';
module.exports = (sequelize, DataTypes) => {
  const indicatormaster = sequelize.define('mis_indicatormaster', {
    indicatormaster_code: DataTypes.STRING,
    indicatormaster_name: DataTypes.STRING,
    description: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN
  }, {});
  indicatormaster.associate = function(models) {
    // associations can be defined here
  };
  return indicatormaster;
};