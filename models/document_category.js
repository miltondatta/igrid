'use strict';
module.exports = (sequelize, DataTypes) => {
  const document_category = sequelize.define('document_category', {
    category_name: DataTypes.STRING
  }, {});
  document_category.associate = function(models) {
    // associations can be defined here
  };
  return document_category;
};