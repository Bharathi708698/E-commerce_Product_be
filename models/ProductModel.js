const { DataTypes } = require('sequelize');
const sequelize = require("../config/config");

const ProductModel = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
});

module.exports = ProductModel;
