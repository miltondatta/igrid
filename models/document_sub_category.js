'use strict';
module.exports = (sequelize, DataTypes) => {
  const document_sub_category = sequelize.define('document_sub_category', {
    category_id: DataTypes.INTEGER,
    sub_category_name: DataTypes.STRING
  }, {});
  document_sub_category.associate = function(models) {
    // associations can be defined here
  };
  return document_sub_category;
};