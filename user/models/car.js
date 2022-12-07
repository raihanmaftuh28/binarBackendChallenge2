'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    size: DataTypes.STRING,
    image: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};