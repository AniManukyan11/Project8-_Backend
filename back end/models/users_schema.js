'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_schema extends Model {
    static associate(models) {
      // define association here
    }
  }
  Users_schema.init({
    role: {type: DataTypes.INTEGER, defaultValue: 0},
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users_schema',
  });
  return Users_schema;
};