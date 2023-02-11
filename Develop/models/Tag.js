const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    sequelize,
    timestamps: false,
    freezeTabelName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;