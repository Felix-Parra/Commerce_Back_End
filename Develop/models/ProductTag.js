const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    sequelize,
    timestamps: false,
    freezeTabelName: true,
    underscored: true,
    modelName:'product_tag',
  }
);

module.exports = ProductTag;
