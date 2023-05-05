'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_schema extends Model {
  
    static associate(models) {
       Product_schema.belongsTo(models.Category_schema);
    }
  }
  Product_schema.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    CategorySchemaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_schema',
  });
  return Product_schema;
};