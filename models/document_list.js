'use strict';
module.exports = (sequelize, DataTypes) => {
  const document_list = sequelize.define('document_list', {
    category_id: DataTypes.INTEGER,
    sub_category_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    circular_no: DataTypes.STRING,
    description: DataTypes.STRING,
    file_name: DataTypes.STRING,
    document_date: DataTypes.DATE,
    display_notice: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {});
  document_list.associate = function(models) {
    // associations can be defined here
  };
  return document_list;
};