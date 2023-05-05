'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_schema extends Model {
   
    static associate(models) {
      Category_schema.hasMany(models.Product_schema);
   }
  }
  Category_schema.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category_schema',
  });
  return Category_schema;
};